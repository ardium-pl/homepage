import {defineField, defineType} from 'sanity'

export const workflow = defineType({
  name: 'workflow',
  title: 'Workflow',
  type: 'document',
  description: 'List explaining the workflow of the company.',
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
      title: 'Workflow list',
      type: 'array',
      of: [
        {
          name: 'workflowItem',
          title: 'Workflow item',
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
          ],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Workflow',
      }
    },
  },
})