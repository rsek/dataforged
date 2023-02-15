import { IsInstance, IsOptional, type ValidationOptions } from 'class-validator'
import {
	JSONSchema,
	targetConstructorToSchema
} from 'class-validator-jsonschema'
import type * as Types from '@base-types'
import { Metadata, Localize, Abstract, type Utils } from '@class-schema'
import _ from 'lodash'
import { DF_KEY } from '@schema-json/common'

export abstract class Collection<T>
	extends Abstract.Node
	implements Types.Abstract.Collection<T>
{
	@IsInstance(Metadata.Title)
	title: Metadata.Title

	// managed by descendant classes
	contents!: Record<string, T>

	@Localize.IsMarkdownSentences()
	@IsOptional()
	summary?: string | undefined

	@Localize.IsMarkdownParagraphs()
	@IsOptional()
	description?: string | undefined

	constructor(
		data: Utils.YamlInput<Types.Abstract.Collection<T>>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		this.title = new Metadata.Title(data.title)
		this.summary = data.summary
		this.description = data.description
	}
}

export function IsRecord(
	type: any,
	pattern: RegExp = new RegExp(DF_KEY),
	validationOptions?: ValidationOptions
) {
	const $ref = targetConstructorToSchema(type)

	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'object',
			additionalProperties: false,
			patternProperties: {
				[pattern.source]: { $ref }
			}
		} as any)
	)
}
