import type { Suggestions } from "@classes/index.js";
import type { FragmentString , IDisplay , IGameObject , IOracleContent , IOracleUsage, IRequirements, IRow , ISource , ISuggestions , ParagraphsString , RollTemplate , SentenceString } from "@json_out/index.js";

/**
 * Interface for items with a user-facing markdown summary.
 * @internal
 */
export interface IHasSummary {
  /**
   * A user-facing markdown summary of the item.
   */
    Summary: SentenceString | FragmentString;
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @internal
 */
export interface IHasDescription {

  /**
   * A user-facing markdown description of the item, consisting of one or more paragraphs.
   */
  Description: ParagraphsString;
}

/**
 * Interface for items with aliases.
 * @internal
 */
export interface IHasAliases<T extends string = string> {
  /**
   * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
   */
  Aliases: T[];
}

/**
 * Interface for items with sourcing information.
 * @internal
 */
export interface IHasSource<T extends ISource = ISource> {

  /**
   * Information on this item's source.
   */
  Source: T;
}

/**
 * For elements with unique string IDs.
 * @internal
 */
export interface IHasId<T extends string = string> {

  /**
   * The item's unique string ID.
   */
  $id: T;
}

/**
 * Interface for items with a Name key.
 * @internal
 */
export interface IHasName<T extends string = string> {
  /**
   * The item's internal name. Should be unique among its sibling elements, as this key is often used (along with the object's ancestors) to generate its $id.
   * If the item has Display.Title, that should be preferred for most user-facing labels.
   */
  Name: T;
}

/**
 * Interface for items with rendering information.
 * @internal
 */
export interface IHasDisplay<T extends Partial<IDisplay> = Partial<IDisplay>> {
  /**
   * Data relevant to this item's display/rendering.
   */
  Display: T;
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @internal
 */
export interface IHasText<T extends ParagraphsString|SentenceString|FragmentString = ParagraphsString> {
  /**
   * The item's rules text as a markdown string.
   */
  Text: T;
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @internal
 */
export interface IHasSuggestions<T extends ISuggestions | Suggestions = ISuggestions> {
  /**
   * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
   */
  Suggestions: T;
}

/**
 * Interface for items that include roll string templates.
 * @internal
 */
export interface IHasRollTemplate<T extends string> {

  /**
   * Describes the MdString keys of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
   */
  "Roll template": RollTemplate<T>
}

/**
 *
 *
 * @internal
 */
export interface IHasOracleUsage<T extends Partial<IOracleUsage> = IOracleUsage> {
  /**
   */
  Usage: T;
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export interface IHasOracleContent<T extends Partial<IOracleContent> = IOracleContent> {
  /**
   * Metadata that describes an oracle's semantic or lexical content.
   */
  Content: T;
}

/**
 * Interface for items that have prerequisites.
 * @internal
 */
export interface IHasRequirements<T extends Partial<IRequirements> = IRequirements> {
  /**
   * Prerequisites for this item.
   */
  Requires: T;
}

/**
 * Interface for items that have a table-like object.
 * @internal
 */
export interface IHasTable<T extends IRow = IRow> {
  Table : T[]
}

/**
 * Interface for items that have a subtable-like object.
 * @internal
 */
export interface IHasSubtable<T extends IRow = IRow> {
  Subtable : T[]
}

/**
 * Interface for items that have associated game objects.
 * @internal
 */
export interface IHasGameObjects<T extends IGameObject = IGameObject> {
  /**
   * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
   */
  "Game objects": T[]
}

export interface IHasQuestStarter {
  "Quest Starter": ParagraphsString;
}