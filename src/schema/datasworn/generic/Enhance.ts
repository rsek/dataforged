import {
	Type,
	type ObjectOptions,
	type TObject,
	type TSchema,
	type TString
} from '@sinclair/typebox'
import * as Utils from '../Utils.js'

/**
 * Enhances multiple rules elements
 */

export function EnhanceMany<T extends TObject, ID extends TSchema = TString>(
	schema: T,
	wildcardID: ID,
	options: ObjectOptions = {}
) {
	const base = Utils.OmitMeta(schema)
	const mixin = Type.Object({
		enhances: Utils.Nullable(Type.Array(wildcardID), {
			description:
				'An array of wildcard IDs. An item must match one of the wildcard IDs to receive this enhancement. If this is `null`, any ID is valid.'
		})
	})
	return Utils.Assign([mixin, base], options)
}
export type TEnhanceMany<
	T extends TObject,
	ID extends TSchema = TString
> = ReturnType<typeof EnhanceMany<T, ID>>

export type EnhanceMany<T, WildcardID = string> = Utils.OmitMeta<T> & {
	enhances?: WildcardID[]
}
