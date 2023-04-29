import * as Types from '@base-types'
import {
	Abstract,
	Collections,
	Localize,
	Metadata,
	type Utils
} from '@class-schema'
import { IsRecord } from 'class-schema/collections'
import { IsLabel } from 'class-schema/localize'
import {
	IsEnum,
	IsHexColor,
	IsInstance,
	IsInt,
	IsOptional,
	Max,
	Min,
	type ValidationOptions
} from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import { DF_KEY } from '@schema-json/common'

export abstract class Range<
	Low extends number | null = number | null,
	High extends number | null = number | null
> implements Types.Abstract.Range
{
	@IsInt()
	@Min(1)
	@Max(100)
	low: Low

	@IsInt()
	@Min(1)
	@Max(100)
	high: High

	constructor(data: Types.Abstract.Range<Low, High>) {
		this.low = data.low
		this.high = data.high
	}
}

export enum OracleTableRollMethod {
	NoDuplicates = 'no_duplicates',
	KeepDuplicates = 'keep_duplicates',
	MakeItWorse = 'make_it_worse'
}

export function IsOracleTableRollMethod() {
	return IsEnum(OracleTableRollMethod)
}

export class OracleTableRoll implements Types.Oracles.OracleTableRoll {
	@Metadata.IsOracleTableRowID()
	oracle: string

	@IsInt()
	@IsOptional()
	times?: number | undefined

	@IsOracleTableRollMethod()
	@IsOptional()
	method?: OracleTableRollMethod | undefined

	constructor(data: Types.Oracles.OracleTableRoll) {
		this.oracle = data.oracle
		this.times = data.times
		if (data.method != null) this.method = data.method as OracleTableRollMethod
	}
}

export class OracleTableRow<
		Low extends number | null = number | null,
		High extends number | null = number | null
	>
	extends Range<Low, High>
	implements Types.Oracles.OracleTableRow<Low, High>
{
	@Metadata.IsOracleTableRowID()
	id: string

	@Localize.IsMarkdownPhrase()
	result: string

	@Localize.IsMarkdownSentences()
	@IsOptional()
	summary?: string | undefined

	@IsOptional()
	@IsInstance(OracleTableRoll, { each: true })
	rolls?: OracleTableRoll[]

	@IsInstance(Metadata.SuggestionsBase)
	@IsOptional()
	suggestions?: Metadata.SuggestionsBase | undefined

	@Metadata.IsOracleTableID()
	@IsOptional()
	embed_table?: string | undefined

	constructor(
		data: Utils.YamlInput<Types.Oracles.OracleTableRow<Low, High>>,
		oracleTable: Types.Oracles.OracleTable,
		rowIndex: number
	) {
		super({ low: data.low, high: data.high })
		this.id = `${oracleTable.id}/${rowIndex}`
		this.result = data.result
		this.summary = data.summary
		if (data.rolls != null)
			this.rolls = data.rolls.map((roll) => new OracleTableRoll(roll))
	}
}

export class OracleTable
	extends Abstract.Node
	implements Types.Oracles.OracleTable
{
	@Metadata.IsOracleTableID()
	// handled by super
	id!: string

	name: string
	canonical_name?: string

	@Localize.IsMarkdownSentences()
	@IsOptional()
	summary?: string | undefined

	@Localize.IsMarkdownParagraphs()
	@IsOptional()
	description?: string | undefined

	@IsOptional()
	match?: OracleTableMatchBehavior | undefined

	@IsInstance(OracleTableRow, { each: true })
	table: OracleTableRow[]

	@IsOptional()
	rendering?: OracleTableRendering | undefined

	@IsOptional()
	suggestions?: Metadata.SuggestionsBase | undefined

	constructor(
		data: Utils.YamlInput<Types.Oracles.OracleTable>,
		id: string,
		collection: Types.Oracles.OracleCollection
	) {
		super(data, id, collection.source)
		this.name = data.name
		this.canonical_name = data.canonical_name ?? data.name
		this.summary = data.summary
		this.description = data.description
		if (data.match != null)
			this.match = new OracleTableMatchBehavior(data.match)
		if (data.rendering != null)
			this.rendering = new OracleTableRendering(data.rendering)
		if (data.suggestions != null)
			this.suggestions = new Metadata.SuggestionsBase(data.suggestions)
		this.table = data.table.map(
			(row, index) => new OracleTableRow(row, this, index)
		)
	}
}

