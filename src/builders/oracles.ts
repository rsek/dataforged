import { trackID } from 'builders/id-tracker'
import {
	transform,
	collectionTransformer,
	sourcedTransformer,
	type SourceHaver,
	type Transformer,
	recursiveCollectionTransformer
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

export const OracleCollection = recursiveCollectionTransformer<
	SchemaIn.OracleCollection,
	SchemaOut.OracleCollection,
	typeof OracleTable
>('oracles', OracleTable, {})
