import { defineField, defineType } from 'sanity'

export const employees = defineType({
  name: 'employees',
  title: 'Employees',
  type: 'document',
  description: 'list of employees',
  fields: [
    defineField({
      name: 'list',
      title: 'Employee list',
      type: 'array',
      of: [
        {
          name: 'employeeItem',
          title: 'Employee',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'position',
              title: 'Position',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'linkedIn',
              title: 'LinkedIn',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'countryCode',
              title: 'Country code',
              type: 'string',
              description: '2-letter ISO country code, e.g. PL, DE',
              validation: (rule) => rule.required().min(2).max(2).uppercase(),
            }),
            defineField({
              name: 'portrait',
              title: 'Portrait',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localizedText',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Legacy description',
              type: 'localizedText',
              hidden: true,
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'string',
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
        title: 'Employees',
      }
    },
  },
})
