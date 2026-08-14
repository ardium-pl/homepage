import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import { PortableTextBlock, PortableTextMarkDefinition, PortableTextNode } from '../../blog-post.model';

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

  linkFor(block: PortableTextBlock, markKey: string): string | null {
    const definition: PortableTextMarkDefinition | undefined = block.markDefs?.find(
      (mark) => mark._key === markKey && mark._type === 'link',
    );
    return definition?.href ?? null;
  }

  hasMark(marks: string[] | undefined, mark: string): boolean {
    return marks?.includes(mark) ?? false;
  }
}
