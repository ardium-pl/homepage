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
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'object',
      fields: [
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'url',
        }),
      ],
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
