import { type JSONSchemaType as Schema } from 'ajv'
import { DF_KEY, dictionarySchema, refSchema } from './common'
import type * as Types from '@base-types'
import * as JsonSchema from '@schema-json'
export const OracleCollectionID: Schema<Types.Oracles.OracleCollectionID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/collections\/oracles(\/[a-z_]+){1,3}$/.source,
	examples: [
		'starforged/collections/oracles/core',
		'starforged/collections/oracles/character/names',
		'starforged/collections/oracles/planets/furnace/settlements'
	]
}

export const OracleTableID: Schema<Types.Oracles.OracleTableID> = {
	type: 'string',
	$comment: '{namespace}/oracles/{...collections}/{oracle}',
	pattern: /^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}$/.source,
	examples: [
		'starforged/oracles/core/action',
		'starforged/oracles/character/names/given',
		'starforged/oracles/planets/furnace/settlements/terminus'
	]
}

export const OracleTableColumn: Schema<Types.Oracles.OracleTableColumn> = {
	type: 'object',
	required: ['content_type'],
	additionalProperties: false,
	properties: {
		content_type: {
			type: 'string',
			description: `'range' displays the number range: 'low' to 'high'.\n\n'result', 'summary', and 'description' display the string value from the OracleTableRow's corresponding key.`,
			enum: ['result', 'summary', 'description', 'range']
		},
		label: refSchema<Types.Localize.Label>('Label')
	},
	oneOf: [
		{
			title: 'OracleTableColumnRoll',
			properties: {
				content_type: { const: 'range' },
				label: {
					...refSchema<Types.Localize.Label>('Label'),
					default: 'Roll'
				}
			}
		},
		{
			title: 'OracleTableColumnResult',
			properties: {
				content_type: { const: 'result' },
				label: {
					...refSchema<Types.Localize.Label>('Label'),
					default: 'Result'
				}
			}
		},
		{
			title: 'OracleTableColumnSummary',
			properties: {
				content_type: { const: 'summary' },
				label: {
					...refSchema<Types.Localize.Label>('Label'),
					default: 'Summary'
				}
			}
		},
		{
			title: 'OracleTableColumnDescription',
			properties: {
				content_type: { const: 'description' },
				label: {
					...refSchema<Types.Localize.Label>('Label'),
					default: 'Description'
				}
			}
		}
	]
}

export const OracleCollectionColumn: Schema<
	Types.Oracles.OracleCollectionColumn<Types.Oracles.OracleTableColumn>
> = {
	type: 'object',
	required: ['content_type', 'table_key'],
	additionalProperties: false,
	properties: {
		...OracleTableColumn.properties,
		table_key: {
			description:
				"A key from OracleCollection#contents, indicating which OracleTable's data is used in this column.",
			type: 'string',
			pattern: DF_KEY
		},
		color: refSchema<Types.Metadata.Color>('Color')
	},
	oneOf: OracleTableColumn.oneOf
}

const oracleTableRenderDefault: Types.Oracles.OracleTableRendering = {
	style: 'table',
	columns: {
		roll: { content_type: 'range', label: 'Roll' },
		result: { content_type: 'result', label: 'Result' }
	}
}

export const OracleTableRendering: Schema<Types.Oracles.OracleTableRendering> =
	{
		type: 'object',
		additionalProperties: false,
		default: oracleTableRenderDefault,
		properties: {
			style: {
				type: 'string',
				description: `The style used to render this table in the source material.

        * embed_as_column: This table appears as a column of a table handled by its OracleCollection parent.
        * embed_in_row: This table appears in its entirety within the row of another table. Canonical examples appear in the Ironsworn Rulebook and Ironsworn: Delve.
        * table: A standard table, typically with a roll column and a result column.
        `,
				enum: ['embed_as_column', 'embed_in_row', 'table'],
				default: oracleTableRenderDefault.style,
				nullable: undefined as any
			},

			icon: { $ref: '#/definitions/Icon' },
			color: { $ref: '#/definitions/Color' },
			columns: {
				type: 'object',
				required: undefined as any,
				patternProperties: {
					[DF_KEY]:
						refSchema<Types.Oracles.OracleTableColumn>('OracleTableColumn')
				},
				default: oracleTableRenderDefault.columns,
				nullable: undefined as any
			}
		}
	}