@JSONSchema({
	description: 'A handful of oracles have special behavior on a match.'
})
export class OracleTableMatchBehavior
	implements Types.Oracles.OracleTableMatchBehavior
{
	@Localize.IsMarkdownSentences()
	text: string

	constructor(data: Types.Oracles.OracleTableMatchBehavior) {
		this.text = data.text
	}
}

export enum OracleTableStyle {
	Table = 'table',
	EmbedAsColumn = 'embed_as_column',
	EmbedInRow = 'embed_in_row'
}

export function IsOracleTableStyle(validationOptions?: ValidationOptions) {
	return IsEnum(OracleTableStyle, validationOptions)
}

export class OracleTableRendering
	implements Types.Oracles.OracleTableRendering
{
	@Metadata.IsIcon()
	@IsOptional()
	icon?: Types.Metadata.SvgImageUrl

	@JSONSchema({
		description: `The style used to render this table in the source material.

      * embed_as_column: This table appears as a column of a table handled by its OracleCollection parent.
      * embed_in_row: This table appears in its entirety within the row of another table. Canonical examples appear in the Ironsworn Rulebook and Ironsworn: Delve.
      * table: A standard table, typically with a roll column and a result column.`
	})
	@IsOracleTableStyle()
	@IsOptional()
	style?: OracleTableStyle

	@IsOptional()
	@IsHexColor()
	color?: Types.Metadata.Color

	constructor(data: Types.Oracles.OracleTableRendering) {
		this.icon = data.icon
		this.style = data.style as OracleTableStyle | undefined
		this.color = data.color
	}
}

export enum OracleColumnContentType {
	Range = 'range',
	Result = 'result',
	Summary = 'summary',
	Description = 'description'
}

export class OracleTableColumn implements Types.Oracles.OracleTableColumn {
	@IsLabel()
	@IsOptional()
	label?: string | undefined

	@IsEnum(OracleColumnContentType)
	content_type: OracleColumnContentType

	constructor(data: Types.Oracles.OracleTableColumn) {
		this.label = data.label
		this.content_type = data.content_type as OracleColumnContentType
	}
}

export class OracleCollectionRendering
	implements Types.Abstract.OracleCollectionRendering
{
	columns: Record<
		string,
		Types.Oracles.OracleCollectionColumn<Types.Oracles.OracleTableColumn>
	>

	@IsOptional()
	style?: 'multi_table' | null | undefined

	@IsOptional()
	@IsHexColor()
	color?: string | undefined

	constructor(data: Types.Abstract.OracleCollectionRendering) {
		this.style = data.style ?? null
		this.columns = data.columns
		this.color = data.color
	}
}

export class OracleCollection
	extends Collections.Collection<Types.Oracles.OracleTable>
	implements Types.Abstract.OracleCollection
{
	@IsRecord(OracleTable, new RegExp(DF_KEY))
	contents: Record<string, Types.Oracles.OracleTable> = {}

	@IsOptional()
	rendering?: Types.Abstract.OracleCollectionRendering | undefined

	@IsOptional()
	collections?: Record<string, OracleCollection> | undefined

	@Metadata.IsOracleCollectionID()
	id!: string

	constructor(
		data: Utils.YamlInput<Types.Abstract.OracleCollection>,
		id: Types.Abstract.OracleCollectionID,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		if (data.rendering != null)
			this.rendering = new OracleCollectionRendering(data.rendering)
	}
}
