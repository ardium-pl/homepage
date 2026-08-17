import {defineField, defineType} from 'sanity'

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
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'countryCode',
              title: 'Country code',
              type: 'string',
              description: 'ex. PL, DE',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'portrait',
              title: 'Portrait',
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
        title: 'Employees',
      }
    },
  },
})
