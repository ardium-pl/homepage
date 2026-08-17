import {defineField, defineType} from 'sanity'

export const aboutUsPage = defineType({
  name: 'aboutUsPage',
  title: 'About Us page',
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
          name: 'aboutUsConents',
          title: 'About Us Contents',
          type: 'array',
          of: [
            defineType({
              name: 'aboutUsContent',
              title: 'About Us Content',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'content',
                  title: 'Content',
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'About Us page',
      }
    },
  },
})
