import {
	TypeClone,
	type ObjectOptions,
	type ObjectProperties,
	type Static,
	type TObject
} from '@sinclair/typebox'
import { Nullable, type TNullable } from './Nullable.js'

export function SetNullable<
	T extends TObject,
	K extends Array<keyof Static<T>>
>(schema: T, keys: [...K], options: ObjectOptions = {}) {
	// @ts-expect-error
	const base = TypeClone.Type(schema, options) as TSetNullable<T, K>

	for (const key of keys as Array<keyof T['properties']>) {
		if (!(key in base.properties)) continue
		// @ts-expect-error
		base.properties[key] = Nullable(base.properties[key])
	}

	return base
}

export type TSetNullable<
	T extends TObject,
	K extends Array<keyof Static<T>>
> = TObject<
	Omit<ObjectProperties<T>, K[number]> & {
		[P in K[number]]: TNullable<ObjectProperties<T>[P]>
	}
>
