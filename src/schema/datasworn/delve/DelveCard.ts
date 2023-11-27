import { type ObjectOptions } from '@sinclair/typebox'
import { type SetRequired } from 'type-fest'
import * as Generic from '../Generic.js'
import { type Id } from '../common/index.js'
import { TableRowMixin } from '../oracles/TableRow.js'

export function DelveCardRow(
	id: Id.AnyID,
	options: SetRequired<ObjectOptions, '$id'>
) {
	return Generic.IdentifiedNode(id, TableRowMixin, options)
}
