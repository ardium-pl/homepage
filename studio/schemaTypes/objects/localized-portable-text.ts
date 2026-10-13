import {defineField, defineType} from 'sanity'

export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized portable text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pl',
      title: 'Polish',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
  ],
})
