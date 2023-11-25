import {
	Type,
	TypeClone,
	type ObjectOptions,
	type ObjectProperties,
	type ObjectPropertyKeys,
	type TObject,
	type TSchema
} from '@sinclair/typebox'

export function Assign<T extends [TObject, TObject]>(
	objects: [...T],
	options: ObjectOptions = {}
) {
	const [obj1, obj2] = objects
	const keysA = Object.keys(obj1.properties)
	const keysB = Object.keys(obj2.properties)
	const keys = Array.from(new Set([...keysA, ...keysB]))

	// if (log) console.log(obj2)
	const properties = {} as Record<string, TSchema>

	for (const key of keys) {
		const target = keysA.includes(key) ? obj1 : obj2
		properties[key] = TypeClone.Type(Type.Index(target, [key])) as any
	}

	// console.log(properties)
	const result = Type.Object(properties, options) as TAssign<T>

	// if (log) console.log(result)
	return result
}
export type TAssign<T extends [TObject, TObject]> = TObject<
	Omit<ObjectProperties<T[0]>, ObjectPropertyKeys<T[1]>> &
		ObjectProperties<T[1]>
>

export type Assign<A extends object, B extends object> = Omit<A, keyof B> & B
