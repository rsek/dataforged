/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * @minItems 1
 */
export type Authors = [string, ...string[]]
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleCollectionID".
 */
export type OracleCollectionID = string
/**
 * A localized plain text name or label.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Label".
 */
export type Label = string
/**
 * Localized markdown text, usually a few sentences at most.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MarkdownSentences".
 */
export type MarkdownSentences = string
/**
 * Localized markdown text, usually multiple paragraphs. This may include ordered or unordered lists.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MarkdownParagraphs".
 */
export type MarkdownParagraphs = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetID".
 */
export type AssetID = string
export type SuggestedAssets = AssetID[]
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveID".
 */
export type MoveID = string
export type SuggestedMoves = MoveID[]
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableID".
 */
export type OracleTableID = string
export type SuggestedOracleTables = OracleTableID[]
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "EncounterStarforgedID".
 */
export type EncounterStarforgedID = string
export type SuggestedEncounters = EncounterStarforgedID[]
/**
 * A relative URI pointing to an SVG icon.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Icon".
 */
export type Icon = string
/**
 * A CSS hex color. Use it to provide thematic accents when rendering this item.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Color".
 */
export type Color = string
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableColumn".
 */
export type OracleTableColumn =
	| OracleTableColumnRoll
	| OracleTableColumnResult
	| OracleTableColumnSummary
	| OracleTableColumnDescription
/**
 * A localized plain text name or label.
 */
export type Label1 = Label
/**
 * A localized plain text name or label.
 */
export type Label2 = Label
/**
 * A localized plain text name or label.
 */
export type Label3 = Label
/**
 * A localized plain text name or label.
 */
export type Label4 = string
/**
 * Localized markdown text, usually a phrase or single sentence.
 */
export type MarkdownPhrase = string
/**
 * A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).
 *
 * `null` is used in cases where an 'empty' `OracleTableRow.summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT roll output), however, `null` values can be safely omitted.
 */
export type SummaryText = MarkdownSentences | null
/**
 * A table to be rendered inside this table row.
 */
export type OracleTableID1 = string
/**
 *
 *       no_duplicates = Reroll duplicate OracleTableRows
 *       allow_duplicates = Don't reroll duplicate OracleTableRows
 *       make_it_worse = Don't reroll duplicate OracleTableRows; duplicates compound
 *
 */
export type OracleRollMethod =
	| ('no_duplicates' | 'keep_duplicates' | 'make_it_worse')
	| null
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableRowID".
 */
export type OracleTableRowID = string
/**
 * @minItems 1
 */
export type Authors1 = [string, ...string[]]
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveCategoryID".
 */
export type MoveCategoryID = string
/**
 * Localized markdown text, usually a phrase or single sentence.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MarkdownPhrase".
 */
export type MarkdownPhrase1 = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "TriggerOptionProgressStarforged".
 */
export type TriggerOptionProgressStarforged = TriggerOptionBase & {
	using?: ProgressTypeStarforged[]
}
export type RollSelectionMethod = RollSelectionMethod1 & RollSelectionMethod2
export type RollSelectionMethod1 =
	| ('any' | 'highest' | 'lowest' | 'inherit' | 'all')
	| MoveOutcomeType
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveOutcomeType".
 */
export type MoveOutcomeType = 'miss' | 'weak_hit' | 'strong_hit'
export type RollSelectionMethod2 = string
/**
 * Standard progress track types found in Ironsworn: Starforged.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "ProgressTypeStarforged".
 */
export type ProgressTypeStarforged =
	| 'combat_progress'
	| 'vow_progress'
	| 'scene_challenge_progress'
	| 'expedition_progress'
	| 'connection_progress'
	| 'quests_legacy'
	| 'bonds_legacy'
	| 'discoveries_legacy'
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "TriggerOptionActionStarforged".
 */
