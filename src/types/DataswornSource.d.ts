/**
 * Describes game rules compatible with the Ironsworn tabletop role-playing game by Shawn Tomkin.
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `package_type` property as a discriminator.
 */
export type RulesPackage = Ruleset | Expansion

/**
 * A standalone Datasworn package that describes its own ruleset.
 */
export interface Ruleset {
	id: RulesetId
	/**
	 * The version of the Datasworn format used by this data.
	 */
	datasworn_version?: SemanticVersion
	package_type: 'ruleset'
	rules?: Rules
	/**
	 * A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.
	 * @remarks Deserialize as a dictionary object.
	 */
	oracles?: Record<DictKey, OracleCollection>
	/**
	 * A dictionary object containing move categories, which contain moves.
	 * @remarks Deserialize as a dictionary object.
	 */
	moves?: Record<DictKey, MoveCategory>
	/**
	 * A dictionary object containing asset types, which contain assets.
	 * @remarks Deserialize as a dictionary object.
	 */
	assets?: Record<DictKey, AssetType>
	/**
	 * A dictionary object containing atlas collections, which contain atlas entries.
	 * @remarks Deserialize as a dictionary object.
	 */
	atlas?: Record<DictKey, Atlas>
	/**
	 * A dictionary object containing NPC collections, which contain NPCs.
	 * @remarks Deserialize as a dictionary object.
	 */
	npcs?: Record<DictKey, NpcCollection>
	/**
	 * A dictionary object of truth categories.
	 * @remarks Deserialize as a dictionary object.
	 */
	truths?: Record<DictKey, Truth>
	/**
	 * A dictionary object containing rarities, like those presented in Ironsworn: Delve.
	 * @remarks Deserialize as a dictionary object.
	 */
	rarities?: Record<DictKey, Rarity>
	/**
	 * A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve
	 * @remarks Deserialize as a dictionary object.
	 */
	delve_sites?: Record<DictKey, DelveSite>
	/**
	 * A dictionary object containing delve site themes.
	 * @remarks Deserialize as a dictionary object.
	 */
	site_themes?: Record<DictKey, DelveSiteTheme>
	/**
	 * A dictionary object containing delve site domains.
	 * @remarks Deserialize as a dictionary object.
	 */
	site_domains?: Record<DictKey, DelveSiteDomain>
}

/**
 * A Datasworn package that relies on an external package to provide its ruleset.
 */
export interface Expansion {
	/**
	 * A dictionary object containing oracle collections, which may contain oracle tables and/or oracle collections.
	 * @remarks Deserialize as a dictionary object.
	 */
	oracles?: Record<DictKey, OracleCollection>
	/**
	 * A dictionary object containing move categories, which contain moves.
	 * @remarks Deserialize as a dictionary object.
	 */
	moves?: Record<DictKey, MoveCategory>
	/**
	 * A dictionary object containing asset types, which contain assets.
	 * @remarks Deserialize as a dictionary object.
	 */
	assets?: Record<DictKey, AssetType>
	/**
	 * A dictionary object containing atlas collections, which contain atlas entries.
	 * @remarks Deserialize as a dictionary object.
	 */
	atlas?: Record<DictKey, Atlas>
	/**
	 * A dictionary object containing NPC collections, which contain NPCs.
	 * @remarks Deserialize as a dictionary object.
	 */
	npcs?: Record<DictKey, NpcCollection>
	/**
	 * A dictionary object of truth categories.
	 * @remarks Deserialize as a dictionary object.
	 */
	truths?: Record<DictKey, Truth>
	/**
	 * A dictionary object containing rarities, like those presented in Ironsworn: Delve.
	 * @remarks Deserialize as a dictionary object.
	 */
	rarities?: Record<DictKey, Rarity>
	/**
	 * A dictionary object of delve sites, like the premade delve sites presented in Ironsworn: Delve
	 * @remarks Deserialize as a dictionary object.
	 */
	delve_sites?: Record<DictKey, DelveSite>
	/**
	 * A dictionary object containing delve site themes.
	 * @remarks Deserialize as a dictionary object.
	 */
	site_themes?: Record<DictKey, DelveSiteTheme>
	/**
	 * A dictionary object containing delve site domains.
	 * @remarks Deserialize as a dictionary object.
	 */
	site_domains?: Record<DictKey, DelveSiteDomain>
	id: ExpansionId
	/**
	 * The version of the Datasworn format used by this data.
	 */
	datasworn_version?: SemanticVersion
	package_type: 'expansion'
	ruleset: RulesetId
	rules?: RulesExpansion
}

/**
 * A unique ID for an AssetAbilityControlField.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/abilities\/(0|[1-9][0-9]*)\/controls\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetAbilityControlFieldId = string

/**
 * A unique ID for an AssetAbility.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/abilities\/(0|[1-9][0-9]*)$/
 * ```
 */
export type AssetAbilityId = string

/**
 * A unique ID for an AssetAbilityOptionField.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/abilities\/(0|[1-9][0-9]*)\/options\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetAbilityOptionFieldId = string

/**
 * A unique ID for an AssetConditionMeterControlField.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/controls\/([a-z][a-z_]*)\/controls\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetConditionMeterControlFieldId = string

/**
 * A unique ID for an AssetControlField.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/controls\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetControlFieldId = string

/**
 * A wildcarded ID that can be used to match multiple AssetControlFields.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/assets\/(\*|([a-z][a-z_]*))\/(\*|([a-z][a-z_]*))\/controls\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type AssetControlFieldIdWildcard = string

/**
 * A unique ID for an Asset.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetId = string

/**
 * A wildcarded ID that can be used to match multiple Assets.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/assets\/(\*|([a-z][a-z_]*))\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type AssetIdWildcard = string

/**
 * A unique ID for an AssetOptionField.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/assets\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/options\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetOptionFieldId = string

/**
 * A wildcarded ID that can be used to match multiple AssetOptionFields.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/assets\/(\*|([a-z][a-z_]*))\/(\*|([a-z][a-z_]*))\/options\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type AssetOptionFieldIdWildcard = string

/**
 * A unique ID for an AssetType.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/assets\/([a-z][a-z_]*)$/
 * ```
 */
export type AssetTypeId = string

/**
 * A unique ID for an AtlasEntry.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/atlas\/([a-z][a-z_]*)\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/atlas/ironlands/hinterlands"
 */
export type AtlasEntryId = string

/**
 * A wildcarded ID that can be used to match multiple AtlasEntrys.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/atlas\/(\*|([a-z][a-z_]*))\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type AtlasEntryIdWildcard = string

/**
 * A unique ID for an Atlas.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/atlas\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/collections/atlas/ironlands"
 */
export type AtlasId = string

/**
 * A wildcarded ID that can be used to match multiple Atlass.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/collections\/atlas\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type AtlasIdWildcard = string

/**
 * A unique ID for a ConditionMeterRule.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/rules\/condition_meters\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/rules/condition_meters/health"
 * @example "starforged/rules/condition_meters/spirit"
 */
export type ConditionMeterRuleId = string

/**
 * A unique ID for a DelveSiteDenizen.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/delve_sites\/([a-z][a-z_]*)\/denizens\/([1-9][0-9]*)-([1-9][0-9]*)$/
 * ```
 * @example "delve/delve_sites/alvas_rest/denizens/1-27"
 */
export type DelveSiteDenizenId = string

/**
 * A unique ID for a DelveSiteDomain.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_domains\/([a-z][a-z_]*)$/
 * ```
 * @example "delve/site_domains/shadowfen"
 */
export type DelveSiteDomainId = string

/**
 * A unique ID for a DelveSite.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/delve_sites\/([a-z][a-z_]*)$/
 * ```
 * @example "delve/delve_sites/alvas_rest"
 */
export type DelveSiteId = string

/**
 * A unique ID for a DelveSiteTheme.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_themes\/([a-z][a-z_]*)$/
 * ```
 * @example "delve/site_themes/hallowed"
 */
export type DelveSiteThemeId = string

/**
 * A `snake_case` key used in a Datasworn dictionary object.
 * @remarks If you need to generate a key from a user-provided label, it's recommended to use a 'slugify' function/library, e.g. https://www.npmjs.com/package/slugify for NodeJS.
 * @pattern ```javascript
 * /^([a-z][a-z_]*)$/
 * ```
 */
export type DictKey = string

/**
 * A unique ID for a DomainDangerRow.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_domains\/([a-z][a-z_]*)\/dangers\/([1-9][0-9]*)-([1-9][0-9]*)$/
 * ```
 */
export type DomainDangerRowId = string

/**
 * A unique ID for a DomainFeatureRow.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_domains\/([a-z][a-z_]*)\/features\/([1-9][0-9]*)-([1-9][0-9]*)$/
 * ```
 */
export type DomainFeatureRowId = string

/**
 * The ID of a Datasworn package that relies on an external package to provide its ruleset.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})$/
 * ```
 * @example "delve"
 */
export type ExpansionId = string

/**
 * A unique ID for an ImpactRuleCollection.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/rules\/impacts\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/collections/rules/impacts/conditions"
 * @example "starforged/collections/rules/impacts/vehicle_troubles"
 */
export type ImpactRuleCollectionId = string

/**
 * A unique ID for an ImpactRule.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/rules\/impacts\/([a-z][a-z_]*)\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/rules/impacts/conditions/wounded"
 * @example "starforged/rules/impacts/vehicle_troubles/battered"
 */
export type ImpactRuleId = string

