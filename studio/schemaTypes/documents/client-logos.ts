import {defineField, defineType} from 'sanity'

export const clientLogos = defineType({
  name: 'clientLogos',
  title: 'Client logos',
  type: 'document',
  description: 'logos of client companies',
  fields: [
    defineField({
      name: 'clientLogoList',
      title: 'Client logo list',
      type: 'array',
      of: [
        {
          name: 'clientLogo',
          title: 'Client logo',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})
