import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'
import { toJtdId } from 'json-typedef/utils'
import * as JSONSchema from '@schema-json'

export const OracleTableID = toJtdId(JSONSchema.Oracles.OracleTableID)

export const OracleTable: JTDSchemaType<
	Types.Oracles.OracleTable,
	{
		OracleTableID: string
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
		id: { ref: 'OracleTableID' },
		name: { ref: 'Label' },
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

export const OracleTableRowID = toJtdId(JSONSchema.Oracles.OracleTableRowID)

export const OracleTableRow: JTDSchemaType<
	Types.Oracles.OracleTableRow,
	{
		OracleTableRowID: string
		OracleTableID: string
		MarkdownString: string
		OracleRollTemplate: Types.Oracles.OracleRollTemplate
		SvgImageURL: string
		OracleTableRoll: Types.Oracles.OracleTableRoll
		Suggestions: Types.Metadata.SuggestionsBase
	}
> = {
	properties: {
		id: { ref: 'OracleTableRowID' },
		low: { type: 'uint8', nullable: true },
		high: { type: 'uint8', nullable: true },
		result: { ref: 'MarkdownString' }
	},
	optionalProperties: {
		summary: { ref: 'MarkdownString' },
		description: { ref: 'MarkdownString' },
		template: { ref: 'OracleRollTemplate' },
		icon: { ref: 'SvgImageURL' },
		rolls: { elements: { ref: 'OracleTableRoll' } },
		embed_table: { ref: 'OracleTableID' },
		suggestions: { ref: 'Suggestions' }
	}
}

export const OracleTableRollMethod: JTDSchemaType<Types.Oracles.OracleTableRollMethod> =
	{
		enum: ['no_duplicates', 'keep_duplicates', 'make_it_worse']
	}

export const OracleTableRoll: JTDSchemaType<
	Types.Oracles.OracleTableRoll,
	{
		OracleTableID: string
		OracleTableRollMethod: Types.Oracles.OracleTableRollMethod
	}
> = {
	properties: {
		oracle: { ref: 'OracleTableID' }
	},
	optionalProperties: {
		times: { type: 'uint8' },
		method: { ref: 'OracleTableRollMethod' }
	}
}

export const OracleCollectionID = toJtdId(JSONSchema.Oracles.OracleCollectionID)

export const OracleCollection: JTDSchemaType<
	Types.Oracles.OracleCollection,
	{
		OracleCollectionID: string
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
		id: { ref: 'OracleCollectionID' },
		name: { ref: 'Label' },
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
	{ TemplateString: string }
> = {
	optionalProperties: {
		result: { ref: 'TemplateString' },
		summary: { ref: 'TemplateString' },
		description: { ref: 'TemplateString' }
	}
}

export const OracleTableRendering: JTDSchemaType<
	Types.Oracles.OracleTableRendering,
	{
		Color: string
		OracleTableColumn: Types.Oracles.OracleTableColumn
		OracleTableStyle: Types.Oracles.OracleTableStyle
		SvgImageURL: string
	}
> = {
	optionalProperties: {
		color: { ref: 'Color' },
		columns: { values: { ref: 'OracleTableColumn' } },
		style: { ref: 'OracleTableStyle' },
		icon: { ref: 'SvgImageURL' }
	}
}

export const OracleTableStyle: JTDSchemaType<Types.Oracles.OracleTableStyle> = {
	enum: ['embed_as_column', 'embed_in_row', 'table']
}
