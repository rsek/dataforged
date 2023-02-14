import { type Metadata } from '@base-types'
import { Matches, type ValidationOptions } from 'class-validator'
import { DF_KEY } from '../json-schema/common'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type YamlInput<T extends { source?: Metadata.Source; _id?: string }> =
	Omit<T, '_id' | 'source'> & { _source?: Partial<Metadata.Source> }

export function IsCollectionKey(validationOptions?: ValidationOptions) {
	return Matches(RegExp(DF_KEY), validationOptions)
}