/**
 * A unique ID for a MoveCategory.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/moves\/([a-z][a-z_]*)$/
 * ```
 * @example "starforged/collections/moves/adventure"
 */
export type MoveCategoryId = string

/**
 * A move ID, for a standard move or a unique asset move
 * @example "classic/moves/combat/strike"
 * @example "starforged/assets/module/grappler/abilities/0/moves/ready_grappler"
 */
export type MoveId = string

/**
 * A move ID with wildcards.
 */
export type MoveIdWildcard = string

/**
 * A unique ID for a NpcCollection.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/npcs\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/collections/npcs/firstborn"
 * @example "starforged/collections/npcs/sample_npcs"
 */
export type NpcCollectionId = string

/**
 * A unique ID for a Npc.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/npcs\/([a-z][a-z_]*)\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/npcs/firstborn/elf"
 * @example "starforged/npcs/sample_npcs/chiton"
 */
export type NpcId = string

/**
 * A wildcarded ID that can be used to match multiple Npcs.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/npcs\/(\*|([a-z][a-z_]*))\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type NpcIdWildcard = string

/**
 * A unique ID for a NpcVariant.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/npcs\/([a-z][a-z_]*)\/([a-z][a-z_]*)\/variants\/([a-z][a-z_]*)$/
 * ```
 * @example "starforged/npcs/sample_npcs/chiton/variants/chiton_drone_pack"
 */
export type NpcVariantId = string

/**
 * A unique ID for an OracleCollection.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/collections\/oracles(\/([a-z][a-z_]*)){1,3}$/
 * ```
 * @example "starforged/collections/oracles/core"
 * @example "starforged/collections/oracles/character/names"
 * @example "starforged/collections/oracles/planets/furnace/settlements"
 */
export type OracleCollectionId = string

/**
 * @example "starforged/oracles/core/action"
 * @example "starforged/oracles/character/names/given"
 * @example "starforged/oracles/planets/furnace/settlements/terminus"
 */
export type OracleTableId = string

/**
 * Oracle table wildcards can also use '**' to represent any number of collection levels in the oracle tree.
 * @pattern ```javascript
 * /^(\*|([a-z0-9_]{3,}))\/oracles\/((\/([a-z][a-z_]*)){1,3}|\/\*\*|\/\*\*\/([a-z][a-z_]*)|\/([a-z][a-z_]*)\/\*\*)\/(\*|([a-z][a-z_]*))$/
 * ```
 */
export type OracleTableIdWildcard = string

/**
 * Normally, rows will end with two numbers separated by a dash, indicating their dice range.
 *
 * Rows with a single number represent unrollable rows that are sometimes included for rendering purposes; in this case, the number represents the row's index.
 * @example "classic/oracles/action_and_theme/action/1-1"
 * @example "starforged/oracles/derelicts/zones/starship/0"
 */
export type OracleTableRowId = string

/**
 * A unique ID for a Rarity.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/rarities\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/rarities/ayethins_journal"
 */
export type RarityId = string

/**
 * The ID of standalone Datasworn package that describes its own ruleset.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})$/
 * ```
 * @example "classic"
 * @example "starforged"
 */
export type RulesetId = string

/**
 * A unique ID for a SpecialTrackRule.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/rules\/special_tracks\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/rules/special_tracks/bonds"
 * @example "delve/rules/special_tracks/failure"
 * @example "starforged/rules/special_tracks/bonds_legacy"
 */
export type SpecialTrackRuleId = string

/**
 * A unique ID for a StatRule.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/rules\/stats\/([a-z][a-z_]*)$/
 * ```
 */
export type StatRuleId = string

/**
 * A unique ID for a ThemeDangerRow.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_themes\/([a-z][a-z_]*)\/dangers\/([1-9][0-9]*)-([1-9][0-9]*)$/
 * ```
 */
export type ThemeDangerRowId = string

/**
 * A unique ID for a ThemeFeatureRow.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/site_themes\/([a-z][a-z_]*)\/features\/([1-9][0-9]*)-([1-9][0-9]*)$/
 * ```
 */
export type ThemeFeatureRowId = string

/**
 * A unique ID for a Truth.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/truths\/([a-z][a-z_]*)$/
 * ```
 * @example "classic/truths/iron"
 * @example "starforged/truths/iron"
 */
export type TruthId = string

/**
 * A unique ID for a TruthOption.
 * @pattern ```javascript
 * /^([a-z0-9_]{3,})\/truths\/([a-z][a-z_]*)\/(0|[1-9][0-9]*)$/
 * ```
 * @example "classic/truths/iron/0"
 * @example "starforged/truths/iron/0"
 */
export type TruthOptionId = string

/**
 * A CSS color value.
 * @remarks See https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 */
export type CssColor = string

/**
 * @pattern ```javascript
 * /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
 * ```
 */
export type SemanticVersion = string

/**
 * Metadata describing the original source of this item
 */
export interface Source {
	/**
	 * The title of the source document.
	 * @example "Ironsworn Rulebook"
	 * @example "Ironsworn Assets Master Set"
	 * @example "Ironsworn: Delve"
	 * @example "Ironsworn: Starforged Rulebook"
	 * @example "Ironsworn: Starforged Assets"
	 * @example "Sundered Isles"
	 */
	title: string
	/**
	 * The page number where this item is described in full.
	 */
	page?: number
	authors: Array<{
		/**
		 * @example "Shawn Tomkin"
		 */
		name: string
		/**
		 * An optional email contact for the author
		 */
		email?: string
		/**
		 * An optional URL for the author's website.
		 */
		url?: string
	}>
	/**
	 * The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating.
	 * @remarks You may prefer to deserialize this as a Date object.
	 */
	date: string
	/**
	 * An absolute URL where the source document is available.
	 * @example "https://ironswornrpg.com"
	 */
	url: string
	/**
	 * An absolute URL pointing to the location where this element's license can be found.
	 *
	 * A `null` here indicates that the content provides __no__ license, and is not intended for redistribution.  Datasworn's build process skips unlicensed content by default.
	 * @example "https://creativecommons.org/licenses/by/4.0"
	 * @example "https://creativecommons.org/licenses/by-nc-sa/4.0"
	 */
	license: string | null
}

export interface Suggestions {
	oracles?: OracleTableId[]
	assets?: AssetId[]
	moves?: MoveId[]
	site_domains?: DelveSiteDomainId[]
	site_themes?: DelveSiteThemeId[]
	npcs?: NpcId[]
	atlas?: AtlasEntryId[]
	rarities?: RarityId[]
}

/**
 * A relative URL pointing to a vector image in the SVG format.
 * @pattern ```javascript
 * /\.svg$/
 * ```
 */
export type SvgImageUrl = string

/**
 * A relative URL pointing to a raster image in the WEBP format.
 * @pattern ```javascript
 * /\.webp$/
 * ```
 */
export type WebpImageUrl = string

export interface I18nHint {
	part_of_speech?: PartOfSpeech
}

/**
 * Internationalization/localization hints for the text content of this object.
 */
export interface I18nHints {
	result?: I18nHint
	summary?: I18nHint
	description?: I18nHint
	template?: {
		result?: I18nHint
		summary?: I18nHint
		description?: I18nHint
	}
}

/**
 * A localized label for an input. In some contexts it may be undesirable to render this text, but it should always be exposed to assistive technology (e.g. with `aria-label` in HTML).
 * @pattern ```javascript
 * /^[^A-Z]+$/
 * ```
 * @i18n
 */
export type InputLabel = string

/**
 * A localized plain text name or label.
 * @i18n
 */
export type Label = string

/**
 * Localized text, formatted in Markdown.
 *
 * It uses some custom syntax; e.g. `{{table:some_oracle_table_id}}` indicates that the referenced oracle table is rendered there part of the source material.
 * @i18n
 */
export type MarkdownString = string

/**
 *   - `common_noun`: A common noun.
 *   - `proper_noun`: A proper noun.
 *   - `adjunct_common_noun`: A common noun used as an adjective, to modify another noun.
 *   - `adjunct_proper_noun`: A proper noun used as an adjective, to modify another noun.
 *   - `verb`: A verb in present tense
 *   - `gerund`: Gerund or present participle of a verb, e.g. "going", "seeing", "waving"
 *   - `adjective`: An adjective.
 *   - `attributive_verb`: A verb used as an adjective, to modify a noun.
 */
export type PartOfSpeech =
	| 'common_noun'
	| 'proper_noun'
	| 'adjunct_common_noun'
	| 'adjunct_proper_noun'
	| 'verb'
	| 'gerund'
	| 'adjective'
	| 'attributive_verb'

/**
 * A rich text string in Markdown with replaced values from oracle roll results.
 *
 * The custom syntax `{{some_row_key:some_oracle_table_id}}` should be replaced by the `some_row_key` string of a rolled oracle table. This is usually the `result` key, for example `{{result:starforged/oracles/core/action}}`
 *
 * @i18n
 */
export type TemplateString = string

/**
 * Describes a standard player character condition meter.
 */
export interface ConditionMeterRule {
	/**
	 * A description of this condition meter.
	 */
	description: MarkdownString
	/**
	 * Is this condition meter shared by all players?
	 * @default false
	 */
	shared?: boolean
	label: InputLabel
	/**
	 * The current value of this meter.
	 */
	value: number
	/**
	 * The minimum value of this meter.
	 * @default 0
	 */
	min?: number
	/**
	 * The maximum value of this meter.
	 * @default 5
	 */
	max?: number
}

/**
 * Describes a category of standard impacts/debilities.
 */
