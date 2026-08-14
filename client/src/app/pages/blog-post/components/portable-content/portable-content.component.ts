import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {
  PortableTextBlock,
  PortableTextList,
  PortableTextMarkDefinition,
  PortableTextNode,
  PortableTextRenderNode,
} from '../../blog-post.model';

@Component({
  selector: 'app-portable-content',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './portable-content.component.html',
  styleUrl: './portable-content.component.scss',
})
export class PortableContentComponent {
  readonly nodes = input.required<PortableTextNode[]>();
  readonly compact = input(false);
  readonly renderNodes = computed(() => this.groupLists(this.nodes()));

  linkFor(block: PortableTextBlock, markKey: string): string | null {
    const definition: PortableTextMarkDefinition | undefined = block.markDefs?.find(
      (mark) => mark._key === markKey && mark._type === 'link',
    );
    return definition?.href ?? null;
  }

  private groupLists(nodes: PortableTextNode[]): PortableTextRenderNode[] {
    const result: PortableTextRenderNode[] = [];
    let index = 0;

    while (index < nodes.length) {
      const node = nodes[index];
      if (node._type !== 'block' || !node.listItem) {
        result.push(node);
        index += 1;
        continue;
      }

      const roots: PortableTextList[] = [];
      const stack: PortableTextList[] = [];

      while (index < nodes.length) {
        const block = nodes[index];
        if (block._type !== 'block' || !block.listItem) break;

        const level = Math.max(1, block.level ?? 1);
        while (stack.length >= level) stack.pop();

        let list: PortableTextList;
        const parent = stack.at(-1);
        const existing = parent?.items.at(-1)?.children.at(-1);

        if (level === 1) {
          const previousRoot = roots.at(-1);
          list = previousRoot?.kind === block.listItem
            ? previousRoot
            : { _type: 'list', _key: `list-${block._key}`, kind: block.listItem, items: [] };
          if (list !== previousRoot) roots.push(list);
        } else if (existing?.kind === block.listItem) {
          list = existing;
        } else {
          list = { _type: 'list', _key: `list-${block._key}`, kind: block.listItem, items: [] };
          parent?.items.at(-1)?.children.push(list);
        }

        list.items.push({ block, children: [] });
        stack.push(list);
        index += 1;
      }

      result.push(...roots);
    }

    return result;
  }
}
