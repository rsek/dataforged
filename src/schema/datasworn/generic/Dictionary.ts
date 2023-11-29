import {
	Type,
	type ObjectOptions,
	type TRecord,
	type TSchema,
	type TString,
	type Static
} from '@sinclair/typebox'
import * as Id from '../common/Id.js'

export const DictionaryBrand = Symbol('Dictionary')

/** A dictionary-like object of key/value pairs. */
export function Dictionary<T extends TSchema>(
	schema: T,
	options: ObjectOptions = {}
) {
	const dict =
		// Type.Transform(
		Type.Record(Id.DictKey, schema, {
			...options,
			$comment: 'Deserialize as a dictionary object.',
			[DictionaryBrand]: 'Dictionary'
		}) as TDictionary<T>
	// )
	// .Decode((value) => new Map<string, Static<T>>(Object.entries(value)))
	// .Encode((value) => Object.fromEntries(Array.from(value.entries())))

	return dict
}
export type TDictionary<T extends TSchema = TSchema> = TRecord<TString, T> & {
	[DictionaryBrand]: 'Dictionary'
}
export type Dictionary<T> = Record<string, T>
