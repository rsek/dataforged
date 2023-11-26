import { Type, type SchemaOptions, type Static } from '@sinclair/typebox'
import { camelCase } from 'lodash-es'
import { JsonTypeDef } from '../../../json-typedef/symbol.js'
import { type UnionEnumFromRecord } from './UnionEnumFromRecord.js'
import { EnumDescription } from './UnionEnum.js'

/** Extracts a literal from a UnionEnum, plus any associated description. */

export function ExtractLiteralFromEnum<
	T extends ReturnType<typeof UnionEnumFromRecord>,
	K extends Static<T>
>(schema: T, key: K, options: SchemaOptions = {}) {
	const description = schema[EnumDescription][key]
	return Type.Literal<K>(key, {
		[JsonTypeDef]: {
			metadata: {
				typescriptType: `${schema.$id?.split('/').pop()}.${camelCase(key)}`,
				csharpType: `${schema.$id?.split('/').pop()}.${camelCase(key)}`
			}
		},
		description,
		...options
	})
}
