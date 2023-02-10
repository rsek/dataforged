import { type SchemaPicker } from '@df-json-schema/clean-types'

export const DF_KEY = /^[a-z][a-z_]*[a-z]$/.source

export function schemaRef<T, IsPartial extends boolean = false>(
	defName: string
): Exclude<SchemaPicker<T, IsPartial>, undefined> {
	// ensures that the schema with the reference behaves
	return { $ref: `#/$defs/${defName}` } as unknown as Exclude<
		SchemaPicker<T, IsPartial>,
		undefined
	>
}
