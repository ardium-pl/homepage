import {defineField, defineType} from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact info',
  type: 'document',
  description: 'contact information containing links',
  fields: [
    defineField({
      name: 'phoneNumber',
      title: 'Phone number',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Contact Info',
      }
    },
  },
})
