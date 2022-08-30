import type { IDisplay, IGameObject, IOracleContent, IRequirements, IRollTemplate, IRow, ISource, ISuggestions } from "../index.js";
/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export interface IHasSummary extends IHasId {
    /**
     * A user-facing markdown summary of the item. `Summary` is shorter than {@link IHasDescription | Description}.
     * @markdown
     * @localize
     */
    Summary: string;
}
/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export interface IHasDescription extends IHasId {
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
export interface IHasSource {
    /**
     * Information on this item's source.
     */
    Source: ISource;
}
/**
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export interface IHasId {
    /**
     * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
     * @pattern ^(Starforged|Ironsworn)/[0-9A-z_/-]+$
     */
    $id: string;
}
/**
 * Interface for items with a Name key.
 * @public
 * @deprecated {@link IHasLabel} or {@link IHasTitle} should be used instead.
 */
export interface IHasName {
    /**
     * The item's internal name. Should be unique among its sibling elements, as this key is often used (along with the object's ancestors) to generate its $id.
     *
     * If the item has Display.Title, that should be preferred for most user-facing labels.
     * @localize
     * @deprecated {@link IHasLabel} or {@link IHasTitle} should be used instead.
     */
    Name: string;
}
/**
 * Interface for items with rendering information.
 * @public
 */
export interface IHasDisplay {
    /**
     * Data relevant to this item's display/rendering.
     */
    Display: IDisplay;
}
/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export interface IHasText extends IHasId {
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
export interface IHasSuggestions {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    Suggestions: ISuggestions;
}
/**
 * Interface for items that include roll string templates.
 * @public
 */
export interface IHasRollTemplate extends IHasId {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    "Roll template": IRollTemplate;
}
/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export interface IHasOracleContent {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    Content: IOracleContent;
}
/**
 * Interface for items that have prerequisites.
 * @public
 */
export interface IHasRequirements {
    /**
     * Prerequisites for this item.
     */
    Requires: IRequirements;
}
/**
 * Interface for items that have a table-like object.
 * @public
 */
export interface IHasTable extends IHasId {
    Table: IRow[];
}
/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `IOracle` in the `Oracles` property of this table's parent.
 * @public
 */
export interface IHasSubtable {
    Subtable: IRow[];
}
/**
 * Interface for items that have associated game objects.
 * @public
 */
export interface IHasGameObjects {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    "Game objects": IGameObject[];
}
/**
 * @public
 */
export interface IHasQuestStarter extends IHasId {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     * @localize
     */
    "Quest Starter": string;
}
/**
 * @public
 */
export interface IHasTags {
    /**
     * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
     */
    Tags: string[];
}
/**
 * @public
 */
export interface IHasOptional {
    /**
     * Whether or not the source material presents this rules item as optional.
     * @default false
     */
    Optional: boolean;
}
/**
 * @public
 */
export interface IHasLabel extends IHasId {
    /**
     * The user-facing text label of this item.
     * @localize
     */
    Label: string;
}
/**
 * @public
 */
export interface IHasTitle extends IHasId {
    Title: ITitle;
}
/**
 * @public
 */
export interface ITitle extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/[0-9A-z_/-]+/Title$
     */
    $id: string;
    /**
     * The title of this item, which here is defined as the associated header text *exactly* as it appears on the page.
     *
     * In some cases (e.g. tree displays) this name may be inappropriate; see {@link ITitle.Short} for an alternative.
     * @localize
     */
    Canonical: string;
    /**
     * A short title to use when the canonical title is too long or otherwise inappropriate.
     * @localize
     */
    Short: string;
}
//# sourceMappingURL=IHas.d.ts.map