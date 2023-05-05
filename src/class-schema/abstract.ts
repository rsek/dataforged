import { IsInstance, IsOptional } from 'class-validator'
import type * as Types from '../schema/index'
import { Metadata } from '@class-schema'
import { type YamlInput } from './utils'

export abstract class Node implements Types.Common.SourcedNode {
	// ID validation comes from descended classes
	id: string

	@IsInstance(Metadata.Source)
	source: Metadata.Source

	@IsOptional()
	@IsInstance(Metadata.SuggestionsBase)
	suggestions?: Metadata.SuggestionsBase | undefined

	constructor(
		data: YamlInput<Types.Common.SourcedNode>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		this.id = id
		this.source = new Metadata.Source(parentSource, data._source ?? {})
	}
}
