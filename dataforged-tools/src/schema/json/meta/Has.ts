import type { Display, GameObject, OracleContent, OracleTableRow, Requirements, RollTemplate, Source , Suggestions } from "@schema";

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export interface HasSummary extends HasId {
  /**
   * A user-facing markdown summary of the item. Summary is shorter than {@link HasDescription | Description}, when they're both present.
   * @markdown
   * @localize
   */
  Summary: string;
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export interface HasDescription extends HasId {
  /**
   * A user-facing markdown description of the item, consisting of one or more paragraphs.
   * @markdown
   * @localize
   */
  Description: string;
}

/**
 * Interface for items with aliases.
 * @public
 */
export interface HasAliases {
  /**
   * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
   */
  Aliases: string[];
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export interface HasSource {

  /**
   * Information on this item's source.
   */
  Source: Source;
}

/**
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export interface HasId {
  /**
   * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
   * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+$
   */
  $id: string;
}

/**
 * Interface for items with rendering information.
 * @public
 */
export interface HasDisplay {
  /**
   * Data relevant to this item's display/rendering.
   */
  Display: Display;
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export interface HasText extends HasId {
  /**
   * The item's rules text as a markdown string.
   * @markdown
   * @localize
   */
  Text: string;
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export interface HasSuggestions {
  /**
   * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
   */
  Suggestions: Suggestions;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export interface HasRollTemplate extends HasId {
  /**
   * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
   */
  "Roll template": RollTemplate
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export interface HasOracleContent {
  /**
   * Metadata that describes an oracle's semantic or lexical content.
   */
  Content: OracleContent;
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export interface HasRequirements {
  /**
   * Prerequisites for this item.
   */
  Requires: Requirements;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export interface HasTable extends HasId {  Table: OracleTableRow[]
}

/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `Oracle` in the `Oracles` property of this table's parent.
 * @public
 */
export interface HasSubtable {  Subtable: OracleTableRow[]
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export interface HasGameObjects {
  /**
   * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
   */
  "Game objects": GameObject[]
}
/**
 * @public
 */
export interface HasQuestStarter extends HasId {
  /**
   * A markdown string describing the quest starter associated with this item.
   * @markdown
   * @localize
   */
  "Quest starter": string;
}

/**
 * @public
 */
export interface HasTags {
  /**
   * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
   */
  Tags: string[];
}

/**
 * @public
 */
export interface HasOptional {
  /**
   * Whether or not the source material presents this rules item as optional.
   * @default false
   */
  Optional: boolean;
}

/**
 * @public
 */
export interface HasLabel extends HasId {
  /**
   * The user-facing text label of this item.
   * @localize
   */
  Label: string
}

/**
 * @public
 */
export interface HasTitle extends HasId {    Title: Title
}

/**
 * @public
 */
export interface Title extends HasId {
  /**
   * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+/title$
   */
  $id: string
  /**
   * The title of this item, which here is defined as the associated header text *exactly* as it appears on the page.
   *
   * For items that represent a single table column, this is the label that appears at the top of the column.
   *
   * Use this title if you want high fidelity to the book. For most interactive UX, it's recommended to use {@link Title.Standard} instead.
   *
   * @pattern ^[A-Z][a-z’ \(\)-]+$
   * @localize
   */
  Canonical: string
  /**
   * The recommended title for most implementations.
   *
   * This is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some Ironsworn oracles (because *nobody* remembers it as "Oracle 15").
   *
   * If you need the shortest possible name, see {@link Title.Short} instead.
   * @pattern ^[A-Z][a-z’ -]+$
   * @localize
   */
  Standard: string
  /**
   * The shortest title for this item that remains distinct amongst its siblings.
   *
   * Unless you're very pressed for space, most UX should use {@link Title.Standard} instead.
   *
   * @pattern ^[A-Z][a-z -]+$
   * @localize
   */
  Short: string
}

/**
 * @public
 */
export interface TitleCaseTitle extends Title {
  /**
   * @pattern ^[A-Z][A-z \(\)-’]+$
   */
  Canonical: string
  /**
   * @pattern ^[A-Z][A-z \(\)-’]+$
   */
  Standard: string
  /**
   * @pattern ^[A-Z][A-z -’]+$
   */
  Short: string

}