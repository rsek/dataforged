import {
	type TObject,
	type Static,
	type ObjectOptions,
	TypeGuard,
	Type
} from '@sinclair/typebox'

export type DeepPartial<T extends Record<any, any>> = {
	[K in keyof T]?: T[K] extends Record<any, any> ? DeepPartial<T[K]> : T[K]
} // Specialized TObject type that can be passed to TIntersect

export interface TDeepPartial<T extends TObject> extends TObject {
	static: DeepPartial<Static<T>>
}

export function DeepPartial<T extends TObject>(
	schema: T,
	options: ObjectOptions = {}
): TDeepPartial<T> {
	const properties = Object.keys(schema.properties).reduce((acc, key) => {
		const property = schema.properties[key]
		const mapped = TypeGuard.TObject(property)
			? DeepPartial(property)
			: property
		return { ...acc, [key]: Type.Optional(mapped) }
	}, {}) as TDeepPartial<T>['properties']
	return Type.Object(properties, options) as TDeepPartial<T> // required
}
