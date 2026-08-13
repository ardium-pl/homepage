import {defineField, defineType} from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  description: 'A list of services offered by the company.',
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
      name: 'list',
      title: 'Service list',
      type: 'array',
      of: [
        {
          name: 'serviceItem',
          title: 'Service',
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
              name: 'icon',
              title: 'Icon',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Services',
      }
    },
  },
})
