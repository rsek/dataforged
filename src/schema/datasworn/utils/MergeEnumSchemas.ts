import { type SchemaOptions, type Static } from '@sinclair/typebox'
import { UnionEnumFromRecord } from './UnionEnumFromRecord.js'
import { EnumDescription, type TUnionEnum } from './UnionEnum.js'

export function MergeEnumSchemas<T extends Array<TUnionEnum<string[]>>>(
	schemas: [...T],
	options: SchemaOptions = {}
) {
	const entries = schemas
		.map((item) => item[EnumDescription])
		.reduce((prev, cur) => Object.assign(prev, cur)) as {
		[P in Static<T[number]>]: string
	}

	return UnionEnumFromRecord(entries, options)
}
