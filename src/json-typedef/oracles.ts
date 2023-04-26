import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'

export const OracleTable: JTDSchemaType<
	Types.Oracles.OracleTable,
	{
		ID: string
		Label: string
		Source: Types.Metadata.Source
		OracleTableRow: Types.Oracles.OracleTableRow
		MarkdownString: string
		OracleTableMatchBehavior: Types.Oracles.OracleTableMatchBehavior
		Suggestions: Types.Metadata.SuggestionsBase
		OracleTableRendering: Types.Oracles.OracleTableRendering
	}
> = {
	properties: {
		id: { ref: 'ID' },
		title: { ref: 'Label' },
		canonical_name: { ref: 'Label' },
		source: { ref: 'Source' },
		table: { elements: { ref: 'OracleTableRow' } }
	},
	optionalProperties: {
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		match: { ref: 'OracleTableMatchBehavior' },
		suggestions: { ref: 'Suggestions' },
		rendering: { ref: 'OracleTableRendering' }
	}
}

export const OracleTableMatchBehavior: JTDSchemaType<
	Types.Oracles.OracleTableMatchBehavior,
	{ MarkdownString: string }
> = {
	properties: {
		text: { ref: 'MarkdownString' }
	}
}

export const OracleTableRow: JTDSchemaType<
	Types.Oracles.OracleTableRow,
	{
		ID: string
		MarkdownString: string
		OracleRollTemplate: Types.Oracles.OracleRollTemplate
		ImageURL: string
		OracleTableRoll: Types.Oracles.OracleTableRoll
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'ID' },
		low: { type: 'uint8', nullable: true },
		high: { type: 'uint8', nullable: true },
		result: { ref: 'MarkdownString' }
	},
	optionalProperties: {
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		template: { ref: 'OracleRollTemplate' },
		icon: { ref: 'ImageURL' },
		rolls: { elements: { ref: 'OracleTableRoll' } },
		embed_table: { ref: 'ID' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const OracleTableRollMethod: JTDSchemaType<Types.Oracles.OracleTableRollMethod> =
	{
		enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse']
	}

export const OracleTableRoll: JTDSchemaType<
	Types.Oracles.OracleTableRoll,
	{ ID: string; OracleTableRollMethod: Types.Oracles.OracleTableRollMethod }
> = {
	properties: {
		oracle: { ref: 'ID' }
	},
	optionalProperties: {
		times: { type: 'uint8' },
		method: { ref: 'OracleTableRollMethod' }
	}
}

export const OracleCollection: JTDSchemaType<
	Types.Oracles.OracleCollection,
	{
		ID: string
		Source: Types.Metadata.Source
		MarkdownString: string
		Suggestions: Types.Metadata.SuggestionsBase
		OracleTable: Types.Oracles.OracleTable
		OracleCollection: Types.Oracles.OracleCollection
		OracleCollectionRendering: Types.Oracles.OracleCollectionRendering
		Label: string
		Color: string
		OracleRollTemplate: Types.Oracles.OracleRollTemplate
	}
> = {
	properties: {
		id: { ref: 'ID' },
		title: { ref: 'Label' },
		canonical_name: { ref: 'Label' },
		source: { ref: 'Source' },
		summary: { ref: 'MarkdownString' },
		contents: { values: { ref: 'OracleTable' } }
	},
	optionalProperties: {
		description: { ref: 'MarkdownString' },
		suggestions: { ref: 'Suggestions' },
		collections: { values: { ref: 'OracleCollection' } },
		rendering: { ref: 'OracleCollectionRendering' },
		color: { ref: 'Color' },
		sample_names: { elements: { ref: 'Label' } },
		template: { ref: 'OracleRollTemplate' }
	}
}

export const OracleCollectionRendering: JTDSchemaType<
	Types.Oracles.OracleCollectionRendering,
	{
		OracleCollectionColumn: Types.Oracles.OracleCollectionColumn
		Color: string
		OracleCollectionStyle: Types.Oracles.OracleCollectionStyle
	}
> = {
	properties: {
		columns: {
			values: { ref: 'OracleCollectionColumn' }
		}
	},
	optionalProperties: {
		color: { ref: 'Color' },
		style: { ref: 'OracleCollectionStyle', nullable: true }
	}
}

export const OracleCollectionColumn: JTDSchemaType<
	Types.Oracles.OracleCollectionColumn,
	{
		OracleColumnContentType: Types.Oracles.OracleColumnContentType
		Color: string
		Label: string
	}
> = {
	properties: {
		content_type: { ref: 'OracleColumnContentType' },
		table_key: { type: 'string' }
	},
	optionalProperties: {
		color: { ref: 'Color' },
		label: { ref: 'Label' }
	}
}

export const OracleTableColumn: JTDSchemaType<
	Types.Oracles.OracleTableColumn,
	{
		OracleColumnContentType: Types.Oracles.OracleColumnContentType
		Label: string
	}
> = {
	properties: {
		content_type: { ref: 'OracleColumnContentType' }
	},
	optionalProperties: {
		label: { ref: 'Label' }
	}
}

export const OracleColumnContentType: JTDSchemaType<Types.Oracles.OracleColumnContentType> =
	{
		enum: ['description', 'range', 'result', 'summary']
	}

export const OracleCollectionStyle: JTDSchemaType<Types.Oracles.OracleCollectionStyle> =
	{
		enum: ['multi_table']
	}

export const OracleRollTemplate: JTDSchemaType<
	Types.Oracles.OracleRollTemplate,
	{ ID: string; TemplateString: string }
> = {
	optionalProperties: {
		result: { ref: 'TemplateString' },
		summary: { ref: 'TemplateString' },
		description: { ref: 'TemplateString' }
	}
}
