import { IsInstance, IsOptional, type ValidationOptions } from 'class-validator'
import {
	JSONSchema,
	targetConstructorToSchema
} from 'class-validator-jsonschema'
import type * as Types from 'schema'
import { Metadata, Localize, Abstract, type Utils } from '@class-schema'
import _ from 'lodash'
import { DICT_KEY } from 'schema-json/common'

export abstract class Collection<T>
	extends Abstract.Node
	implements Types.Common.Collection<T>
{
	name: string
	canonical_name?: string

	// managed by descendant classes
	abstract contents: Record<string, T>

	@Localize.IsMarkdownString()
	summary: string

	@Localize.IsMarkdownString()
	@IsOptional()
	description?: string | undefined

	constructor(
		data: Utils.YamlInput<Types.Common.Collection<T>>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		this.name = data.name
		this.canonical_name = data.canonical_name ?? data.name
		this.summary = data.summary
		this.description = data.description
	}
}

export function IsRecord(
	type: any,
	pattern: RegExp = new RegExp(DICT_KEY),
	validationOptions?: ValidationOptions
) {
	const $ref = targetConstructorToSchema(type)

	return JSONSchema((schema) =>
		_.merge({}, schema, {
			type: 'object',
			$comment: "Deserialize as a 'dictionary'-like object.",
			additionalProperties: false,
			patternProperties: {
				[pattern.source]: { $ref }
			}
		} as any)
	)
}