export interface ImpactCategory {
	/**
	 * A label for this impact category.
	 */
	label: InputLabel
	/**
	 * A description of this impact category.
	 */
	description: MarkdownString
	/**
	 * A dictionary object of the Impacts in this category.
	 * @remarks Deserialize as a dictionary object.
	 */
	contents: Record<DictKey, ImpactRule>
}

/**
 * Describes a standard impact/debility.
 */
export interface ImpactRule {
	/**
	 * The label for this impact.
	 */
	label: InputLabel
	/**
	 * A description of this impact.
	 */
	description: MarkdownString
	/**
	 * Is this impact applied to all players at once?
	 * @default false
	 */
	shared?: boolean
	/**
	 * Any ruleset condition meters that can't recover when this impact is active.
	 * @default []
	 */
	prevents_recovery?: ConditionMeterKey[]
	/**
	 * Is this impact permanent?
	 * @default false
	 */
	permanent?: boolean
}

/**
 * Describes rules for player characters in this ruleset, such as stats and condition meters.
 */
export interface Rules {
	/**
	 * Describes the standard stats used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	stats: Record<DictKey, StatRule>
	/**
	 * Describes the standard condition meters used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	condition_meters: Record<DictKey, ConditionMeterRule>
	/**
	 * Describes the standard impacts/debilities used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	impacts: Record<DictKey, ImpactCategory>
	/**
	 * Describes the special tracks used by player characters in this ruleset, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
	 * @remarks Deserialize as a dictionary object.
	 */
	special_tracks: Record<DictKey, SpecialTrackRule>
}

/**
 * Describes rules for player characters in this ruleset, such as stats and condition meters.
 */
export interface RulesExpansion {
	/**
	 * Describes the standard stats used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	stats?: Record<DictKey, StatRule>
	/**
	 * Describes the standard condition meters used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	condition_meters?: Record<DictKey, ConditionMeterRule>
	/**
	 * Describes the standard impacts/debilities used by player characters in this ruleset.
	 * @remarks Deserialize as a dictionary object.
	 */
	impacts?: Record<DictKey, ImpactCategory>
	/**
	 * Describes the special tracks used by player characters in this ruleset, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
	 * @remarks Deserialize as a dictionary object.
	 */
	special_tracks?: Record<DictKey, SpecialTrackRule>
}

/**
 * Describes a special track like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
 */
export interface SpecialTrackRule {
	/**
	 * A label for this special track.
	 */
	label: InputLabel
	/**
	 * A description of this special track.
	 */
	description: MarkdownString
	/**
	 * Is this track shared by all players?
	 * @default false
	 */
	shared?: boolean
	/**
	 * Is this track an optional rule?
	 * @default false
	 */
	optional?: boolean
}

/**
 * Describes a standard player character stat.
 */
export interface StatRule {
	/**
	 * A label for this stat.
	 * @example "edge"
	 */
	label: InputLabel
	/**
	 * A description of this stat.
	 * @example "Quickness, agility, and prowess when fighting at a distance."
	 */
	description: MarkdownString
}

/**
 * Challenge rank, represented as an integer from 1 (troublesome) to 5 (epic).
 *
 *   - `1`: Troublesome
 *   - `2`: Dangerous
 *   - `3`: Formidable
 *   - `4`: Extreme
 *   - `5`: Epic
 */
export type ChallengeRank = 1 | 2 | 3 | 4 | 5

/**
 * Describes the features of a type of progress track.
 */
export interface ProgressTrackTypeInfo {
	/**
	 * A category label for progress tracks of this type.
	 * @example "Vow"
	 * @example "Journey"
	 * @example "Combat"
	 * @example "Scene Challenge"
	 * @example "Expedition"
	 * @example "Connection"
	 * @example "Delve"
	 */
	category: Label
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	controls?: Record<DictKey, {}>
}

/**
 * Special, ruleset-specific progress tracks. Usually, one exists per player character, and they persist through the life of the player character.
 * 'Canonical' examples:
 *   * `bonds_track`, described in the Ironsworn Rulebook. For the Starforged legacy track, use `bonds_legacy` instead.
 *   * `failure_track`, described in Ironsworn: Delve
 *   * `quests_legacy`, `bonds_legacy`, and `discoveries_legacy`, described Ironsworn: Starforged
 *
 *
 * @example "bonds_track"
 * @example "failure_track"
 * @example "quests_legacy"
 * @example "bonds_legacy"
 * @example "discoveries_legacy"
 */
export type SpecialTrackType = DictKey

/**
 * A reference to the value of an asset control.
 */
export interface RollOptionAssetControl {
	/**
	 * Asset IDs (which may be wildcarded) that may provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields.
	 * @default null
	 */
	assets?: AssetIdWildcard[] | null
	/**
	 * The dictionary key of the asset control field.
	 * @example "health"
	 * @example "integrity"
	 */
	control: DictKey
	/**
	 * A reference to the value of an asset control.
	 */
	using: 'asset_control'
}

/**
 * A reference to the value of an asset option.
 */
export interface AssetOptionValueRef {
	/**
	 * Asset IDs (which may be wildcarded) that may provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields.
	 * @default null
	 */
	assets?: AssetIdWildcard[] | null
	/**
	 * The dictionary key of the asset option field.
	 */
	option: DictKey
	/**
	 * A reference to the value of an asset option.
	 */
	using: 'asset_option'
}

/**
 * A reference to the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.
 */
export interface AttachedAssetControlValueRef {
	/**
	 * The dictionary key of the asset control field.
	 * @example "health"
	 * @example "integrity"
	 */
	control: DictKey
	/**
	 * A reference to the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.
	 */
	using: 'attached_asset_control'
}

/**
 * A reference to the value of an attached asset option.
 */
export interface AttachedAssetOptionValueRef {
	/**
	 * The dictionary key of the asset option field.
	 */
	option: DictKey
	/**
	 * A reference to the value of an attached asset option.
	 */
	using: 'attached_asset_option'
}

/**
 * A reference to the value of a standard player condition meter.
 */
export interface ConditionMeterValueRef {
	condition_meter: ConditionMeterKey
	/**
	 * A reference to the value of a standard player condition meter.
	 */
	using: 'condition_meter'
}

/**
 * An arbitrary static integer value with a label.
 */
