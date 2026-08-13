import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
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
        defineField({
          name: 'contactButtonText',
          title: 'Contact button text',
          type: 'localizedString',
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
