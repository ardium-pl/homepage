import {defineField, defineType} from 'sanity'

export const privacyPolicy = defineType({
  name: 'privacyPolicy',
  title: 'Privacy policy',
  type: 'document',
  fields: [
    defineField({
      name: 'updatedAt',
      title: 'Last updated',
      type: 'date',
      options: {dateFormat: 'DD.MM.YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Policy content',
      description: 'The complete policy displayed below the page heading.',
      type: 'localizedPortableText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {prepare: () => ({title: 'Privacy policy'})},
})
