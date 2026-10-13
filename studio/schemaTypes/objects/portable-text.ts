import {defineType, defineArrayMember} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Portable text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
    }),
    defineArrayMember({
      type: 'image',
      fields: [
        {
          name: 'altText',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    }),
  ],
})
