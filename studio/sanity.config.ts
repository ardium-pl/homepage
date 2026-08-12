import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './schemaTypes/structure'
import {singletonTypes, singletonActions} from './schemaTypes/structure/singletons'

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE ?? 'Homepage',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    newDocumentOptions: (prev) => prev.filter(({templateId}) => !singletonTypes.has(templateId)),

    actions: (prev, context) =>
      singletonTypes.has(context.schemaType)
        ? prev.filter(({action}) => action && singletonActions.has(action))
        : prev,
  },
})
