import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',

  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: 'description',
          title: 'Description',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),

        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
