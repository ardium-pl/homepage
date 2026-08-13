import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      fields: [
        {
          name: 'altText',
          type: 'localizedString',
          title: 'Alternative text',
        }
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Post summary',
      type: 'localizedText',
      description: 'short summary to be displayed on the blog list page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Post content',
      type: 'localizedPortableText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'urlSlug',
      title: 'URL Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Post type',
      type: 'string',
      description: 'type of the post: blog or caseStudy',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Case study', value: 'caseStudy'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
})
