import { Source } from 'builders/metadata'
import { mapValues, omitBy } from 'lodash'
import type * as Schema from 'schema'
import { type RecursiveCollection } from 'schema/common/abstract'
import { type OracleCollectionRendering } from 'schema/oracles'
import {
	type SourcebookClassic,
	type SourcebookStarforged
} from 'schema/sourcebooks'
import type * as SourceData from 'types/input/starforged'

function hasID(object: unknown): object is { id: string } {
	return typeof (object as any)?.id === 'string'
}

export abstract class IDBuilder<
	TSourceData extends {
		id?: string
	},
	TParent extends { id: string }
> {
	abstract get id(): string

	toObject() {
		return omitBy(this, (v, k) => k.startsWith('_'))
	}

	constructor(data: TSourceData, key: string, parent: TParent) {
		this._data = data
		this._parent = parent
		this._key = key
		Object.assign(data, this)
	}

	readonly _data: TSourceData
	readonly _parent: TParent
	readonly _key: string
}

export abstract class SourceBuilder<
	TSourceData extends {
		id?: string
		_source?: Partial<Schema.Source>
		source?: Schema.Source
	},
	TParent extends { id: string; source: Schema.Source } = {
		id: string
		source: Schema.Source
	}
> extends IDBuilder<TSourceData, TParent> {
	source: Source
	abstract get id(): string

	constructor(data: TSourceData, key: string, parent: TParent) {
		super(data, key, parent)
		this.source = new Source(parent.source, data.source ?? data._source ?? {})
	}
}

// TODO:
// make this recurse over the collections; it'll probably need to take a class as a parameter in order to do so
// and have it pull in defaults from the schema
// validate the final toObject() with the schema (bonus points: have it validate the incoming data, too,)
// this might mean composing this with a function?
export abstract class CollectionBuilder<T>
	extends SourceBuilder<Partial<RecursiveCollection<T>>>
	implements RecursiveCollection<any>
{
	abstract get _collectionType(): string

	override get id() {
		if (this._parent.id.includes('/collections/'))
			return `${this._parent.id}/${this._key}`
		else
			return `${this._parent.id}/collections/${this._collectionType}/${this._key}`
	}

	declare source: Source
	declare extends?: string
	declare name: string
	declare canonical_name?: string
	declare suggestions?: Record<
		'oracles' | 'moves' | 'assets' | 'encounters',
		string[]
	>

	declare color?: string
	declare summary?: string
	declare description?: string
	declare images?: string[]
	declare contents?: Record<string, T>
	declare collections?: Record<string, this>
}

export class OracleCollection
	extends SourceBuilder<SourceData.OracleCollection>
	implements Schema.Oracles.OracleCollection
{
	override get id(): string {
		if (this._parent instanceof OracleCollection)
			return `${this._parent.id}/${this._key}`
		else return `${this._parent.id}/collections/oracles/${this._key}`
	}

	declare source: Source
	extends?: string
	declare name: string
	canonical_name?: string
	suggestions?: Record<'oracles' | 'moves' | 'assets' | 'encounters', string[]>
	color?: string
	summary?: string
	description?: string
	rendering?: OracleCollectionRendering
	images?: string[]
	sample_names?: string[]
	contents?: Record<string, OracleTable>
	collections?: Record<string, OracleCollection>

	constructor(
		data: SourceData.OracleCollection,
		key: string,
		parent: { id: string; source: SourceData.Source }
	) {
		super(data, key, parent)
		if (data.collections != null) {
			this.collections = mapValues(
				data.collections,
				(v, k) => new OracleCollection(v, k, this)
			)
		}
		if (data.contents != null) {
			this.contents = mapValues(
				data.contents,
				(v, k) => new OracleTable(v, k, this)
			)
		}
	}
}

export class OracleTable
	extends SourceBuilder<SourceData.OracleTable, OracleCollection>
	implements Schema.Oracles.OracleTable
{
	get id(): string {
		return this._parent.id.replace('/collections/', '/') + this._key
	}

	name!: string
	canonical_name?: string
	suggestions?: Record<'oracles' | 'moves' | 'assets' | 'encounters', string[]>
	summary?: string
	description?: string
	match?: { text: string }

	table!: OracleTableRow[]
	// rendering?: OracleTableRendering

	constructor(
		data: SourceData.OracleTable,
		key: string,
		parent: OracleCollection
	) {
		super(data, key, parent)
		this.table = data.table.map(
			(row, index) => new OracleTableRow(row, index.toString(), this)
		)
	}
}

export class OracleTableRow
	extends IDBuilder<SourceData.OracleTableRow, OracleTable>
	implements Schema.Oracles.OracleTableRow
{
	description?: string | undefined
	summary?: string | undefined
	icon?: string | undefined
	rolls?:
		| Array<{
				oracle?: string | undefined
				times?: number | undefined
				method?:
					| 'no_duplicates'
					| 'keep_duplicates'
					| 'make_it_worse'
					| undefined
		  }>
		| undefined

	suggestions?: Record<'oracles' | 'moves' | 'assets' | 'encounters', string[]>

	embed_table?: string | undefined
	template?:
		| {
				description?: string | undefined
				result?: string | undefined
				summary?: string | undefined
		  }
		| undefined

	result!: string
	low!: number | null
	high!: number | null

	get id(): string {
		if (this.low == null && this.high == null) {
			return this._parent.id + '/' + this._key
		} else {
			return `${this._parent.id}/${this.low as number}-${this.high as number}`
		}
	}
}
