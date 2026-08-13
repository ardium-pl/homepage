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

      S.listItem()
        .id('services')
        .schemaType('services')
        .title('Services')
        .child(S.editor().id('services').schemaType('services').documentId('services')),

      S.listItem()
        .id('contactInfo')
        .schemaType('contactInfo')
        .title('Contact info')
        .child(S.editor().id('contactInfo').schemaType('contactInfo').documentId('contactInfo')),

      S.listItem()
        .id('clientLogos')
        .schemaType('clientLogos')
        .title('Client logos')
        .child(S.editor().id('clientLogos').schemaType('clientLogos').documentId('clientLogos')),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()

        return !id || !singletonTypes.has(id)
      }),
    ])
