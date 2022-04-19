import type { IDisplay , IGameObject , IOracleContent , IOracleUsage, IRequirements, IRow , ISource , ISuggestions , RollTemplate  } from "@json_out/index.js";

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export interface IHasSummary {
  /**
   * A user-facing markdown summary of the item.
   * @markdown
   */
    Summary: string;
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export interface IHasDescription {
  /**
   * A user-facing markdown description of the item, consisting of one or more paragraphs.
   * @markdown
   */
  Description: string;
}

/**
 * Interface for items with aliases.
 * @public
 */
export interface IHasAliases {
  /**
   * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
   */
  Aliases: string[];
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export interface IHasSource<T extends ISource = ISource> {

  /**
   * Information on this item's source.
   */
  Source: T;
}

/**
 * For elements with unique string IDs.
 * @public
 */
export interface IHasId<T extends string> {

  /**
   * The item's unique string ID.
   */
  $id: T;
}

/**
 * Interface for items with a Name key.
 * @public
 */
export interface IHasName {
  /**
   * The item's internal name. Should be unique among its sibling elements, as this key is often used (along with the object's ancestors) to generate its $id.
   * If the item has Display.Title, that should be preferred for most user-facing labels.
   */
  Name: string;
}

/**
 * Interface for items with rendering information.
 * @public
 */
export interface IHasDisplay<T extends Partial<IDisplay> = IDisplay> {
  /**
   * Data relevant to this item's display/rendering.
   */
  Display: T;
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export interface IHasText {
  /**
   * The item's rules text as a markdown string.
   * @markdown
   */
  Text: string;
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export interface IHasSuggestions<T extends ISuggestions = ISuggestions> {
  /**
   * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
   */
  Suggestions: T;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export interface IHasRollTemplate<T extends string> {
  /**
   * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
   */
  "Roll template": RollTemplate<T>
}

/**
 * @public
 */
export interface IHasOracleUsage<T extends Partial<IOracleUsage> = IOracleUsage> {
  /**
   */
  Usage: T;
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export interface IHasOracleContent<T extends Partial<IOracleContent> = IOracleContent> {
  /**
   * Metadata that describes an oracle's semantic or lexical content.
   */
  Content: T;
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export interface IHasRequirements<T extends Partial<IRequirements> = IRequirements> {
  /**
   * Prerequisites for this item.
   */
  Requires: T;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export interface IHasTable<T extends IRow = IRow> {
  Table : T[]
}

/**
 * Interface for items that have a subtable-like object.
 * @public
 */
export interface IHasSubtable<T extends IRow = IRow> {
  Subtable : T[]
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export interface IHasGameObjects<T extends IGameObject = IGameObject> {
  /**
   * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
   */
  "Game objects": T[]
}
/**
 * @public
 */
export interface IHasQuestStarter {
  /**
   * A markdown string describing the quest starter associated with this item.
   * @markdown
   */
  "Quest Starter": string;
}