export const OracleTable: Schema<Types.Oracles.OracleTable> = {
	type: 'object',
	required: ['id', 'name', 'source', 'table'],
	additionalProperties: false,
	properties: {
		id: { $ref: '#/definitions/OracleTableID' },
		name: { $ref: '#/definitions/Label' },
		canonical_name: { $ref: '#/definitions/Label' },
		source: refSchema<Types.Metadata.Source>('Source'),
		summary: { $ref: '#/definitions/MarkdownString' },
		description: { $ref: '#/definitions/MarkdownString' },
		suggestions: { $ref: '#/definitions/Suggestions' },
		rendering: { $ref: '#/definitions/OracleTableRendering' },
		match: {
			title: 'Oracle match behavior',
			description: 'A handful of oracles have special behavior on a match.',
			type: 'object',
			required: ['text'],
			properties: { text: { $ref: '#/definitions/MarkdownString' } },
			nullable: undefined as any
		},
		table: {
			type: 'array',
			items: refSchema<Types.Oracles.OracleTableRow>('OracleTableRow')
		}
	}
}

export const OracleTableRoll: Schema<Types.Oracles.OracleTableRoll> = {
	type: 'object',
	description: 'Parameters for an oracle roll.',
	properties: {
		oracle: {
			default: null,
			oneOf: [
				{ type: 'null' },
				refSchema<Types.Oracles.OracleTableID>('OracleTableID')
			],
			nullable: undefined as any
		},
		times: {
			description: 'The number of times to roll.',
			type: 'integer',
			minimum: 1,
			default: 1,
			nullable: undefined as any
		},
		method: refSchema<Types.Oracles.OracleTableRollMethod>(
			'OracleTableRollMethod'
		)
	}
}

export const OracleTableRollMethod: Schema<Types.Oracles.OracleTableRollMethod> =
	{
		description: `
  no_duplicates = Reroll duplicate OracleTableRows
  allow_duplicates = Don't reroll duplicate OracleTableRows
  make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound.
  `,
		type: 'string',
		enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse'],
		default: 'no_duplicates'
	}

export const OracleTableRowID: Schema<Types.Oracles.OracleTableRowID> = {
	type: 'string',
	pattern: /^[a-z0-9_]{3,}\/oracles(\/[a-z_]+){2,4}\/[0-9]{1,3}-[0-9]{1,3}$/
		.source,
	examples: ['classic/oracles/action_and_theme/action/1-1']
}

export const OracleTableRow: Schema<Types.Oracles.OracleTableRow> = {
	type: 'object',
	description: 'Represents a row from an oracle table.',
	required: ['id', 'low', 'high', 'result'],
	additionalProperties: false,
	properties: {
		low: {
			description: "The low end of this row's roll range",
			minimum: 1,
			maximum: 100,
			type: ['integer', 'null'] as any
		},
		high: {
			description: "The high end of this row's roll range",
			minimum: 1,
			maximum: 100,
			type: ['integer', 'null'] as any
		},
		result: {
			title: 'Result text',
			...refSchema<Types.Localize.MarkdownString>('MarkdownString')
		},
		icon: refSchema<Types.Metadata.SvgImageUrl>('Icon'),
		summary: {
			...refSchema<Types.Localize.MarkdownString>('MarkdownString'),
			title: 'Summary text',
			description:
				"A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).\n\n`null` is used in cases where an 'empty' `OracleTableRow#summary` exists (example: Starship Type, Starforged rulebook p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.",
			type: 'string',
			nullable: true
		},
		description: {
			...refSchema<Types.Localize.MarkdownString>('MarkdownString'),
			title: 'Extended description',
			description:
				'An extended description for this oracle table row. No canonical OracleTableRows use it, but some TruthOptions do.'
		},
		embed_table: {
			...refSchema<Types.Oracles.OracleTableID>('OracleTableID'),
			description: 'A table to be rendered inside this table row.'
		},
		rolls: {
			type: 'array',
			items: refSchema<Types.Oracles.OracleTableRoll>('OracleTableRoll'),
			nullable: true
		},
		template: refSchema<Types.Oracles.OracleRollTemplate>('OracleRollTemplate'),
		suggestions: refSchema<Types.Metadata.SuggestionsBase>('Suggestions'),
		id: refSchema<Types.Oracles.OracleTableRowID>('OracleTableRowID')
	},
	oneOf: [
		{
			title: 'OracleTableRowStub',
			properties: {
				low: { const: null },
				high: { const: null }
			}
		},
		{
			properties: {
				low: { type: 'integer' },
				high: { type: 'integer' }
			}
		}
	]
}

