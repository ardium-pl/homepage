import type {StructureResolver} from 'sanity/structure'
import {singletonTypes} from './singletons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('homePage')
        .schemaType('homePage')
        .title('Homepage')
        .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()

        return !id || !singletonTypes.has(id)
      }),
    ])
