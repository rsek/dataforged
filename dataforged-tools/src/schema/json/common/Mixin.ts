import type { AlterAsset, AlterMomentum, AlterMove, Display, GameObject, OracleContent, OracleTableRow, Requirements, RollTemplate, Source, Suggestions } from '@schema'

/**
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export interface MixinId {
  /**
   * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
   * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+$
   */
  $id: string
}

/**
 * Enumerates the keys standardized as localizable strings, which are extracted in bulk to produce localization data.
 * @public
 */
export enum LocalizableKey {
  Canonical = 'canonical',
  Short = 'short',
  Standard = 'standard',
  Label = 'label',
  Aliases = 'aliases',
  Requirement = 'requirement',
  Result = 'result',
  Summary = 'summary',
  Description = 'description',
  Text = 'text',
  Features = 'features',
  Drives = 'drives',
  Tactics = 'tactics',
  YourTruth = 'your_truth',
  Character = 'character',
  QuestStarter = 'quest_starter'
}

/**
 * Interface mixin with every locale key -- useful mainly for typechecking with generics like `Partial`.
 * @internal
 */
export interface MixinLocalizable extends
  Title, MixinSummary, MixinLabel, MixinAliases, MixinDescription, MixinText, MixinId, MixinQuestStarter {
  [LocalizableKey.Result]: string
  [LocalizableKey.Requirement]: string
  [LocalizableKey.Features]: string[]
  [LocalizableKey.Drives]: string[]
  [LocalizableKey.Tactics]: string[]
  [LocalizableKey.YourTruth]: string
  [LocalizableKey.Character]: string
}

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export interface MixinSummary extends MixinId {
  /**
   * A user-facing markdown summary of the item. Summary is shorter than {@link MixinDescription | Description}, when they're both present.
   * @markdown
   * @localize
   */
  [LocalizableKey.Summary]: string
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export interface MixinDescription extends MixinId {
  /**
   * A user-facing markdown description of the item, consisting of one or more paragraphs.
   * @markdown
   * @localize
   */
  [LocalizableKey.Description]: string
}

/**
 * Interface for items with aliases.
 * @public
 */
export interface MixinAliases {
  /**
   * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
   * @localize
   */
  [LocalizableKey.Aliases]: string[]
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export interface MixinSource {

  /**
   * Information on this item's source.
   */
  source: Source
}

/**
 * Interface for items with rendering information.
 * @public
 */
export interface MixinDisplay {
  /**
   * Data relevant to this item's display/rendering.
   */
  display: Display
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export interface MixinText extends MixinId {
  /**
   * The item's rules text as a markdown string.
   * @markdown
   * @localize
   */
  [LocalizableKey.Text]: string
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export interface MixinSuggestions {
  /**
   * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
   */
  suggestions: Suggestions
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export interface MixinRollTemplate extends MixinId {
  /**
   * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
   */
  roll_template: RollTemplate
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export interface MixinOracleContent {
  /**
   * Metadata that describes an oracle's semantic or lexical content.
   */
  content: OracleContent
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export interface MixinRequirements {
  /**
   * Prerequisites for this item.
   */
  requires: Requirements
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export interface MixinTable extends MixinId {
  table: OracleTableRow[]
}

/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `Oracle` in the `Oracles` property of this table's parent.
 * @public
 */
export interface MixinSubtable {
  subtable: OracleTableRow[]
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export interface MixinGameObjects {
  /**
   * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
   */
  game_objects: GameObject[]
}
/**
 * @public
 */
export interface MixinQuestStarter extends MixinId {
  /**
   * A markdown string describing the quest starter associated with this item.
   * @markdown
   * @localize
   */
  [LocalizableKey.QuestStarter]: string
}

/**
 * @public
 */
export interface MixinTags {
  /**
   * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
   */
  tags: string[]
}

/**
 * @public
 */
export interface MixinOptional {
  /**
   * Whether or not the source material presents this rules item as optional.
   * @default false
   */
  optional: boolean
}

/**
 * @public
 */
export interface MixinLabel extends MixinId {
  /**
   * The user-facing text label of this item.
   * @localize
   */
  [LocalizableKey.Label]: string
}

/**
 * @public
 */
export interface MixinTitle extends MixinId {
  title: Title
}

/**
 * @public
 */
export interface Title extends MixinId {
  /**
   * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+/title$
   */
  $id: string
  /**
   * The title of this item, which here is defined as the associated header text *exactly* as it appears on the page.
   *
   * For items that represent a single table column, this is the label that appears at the top of the column.
   *
   * Use this title if you want high fidelity to the book. For most interactive UX, it's recommended to use {@link Title.standard} instead.
   *
   * @pattern ^[A-Z][a-z’ \(\)-]+$
   * @localize
   */
  [LocalizableKey.Canonical]: string
  /**
   * The recommended title for most implementations.
   *
   * This is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some Ironsworn oracles (because *nobody* remembers it as "Oracle 15").
   *
   * If you need the shortest possible name, see {@link Title.short} instead.
   * @pattern ^[A-Z][a-z’ -]+$
   * @localize
   */
  [LocalizableKey.Standard]: string
  /**
   * The shortest title for this item that remains distinct amongst its siblings.
   *
   * Unless you're very pressed for space, most UX should use {@link Title.standard} instead.
   *
   * @pattern ^[A-Z][a-z -]+$
   * @localize
   */
  [LocalizableKey.Short]: string
}

/**
 * @public
 */
export interface TitleCaseTitle extends Title {
  /**
   * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the|\((alternate version|by location|Scene Challenge)\))\s?)+$
   */
  [LocalizableKey.Canonical]: string
  /**
   * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the|\((alternate version|by location|Scene Challenge)\))\s?)+$
   */
  [LocalizableKey.Standard]: string
  /**
   * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the)\s?)+$
   */
  [LocalizableKey.Short]: string

}

/**
 * Describes how an item alters other game elements when it's active.
 * @public
 */
export interface MixinAlter extends MixinId {
  /**
     * Information on how this ability alters moves when enabled.
     */
  moves?: AlterMove[] | undefined
  /**
   * Information on how this ability alters its parent asset when enabled.
   */
  properties?: AlterAsset | undefined
  /**
   * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
   */
  momentum?: AlterMomentum | undefined
}