export type TriggerOptionActionStarforged = TriggerOptionBase & {
	using?: RollableStatStarforgedID[]
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "RollableStatStarforgedID".
 */
export type RollableStatStarforgedID =
	| RollableStatIdCommon
	| ConditionMeterAliasStarforged
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "RollableStatIDCommon".
 */
export type RollableStatIdCommon = StatID | ConditionMeterID
/**
 * ID for a standard player character stat.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "StatID".
 */
export type StatID =
	| 'player/stats/edge'
	| 'player/stats/heart'
	| 'player/stats/iron'
	| 'player/stats/shadow'
	| 'player/stats/wits'
/**
 * ID for a standard player character condition meter.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "ConditionMeterID".
 */
export type ConditionMeterID =
	| 'player/condition_meters/health'
	| 'player/condition_meters/spirit'
	| 'player/condition_meters/supply'
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "ConditionMeterAliasStarforged".
 */
export type ConditionMeterAliasStarforged =
	| 'companion_health'
	| 'attached_asset_meter'
	| 'vehicle_integrity'
	| 'command_vehicle_integrity'
	| 'support_vehicle_integrity'
	| 'incidental_vehicle_integrity'
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveOutcomeMatchable".
 */
export type MoveOutcomeMatchable = MoveOutcome & {
	match?: MoveOutcome
}
/**
 * Localized markdown text, usually one paragraph. This may included ordered or unordered lists.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MarkdownParagraph".
 */
export type MarkdownParagraph = string
/**
 * The ID of the parent Asset of the move, if any.
 */
export type AssetID1 = string
/**
 * The ID of the move that this move is a variant of, if any.
 */
export type MoveID1 = string
/**
 * The ID of the move's category.
 */
export type MoveCategoryID1 = string
/**
 * The ID of the collection to be extended.
 */
export type MoveCategoryID2 = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetTypeID".
 */
export type AssetTypeID = string
/**
 * The ID of the collection to be extended.
 */
export type AssetTypeID1 = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "EncounterNatureStarforged".
 */
export type EncounterNatureStarforged = string
/**
 * Enumerates challenge ranks: 1=troublesome; 2=dangerous; 3=formidable; 4=extreme; 5=epic.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "ChallengeRank".
 */
export type ChallengeRank = 1 | 2 | 3 | 4 | 5
/**
 * Localized markdown text, usually multiple paragraphs. This may include ordered or unordered lists.
 */
export type MarkdownParagraphs1 = string
/**
 * This interface was referenced by `SettingTruths`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "SettingTruthStarforged".
 */
export type SettingTruthStarforged = SettingTruth & {
	options?: OracleTableRow[]
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "ID".
 */
export type Id = string
/**
 * A relative URI pointing to a WEBP image.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Image".
 */
export type Image = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Ruleset".
 */
export type Ruleset = 'classic' | 'starforged'
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleCollectionColumn".
 */
export type OracleCollectionColumn =
	| OracleTableColumnRoll1
	| OracleTableColumnResult1
	| OracleTableColumnSummary1
	| OracleTableColumnDescription1
/**
 * A localized plain text name or label.
 */
export type Label5 = Label
/**
 * A localized plain text name or label.
 */
export type Label6 = Label
/**
 * A localized plain text name or label.
 */
export type Label7 = Label
/**
 * A localized plain text name or label.
 */
export type Label8 = string
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "EncounterID".
 */
export type EncounterID = string
/**
 * The ID of the collection to be extended.
 */
export type OracleCollectionID1 = string

/**
 * Data entry schema for Dataforged, which provides templates and other conveniences like source inheritance. It must be processed into the standard Dataforged format.
 */
export interface DataforgedDataEntry {
	[k: string]: Namespace
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z0-9][a-z0-9_]+$".
 */
export interface Namespace {
	_ruleset: 'starforged'
	_source: Source
	oracles?: Oracles
	moves?: Moves
	assets?: Assets
	encounters?: Encounters
	setting_truths?: SettingTruths
}
/**
 * Metadata describing the source of this item's text content
 */
export interface Source {
	/**
	 * The title of the source document.
	 */
	title: string
	/**
	 * The page number on which this item appears most prominently, if applicable.
	 */
	page?: number
	/**
	 * The URI where the source document is available.
	 */
	uri: string
	authors: Authors
	/**
	 * The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating.
	 */
	date: string
	/**
	 * An absolute URI pointing to the location where this element's license can be found. If it's "null", no license is provided -- use with caution.
	 */
	license: string | null
}
export interface Oracles {
	[k: string]: OracleCollection
}
/**
 * This interface was referenced by `Oracles`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleCollection".
 */
export interface OracleCollection {
	_id?: OracleCollectionID
	title: Title
	source?: Source1
	summary?: MarkdownSentences
	description?: MarkdownParagraphs
	suggestions?: Suggestions
	/**
	 * The elements contained by this collection.
	 */
	contents: {
		[k: string]: OracleTable
	}
	_source?: SourcePartial
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Title".
 */
export interface Title {
	canonical: Label
	standard?: Label
	short?: Label
}
/**
 * Metadata describing the source of this item's text content
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Source".
 */
export interface Source1 {
	/**
	 * The title of the source document.
	 */
	title: string
	/**
	 * The page number on which this item appears most prominently, if applicable.
	 */
	page?: number
	/**
	 * The URI where the source document is available.
	 */
	uri: string
	authors: Authors
	/**
	 * The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating.
	 */
	date: string
	/**
	 * An absolute URI pointing to the location where this element's license can be found. If it's "null", no license is provided -- use with caution.
	 */
	license: string | null
}
/**
 * Related items that can be presented as useful shortcuts.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "Suggestions".
 */
export interface Suggestions {
	assets?: SuggestedAssets
	moves?: SuggestedMoves
	oracles?: SuggestedOracleTables
	encounters?: SuggestedEncounters
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTable".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 */
export interface OracleTable {
	_id?: OracleTableID
	title: Title
	source?: Source1
	summary?: MarkdownSentences
	description?: MarkdownParagraphs
	suggestions?: Suggestions
	rendering?: OracleTableRendering
	match?: OracleMatchBehavior
	table: OracleTableRow[]
	_source?: SourcePartial
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableRendering".
 */
export interface OracleTableRendering {
	/**
	 * The style used to render this table in the source material.
	 *
	 *         * embed_as_column: This table appears as a column of a table handled by its OracleCollection parent.
	 *         * embed_in_row: This table appears in its entirety within the row of another table. Canonical examples appear in the Ironsworn Rulebook and Ironsworn: Delve.
	 *         * table: A standard table, typically with a roll column and a result column.
	 *
	 */
	style?: 'embed_as_column' | 'embed_in_row' | 'table'
	icon?: Icon
	color?: Color
	columns?: {
		[k: string]: OracleTableColumn
	}
}
export interface OracleTableColumnRoll {
	content_type?: 'range'
	label?: Label1
}
export interface OracleTableColumnResult {
	content_type?: 'result'
	label?: Label2
}
export interface OracleTableColumnSummary {
	content_type?: 'summary'
	label?: Label3
}
export interface OracleTableColumnDescription {
	content_type?: 'description'
	label?: Label4
}
/**
 * A handful of oracles have special behavior on a match.
 */
export interface OracleMatchBehavior {
	text: MarkdownSentences
}
/**
 * Represents a row from an oracle table.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableRow".
 */
export interface OracleTableRow {
	/**
	 * The low end of this row's roll range
	 */
	low: number | null
	/**
	 * The high end of this row's roll range
	 */
	high: number | null
	result: MarkdownPhrase
	summary?: SummaryText
	embed_table?: OracleTableID1
	rolls?: OracleRoll[]
	suggestions?: Suggestions
	_id?: OracleTableRowID
}
/**
 * Parameters for an oracle roll.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleTableRoll".
 */
export interface OracleRoll {
	oracle: OracleTableID
	/**
	 * The number of times to roll.
	 */
	times?: number | null
	method?: OracleRollMethod
}
/**
 * A source data stub that inherits data from ancestor elements during post-processing.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "SourcePartial".
 */
export interface SourcePartial {
	/**
	 * The title of the source document.
	 */
	title?: string
	/**
	 * The page number on which this item appears most prominently, if applicable.
	 */
	page?: number
	/**
	 * The URI where the source document is available.
	 */
	uri?: string
	authors?: Authors1
	/**
	 * The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating.
	 */
	date?: string
	/**
	 * An absolute URI pointing to the location where this element's license can be found. If it's "null", no license is provided -- use with caution.
	 */
	license?: string | null
}
export interface Moves {
	/**
	 * This interface was referenced by `Moves`'s JSON-Schema definition
	 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
	 */
	[k: string]: MoveCategoryStarforged | MoveCategoryExtensionStarforged
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveCategoryStarforged".
 */
export interface MoveCategoryStarforged {
	_id?: MoveCategoryID
	title: Title
	source?: Source1
	summary?: MarkdownSentences
	description?: MarkdownParagraphs
	suggestions?: Suggestions
	/**
	 * The elements contained by this collection.
	 */
	contents: {
		[k: string]: MoveStarforged
	}
	_source?: SourcePartial
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveStarforged".
 */
export interface MoveStarforged {
	_id?: MoveID
	name: Label
	trigger: TriggerStarforged
	source?: Source1
	attributes?: {
		[k: string]: CustomStat
	}
	outcomes?: MoveOutcomes
	text: MarkdownParagraphs
	suggestions?: Suggestions
	asset?: AssetID1
	/**
	 * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
	 */
	progress_move?: boolean
	variant_of?: MoveID1
	/**
	 * The ID of any oracles directly referenced by the move, or vice versa.
	 */
	oracles?: OracleTableID[]
	/**
	 * Whether or not the source material presents this rules item as optional.
	 */
	optional?: boolean
	/**
	 * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
	 */
	tags?: string[]
	category?: MoveCategoryID1
	_source?: SourcePartial
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "TriggerStarforged".
 */
export interface TriggerStarforged {
	text: MarkdownPhrase1
	options?: (
		| TriggerOptionProgressStarforged[]
		| TriggerOptionActionStarforged[]
	) &
		unknown[]
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "TriggerOptionBase".
 */
export interface TriggerOptionBase {
	text?: MarkdownPhrase1
	method?: RollSelectionMethod
	roll_type: 'action_roll' | 'progress_roll'
	using: string[]
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "CustomStat".
 */
export interface CustomStat {
	[k: string]: unknown | undefined
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveOutcomes".
 */
export interface MoveOutcomes {
	miss: MoveOutcomeMatchable
	weak_hit: MoveOutcome
	strong_hit: MoveOutcomeMatchable
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveOutcome".
 */
export interface MoveOutcome {
	text: MarkdownParagraph
}
/**
 * Extends a collection with additional items.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "MoveCategoryExtensionStarforged".
 */
export interface MoveCategoryExtensionStarforged {
	_id?: MoveCategoryID
	_extends: MoveCategoryID2
	/**
	 * Items to be added to the extended collection.
	 */
	contents?: {
		[k: string]: MoveStarforged
	}
}
export interface Assets {
	/**
	 * This interface was referenced by `Assets`'s JSON-Schema definition
	 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
	 */
	[k: string]: AssetTypeStarforged | AssetTypeExtensionStarforged
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetTypeStarforged".
 */
export interface AssetTypeStarforged {
	_id?: AssetTypeID
	title: Title
	source?: Source1
	summary?: MarkdownSentences
	description?: MarkdownParagraphs
	suggestions?: Suggestions
	/**
	 * The elements contained by this collection.
	 */
	contents: {
		[k: string]: AssetStarforged
	}
	_source?: SourcePartial
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetStarforged".
 */
export interface AssetStarforged {
	name: Label
	_id?: AssetID
	source?: Source1
	suggestions?: Suggestions
	/**
	 * @minItems 3
	 * @maxItems 3
	 */
	abilities: [
		AssetAbilityStarforged,
		AssetAbilityStarforged,
		AssetAbilityStarforged
	]
	_source?: SourcePartial
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetAbilityStarforged".
 */
export interface AssetAbilityStarforged {
	name?: Label
	text: MarkdownParagraph
	moves?: {
		[k: string]: MoveStarforged
	}
}
/**
 * Extends a collection with additional items.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "AssetTypeExtensionStarforged".
 */
export interface AssetTypeExtensionStarforged {
	_id?: AssetTypeID
	_extends: AssetTypeID1
	/**
	 * Items to be added to the extended collection.
	 */
	contents?: {
		[k: string]: AssetStarforged
	}
}
export interface Encounters {
	[k: string]: EncounterStarforged
}
/**
 * An encounter entry similar to those in Chapter 4 of Ironsworn: Starforged.
 *
 * This interface was referenced by `Encounters`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "EncounterStarforged".
 */
export interface EncounterStarforged {
	name: Label
	nature: EncounterNatureStarforged
	summary: MarkdownSentences
	rank: ChallengeRank
	features: MarkdownPhrase1[]
	drives: MarkdownPhrase1[]
	tactics: MarkdownPhrase1[]
	variants?: EncounterVariants
	description: MarkdownParagraphs
	quest_starter: MarkdownParagraphs1
	source?: Source1
	_id?: EncounterStarforgedID
	suggestions?: Suggestions
	_source?: SourcePartial
}
export interface EncounterVariants {
	[k: string]: EncounterVariantStarforged
}
/**
 * This interface was referenced by `EncounterVariants`'s JSON-Schema definition
 * via the `patternProperty` "^[a-z][a-z_]*[a-z]$".
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "EncounterVariantStarforged".
 */
export interface EncounterVariantStarforged {
	name: Label
	nature: EncounterNatureStarforged
	rank: ChallengeRank
	description: MarkdownParagraphs
	suggestions?: Suggestions
}
export interface SettingTruths {
	[k: string]: SettingTruthStarforged
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "SettingTruth".
 */
export interface SettingTruth {
	_id?: Id
	name: Label
	source?: Source1
	_source?: SourcePartial
}
export interface OracleTableColumnRoll1 {
	content_type?: 'range'
	label?: Label5
}
export interface OracleTableColumnResult1 {
	content_type?: 'result'
	label?: Label6
}
export interface OracleTableColumnSummary1 {
	content_type?: 'summary'
	label?: Label7
}
export interface OracleTableColumnDescription1 {
	content_type?: 'description'
	label?: Label8
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "TriggerBase".
 */
export interface TriggerBase {
	text: MarkdownPhrase1
	options?: TriggerOptionBase[]
}
/**
 * Extends a collection with additional items.
 *
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "OracleCollectionExtension".
 */
export interface OracleCollectionExtension {
	_id?: OracleCollectionID
	_extends: OracleCollectionID1
	/**
	 * Items to be added to the extended collection.
	 */
	contents?: {
		[k: string]: OracleTable
	}
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "SettingTruthOption".
 */
export interface SettingTruthOption {
	quest_starter: MarkdownParagraph
}
/**
 * This interface was referenced by `DataforgedDataEntry`'s JSON-Schema
 * via the `definition` "default".
 */
export interface Default {
	[k: string]: unknown | undefined
}