export interface CustomValue {
	label: InputLabel
	value: number
	/**
	 * An arbitrary static integer value with a label.
	 */
	using: 'custom'
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `using` property as a discriminator.
 */
export type RollableValue =
	| StatValueRef
	| ConditionMeterValueRef
	| RollOptionAssetControl
	| AssetOptionValueRef
	| AttachedAssetControlValueRef
	| AttachedAssetOptionValueRef
	| CustomValue

/**
 *   - `stat`: A reference to the value of a standard player character stat.
 *   - `condition_meter`: A reference to the value of a standard player condition meter.
 *   - `asset_control`: A reference to the value of an asset control.
 *   - `asset_option`: A reference to the value of an asset option.
 *   - `custom`: An arbitrary static integer value with a label.
 *   - `attached_asset_control`: A reference to the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.
 *   - `attached_asset_option`: A reference to the value of an attached asset option.
 */
export type RollableValueType =
	| 'stat'
	| 'condition_meter'
	| 'asset_control'
	| 'asset_option'
	| 'custom'
	| 'attached_asset_control'
	| 'attached_asset_option'

/**
 * A reference to the value of a standard player character stat.
 */
export interface StatValueRef {
	stat: StatKey
	/**
	 * A reference to the value of a standard player character stat.
	 */
	using: 'stat'
}

/**
 * A non-player character entry, similar to those in Chapter 5 of the Ironsworn Rulebook, or Chapter 4 of Starforged.
 */
export interface Npc {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: NpcId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	features: MarkdownString[]
	summary?: MarkdownString
	description: MarkdownString
	quest_starter: MarkdownString
	your_truth?: MarkdownString
	/**
	 * The suggested challenge rank for this NPC.
	 */
	rank: ChallengeRank
	nature: NpcNature
	drives: MarkdownString[]
	tactics: MarkdownString[]
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	variants?: Record<DictKey, NpcVariant>
}

export interface NpcCollection {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: NpcCollectionId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A thematic color associated with this collection.
	 */
	color?: CssColor
	/**
	 * A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	images?: WebpImageUrl[]
	/**
	 * An SVG icon associated with this collection.
	 */
	icon?: SvgImageUrl
	/**
	 * This collection's content enhances the identified collection, rather than being a standalone collection of its own.
	 */
	enhances?: NpcCollectionId
	/**
	 * This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.
	 */
	replaces?: NpcCollectionId
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	contents?: Record<DictKey, Npc>
}

/**
 * A localized category label describing the nature of this NPC.
 *
 * In Ironsworn classic, this is probably the singular form of the parent collection's name.
 *
 * For Starforged, see the table on p. 258 for examples.
 * @example "Ironlander"
 * @example "Firstborn"
 * @example "Animal"
 * @example "Beast"
 * @example "Horror"
 * @example "Anomaly"
 * @example "Creature"
 * @example "Human"
 * @example "Machine"
 * @example "Monster"
 * @example "Vehicle"
 */
export type NpcNature = Label

export interface NpcVariant {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: NpcVariantId
	name: Label
	summary?: MarkdownString
	description: MarkdownString
	/**
	 * The suggested challenge rank for this NPC.
	 */
	rank: ChallengeRank
	nature: NpcNature
}

/**
 * A simple dice roll expression with an optional modifer.
 * @pattern ```javascript
 * /([1-9][0-9]*)d([1-9][0-9]*)([+-]([1-9][0-9]*))?/
 * ```
 * @example "1d100"
 * @example "1d6+2"
 */
export type DiceExpression = string

/**
 * Provides string templates that may be used in place of the static row text from `OracleTableRow#result`, `OracleTableRow#summary`, and `OracleTableRow#description`.
 *
 *   These strings are formatted in Markdown, but use a special syntax for their placeholders: `{{result:some_oracle_table_id}}`. The placeholder should be replaced with the value of a rolled (or selected) `OracleTableRow#result` from the target oracle table ID.
 */
export interface OracleRollTemplate {
	/**
	 * A string template that may be used in place of OracleTableRow#result.
	 * @example "{{result:starforged/oracles/factions/affiliation}} of the {{result:starforged/oracles/factions/legacy}} {{result:starforged/oracles/factions/identity}}"
	 */
	result?: TemplateString
	/**
	 * A string template that may be used in place of OracleTableRow#summary.
	 */
	summary?: TemplateString
	/**
	 * A string template that may be used in place of OracleTableRow#description.
	 */
	description?: TemplateString
}

export interface OracleTableMatchBehavior {
	text: MarkdownString
}

export interface OracleTableRoll {
	/**
	 * The ID of the oracle table to be rolled. A `null` value indicates that it's a roll on the same table.
	 * @default null
	 */
	oracle?: OracleTableId | null
	/**
	 * Both Ironsworn and Starforged explicitly recommend *against* rolling all details at once. That said, some oracle results only provide useful information once a secondary roll occurs, such as "Action + Theme".
	 * @default false
	 */
	auto?: boolean
	/**
	 * The number of times to roll.
	 * @default 1
	 */
	times?: number
	/**
	 * Special rules on how the oracle table roll is performed.
	 * @default "no_duplicates"
	 */
	method?: OracleTableRollMethod
	/**
	 * The dice roll to make on the oracle table. Set it to `null` if you just want the table's default.
	 * @default null
	 */
	dice?: DiceExpression | null
}

/**
 * Special roll instructions to use when rolling multiple times on a single oracle table.
 *
 *   - `no_duplicates`: Duplicates should be re-rolled.
 *   - `keep_duplicates`: Duplicates should be kept.
 *   - `make_it_worse`: Duplicates should be kept, and they compound to make things worse.
 */
export type OracleTableRollMethod =
	| 'no_duplicates'
	| 'keep_duplicates'
	| 'make_it_worse'

export interface OracleCollection {
	/**
	 * @default
	 * ```javascript
	 * 	{
	 * 		style: "tables"
	 * 	}
	 * ```
	 */
	rendering?: OracleCollectionRendering
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: OracleCollectionId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A thematic color associated with this collection.
	 */
	color?: CssColor
	/**
	 * A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	images?: WebpImageUrl[]
	/**
	 * An SVG icon associated with this collection.
	 */
	icon?: SvgImageUrl
	/**
	 * This collection's content enhances the identified collection, rather than being a standalone collection of its own.
	 */
	enhances?: OracleCollectionId
	/**
	 * This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.
	 */
	replaces?: OracleCollectionId
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	contents?: Record<DictKey, OracleTable>
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	collections?: Record<DictKey, OracleCollection>
}

/**
 * Describes the presentation of this oracle collection, which might represent a group of separate tables, or a single table with additional columns.
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `style` property as a discriminator.
 */
export type OracleCollectionRendering =
	| OracleCollectionRenderingTables
	| OracleCollectionRenderingMultiTable

export interface OracleCollectionRenderingMultiTable {
	/**
	 * Presented as a single table, with its OracleTable children rendered as columns.
	 */
	style: 'multi_table'
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	columns: Record<DictKey, OracleCollectionTableColumn>
}

export interface OracleCollectionRenderingTables {
	/**
	 * Presented as a collection of separate tables.
	 */
	style: 'tables'
}

/**
 *   - `tables`: Presented as a collection of separate tables.
 *   - `multi_table`: Presented as a single table, with its OracleTable children rendered as columns.
 */
export type OracleCollectionStyle = 'tables' | 'multi_table'

export interface OracleCollectionTableColumn {
	/**
	 * The column's header text.
	 */
	label: Label
	content_type: OracleTableColumnContentKey
	/**
	 * The thematic color for this column.
	 */
	color?: CssColor
	/**
	 * The key of the OracleTable (within this collection), whose data is used to render this column.
	 */
	table_key: DictKey
}

/**
 * Represents a single oracle table, or a single table column of a table that has multiple "Roll" or "Result" columns.
 */
export interface OracleTable {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: OracleTableId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * The roll used to select a result on this table.
	 * @default "1d100"
	 */
	dice?: DiceExpression
	_i18n?: I18nHints
	/**
	 * An icon that represents this table.
	 */
	icon?: SvgImageUrl
	images?: WebpImageUrl[]
	/**
	 * A brief summary of the oracle table's intended usage, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * Indicates that this table replaces the identified table. References to the replaced table can be considered equivalent to this table.
	 */
	replaces?: OracleTableId
	/**
	 * A longer description of the oracle table's intended usage, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	/**
	 * Most oracle tables are insensitive to matches, but a few define special match behavior.
	 */
	match?: OracleTableMatchBehavior
	table: OracleTableRow[]
	/**
	 * Describes how how to render this table, when presenting it as a standalone table.
	 */
	rendering?: OracleTableRendering
}

/**
 * @example ```javascript
 * 	{
 * 		label: "Roll",
 * 		content_type: "roll"
 * 	}
 * ```
 * @example ```javascript
 * 	{
 * 		label: "Result",
 * 		content_type: "result"
 * 	}
 * ```
 * @example ```javascript
 * 	{
 * 		label: "Summary",
 * 		content_type: "summary"
 * 	}
 * ```
 */
export interface OracleTableColumn {
	/**
	 * The column's header text.
	 */
	label: Label
	content_type: OracleTableColumnContentKey
	/**
	 * The thematic color for this column.
	 */
	color?: CssColor
}

/**
 * The value(s) from each OracleTableRow that is rendered in this column.
 *
 *   - `roll`: Column displays the roll range (`min` and `max`) of each OracleTableRow.
 *   - `result`: Column displays the OracleTableRow's `result` key.
 *   - `summary`: Column displays the OracleTableRow's `summary` key.
 *   - `description`: Column displays the OracleTableRow's `description` key.
 */
export type OracleTableColumnContentKey =
	| 'roll'
	| 'result'
	| 'summary'
	| 'description'

/**
 * Describes the presentation of this table.
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `style` property as a discriminator.
 * @default
 * ```javascript
 * 	{
 * 		style: "standalone",
 * 		columns: {
 * 			roll: {
 * 				label: "Roll",
 * 				content_type: "roll"
 * 			},
 * 			result: {
 * 				label: "Result",
 * 				content_type: "result"
 * 			}
 * 		}
 * 	}
 * ```
 */
export type OracleTableRendering =
	| OracleTableRenderingStandalone
	| OracleTableRenderingColumn
	| OracleTableRenderingEmbedInRow

export interface OracleTableRenderingColumn {
	/**
	 * Render as a single column of a table.
	 */
	style: 'column'
}

export interface OracleTableRenderingEmbedInRow {
	/**
	 * Render as a table, within a row in another table.
	 */
	style: 'embed_in_row'
}

export interface OracleTableRenderingStandalone {
	/**
	 * Render as a standalone table.
	 */
	style: 'standalone'
	/**
	 * @remarks Deserialize as a dictionary object.
	 * @default
	 * ```javascript
	 * 	{
	 * 		roll: {
	 * 			label: "Roll",
	 * 			content_type: "roll"
	 * 		},
	 * 		result: {
	 * 			label: "Result",
	 * 			content_type: "result"
	 * 		}
	 * 	}
	 * ```
	 */
	columns?: Record<DictKey, OracleTableColumn>
}

/**
 * Represents a row in an oracle table.
 */
export interface OracleTableRow {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: OracleTableRowId
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.
	 * @default null
	 */
	min?: number | null
	/**
	 * High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.
	 * @default null
	 */
	max?: number | null
}

/**
 *   - `standalone`: Render as a standalone table.
 *   - `embed_in_row`: Render as a table, within a row in another table.
 *   - `column`: Render as a single column of a table.
 */
export type OracleTableStyle = 'standalone' | 'embed_in_row' | 'column'

/**
 *   - `miss`: An automatic miss.
 *   - `weak_hit`: An automatic weak hit.
 *   - `strong_hit`: An automatic strong hit.
 *   - `player_choice`: The player chooses which roll option to use.
 *   - `highest`: Use the roll option with the best/highest value.
 *   - `lowest`: Use the roll option with the worst/lowest value.
 *   - `all`: Use _every_ roll option at once.
 */
export type ActionRollMethod =
	| 'miss'
	| 'weak_hit'
	| 'strong_hit'
	| 'player_choice'
	| 'highest'
	| 'lowest'
	| 'all'

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `roll_type` property as a discriminator.
 */
export type Move =
	| MoveActionRoll
	| MoveNoRoll
	| MoveProgressRoll
	| MoveSpecialTrack

/**
 * A move that makes an action roll.
 */
export interface MoveActionRoll {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: MoveId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.
	 */
	replaces?: MoveId
	/**
	 * The complete rules text of the move.
	 */
	text: MarkdownString
	/**
	 * Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement.
	 */
	oracles?: OracleTableId[]
	/**
	 * A move that makes an action roll.
	 */
	roll_type: 'action_roll'
	/**
	 * Trigger conditions for this move.
	 */
	trigger: TriggerActionRoll
	outcomes: MoveOutcomes
}

/**
 * An object that describes changes to a move. These changes should be applied recursively, altering only the specified properties; enhanced arrays should be concatencated with the original array value.
 */
export interface MoveActionRollEnhancement {
	/**
	 * An array of wildcard IDs. An item must match one of the wildcard IDs to receive this enhancement. If this is `null`, any ID is valid.
	 * @default null
	 */
	enhances?: MoveIdWildcard[] | null
	/**
	 * A move must have this `roll_type` to receive this enhancement. This is in addition to any other restrictions made by other properties.
	 */
	roll_type: 'action_roll'
	trigger?: TriggerActionRollEnhancement
}

export interface MoveCategory {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: MoveCategoryId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A thematic color associated with this collection.
	 */
	color?: CssColor
	/**
	 * A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	images?: WebpImageUrl[]
	/**
	 * An SVG icon associated with this collection.
	 */
	icon?: SvgImageUrl
	/**
	 * This collection's content enhances the identified collection, rather than being a standalone collection of its own.
	 */
	enhances?: MoveCategoryId
	/**
	 * This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.
	 */
	replaces?: MoveCategoryId
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	contents?: Record<DictKey, Move>
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `roll_type` property as a discriminator.
 */
export type MoveEnhancement =
	| MoveActionRollEnhancement
	| MoveNoRollEnhancement
	| MoveProgressRollEnhancement
	| MoveSpecialTrackEnhancement

/**
 * A move that makes no progress rolls or action rolls.
 */
export interface MoveNoRoll {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: MoveId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.
	 */
	replaces?: MoveId
	/**
	 * The complete rules text of the move.
	 */
	text: MarkdownString
	/**
	 * Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement.
	 */
	oracles?: OracleTableId[]
	/**
	 * A move that makes no action rolls or progress rolls.
	 */
	roll_type: 'no_roll'
	/**
	 * Trigger conditions for this move.
	 */
	trigger: TriggerNoRoll
	/**
	 * @default null
	 */
	outcomes?: null
}

/**
 * An object that describes changes to a move. These changes should be applied recursively, altering only the specified properties; enhanced arrays should be concatencated with the original array value.
 */
export interface MoveNoRollEnhancement {
	/**
	 * An array of wildcard IDs. An item must match one of the wildcard IDs to receive this enhancement. If this is `null`, any ID is valid.
	 * @default null
	 */
	enhances?: MoveIdWildcard[] | null
	/**
	 * A move must have this `roll_type` to receive this enhancement. This is in addition to any other restrictions made by other properties.
	 */
	roll_type: 'no_roll'
	trigger?: TriggerNoRollEnhancement
}

export interface MoveOutcome {
	/**
	 * @pattern ```javascript
	 * /On a __(strong hit|weak hit|miss)__/
	 * ```
	 */
	text: MarkdownString
}

/**
 *   - `miss`: The score doesn't beat either challenge die.
 *   - `weak_hit`: The score is greater than one challenge die.
 *   - `strong_hit`: The score is greater than both challenge dice.
 */
export type MoveOutcomeType = 'miss' | 'weak_hit' | 'strong_hit'

/**
 * A standalone localized description for each move outcome (miss, weak hit, or strong hit). This is for for e.g. VTT implementations, where it's often useful to display only the rules text relevant to a roll result.
 *
 *   This often requires light editorialization to create text that can stand alone without reference to the rest of the move. For example, 'as above' (in reference to another move outcome) shouldn't be used here; instead, the relevant text should be repeated.
 */
export interface MoveOutcomes {
	strong_hit: MoveOutcome
	weak_hit: MoveOutcome
	miss: MoveOutcome
}

/**
 * A progress move that rolls on a standard progress track type (whose features are defined by this move object). For progress rolls that use special tracks, see MoveSpecialTrack.
 */
export interface MoveProgressRoll {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: MoveId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.
	 */
	replaces?: MoveId
	/**
	 * The complete rules text of the move.
	 */
	text: MarkdownString
	/**
	 * Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement.
	 */
	oracles?: OracleTableId[]
	/**
	 * A progress move that rolls on a standard progress track type (defined by this move).
	 */
	roll_type: 'progress_roll'
	/**
	 * Trigger conditions for this move.
	 */
	trigger: TriggerProgressRoll
	outcomes: MoveOutcomes
	/**
	 * Describes the common features of progress tracks associated with this move.
	 */
	tracks: ProgressTrackTypeInfo
}

/**
 * An object that describes changes to a move. These changes should be applied recursively, altering only the specified properties; enhanced arrays should be concatencated with the original array value.
 */
export interface MoveProgressRollEnhancement {
	/**
	 * An array of wildcard IDs. An item must match one of the wildcard IDs to receive this enhancement. If this is `null`, any ID is valid.
	 * @default null
	 */
	enhances?: MoveIdWildcard[] | null
	/**
	 * A move must have this `roll_type` to receive this enhancement. This is in addition to any other restrictions made by other properties.
	 */
	roll_type: 'progress_roll'
	trigger?: TriggerProgressRollEnhancement
}

/**
 *   - `no_roll`: A move that makes no action rolls or progress rolls.
 *   - `action_roll`: A move that makes an action roll.
 *   - `progress_roll`: A progress move that rolls on a standard progress track type (defined by this move).
 *   - `special_track`: A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
 */
export type MoveRollType =
	| 'no_roll'
	| 'action_roll'
	| 'progress_roll'
	| 'special_track'

/**
 * A progress move that rolls on a special track, such as Legacies (Starforged) or Bonds (classic Ironsworn). For progress moves that use standard progress tracks, see MoveProgressRoll instead.
 */
export interface MoveSpecialTrack {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: MoveId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.
	 */
	replaces?: MoveId
	/**
	 * The complete rules text of the move.
	 */
	text: MarkdownString
	/**
	 * Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement.
	 */
	oracles?: OracleTableId[]
	/**
	 * A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
	 */
	roll_type: 'special_track'
	/**
	 * Trigger conditions for this move.
	 */
	trigger: TriggerSpecialTrack
	outcomes: MoveOutcomes
}

/**
 * An object that describes changes to a move. These changes should be applied recursively, altering only the specified properties; enhanced arrays should be concatencated with the original array value.
 */
export interface MoveSpecialTrackEnhancement {
	/**
	 * An array of wildcard IDs. An item must match one of the wildcard IDs to receive this enhancement. If this is `null`, any ID is valid.
	 * @default null
	 */
	enhances?: MoveIdWildcard[] | null
	/**
	 * A move must have this `roll_type` to receive this enhancement. This is in addition to any other restrictions made by other properties.
	 */
	roll_type: 'special_track'
	trigger?: TriggerSpecialTrackEnhancement
}

/**
 *   - `miss`: An automatic miss.
 *   - `weak_hit`: An automatic weak hit.
 *   - `strong_hit`: An automatic strong hit.
 *   - `progress_roll`: Make a progress roll on a progress track associated with this move.
 */
export type ProgressRollMethod =
	| 'miss'
	| 'weak_hit'
	| 'strong_hit'
	| 'progress_roll'

export interface ProgressRollOption {
	using: 'progress_track'
}

/**
 *   - `miss`: An automatic miss.
 *   - `weak_hit`: An automatic weak hit.
 *   - `strong_hit`: An automatic strong hit.
 *   - `player_choice`: The player chooses which roll option to use.
 *   - `highest`: Use the roll option with the best/highest value.
 *   - `lowest`: Use the roll option with the worst/lowest value.
 *   - `all`: Use _every_ roll option at once.
 */
export type SpecialTrackRollMethod =
	| 'miss'
	| 'weak_hit'
	| 'strong_hit'
	| 'player_choice'
	| 'highest'
	| 'lowest'
	| 'all'

/**
 * Describes trigger conditions for a move that makes an action roll.
 */
export interface TriggerActionRoll {
	/**
	 * A markdown string containing the primary trigger text for this move.
	 *
	 * Secondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.
	 * @pattern ```javascript
	 * /.*\.{3}/
	 * ```
	 */
	text: MarkdownString
	/**
	 * Specific conditions that qualify for this trigger.
	 */
	conditions: TriggerActionRollCondition[]
}

export interface TriggerActionRollCondition {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	method: ActionRollMethod
	/**
	 * The options available when rolling with this trigger condition.
	 */
	roll_options: RollableValue[]
}

export interface TriggerActionRollConditionEnhancement {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	/**
	 * A `null` value means this condition provides no roll mechanic of its own; it must be used with another trigger condition that provides a non-null `method`.
	 * @default null
	 */
	method?: ActionRollMethod | null
	/**
	 * @default null
	 */
	roll_options?: RollableValue[] | null
}

/**
 * Describes changes/additions made to the enhanced move's trigger conditions.
 */
export interface TriggerActionRollEnhancement {
	/**
	 * Trigger conditions added to the enhanced move.
	 */
	conditions: TriggerActionRollConditionEnhancement[]
}

/**
 * Information on who can trigger this trigger condition. Usually this is just the player, but some asset abilities can trigger from an ally's move.
 */
export interface TriggerBy {
	/**
	 * Can this trigger be activated by the player who owns this?
	 * @default true
	 */
	player?: boolean
	/**
	 * Can this trigger be activated by one of the player's allies?
	 * @default false
	 */
	ally?: boolean
}

/**
 * Describes trigger conditions for a move that makes no rolls.
 */
export interface TriggerNoRoll {
	/**
	 * A markdown string containing the primary trigger text for this move.
	 *
	 * Secondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.
	 * @pattern ```javascript
	 * /.*\.{3}/
	 * ```
	 */
	text: MarkdownString
	/**
	 * Specific conditions that qualify for this trigger.
	 * @default null
	 */
	conditions?: TriggerNoRollCondition[] | null
}

export interface TriggerNoRollCondition {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	/**
	 * @default null
	 */
	method?: null
	/**
	 * The options available when rolling with this trigger condition.
	 * @default null
	 */
	roll_options?: null
}

/**
 * Describes changes/additions made to the enhanced move's trigger conditions.
 */
export interface TriggerNoRollEnhancement {
	/**
	 * Trigger conditions added to the enhanced move.
	 */
	conditions: TriggerNoRollCondition[]
}

export interface TriggerProgressRoll {
	/**
	 * A markdown string containing the primary trigger text for this move.
	 *
	 * Secondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.
	 * @pattern ```javascript
	 * /.*\.{3}/
	 * ```
	 */
	text: MarkdownString
	/**
	 * Specific conditions that qualify for this trigger.
	 */
	conditions: TriggerProgressRollCondition[]
}

export interface TriggerProgressRollCondition {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	/**
	 * @default "progress_roll"
	 */
	method?: ProgressRollMethod
	/**
	 * The options available when rolling with this trigger condition.
	 */
	roll_options: ProgressRollOption[]
}

export interface TriggerProgressRollConditionEnhancement {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	/**
	 * A `null` value means this condition provides no roll mechanic of its own; it must be used with another trigger condition that provides a non-null `method`.
	 * @default null
	 */
	method?: ProgressRollMethod | null
	/**
	 * @default null
	 */
	roll_options?: ProgressRollOption[] | null
}

/**
 * Describes changes/additions made to the enhanced move's trigger conditions.
 */
export interface TriggerProgressRollEnhancement {
	/**
	 * Trigger conditions added to the enhanced move.
	 */
	conditions: TriggerProgressRollConditionEnhancement[]
}

export interface TriggerSpecialTrack {
	/**
	 * A markdown string containing the primary trigger text for this move.
	 *
	 * Secondary trigger text (for specific stats or uses of an asset ability) may be described in individual trigger conditions.
	 * @pattern ```javascript
	 * /.*\.{3}/
	 * ```
	 */
	text: MarkdownString
	/**
	 * Specific conditions that qualify for this trigger.
	 */
	conditions: TriggerSpecialTrackCondition[]
}

export interface TriggerSpecialTrackCondition {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	method: SpecialTrackRollMethod
	/**
	 * The options available when rolling with this trigger condition.
	 */
	roll_options: TriggerSpecialTrackConditionOption[]
}

/**
 * A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn), Failure (Delve), or Legacy (Starforged).
 */
export interface TriggerSpecialTrackConditionEnhancement {
	/**
	 * A markdown string of any trigger text specific to this trigger condition.
	 */
	text?: MarkdownString
	by?: TriggerBy
	/**
	 * A `null` value means this condition provides no roll mechanic of its own; it must be used with another trigger condition that provides a non-null `method`.
	 * @default null
	 */
	method?: SpecialTrackRollMethod | null
	/**
	 * @default null
	 */
	roll_options?: TriggerSpecialTrackConditionOption[] | null
}

export interface TriggerSpecialTrackConditionOption {
	using: SpecialTrackType
}

/**
 * Describes changes/additions made to the enhanced move's trigger conditions.
 */
export interface TriggerSpecialTrackEnhancement {
	/**
	 * Trigger conditions added to the enhanced move.
	 */
	conditions: TriggerSpecialTrackConditionEnhancement[]
}

export interface Asset {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A localized category label for this asset. This is the surtitle above the asset's name on the card.
	 * @example "Combat Talent"
	 * @example "Command Vehicle"
	 * @example "Companion"
	 * @example "Deed"
	 * @example "Module"
	 * @example "Path"
	 * @example "Ritual"
	 * @example "Support Vehicle"
	 */
	asset_type: Label
	/**
	 * This asset's icon.
	 */
	icon?: SvgImageUrl
	/**
	 * A thematic color associated with this asset.
	 */
	color?: CssColor
	/**
	 * Options are input fields set when the player purchases the asset. They're likely to remain the same through the life of the asset. Typically, they are rendered at the top of the asset card.
	 * @remarks Deserialize as a dictionary object.
	 */
	options?: Record<DictKey, AssetOptionField>
	/**
	 * Describes prerequisites for purchasing or using this asset.
	 */
	requirement?: MarkdownString
	abilities: AssetAbility[]
	/**
	 * Controls are condition meters, clocks, counters, and other asset input fields whose values are expected to change throughout the life of the asset.
	 * @remarks Deserialize as a dictionary object.
	 */
	controls?: Record<DictKey, AssetControlField>
	/**
	 * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
	 * @default false
	 */
	count_as_impact?: boolean
	attachments?: AssetAttachment
	/**
	 * Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.
	 * @default false
	 */
	shared?: boolean
}

/**
 * An asset ability: one of the purchasable features of an asset. Most assets have three.
 */
export interface AssetAbility {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetAbilityId
	/**
	 * A handful of asset abilities have a label/name, for instance classic Ironsworn companion assets. Most canonical assets omit this property.
	 */
	name?: Label
	/**
	 * The complete rules text of this asset ability.
	 */
	text: MarkdownString
	/**
	 * Is this asset ability enabled?
	 * @default false
	 */
	enabled?: boolean
	/**
	 * Unique moves added by this asset ability.
	 * @remarks Deserialize as a dictionary object.
	 */
	moves?: Record<DictKey, Move>
	/**
	 * Fields that are expected to be set once and remain the same through the life of the asset.
	 * @remarks Deserialize as a dictionary object.
	 */
	options?: Record<DictKey, AssetAbilityOptionField>
	/**
	 * Fields whose values are expected to change over the life of the asset.
	 * @remarks Deserialize as a dictionary object.
	 */
	controls?: Record<DictKey, AssetAbilityControlField>
	/**
	 * Changes made to the asset, when this ability is enabled.
	 */
	enhance_asset?: AssetEnhancement
	/**
	 * Describes changes made to various moves by this asset ability. Usually these require specific trigger conditions.
	 */
	enhance_moves?: MoveEnhancement[]
}

/**
 * Represents a checkbox.
 * @remarks Semantics are similar to the `<input type="checkbox">` element.
 */
export interface AssetAbilityCheckbox {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetAbilityControlFieldId
	label: InputLabel
	/**
	 * Is the box checked?
	 * @default false
	 */
	value?: boolean
	field_type: 'checkbox'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
	/**
	 * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?
	 * @default false
	 */
	is_impact?: boolean
	/**
	 * Does this field disable the asset when its value is set to `true`?
	 * @default false
	 */
	disables_asset?: boolean
}

/**
 * A clock with 4 or more segments.
 * @remarks Semantics are similar to `<input type="number">`, but rendered as a clock (a circle with equally sized wedges).
 */
export interface AssetAbilityClock {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetAbilityControlFieldId
	label: InputLabel
	/**
	 * The current number of filled clock segments.
	 * @default 0
	 */
	value?: number
	/**
	 * The minimum number of filled clock segments. This is always 0.
	 */
	min?: 0
	/**
	 * The size of the clock -- in other words, the maximum number of filled clock segments. Standard clocks have 4, 6, 8, or 10 segments.
	 */
	max: number
	field_type: 'clock'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetAbilityControlField =
	| AssetAbilityClock
	| AssetAbilityCounter
	| AssetAbilityCheckbox

/**
 * A basic counter representing a non-rollable integer value. They usually start at 0, and may or may not have a maximum.
 * @remarks Semantics are similar to `<input type="number" step="1">`
 */
export interface AssetAbilityCounter {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetAbilityControlFieldId
	label: InputLabel
	/**
	 * The current value of this input.
	 * @default 0
	 */
	value?: number
	/**
	 * The (inclusive) minimum value.
	 * @default 0
	 */
	min?: number
	/**
	 * The (inclusive) maximum value, or `null` if there's no maximum.
	 * @default null
	 */
	max?: number | null
	field_type: 'counter'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetAbilityOptionField = {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetAbilityOptionFieldId
	label: InputLabel
	/**
	 * The content of this text input, or `null` if it's empty
	 * @default null
	 */
	value?: string | null
	field_type: 'text'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * Describes which assets can be attached to this asset. Example: Starforged's Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.
 */
export interface AssetAttachment {
	/**
	 * Asset IDs (which may be wildcards) that may be attached to this asset
	 */
	assets: AssetIdWildcard[]
	/**
	 * Null if there's no upper limit to the number of attached assets.
	 * @default null
	 */
	max?: number | null
}

/**
 * When its value is set to `true` it means that the card is flipped over. Some assets use this to represent a 'broken' state (e.g. Starforged Module assets).
 */
export interface AssetCardFlipControlField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetControlFieldId
	label: InputLabel
	/**
	 * Is the card flipped over?
	 * @default false
	 */
	value?: boolean
	field_type: 'card_flip'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
	/**
	 * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?
	 * @default false
	 */
	is_impact?: boolean
	/**
	 * Does this field disable the asset when its value is set to `true`?
	 * @default false
	 */
	disables_asset?: boolean
}

/**
 * Represents a checkbox.
 * @remarks Semantics are similar to the `<input type="checkbox">` element.
 */
export interface AssetCheckboxControlField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetControlFieldId
	label: InputLabel
	/**
	 * Is the box checked?
	 * @default false
	 */
	value?: boolean
	field_type: 'checkbox'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
	/**
	 * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?
	 * @default false
	 */
	is_impact?: boolean
	/**
	 * Does this field disable the asset when its value is set to `true`?
	 * @default false
	 */
	disables_asset?: boolean
}

/**
 * Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".
 */
export interface AssetConditionMeter {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetControlFieldId
	label: InputLabel
	/**
	 * The current value of this meter.
	 */
	value: number
	/**
	 * The minimum value of this meter.
	 * @default 0
	 */
	min?: number
	/**
	 * The maximum value of this meter.
	 */
	max: number
	field_type: 'condition_meter'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
	/**
	 * Provides hints for moves that interact with this condition meter, such as suffer and recovery moves.
	 */
	moves?: {
		/**
		 * The ID(s) of suffer moves associated with the condition meter. If the suffer move makes an action roll, this condition meter value should be made available as a roll option.
		 */
		suffer?: MoveIdWildcard[]
		/**
		 * The ID(s) of recovery moves associated with this meter.
		 */
		recover?: MoveIdWildcard[]
	}
	/**
	 * Checkbox controls rendered as part of the condition meter.
	 * @remarks Deserialize as a dictionary object.
	 */
	controls?: Record<DictKey, AssetConditionMeterControlField>
}

/**
 * A checkbox control field, rendered as part of an asset condition meter.
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetConditionMeterControlField =
	| {
			/**
			 * The unique Datasworn ID for this item.
			 */
			id?: AssetConditionMeterControlFieldId
			label: InputLabel
			/**
			 * Is the box checked?
			 * @default false
			 */
			value?: boolean
			field_type: 'checkbox'
			/**
			 * An icon associated with this input.
			 */
			icon?: SvgImageUrl
			/**
			 * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?
			 * @default false
			 */
			is_impact?: boolean
			/**
			 * Does this field disable the asset when its value is set to `true`?
			 * @default false
			 */
			disables_asset?: boolean
	  }
	| {
			/**
			 * The unique Datasworn ID for this item.
			 */
			id?: AssetConditionMeterControlFieldId
			label: InputLabel
			/**
			 * Is the card flipped over?
			 * @default false
			 */
			value?: boolean
			field_type: 'card_flip'
			/**
			 * An icon associated with this input.
			 */
			icon?: SvgImageUrl
			/**
			 * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its value is set to `true`?
			 * @default false
			 */
			is_impact?: boolean
			/**
			 * Does this field disable the asset when its value is set to `true`?
			 * @default false
			 */
			disables_asset?: boolean
	  }

/**
 * Some assets provide a special condition meter of their own. The most common example is the health meters on companion assets. Asset condition meters may also include their own controls, such as the checkboxes that Starforged companion assets use to indicate they are "out of action".
 */
export interface AssetConditionMeterEnhancement {
	/**
	 * The maximum value of this meter.
	 */
	max: number
	field_type: 'condition_meter'
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetControlField =
	| AssetSelectEnhancementControlField
	| AssetCheckboxControlField
	| AssetCardFlipControlField

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetControlFieldEnhancement = AssetConditionMeterEnhancement

/**
 * Describes enhancements made to this asset in a partial asset object. The changes should be applied recursively; only the values that are specified should be changed.
 */
export interface AssetEnhancement {
	/**
	 * Controls are condition meters, clocks, counters, and other asset input fields whose values are expected to change throughout the life of the asset.
	 * @remarks Deserialize as a dictionary object.
	 */
	controls?: Record<DictKey, AssetControlFieldEnhancement>
	suggestions?: Suggestions
	/**
	 * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
	 */
	count_as_impact?: boolean
	attachments?: AssetAttachment
	/**
	 * Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.
	 */
	shared?: boolean
}

/**
 * Options are asset input fields which are set once, usually when the character takes the asset. The most common example is the "name" field on companion assets. A more complex example is the choice of a god's stat for the Devotant asset.
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `field_type` property as a discriminator.
 */
export type AssetOptionField =
	| AssetSelectValueOptionField
	| AssetSelectEnhancementOptionField
	| AssetTextOptionField

/**
 * Select from player and/or asset enhancements. Use it to describe modal abilities. For examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).
 * @remarks Semantics are similar to the HTML `<select>` element
 */
export interface AssetSelectEnhancementControlField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetControlFieldId
	label: InputLabel
	/**
	 * The current value of this input.
	 * @default null
	 */
	value?: DictKey | null
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	choices: Record<
		DictKey,
		SelectEnhancementFieldChoice | SelectEnhancementFieldChoiceGroup
	>
	field_type: 'select_enhancement'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * Select from player and/or asset enhancements. Use it to describe modal abilities. For examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).
 * @remarks Semantics are similar to the HTML `<select>` element
 */
export interface AssetSelectEnhancementOptionField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetOptionFieldId
	label: InputLabel
	/**
	 * The current value of this input.
	 * @default null
	 */
	value?: DictKey | null
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	choices: Record<
		DictKey,
		SelectEnhancementFieldChoice | SelectEnhancementFieldChoiceGroup
	>
	field_type: 'select_enhancement'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * Represents a list of mutually exclusive choices.
 * @remarks Semantics are similar to the HTML `<select>` element
 */
export interface AssetSelectValueOptionField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetOptionFieldId
	label: InputLabel
	/**
	 * The current value of this input.
	 * @default null
	 */
	value?: DictKey | null
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	choices: Record<DictKey, SelectValueFieldChoice>
	field_type: 'select_value'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

/**
 * Represents an input that accepts plain text.
 * @remarks Semantics are similar to the HTML `<input type="text">` element.
 */
export interface AssetTextOptionField {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetOptionFieldId
	label: InputLabel
	/**
	 * The content of this text input, or `null` if it's empty
	 * @default null
	 */
	value?: string | null
	field_type: 'text'
	/**
	 * An icon associated with this input.
	 */
	icon?: SvgImageUrl
}

export interface AssetType {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AssetTypeId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A thematic color associated with this collection.
	 */
	color?: CssColor
	/**
	 * A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	images?: WebpImageUrl[]
	/**
	 * An SVG icon associated with this collection.
	 */
	icon?: SvgImageUrl
	/**
	 * This collection's content enhances the identified collection, rather than being a standalone collection of its own.
	 */
	enhances?: AssetTypeId
	/**
	 * This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.
	 */
	replaces?: AssetTypeId
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	contents?: Record<DictKey, Asset>
}

/**
 * Represents an option in a list of choices.
 * @remarks Semantics are similar to the HTML `<option>` element.
 */
export interface SelectEnhancementFieldChoice {
	label: InputLabel
	option_type: 'option'
	enhance_asset?: AssetEnhancement
	enhance_moves?: MoveEnhancement[]
}

/**
 * Represents a grouping of options in a list of choices.
 * @remarks Semantics are similar to the HTML `<optgroup>` element.
 */
export interface SelectEnhancementFieldChoiceGroup {
	/**
	 * A label for this option group.
	 */
	name: InputLabel
	option_type: 'option_group'
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	choices: Record<DictKey, SelectEnhancementFieldChoice>
}

/**
 * @remarks Deserialize as a discriminated union/polymorphic object type, using the `using` property as a discriminator.
 */
export type SelectValueFieldChoice =
	| {
			label: InputLabel
			option_type: 'option'
			stat: StatKey
			/**
			 * A reference to the value of a standard player character stat.
			 */
			using: 'stat'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			condition_meter: ConditionMeterKey
			/**
			 * A reference to the value of a standard player condition meter.
			 */
			using: 'condition_meter'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			/**
			 * Asset IDs (which may be wildcarded) that may provide the control field. For asset ability enhancements, `null` is used to represent the asset's own control fields.
			 * @default null
			 */
			assets?: AssetIdWildcard[] | null
			/**
			 * The dictionary key of the asset control field.
			 * @example "health"
			 * @example "integrity"
			 */
			control: DictKey
			/**
			 * A reference to the value of an asset control.
			 */
			using: 'asset_control'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			/**
			 * Asset IDs (which may be wildcarded) that may provide the option field. For asset ability enhancements, `null` is used to represent the asset's own option fields.
			 * @default null
			 */
			assets?: AssetIdWildcard[] | null
			/**
			 * The dictionary key of the asset option field.
			 */
			option: DictKey
			/**
			 * A reference to the value of an asset option.
			 */
			using: 'asset_option'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			/**
			 * The dictionary key of the asset control field.
			 * @example "health"
			 * @example "integrity"
			 */
			control: DictKey
			/**
			 * A reference to the value of an attached asset control. For example, a Module asset could use this to roll using the `integrity` control of an attached Vehicle.
			 */
			using: 'attached_asset_control'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			/**
			 * The dictionary key of the asset option field.
			 */
			option: DictKey
			/**
			 * A reference to the value of an attached asset option.
			 */
			using: 'attached_asset_option'
	  }
	| {
			label: InputLabel
			option_type: 'option'
			value: number
			/**
			 * An arbitrary static integer value with a label.
			 */
			using: 'custom'
	  }

/**
 * A setting truth category.
 */
export interface Truth {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: TruthId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	icon?: SvgImageUrl
	options: TruthOption[]
	your_character?: MarkdownString
}

export interface TruthOption {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: TruthOptionId
	min?: number
	max?: number
	summary?: MarkdownString
	description: MarkdownString
	quest_starter: MarkdownString
	table?: TruthOptionTableRow[]
}

/**
 * Represents a row in an oracle table.
 */
export interface TruthOptionTableRow {
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.
	 * @default null
	 */
	min?: number | null
	/**
	 * High end of the dice range for this table row. `null` represents an unrollable row, included only for rendering purposes.
	 * @default null
	 */
	max?: number | null
}

export interface Atlas {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AtlasId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * A thematic color associated with this collection.
	 */
	color?: CssColor
	/**
	 * A brief summary of this collection, no more than a few sentences in length. This is intended for use in application tooltips and similar sorts of hints. Longer text should use the "description" key instead.
	 */
	summary?: MarkdownString
	/**
	 * A longer description of this collection, which might include multiple paragraphs. If it's only a couple sentences, use the `summary` key instead.
	 */
	description?: MarkdownString
	images?: WebpImageUrl[]
	/**
	 * An SVG icon associated with this collection.
	 */
	icon?: SvgImageUrl
	/**
	 * This collection's content enhances the identified collection, rather than being a standalone collection of its own.
	 */
	enhances?: AtlasId
	/**
	 * This collection replaces the identified collection. References to the replaced collection can be considered equivalent to this collection.
	 */
	replaces?: AtlasId
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	contents?: Record<DictKey, AtlasEntry>
	/**
	 * @remarks Deserialize as a dictionary object.
	 */
	collections?: Record<DictKey, Atlas>
}

/**
 * An atlas entry, like the Ironlands region entries found in classic Ironsworn.
 */
export interface AtlasEntry {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: AtlasEntryId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	features: MarkdownString[]
	summary?: MarkdownString
	description: MarkdownString
	quest_starter: MarkdownString
	your_truth?: MarkdownString
}

/**
 * A basic, rollable player character resource specified by the ruleset.
 * @example "health"
 * @example "spirit"
 * @example "supply"
 */
export type ConditionMeterKey = DictKey

/**
 * A basic player character stat.
 * @example "edge"
 * @example "heart"
 * @example "iron"
 * @example "shadow"
 * @example "wits"
 */
export type StatKey = DictKey

/**
 * A rarity, as described in Ironsworn: Delve.
 */
export interface Rarity {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: RarityId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	/**
	 * The asset augmented by this rarity.
	 */
	asset: AssetId
	icon?: SvgImageUrl
	/**
	 * From Ironsworn: Delve, p. 174:
	 *
	 *       Some assets will bring a rarity into play more often than others, so the experience point cost for a rarity will vary by the linked asset. These costs are shown in the tables on page 175.
	 *
	 *       If you are playing solo, and aren’t concerned with the relative balance of rarity abilities, you can ignore these variable costs. If so, spend 3 experience points to purchase a rarity.
	 * @default 3
	 */
	xp_cost?: number
	description: MarkdownString
}

/**
 * A delve site with a theme, domain, and denizens.
 */
export interface DelveSite {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DelveSiteId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	icon?: SvgImageUrl
	rank: ChallengeRank
	/**
	 * The ID of an atlas entry representing the region in which this delve site is located.
	 */
	region?: AtlasEntryId
	theme: DelveSiteThemeId
	domain: DelveSiteDomainId
	/**
	 * An additional theme or domain card ID, for use with optional rules in Ironsworn: Delve.
	 */
	extra_card?: DelveSiteThemeId | DelveSiteDomainId
	description: MarkdownString
	denizens: DelveSiteDenizen[] &
		[
			{
				min: 1
				max: 27
				frequency: 'very_common'
			},
			{
				min: 28
				max: 41
				frequency: 'common'
			},
			{
				min: 42
				max: 55
				frequency: 'common'
			},
			{
				min: 56
				max: 69
				frequency: 'common'
			},
			{
				min: 70
				max: 75
				frequency: 'uncommon'
			},
			{
				min: 76
				max: 81
				frequency: 'uncommon'
			},
			{
				min: 82
				max: 87
				frequency: 'uncommon'
			},
			{
				min: 88
				max: 93
				frequency: 'uncommon'
			},
			{
				min: 94
				max: 95
				frequency: 'rare'
			},
			{
				min: 96
				max: 97
				frequency: 'rare'
			},
			{
				min: 98
				max: 99
				frequency: 'rare'
			},
			{
				min: 100
				max: 100
				frequency: 'unforeseen'
			}
		]
}

export interface DelveSiteDenizen {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DelveSiteDenizenId
	name?: Label
	min: number
	max: number
	/**
	 * The ID of the relevant NPC entry, if one is specified.
	 */
	npc?: NpcId
	frequency: DelveSiteDenizenFrequency
}

export type DelveSiteDenizenFrequency =
	| 'very_common'
	| 'common'
	| 'uncommon'
	| 'rare'
	| 'unforeseen'

/**
 * A delve site Domain card.
 */
export interface DelveSiteDomain {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DelveSiteDomainId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	summary: MarkdownString
	description?: MarkdownString
	icon?: SvgImageUrl
	/**
	 * An oracle table ID containing place name elements. For examples, see oracle ID `delve/oracles/site_name/place/barrow`, and its siblings in oracle collection ID `delve/collections/oracles/site_name/place`. These oracles are used by the site name oracle from Ironsworn: Delve (ID: delve/oracles/site_name/format) to create random names for delve sites.
	 */
	name_oracle?: OracleTableId
	features: DelveSiteDomainFeatureRow[] &
		[
			{
				min: 21
				max: 43
			},
			{
				min: 44
				max: 56
			},
			{
				min: 57
				max: 64
			},
			{
				min: 65
				max: 68
			},
			{
				min: 69
				max: 72
			},
			{
				min: 73
				max: 76
			},
			{
				min: 77
				max: 80
			},
			{
				min: 81
				max: 84
			},
			{
				min: 85
				max: 88
			},
			{
				min: 89
				max: 98
			},
			{
				min: 99
				max: 99
			},
			{
				min: 100
				max: 100
			}
		]
	dangers: DelveSiteDomainDangerRow[] &
		[
			{
				min: 31
				max: 33
			},
			{
				min: 34
				max: 36
			},
			{
				min: 37
				max: 39
			},
			{
				min: 40
				max: 42
			},
			{
				min: 43
				max: 45
			}
		]
}

/**
 * Represents a single Danger entry from a delve site Domain card.
 */
export interface DelveSiteDomainDangerRow {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DomainDangerRowId
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row.
	 */
	min: number
	/**
	 * High end of the dice range for this table row.
	 */
	max: number
}

/**
 * Represents a single Feature entry from a delve site Domain card.
 */
export interface DelveSiteDomainFeatureRow {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DomainFeatureRowId
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row.
	 */
	min: number
	/**
	 * High end of the dice range for this table row.
	 */
	max: number
}

/**
 * A delve site theme card.
 */
export interface DelveSiteTheme {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: DelveSiteThemeId
	/**
	 * The primary name/label for this item.
	 */
	name: Label
	/**
	 * The name of this item as it appears on the page in the book, if it's different from `name`.
	 */
	canonical_name?: Label
	/**
	 * Attribution for the original source (such as a book or website) of this item, including the author and licensing information.
	 */
	source: Source
	suggestions?: Suggestions
	summary: MarkdownString
	description?: MarkdownString
	icon?: SvgImageUrl
	features: DelveSiteThemeFeatureRow[] &
		[
			{
				min: 1
				max: 4
			},
			{
				min: 5
				max: 8
			},
			{
				min: 9
				max: 12
			},
			{
				min: 13
				max: 16
			},
			{
				min: 17
				max: 20
			}
		]
	dangers: DelveSiteThemeDangerRow[] &
		[
			{
				min: 1
				max: 5
			},
			{
				min: 6
				max: 10
			},
			{
				min: 11
				max: 12
			},
			{
				min: 13
				max: 14
			},
			{
				min: 15
				max: 16
			},
			{
				min: 17
				max: 18
			},
			{
				min: 19
				max: 20
			},
			{
				min: 21
				max: 22
			},
			{
				min: 23
				max: 24
			},
			{
				min: 25
				max: 26
			},
			{
				min: 27
				max: 28
			},
			{
				min: 29
				max: 30
			}
		]
}

/**
 * Represents a single Danger entry from a delve site Theme card.
 */
export interface DelveSiteThemeDangerRow {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: ThemeDangerRowId
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row.
	 */
	min: number
	/**
	 * High end of the dice range for this table row.
	 */
	max: number
}

/**
 * Represents a single Feature entry from a delve site Theme card.
 */
export interface DelveSiteThemeFeatureRow {
	/**
	 * The unique Datasworn ID for this item.
	 */
	id?: ThemeFeatureRowId
	/**
	 * The primary text content of this row.
	 */
	result: MarkdownString
	icon?: SvgImageUrl
	/**
	 * Optional secondary text content for this row. Generally, this is longer than `result`.
	 */
	summary?: MarkdownString
	/**
	 * Optional tertiary text content for this row. Generally, this is longer than both `result` and `summary`.
	 */
	description?: MarkdownString
	/**
	 * Further oracle rolls prompted by this table row.
	 */
	rolls?: OracleTableRoll[]
	suggestions?: Suggestions
	/**
	 * Hints that the identified table should be rendered inside this table row.
	 */
	embed_table?: OracleTableId
	template?: OracleRollTemplate
	i18n?: I18nHints
	/**
	 * Low end of the dice range for this table row.
	 */
	min: number
	/**
	 * High end of the dice range for this table row.
	 */
	max: number
}
