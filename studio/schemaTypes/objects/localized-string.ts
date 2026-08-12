import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pl',
      title: 'Polish',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
