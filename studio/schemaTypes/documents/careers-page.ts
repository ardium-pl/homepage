import { defineField, defineType } from 'sanity'

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers page',
  type: 'document',

  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'preHeading',
          title: 'Pre-heading',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'positionsSection',
      title: 'Open positions section',
      type: 'object',
      fields: [
        defineField({
          name: 'preHeading',
          title: 'Pre-heading',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'noOpenPositionsText',
          title: 'No open positions text',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mailtoLink',
          title: 'Mailto link',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'positions',
          title: 'Open positions',
          type: 'array',
          of: [
            defineField({
              name: 'openPosition',
              title: 'Open position',
              type: 'object',
              fields: [
                defineField({
                  name: 'positionName',
                  title: 'Position name',
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'team',
                  title: 'Team',
                  type: 'localizedString',
                  description: 'For example: Engineering, Design, AI & Data',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'workLocation',
                  title: 'Work location',
                  type: 'localizedString',
                  description: 'For example: Zdalnie, Warszawa, Kraków, Polska',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'workType',
                  title: 'Work type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Zdalnie', value: 'zdalnie'},
                      {title: 'Hybrydowo', value: 'hybrydowo'},
                      {title: 'Stacjonarnie', value: 'stacjonarnie'},
                    ],
                    layout: 'radio',
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'agreementType',
                  title: 'Agreement type',
                  type: 'string',
                  options: {
                    list: [
                      {title: 'Umowa zlecenie', value: 'umowa-zlecenie'},
                      {title: 'Umowa o dzieło', value: 'umowa-o-dzielo'},
                      {title: 'Umowa o pracę', value: 'umowa-o-prace'},
                      {title: 'Pełny etat', value: 'pelny-etat'},
                      {title: 'Część etatu', value: 'czesc-etatu'},
                      {title: 'B2B', value: 'b2b'},
                      {title: 'Staż', value: 'staz'},
                      {title: 'Praktyka', value: 'praktyka'},
                    ],
                    layout: 'dropdown',
                  },
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'requiredKnowledge',
                  title: 'Required knowledge',
                  type: 'array',
                  of: [
                    {
                      type: 'localizedString',
                      name: 'requiredKnowledgeItem',
                      title: 'Required knowledge item',
                    },
                  ],
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: 'salaryFrom',
                  title: 'Salary range — from (PLN)',
                  type: 'number',
                  validation: (rule) => rule.required().precision(2).min(0),
                }),
                defineField({
                  name: 'salaryTo',
                  title: 'Salary range — to (PLN) (leave empty if not applicable)',
                  type: 'number',
                  validation: (rule) =>
                    rule
                      .precision(2)
                      .min(0)
                      .custom((salaryTo, context) => {
                        const salaryFrom = (context.parent as {salaryFrom?: number})?.salaryFrom
                        if (
                          typeof salaryTo === 'number' &&
                          typeof salaryFrom === 'number' &&
                          salaryTo < salaryFrom
                        ) {
                          return 'Maximum salary must be greater than or equal to minimum salary'
                        }
                        return true
                      }),
                }),
                defineField({
                  name: 'isSalaryPerHour',
                  title: 'Is salary per hour',
                  type: 'boolean',
                  initialValue: false,
                }),
                defineField({
                  name: 'aboutPosition',
                  title: 'About position',
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'responsibilities',
                  title: 'Zakres odpowiedzialności',
                  type: 'array',
                  description: 'Each entry will be rendered as a list item (ul).',
                  of: [
                    {
                      type: 'localizedString',
                      name: 'responsibilityItem',
                      title: 'Responsibility',
                    },
                  ],
                  validation: (rule) => rule.required().min(1),
                }),
                defineField({
                  name: 'createdAt',
                  title: 'Created at',
                  type: 'datetime',
                  initialValue: () => new Date().toISOString(),
                  readOnly: true,
                }),
              ],
              preview: {
                select: {
                  title: 'positionName.pl',
                  subtitle: 'team.pl',
                  workLocation: 'workLocation.pl',
                },
                prepare({title, subtitle, workLocation}) {
                  return {
                    title: title || 'Open position',
                    subtitle: [subtitle, workLocation].filter(Boolean).join(' · '),
                  }
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'companySection',
      title: 'Company qualities section',
      type: 'object',
      fields: [
        defineField({
          name: 'preHeading',
          title: 'Pre-heading',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'qualities',
          title: 'Company qualities',
          type: 'array',
          of: [
            defineField({
              name: 'companyQuality',
              title: 'Company quality',
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {title: 'title.pl'},
              },
            }),
          ],
          validation: (rule) => rule.required().min(1),
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return {title: 'Careers page'}
    },
  },
})
