import { TypeClone, type SchemaOptions, type TSchema } from '@sinclair/typebox'
import { mapValues } from 'lodash-es'
import { SourceData } from './SourceData.js'

export type SchemaDefs = Record<string, TSchema>

export interface RootOptions
	extends Required<
		Omit<SchemaOptions, 'default' | 'readOnly' | 'writeOnly' | 'examples'>
	> {
	$id: `${'https' | 'http'}://${string}`
	$defs: SchemaDefs
	$schema: string
}

export type TRoot<
	T extends TSchema = TSchema,
	Options extends RootOptions = RootOptions
> = T & Options

export function SchemaRoot<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		TypeClone.Type(v, { title: k })
	) as SchemaDefs

	return TypeClone.Type(base, { ...options, $defs }) as TRoot<T, Options>
}

export function InputSchemaRoot<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		SourceData(v, { title: k })
	) as SchemaDefs

	return TypeClone.Type(base, { ...options, $defs }) as TRoot<T, Options>
}
