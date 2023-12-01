import { trackID } from './id-tracker.js'
import {
	transform,
	sourcedTransformer,
	type Transformer,
	recursiveCollectionTransformer
} from './transformer.js'
import { type SourcedNode } from '../schema/datasworn/generic/SourcedNode.js'

import { cloneDeep, merge } from 'lodash-es'
import type { Datasworn, DataswornSource } from '../types/index.js'

export const OracleTableRow: Transformer<
	DataswornSource.OracleTableRow,
	Datasworn.OracleTableRow,
	Datasworn.OracleTable
> = {
	rolls(data, key, parent) {
		return data.rolls as Datasworn.OracleTableRoll[]
	},
	id(
		data: DataswornSource.OracleTableRow,
		key: string | number,
		parent: SourcedNode
	) {
		// if the row has a valid range, use that instead of the index
		if (data.max != null && data.min != null) key = `${data.min}-${data.max}`
		const id = `${parent.id}/${key}`

		return trackID(id)
	}
}

export const OracleTable = sourcedTransformer<
	DataswornSource.OracleTable,
	Datasworn.OracleTable,
	Datasworn.OracleCollection
>({
	table: function (
		this: SourcedNode,
		data: DataswornSource.OracleTable,
		key: string | number,
		parent: SourcedNode
	): Datasworn.OracleTableRow[] {
		return data.table.map((row, i) => {
			const rowData =
				data._i18n == null ? row : merge({ i18n: cloneDeep(data._i18n) }, row)

			return transform(rowData, i, this, OracleTableRow)
		})
	}
})

export const OracleCollection = recursiveCollectionTransformer<
	DataswornSource.OracleCollection,
	Datasworn.OracleCollection,
	null,
	typeof OracleTable
>('oracles', OracleTable, {})
