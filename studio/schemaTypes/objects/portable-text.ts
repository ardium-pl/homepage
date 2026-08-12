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
          name: 'altName',
          type: 'localizedString',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'localizedString',
          title: 'Caption',
        },
      ],
    }),
  ],
})
