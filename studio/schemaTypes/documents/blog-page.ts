import {defineField, defineType} from 'sanity'

export const blogPage = defineType({
  name: 'blogPage',
  title: 'Blog page',
  type: 'document',

  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'preHeading',
          title: 'Pre-heading',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Blog page',
      }
    },
  },
})
