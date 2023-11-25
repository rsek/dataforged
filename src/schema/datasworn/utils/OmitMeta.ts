import { Type, type TObject, type TOmit } from '@sinclair/typebox'

const MetaKeys = [
	'id',
	'source',
	'rendering',
	'name',
	'suggestions',
	'canonical_name',
	'color'
] as const
type MetaKeys = (typeof MetaKeys)[number]
/**
 * Omits common metadata and localization keys.
 */

export function OmitMeta<T extends TObject>(schema: T) {
	return Type.Omit(schema, MetaKeys)
}
export type OmitMeta<T> = Omit<T, MetaKeys>
export type TOmitMeta<T extends TObject> = TOmit<T, MetaKeys>
