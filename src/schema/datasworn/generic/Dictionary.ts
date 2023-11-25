import {
	Type,
	type ObjectOptions,
	type TRecord,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import * as Id from '../common/Id.js'

export const DictionaryBrand = Symbol('Dictionary')

/** A dictionary-like object of key/value pairs. */
export function Dictionary<T extends TSchema>(
	schema: T,
	options: ObjectOptions = {}
) {
	const dict = Type.Record(Id.DictKey, schema, {
		...options,
		$comment: 'Deserialize as a dictionary object.',
		[DictionaryBrand]: 'Dictionary'
	}) as TDictionary<T>

	return dict
}
export type TDictionary<T extends TSchema = TSchema> = TRecord<TString, T> & {
	[DictionaryBrand]: 'Dictionary'
}
export type Dictionary<T> = Record<string, T>
