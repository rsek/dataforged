import { type Metadata as Types } from '@base-types'
import {
	IsArray,
	IsEnum,
	IsHexColor,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import {
	JSONSchema,
	validationMetadatasToSchemas
} from 'class-validator-jsonschema'
import _ from 'lodash'
import Localize from './localize.js'

enum Ruleset {
	Classic = 'classic',
	Starforged = 'starforged'
}

export abstract class Metadata {
	@IsEnum(Ruleset)
	static Ruleset = Ruleset

	// how would a regex work here?
	@IsString()
	static ID: Types.ID

	@IsUrl()
	static Icon: Types.Icon

	@IsUrl()
	static Image: Types.Image

	@IsHexColor()
	static Color: Types.Color
}

@JSONSchema({
	description: 'Provides short and long labels for this element.'
})
export class Title implements Types.Title {
	canonical = Localize.Label

	@IsOptional()
	standard = Localize.Label

	@IsOptional()
	short = Localize.Label

	// constructor(data: Types.Title) {
	// 	// this.canonical = data.canonical
	// 	// this.short = data.short
	// 	// this.standard = data.standard
	// }
}

@JSONSchema({
	description: "Metadata describing the source of this item's text content."
})
export class Source implements Types.Source {
	@IsString()
	@JSONSchema({
		description: 'The title of the source document.',
		examples: [
			'Ironsworn Rulebook',
			'Ironsworn Assets Master Set',
			'Ironsworn: Delve',
			'Ironsworn: Starforged Rulebook',
			'Ironsworn: Starforged Assets',
			'Sundered Isles'
		]
	})
	title!: string

	@IsOptional()
	@IsNumber({ maxDecimalPlaces: 0 })
	@Min(1)
	@JSONSchema({
		description:
			'The page number on which this item appears most prominently, if applicable.'
	})
	page?: number | undefined

	@JSONSchema({
		examples: [['Shawn Tomkin']]
	})
	@IsArray()
	@MinLength(1)
	@ValidateNested({ each: true })
	@Type(() => String)
	authors!: [string, ...string[]]

	@IsString()
	@JSONSchema({
		format: 'date',
		description:
			"The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
	})
	date!: string

	@IsUrl()
	uri!: string

	@IsUrl()
	license!: string | null

	/**
	 *
	 * @param sourceRoot - A complete Source object, usually the one provided by the YAML file's highest-level _source properties.
	 * @param sources - Additional sources, from . The last source should belong to the current object.
	 */
	constructor(sourceRoot: Types.Source, ...sources: Array<Partial<Source>>) {
		const data: Types.Source = _.merge({}, sourceRoot, ...sources)
		Object.assign(this, data)
	}
}

const schemas = validationMetadatasToSchemas()
console.log(JSON.stringify(schemas, undefined, 2))