export const OracleRollTemplate: Schema<Types.Oracles.OracleRollTemplate> = {
	type: 'object',
	description: `Provides string templates that may be used in place of the static row text from \`OracleTableRow#result\`, \`OracleTableRow#summary\`, and \`OracleTableRow#description\`.

These strings are formatted in Markdown, but use a special syntax for their placeholders: \`{{result:some_oracle_table_id}}\`. The placeholder should be replaced with the value of a rolled (or selected) \`OracleTableRow#result\` from the target oracle table ID.`,
	properties: {
		result: {
			...refSchema<Types.Localize.MarkdownString>('MarkdownString'),
			description:
				'A string template that may be used in place of OracleTableRow#result.',
			examples: [
				'{{result:starforged/oracles/factions/affiliation}} of the {{result:starforged/oracles/factions/legacy}} {{result:starforged/oracles/factions/identity}}'
			]
		},
		summary: {
			...refSchema<Types.Localize.MarkdownString>('MarkdownString'),
			description:
				'A string template that may be used in place of OracleTableRow#summary.'
		},
		description: {
			...refSchema<Types.Localize.MarkdownString>('MarkdownString'),
			description:
				'A string template that may be used in place of OracleTableRow#description.'
		}
	}
}

export const OracleCollection: Schema<Types.Oracles.OracleCollection> =
	JsonSchema.Abstract.collectionSchema<Types.Oracles.OracleCollection>(
		'OracleTable',
		'OracleCollectionID',
		{
			additionalProperties: false,
			properties: {
				// template:
				// 	refSchema<Types.Oracles.OracleRollTemplate>('OracleRollTemplate'),
				rendering: {
					type: 'object',
					description:
						'Some oracle collections are rendered as a single table in the source material. If so, parameters for rendering that table are included here.',
					properties: {
						icon: refSchema<Types.Metadata.SvgImageUrl>('Icon'),
						style: {
							oneOf: [
								{ enum: ['multi_table'], type: 'string' },
								{ type: 'null' }
							],
							default: null
						},
						columns: {
							type: 'object',
							patternProperties: {
								[DF_KEY]: {
									description:
										"A column's default label is the title of the source table.",
									$ref: '#/definitions/OracleCollectionColumn'
								}
							}
						}
					}
				},
				sample_names: { type: 'array', items: { type: 'string' } },
				collections: dictionarySchema(
					refSchema<Types.Oracles.OracleCollection>(`OracleCollection`),
					{
						description: 'OracleCollections contained by this OracleCollection.'
					}
				)
			}
		}
	)

// export const OracleCollectionExtension: Schema<Types.Oracles.OracleCollectionExtension> =
// 	JsonSchema.Abstract.collectionExtensionSchema(
// 		'OracleTable',
// 		'OracleCollectionID',
// 		{
// 			required: ['extends', 'id'],
// 			...maybeTemplate,
// 			properties: {
// 				source: refSchema('Source'),
// 				collections: {
// 					type: 'object',
// 					description: `Collections (and/or collection extensions) to be added to the extended collection.`,
// 					patternProperties: {
// 						[DF_KEY]: {
// 							oneOf: [
// 								refSchema<Types.Oracles.OracleCollection>(`OracleCollection`),
// 								refSchema<Types.Oracles.OracleCollectionExtension>(
// 									`OracleCollectionExtension`
// 								)
// 							]
// 						}
// 					}
// 				}
// 			}
// 		}
// 	)
