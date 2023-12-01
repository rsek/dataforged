import { trackID } from './id-tracker.js'
import {
	transform,
	sourcedTransformer,
	type SourceHaver,
	type Transformer,
	recursiveCollectionTransformer
} from './transformer.js'
import type * as SchemaIn from '../types/DataswornSource.js'
import type * as SchemaOut from '../types/Datasworn.js'
import { cloneDeep, merge } from 'lodash-es'

export const OracleTableRow: Transformer<
	SchemaIn.OracleTableRow,
	SchemaOut.OracleTableRow
> = {
	rolls(data, key, parent) {
		return data.rolls as SchemaOut.OracleTableRoll[]
	},
	id(data: SchemaIn.OracleTableRow, key: string | number, parent: SourceHaver) {
		// if the row has a valid range, use that instead of the index
		if (data.max != null && data.min != null) key = `${data.min}-${data.max}`
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
		return data.table.map((row, i) => {
			const rowData =
				data._i18n == null ? row : merge({ i18n: cloneDeep(data._i18n) }, row)

			return transform(rowData, i, this, OracleTableRow)
		})
	}
})

export const OracleCollection = recursiveCollectionTransformer<
	SchemaIn.OracleCollection,
	SchemaOut.OracleCollection,
	typeof OracleTable
>('oracles', OracleTable, {})
