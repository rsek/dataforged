import { IsInstance, IsOptional } from 'class-validator'
import type * as Types from '../base-types/index'
import { Metadata } from '@class-schema'
import { type YamlInput } from './utils'

export abstract class Node implements Types.Abstract.Node {
	// ID validation comes from descended classes
	_id!: string

	@IsInstance(Metadata.Source)
	source!: Metadata.Source

	@IsOptional()
	@IsInstance(Metadata.SuggestionsBase)
	suggestions?: Metadata.SuggestionsBase | undefined

	constructor(
		data: YamlInput<Types.Abstract.Node>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		this._id = id
		this.source = new Metadata.Source(parentSource, data._source ?? {})
	}
}
