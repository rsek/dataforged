import { type JSONSchema7 } from 'json-schema'
import _ from 'lodash'
import { dfRecordSchema } from './utils'

const d100Value: JSONSchema7 = {
	type: 'integer',
	minimum: 1,
	maximum: 100
}

const d100Range: JSONSchema7 = {
	type: 'object',
	required: ['floor', 'ceiling'],
	properties: {
		low: _.merge(
			{ description: 'The high end of the dice range for this table row.' },
			d100Value
		),
		high: _.merge(
			{ description: 'The low end of the dice range for this table row.' },
			d100Value
		)
	}
}

const d100RangeNullable: JSONSchema7 = {
	type: d100Range.type,
	required: d100Range.required,
	oneOf: [
		{ properties: d100Range.properties },
		{ properties: { low: { type: 'null' }, high: { type: 'null' } } }
	]
}

export const OracleContentMetadata: JSONSchema7 = {
	type: 'object',
	description:
		"Metadata that describes an oracle's semantic or lexical content.",
	additionalProperties: false,
	properties: {
		part_of_speech: {
			description: 'The part of speech of this oracle.',
			type: 'array',
			items: {
				examples: [
					'adjective',
					'common_noun',
					'compound_noun',
					'fragment',
					'name',
					'noun',
					'plural',
					'possessive_case',
					'proper_noun',
					'proper_noun_fragment',
					'sentences',
					'verb'
				],
				type: 'string'
			}
		},
		tags: {
			description: 'Any arbitrary string tags associated with this oracle.',
			type: 'array',
			items: {
				type: 'string'
			}
		}
	}
}

export const OracleTableRollMethod: JSONSchema7 = {
	description: `
  no_duplicates = Reroll duplicate OracleTableRows
  allow_duplicates = Don't reroll duplicate OracleTableRows
  make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound
  `,
	type: 'string',
	enum: ['no_duplicates', 'allow_duplicates', 'make_it_worse'],
	default: 'no_duplicates'
}

export const OracleTableRoll: JSONSchema7 = {
	description: 'Parameters for an oracle table roll.',
	required: ['table'],
	properties: {
		table: {
			$ref: '#/$defs/OracleTableID'
		},
		times: {
			description: 'The number of times to roll',
			type: 'integer',
			minimum: 1,
			default: 1
		},
		allow_duplicates: {
			description: 'TODO',
			type: 'boolean',
			default: false
		},
		make_it_worse: {
			description: 'TODO',
			type: 'boolean',
			default: false
		}
	}
}

export const OracleRowLike: JSONSchema7 = d100Range

export const OracleTableRowContentMetadata: JSONSchema7 = {}

export const OracleTableRenderMetadata: JSONSchema7 = {}

export const OracleTableRowRenderMetadata: JSONSchema7 = {
	$defs: {
		icon: {
			// TODO
		},
		images: {
			// TODO
		},
		color: {
			// TODO
		},
		embed_table: {
			description:
				'The ID of another oracle table, which should be rendered *within* this table row.',
			// TODO: point to an example in the Ironsworn rulebook
			$ref: '#/$defs/OracleTableID'
		}
	}
}

export const OracleTableRow: JSONSchema7 = _.merge({}, d100RangeNullable, {
	type: 'object',
	required: ['result'],
	additionalProperties: false,
	properties: {
		_id: {
			// TODO
			$ref: '#/$defs/ID'
		},
		low: {
			description: 'The low end of the dice range for this table row.'
		},
		high: {
			description: 'The high end of the dice range for this table row.'
		},
		result: {
			description:
				'The primary result text for the row, annotated in Markdown.\nIn the book, this is frequently the only column aside from the roll column.',
			$ref: '#/$defs/LocalizedMarkdown'
		},
		summary: {
			description:
				"A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).\n\n`null` is used in cases where an 'empty' `OracleTableRow.summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.",
			oneOf: [
				{
					$ref: '#/$defs/MarkdownSentences'
				},
				{
					type: 'null'
				}
			]
		},
		template: {
			description: 'TODO',
			examples: [],
			type: 'object',
			properties: {
				result: {
					$ref: '#/$defs/LocalizedTemplateString'
				},
				summary: {
					$ref: '#/$defs/LocalizedTemplateString'
				},
				description: {
					$ref: '#/$defs/LocalizedTemplateString'
				}
			}
		},
		rolls: {
			type: 'array',
			items: {
				$ref: '#/$defs/OracleTableRoll'
			}
		},
		suggestions: {
			$ref: '#/$defs/Suggestions'
		},
		render: {
			$ref: '#/$defs/RenderMetadata'
		}
	}
})

/**
 * Shared oracle metadata.
 */
export const BaseOracle: JSONSchema7 = {
	required: ['title'],
	properties: {
		title: {
			$ref: '#/$defs/Title'
		},
		source: {
			$ref: '#/$defs/Source'
		},
		summary: {
			$ref: '#/$defs/MarkdownSentences'
		},
		description: {
			$ref: '#/$defs/MarkdownParagraphs'
		}
	}
}

export const OracleCollection: JSONSchema7 = {
	title: 'OracleCollection',
	type: 'object',
	additionalProperties: false,
	properties: {
		title: {
			$ref: '#/$defs/Title'
		},
		source: {
			$ref: '#/$defs/Source'
		},
		summary: {
			$ref: '#/$defs/MarkdownSentences'
		},
		description: {
			$ref: '#/$defs/MarkdownParagraphs'
		},
		_id: {
			type: 'string'
			// TODO: figure out ID type???
		},
		collections: dfRecordSchema('OracleCollection'),
		contents: dfRecordSchema('OracleTable'),
		sample_names: {
			description:
				'A list of sample names for this oracle set. Only used by Planets.',
			type: 'array',
			items: {
				type: 'string'
			}
		}
	}
}
export const OracleTable: JSONSchema7 = _.merge(BaseOracle, {
	type: 'object',
	required: ['table'],
	additionalProperties: false,
	properties: {
		_id: { $ref: '#/$defs/OracleTableID' },
		// content: {},
		icon: { $ref: '#/$defs/Icon' },
		match: {
			title: 'OracleMatchBehaviour',
			type: 'object',
			properties: {
				text: {
					$ref: '#/$defs/LocalizedMarkdown'
				}
			},
			additionalProperties: false,
			required: ['text']
		},
		// requires: {
		//   title: 'OracleRequirements',
		//   type: 'object'
		// },
		render: {
			title: 'OracleTableRenderMetadata',
			type: 'object',
			allOf: [
				{
					$ref: '#/$defs/RenderMetadata'
				},
				{
					additionalProperties: false,
					properties: {
						columns: {
							type: 'object',
							additionalProperties: {
								oneOf: [
									{
										$comment: '#/$defs/TableColumnRoll'
									},
									{
										$comment: '#/$defs/TableColumnText'
									}
								]
							}
						},
						column_of: {
							description:
								"If this oracle's `Table` should be rendered as a column of another table, it's indicated here.\n\nIf `undefined`, this table is rendered as a standalone table.\n\nIf this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.",
							type: 'string'
						},
						embed_in: {
							description:
								'This table is displayed as embedded in a row of another table.',
							type: 'string'
						},
						source: {
							$ref: '#/$defs/Source'
						}
					}
				}
			]
		},
		table: {
			type: 'array',
			items: {
				$ref: '#/$defs/OracleTableRow'
			}
		}
	}
})
