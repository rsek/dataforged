import { TypeClone, type SchemaOptions, type TSchema } from '@sinclair/typebox'
import { mapValues } from 'lodash-es'
import { SourceData } from './SourceData.js'
import { type Defs } from '../Defs.js'

export interface RootOptions
	extends Required<
		Omit<SchemaOptions, 'default' | 'readOnly' | 'writeOnly' | 'examples'>
	> {
	$id: `${'https' | 'http'}://${string}`
	$defs: Defs
	$schema: string
	title: string
}

export type TRoot<T extends TSchema = TSchema> = T & RootOptions

export function SchemaRoot<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		TypeClone.Type(v, { title: k })
	) as Defs

	return TypeClone.Type(base, { ...options, $defs }) as unknown as TRoot
}

export function InputSchemaRoot<T extends TSchema, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		SourceData(v, { title: k })
	) as Defs

	return TypeClone.Type(base, { ...options, $defs }) as unknown as TRoot
}
