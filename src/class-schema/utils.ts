import { type Metadata } from '@base-types'
import { Matches, type ValidationOptions } from 'class-validator'
import { DF_KEY } from '../json-schema/common'

export type PartialBy<T, K extends string | number | symbol> = Omit<T, K> &
	Partial<Pick<T, K extends keyof T ? K : never>>

export type YamlInput<T extends { source?: Metadata.Source; id?: string }> =
	Omit<T, 'id' | 'source'> & { _source?: Partial<Metadata.Source> }

export function IsCollectionKey(validationOptions?: ValidationOptions) {
	return Matches(RegExp(DF_KEY), validationOptions)
}
