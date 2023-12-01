import {
	TypeClone,
	type SchemaOptions,
	type TSchema,
	type TObject,
	type Static
} from '@sinclair/typebox'
import { mapValues } from 'lodash-es'
import { TSelectEnhancementField } from '../common/Fields.js'

/** Symbol indicating that this property is computed at build time, and is therefore optional in DataswornSource */
export const ComputedPropertyBrand = Symbol('ComputedProperty')

type ComputedOptions<
	T extends TSchema,
	ParentObject extends TObject
> = SchemaOptions & {
	[ComputedPropertyBrand]:
		| 'ComputedProperty'
		| ComputedPropertyFn<T, ParentObject>
}

/** Create a schema that is computed at build time, and is therefore optional in DataswornSource */
// TODO: make it possible for this to supply a function that computes the property!
export function Computed<
	T extends TSchema,
	ParentObject extends TObject = TObject
>(
	schema: T,
	options: ComputedOptions<T, ParentObject> = {
		[ComputedPropertyBrand]: 'ComputedProperty'
	}
) {
	return TypeClone.Type(schema, {
		...options
	}) as TComputed<T, ParentObject>
}
export type TComputed<
	T extends TSchema,
	ParentObject extends TObject = TObject
> = T & {
	[ComputedPropertyBrand]:
		| 'ComputedProperty'
		| ComputedPropertyFn<T, ParentObject>
}

type ComputedPropertyFn<T extends TSchema, ParentObject extends TObject> = (
	object: Static<ParentObject>,
	property: string,
	pointer: string
) => Static<T>

/** Symbol indicating that this property is optional in DataswornSource */
export const SourceOptionalBrand = Symbol('SourceOptional')

/** Creates a schema that is optional in DataswornSource.
 * @remarks Functionally similar to {@link Computed}, but with different semantics.
 */
export function SourceOptional<T extends TSchema>(
	schema: T,
	options: SchemaOptions = {}
) {
	return TypeClone.Type(schema, {
		...options,
		[SourceOptionalBrand]: 'SourceOptional'
	}) as TComputed<T>
}
export type TSourceOptional<T extends TSchema> = T & {
	[SourceOptionalBrand]: 'SourceOptional'
}

export const GetSourceDataSchema = Symbol('GetSourceDataSchema')

/** Provide an override value  */
export function setSourceDataSchema<
	T extends TSchema,
	SourceSchema extends TSchema
>(schema: T, sourceSchema: SourceSchema | ((schema: T) => SourceSchema)) {
	const base = {
		...TypeClone.Type(schema),
		[GetSourceDataSchema]:
			typeof sourceSchema === 'function' ? sourceSchema : () => sourceSchema
	} as THasSourceSchema<T, SourceSchema>
	return base
}
export type THasSourceSchema<
	T extends TSchema = TSchema,
	SourceSchema extends TSchema = TSchema
> = T & { [GetSourceDataSchema]: (schema: T) => SourceSchema }