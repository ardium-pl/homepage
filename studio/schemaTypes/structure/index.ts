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
        .id('aboutUsPage')
        .schemaType('aboutUsPage')
        .title('About Us page')
        .child(S.editor().id('aboutUsPage').schemaType('aboutUsPage').documentId('aboutUsPage')),

      S.listItem()
        .id('blogPage')
        .schemaType('blogPage')
        .title('Blog page')
        .child(S.editor().id('blogPage').schemaType('blogPage').documentId('blogPage')),

      S.listItem()
        .id('privacyPolicy')
        .schemaType('privacyPolicy')
        .title('Privacy policy')
        .child(S.editor().id('privacyPolicy').schemaType('privacyPolicy').documentId('privacyPolicy')),

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

      S.listItem()
        .id('employees')
        .schemaType('employees')
        .title('Employees')
        .child(S.editor().id('employees').schemaType('employees').documentId('employees')),

      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()

        return !id || !singletonTypes.has(id)
      }),
    ])
