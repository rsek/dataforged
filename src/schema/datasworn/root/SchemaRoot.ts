import { TypeClone, type SchemaOptions, type TObject } from '@sinclair/typebox'
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
}

export type TRoot<
	T extends TObject = TObject,
	Options extends RootOptions = RootOptions
> = T & Options

export function SchemaRoot<T extends TObject, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		TypeClone.Type(v, { title: k })
	) as Defs

	return TypeClone.Type(base, { ...options, $defs }) as TRoot<T, Options>
}

export function InputSchemaRoot<T extends TObject, Options extends RootOptions>(
	base: T,
	options: Options
) {
	const $defs = mapValues(options.$defs, (v, k) =>
		SourceData(v, { title: k })
	) as Defs

	return TypeClone.Type(base, { ...options, $defs }) as TRoot<T, Options>
}
