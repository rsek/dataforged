import { type Metadata as Types } from '@base-types'
import {
	IsEnum,
	IsInt,
	IsOptional,
	IsString,
	IsUrl,
	Matches,
	Min,
	MinLength,
	type ValidationOptions
} from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'
import _ from 'lodash'
import { Localize } from '@class-schema'

export enum Ruleset {
	Classic = 'classic',
	Starforged = 'starforged'
}

export function IsRuleset(validationOptions?: ValidationOptions) {
	return IsEnum(Ruleset, validationOptions)
}

// IDs need to live in this file rather than with their associated classes to avoid import restrictions

/**
 * @deprecated This is a placeholder so that stuff works for the moment.
 */
export function IsID(validationOptions?: ValidationOptions) {
	const pattern = /^[a-z0-9][a-z0-9_]*[a-z0-9](\/[a-z0-9][a-z0-9_]*[a-z0-9])+$/

	return Matches(pattern, validationOptions)
}

export function IsOracleTableRowID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/oracles(\/[a-z][a-z_]*[a-z]){2,4}\/[0-9]{1,3}-[0-9]{1,3}$/,
		validationOptions
	)
}
export function IsOracleTableID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/oracles(\/[a-z][a-z_]*[a-z]){2,4}$/,
		validationOptions
	)
}

export function IsOracleCollectionID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/collections\/oracles(\/[a-z][a-z_]*[a-z]){1,3}$/,
		validationOptions
	)
}

export function IsAssetID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}$/,
		validationOptions
	)
}

export function IsAssetAbilityID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/assets(\/[a-z][a-z_]*[a-z]){2}\/[0-2]$/,
		validationOptions
	)
}

export function IsAssetTypeID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/collections\/assets(\/[a-z][a-z_]*[a-z]){1}$/,
		validationOptions
	)
}

export function IsMoveID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/moves(\/[a-z][a-z_]*[a-z]){2}$/,
		validationOptions
	)
}

export function IsMoveCategoryID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/collections\/moves(\/[a-z][a-z_]*[a-z]){1}$/,
		validationOptions
	)
}

export function IsEncounterCollectionClassicID(
	validationOptions?: ValidationOptions
) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/collections\/encounters(\/[a-z][a-z_]*[a-z]){1}$/,
		validationOptions
	)
}

export function IsEncounterStarforgedID(validationOptions?: ValidationOptions) {
	return Matches(
		/^[a-z0-9][a-z0-9_]+\/encounters(\/[a-z][a-z_]*[a-z]){2}$/,
		validationOptions
	)
}

export function IsIcon(
	...[options, validationOptions]: Parameters<typeof IsUrl>
) {
	return IsUrl(options, validationOptions)
}

export function IsImage(
	...[options, validationOptions]: Parameters<typeof IsUrl>
) {
	return IsUrl(options, validationOptions)
}

@JSONSchema({
	description: 'Provides short and long labels for this element.'
})
export class Title implements Types.Title {
	@Localize.IsLabel()
	canonical: string

	@IsOptional()
	@Localize.IsLabel()
	standard?: string

	@IsOptional()
	@Localize.IsLabel()
	short?: string

	constructor(data: Types.Title) {
		this.canonical = data.canonical
		this.short = data.short
		this.standard = data.standard
	}
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
	@IsInt()
	@Min(1)
	@JSONSchema({
		description:
			'The page number on which this item appears most prominently, if applicable.'
	})
	page?: number | undefined

	@JSONSchema({
		examples: [['Shawn Tomkin']]
	})
	@IsString({ each: true })
	@MinLength(1)
	authors!: [string, ...string[]]

	@IsString()
	@JSONSchema({
		format: 'date',
		description:
			"The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
	})
	date!: string

	@IsUrl()
	@JSONSchema({
		description: 'The URL where the source document is available.',
		examples: ['https://ironswornrpg.com']
	})
	url!: string

	@IsUrl()
	@JSONSchema({
		type: ['string', 'null'],
		description:
			'An absolute URL pointing to the location where this element\'s license can be found. If it\'s "null", no license is provided -- use with caution.',
		examples: [
			'https://creativecommons.org/licenses/by/4.0',
			'https://creativecommons.org/licenses/by-nc-sa/4.0'
		]
	})
	license!: string | null

	/**
	 *
	 * @param sources - Source objects arranged from least recent to more recent. In other words: the first source should be from the namespace root, while the last source should belong to the current object.
	 */
	constructor(...sources: [Types.Source, ...Partial<Types.Source>[]]) {
		const data: Types.Source = _.merge({}, ...sources)
		Object.assign(this, data)
	}
}

@JSONSchema({
	description: ''
})
export class SuggestionsBase implements Types.SuggestionsBase {
	@IsOracleTableID({ each: true })
	@IsOptional()
	oracles?: string[] | undefined

	@IsAssetID({ each: true })
	@IsOptional()
	assets?: string[] | undefined

	@IsMoveID({ each: true })
	@IsOptional()
	moves?: string[] | undefined

	constructor(data: Types.SuggestionsBase) {
		Object.assign(this, data)
	}
}
