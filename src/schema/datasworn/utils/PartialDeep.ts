import {
	Type,
	TypeGuard,
	type AssertRest,
	type AssertType,
	type Evaluate,
	type TIntersect,
	type TObject,
	type TPartial,
	type TProperties,
	type TSchema,
	type TUnion,
	type SchemaOptions
} from '@sinclair/typebox'

// -------------------------------------------------------------------------------------
// TDeepPartial
// -------------------------------------------------------------------------------------
export type TPartialDeepProperties<T extends TProperties> = {
	[K in keyof T]: TPartial<T[K]>
}
export type TPartialDeepRest<T extends TSchema[]> = T extends [
	infer L,
	...infer R
]
	? [TPartial<AssertType<L>>, ...TPartialDeepRest<AssertRest<R>>]
	: []
export type TPartialDeep<T extends TSchema> = T extends TIntersect<infer S>
	? TIntersect<TPartialDeepRest<S>>
	: T extends TUnion<infer S>
	  ? TUnion<TPartialDeepRest<S>>
	  : T extends TObject<infer S>
	    ? TPartial<TObject<Evaluate<TPartialDeepProperties<S>>>>
	    : T
// -------------------------------------------------------------------------------------
// DeepPartial
// -------------------------------------------------------------------------------------
function PartialDeepProperties<T extends TProperties>(properties: T) {
	return Object.getOwnPropertyNames(properties).reduce<TProperties>(
		(acc, key) => {
			return { ...acc, [key]: Type.Partial(properties[key]) }
		},
		{}
	)
}
function PartialDeepRest<T extends TSchema[]>(
	rest: [...T]
): TPartialDeepRest<T> {
	const [L, ...R] = rest
	return R.length > 0 ? [Type.Partial(L), ...PartialDeepRest(R)] : ([] as any)
}
/** Maps the given schema as deep partial, making all properties and sub properties optional */
export function PartialDeep<T extends TSchema>(
	type: T,
	options: SchemaOptions = {}
): TPartialDeep<T> {
	return (
		TypeGuard.TIntersect(type)
			? Type.Intersect(PartialDeepRest(type.allOf), options)
			: TypeGuard.TUnion(type)
			  ? Type.Union(PartialDeepRest(type.anyOf), options)
			  : TypeGuard.TObject(type)
			    ? Type.Partial(
							Type.Object(PartialDeepProperties(type.properties)),
							options
			      )
			    : type
	) as any
}
