import { trackID } from 'builders/id-tracker'
import {
	transform,
	collectionTransformer,
	sourcedTransformer,
	type SourceHaver,
	type Transformer
} from 'builders/transformer'
import { mapValues } from 'lodash'
import type * as SchemaIn from 'types/input/starforged'
import type * as SchemaOut from 'types/output/starforged'

export const OracleTableRow: Transformer<
	SchemaIn.OracleTableRow,
	SchemaOut.OracleTableRow
> = {
	id(data: SchemaIn.OracleTableRow, key: string | number, parent: SourceHaver) {
		// if the row has a valid range, use that instead of the index
		if (data.high != null && data.low != null) key = `${data.low}-${data.high}`
		const id = `${parent.id}/${key}`

		return trackID(id)
	}
}

export const OracleTable = sourcedTransformer<
	SchemaIn.OracleTable,
	SchemaOut.OracleTable
>({
	table: function (
		this: SourceHaver,
		data: SchemaIn.OracleTable,
		key: string | number,
		parent: SourceHaver
	): SchemaOut.OracleTableRow[] {
		return data.table.map((row, i) => transform(row, i, this, OracleTableRow))
	}
})

export const OracleCollection = collectionTransformer<
	SchemaIn.OracleCollection,
	SchemaOut.OracleCollection
>('oracles', OracleTable, {
	collections: function (
		this: SourceHaver,
		data: SchemaIn.OracleCollection,
		key: string | number,
		parent: SourceHaver
	): Record<string, SchemaOut.OracleCollection> | undefined {
		if (data.collections == null) return undefined
		return mapValues(data.collections, (v, k) =>
			transform(v, k, this, OracleCollection)
		)
	}
})
