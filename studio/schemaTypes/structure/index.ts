import type {StructureResolver} from 'sanity/structure'
import {singletonTypes} from './singletons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('homepage')
        .schemaType('homepage')
        .title('Homepage')
        .child(S.editor().id('homepage').schemaType('homepage').documentId('homepage')),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()

        return !id || !singletonTypes.has(id)
      }),
    ])
