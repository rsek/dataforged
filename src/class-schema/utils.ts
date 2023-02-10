import { type Source } from '@base-types/metadata'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type YamlInput<T extends { source: Source; _id: string }> = PartialBy<
	T,
	'source' | '_id'
> & {
	_source: Partial<Source>
}
