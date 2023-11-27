import { Type, type SchemaOptions, type Static } from '@sinclair/typebox'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'
import { type UnionEnumFromRecord } from './UnionEnumFromRecord.js'
import { EnumDescription } from './UnionEnum.js'
import { pascalCase } from './string.js'

/** Extracts a literal from a UnionEnum, plus any associated description. */

export function ExtractLiteralFromEnum<
	T extends ReturnType<typeof UnionEnumFromRecord>,
	K extends Static<T>
>(schema: T, key: K, options: SchemaOptions = {}) {
	const description = schema[EnumDescription][key]
	return Type.Literal<K>(key, {
		// [JsonTypeDef]: {
		// 	metadata: {
		// 		typescriptType: `${schema.$id?.split('/').pop()}.${pascalCase(key)}`,
		// 		csharpType: `${schema.$id?.split('/').pop()}.${pascalCase(key)}`
		// 	}
		// },
		description,
		...options
	})
}
