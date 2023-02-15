import { type SchemaPicker } from '@schema-json/clean-types'

export const DF_KEY = /^[a-z][a-z_]*[a-z]$/.source

export function schemaRef<T, IsPartial extends boolean = false>(
	defName: string
): Exclude<SchemaPicker<T, IsPartial>, undefined> {
	// ensures that the schema with the reference behaves
	return { $ref: `#/definitions/${defName}` } as unknown as Exclude<
		SchemaPicker<T, IsPartial>,
		undefined
	>
}
