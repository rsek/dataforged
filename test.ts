/**
 * A standalone Datasworn package that describes its own ruleset.
 *
 * A Datasworn package that relies on an external package to provide its ruleset.
 */
export interface RulesPackage {
    /**
     * A dictionary object containing asset types, which contain assets.
     */
    assets?: { [key: string]: AssetType };
    /**
     * A dictionary object containing atlas collections, which contain atlas entries.
     */
    atlas?:            { [key: string]: Atlas };
    datasworn_version: string;
    /**
     * A dictionary object of delve sites, like the premade delve sites presented in Ironsworn:
     * Delve
     */
    delve_sites?: { [key: string]: DelveSite };
    id:           string;
    /**
     * A dictionary object containing move categories, which contain moves.
     */
    moves?: { [key: string]: MoveCategory };
    /**
     * A dictionary object containing NPC collections, which contain NPCs.
     */
    npcs?: { [key: string]: NpcCollection };
    /**
     * A dictionary object containing oracle collections, which may contain oracle tables and/or
     * oracle collections.
     */
    oracles?:     { [key: string]: OracleCollection };
    package_type: PackageType;
    /**
     * A dictionary object containing rarities, like those presented in Ironsworn: Delve.
     */
    rarities?: { [key: string]: Rarity };
    rules?:    Rules;
    /**
     * A dictionary object containing delve site domains.
     */
    site_domains?: { [key: string]: DelveSiteDomain };
    /**
     * A dictionary object containing delve site themes.
     */
    site_themes?: { [key: string]: DelveSiteTheme };
    /**
     * A dictionary object of truth categories.
     */
    truths?:  { [key: string]: Truth };
    ruleset?: string;
}

export interface AssetType {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * A thematic color associated with this collection.
     */
    color?:    string;
    contents?: { [key: string]: Asset };
    /**
     * A longer description of this collection, which might include multiple paragraphs. If it's
     * only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * This collection's content enhances the identified collection, rather than being a
     * standalone collection of its own.
     */
    enhances?: string;
    /**
     * An SVG icon associated with this collection.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * This collection replaces the identified collection. References to the replaced collection
     * can be considered equivalent to this collection.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of this collection, no more than a few sentences in length. This is
     * intended for use in application tooltips and similar sorts of hints. Longer text should
     * use the "description" key instead.
     */
    summary?: string;
}

export interface Asset {
    abilities: AssetAbility[];
    /**
     * A localized category label for this asset. This is the surtitle above the asset's name on
     * the card.
     */
    asset_type:   string;
    attachments?: AssetAttachment;
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * A thematic color associated with this asset.
     */
    color?: string;
    /**
     * Controls are condition meters, clocks, counters, and other asset input fields whose
     * values are expected to change throughout the life of the asset.
     */
    controls?: { [key: string]: AssetControlField };
    /**
     * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
     */
    count_as_impact: boolean;
    /**
     * This asset's icon.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * Options are asset input fields which are set once, usually when the character takes the
     * asset. The most common example is the "name" field on companion assets. A more complex
     * example is the choice of a god's stat for the Devotant asset.
     */
    options?: { [key: string]: AssetOptionField };
    /**
     * Describes prerequisites for purchasing or using this asset.
     */
    requirement?: string;
    /**
     * Most assets only benefit to their owner, but certain assets (like Starforged's module and
     * command vehicle assets) are shared amongst the player's allies, too.
     */
    shared: boolean;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
}

/**
 * Abilities provided by this asset. Most assets have 3.
 */
export interface AssetAbility {
    /**
     * Fields whose values are expected to change over the life of the asset.
     */
    controls?: { [key: string]: AssetAbilityControlField };
    /**
     * Is this asset ability enabled?
     */
    enabled: boolean;
    /**
     * Changes made to the asset, when this ability is enabled.
     */
    enhance_asset?: AssetEnhancement;
    /**
     * Describes changes made to various moves by this asset ability. Usually these require
     * specific trigger conditions.
     */
    enhance_moves?: MoveEnhancement[];
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * Unique moves added by this asset ability.
     */
    moves?: { [key: string]: Move };
    name?:  string;
    /**
     * Fields that are expected to be set once and remain the same through the life of the asset.
     */
    options?: { [key: string]: AssetAbilityOptionField };
    text:     string;
}

/**
 * A clock with 4, 6, 8, or 10 segments.
 *
 * A counter that starts at zero, with an optional maximum value.
 *
 * Represents a checkbox.
 */
export interface AssetAbilityControlField {
    field_type: AssetAbilityControlFieldFieldType;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label: string;
    /**
     * The size of the clock -- in other words, the maximum number of filled clock segments.
     *
     * The (inclusive) maximum value.
     */
    max?: number | null;
    /**
     * The minimum number of filled clock segments. This is always 0.
     *
     * The (inclusive) minimum value.
     */
    min?: number;
    /**
     * The current number of filled clock segments.
     *
     * The current value of this input.
     *
     * Is the box checked?
     */
    value: boolean | number;
    /**
     * Does this field disable the asset when its value is set to `true`?
     */
    disables_asset?: boolean;
    /**
     * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its
     * value is set to `true`?
     */
    is_impact?: boolean;
}

export type AssetAbilityControlFieldFieldType = "clock" | "counter" | "checkbox";

/**
 * Changes made to the asset, when this ability is enabled.
 *
 * Describes enhancements made to this asset in a partial asset object. The changes should
 * be applied recursively; only the values that are specified should be changed.
 */
export interface AssetEnhancement {
    attachments?: AssetAttachment;
    /**
     * Controls are condition meters, clocks, counters, and other asset input fields whose
     * values are expected to change throughout the life of the asset.
     */
    controls?: { [key: string]: AssetControlFieldEnhancement };
    /**
     * If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).
     */
    count_as_impact?: boolean;
    /**
     * Most assets only benefit to their owner, but certain assets (like Starforged's module and
     * command vehicle assets) are shared amongst the player's allies, too.
     */
    shared?:      boolean;
    suggestions?: Suggestions;
}

/**
 * Describes which assets can be attached to this asset. Example: Starforged's Module
 * assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more
 * info.
 */
export interface AssetAttachment {
    /**
     * Asset IDs (which may be wildcards) that may be attached to this asset
     */
    assets: string[];
    /**
     * Null if there's no upper limit to the number of attached assets.
     */
    max: number | null;
}

/**
 * Some assets provide a special condition meter of their own. The most common example is
 * the health meters on companion assets. Asset condition meters may also include their own
 * controls, such as the checkboxes that Starforged companion assets use to indicate they
 * are "out of action".
 */
export interface AssetControlFieldEnhancement {
    field_type: "condition_meter";
    /**
     * The maximum value of this meter.
     */
    max: number;
}

export interface Suggestions {
    assets?:       string[];
    atlas?:        string[];
    moves?:        string[];
    npcs?:         string[];
    oracles?:      string[];
    rarities?:     string[];
    site_domains?: string[];
    site_themes?:  string[];
}

export interface MoveEnhancement {
    /**
     * A move that makes an action roll.
     *
     * A move that makes no action rolls or progress rolls.
     *
     * A progress move that rolls on a standard progress track type (defined by this move).
     *
     * A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn),
     * Failure (Delve), or Legacies (Starforged).
     */
    roll_type: RollType;
    enhances?: string[];
    trigger?:  TriggerEnhancement;
}

export type RollType = "action_roll" | "no_roll" | "progress_roll" | "special_track";

export interface TriggerEnhancement {
    conditions: ConditionElement[];
}

/**
 * A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn),
 * Failure (Delve), or Legacy (Starforged).
 */
export interface ConditionElement {
    by?: TriggerBy;
    /**
     * A `null` value means this condition provides no roll mechanic of its own; it must be used
     * with another trigger condition that provides a non-null `method`.
     */
    method: RollMethod | null;
    /**
     * The options available when rolling with this trigger condition.
     */
    roll_options: ActionRollOption[] | null;
    /**
     * A markdown string of any trigger text specific to this trigger condition.
     */
    text?: string;
}

/**
 * Information on who can trigger this trigger condition. Usually this is just the player,
 * but some asset abilities can trigger from an ally's move.
 */
export interface TriggerBy {
    /**
     * Can this trigger be activated by one of the player's allies?
     */
    ally: boolean;
    /**
     * Can this trigger be activated by the player who owns this?
     */
    player: boolean;
}

/**
 * An automatic miss.
 *
 * An automatic weak hit.
 *
 * An automatic strong hit.
 *
 * The player chooses which roll option to use.
 *
 * Use the roll option with the best/highest value.
 *
 * Use the roll option with the worst/lowest value.
 *
 * Use **every** roll option at once.
 *
 * Make a progress roll on a progress track associated with this move.
 */
export type RollMethod = "miss" | "weak_hit" | "strong_hit" | "player_choice" | "highest" | "lowest" | "all" | "progress_roll";

/**
 * The options available when rolling with this trigger condition.
 */
export interface ActionRollOption {
    /**
     * Roll using a standard player character stat.
     *
     * Roll using the value of a standard player condition meter.
     *
     * Roll using the value of an asset control.
     *
     * Roll using the value of an asset option.
     *
     * Roll using the value of an attached asset control. For example, a Module asset could use
     * this to roll using the `integrity` control of an attached Vehicle.
     *
     * Roll using the value of an attached asset option.
     *
     * Roll using an integer value with customizable labels.
     */
    using:            string;
    stat?:            string;
    condition_meter?: string;
    /**
     * Asset IDs (which may be wildcarded) that provide the control field. For asset ability
     * enhancements, `null` is used to represent the asset's own control fields.
     *
     * Asset IDs (which may be wildcarded) that provide the option field. For asset ability
     * enhancements, `null` is used to represent the asset's own option fields.
     */
    assets?: string[] | null;
    /**
     * The key of the asset control field.
     */
    control?: string;
    /**
     * The key of the asset option field.
     */
    option?: string;
    name?:   string;
    value?:  number;
}

/**
 * A move that makes an action roll.
 *
 * A progress move that rolls on a standard progress track type (defined by the move object).
 */
export interface Move {
    /**
     * A move that makes an action roll.
     *
     * A move that makes no action rolls or progress rolls.
     *
     * A progress move that rolls on a standard progress track type (defined by this move).
     *
     * A progress move that rolls on one or more special tracks, like Bonds (classic Ironsworn),
     * Failure (Delve), or Legacies (Starforged).
     */
    roll_type: RollType;
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * Oracles associated with this move. It's not recommended to roll these automatically, as
     * almost all moves present them as an option, not a requirement.
     */
    oracles?: string[];
    outcomes: MoveOutcomes | null;
    /**
     * Indicates that this move replaces the identified move. References to the replaced move
     * can be considered equivalent to this move.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * The complete rules text of the move.
     */
    text:    string;
    trigger: TriggerClass;
    /**
     * Describes the common features of progress tracks associated with this move.
     */
    tracks?: ProgressTrackTypeInfo;
}

/**
 * A standalone localized description for each move outcome (miss, weak hit, or strong hit).
 * This is for for e.g. VTT implementations, where it's often useful to display only the
 * rules text relevant to a roll result.
 *
 * This often requires light editorialization to create text that can stand alone without
 * reference to the rest of the move. For example, 'as above' (in reference to another move
 * outcome) shouldn't be used here; instead, the relevant text should be repeated.
 */
export interface MoveOutcomes {
    miss:       MoveOutcome;
    strong_hit: MoveOutcome;
    weak_hit:   MoveOutcome;
}

export interface MoveOutcome {
    text: string;
}

/**
 * Attribution for the original source (such as a book or website) of this item, including
 * the author and licensing information.
 *
 * Metadata describing the original source of this item
 */
export interface Source {
    authors: Author[];
    /**
     * The date of the source documents's last update, formatted YYYY-MM-DD. Required because
     * it's used to determine whether the data needs updating.
     */
    date: Date;
    /**
     * An absolute URL pointing to the location where this element's license can be found.
     *
     * A `null` here indicates that the content provides **no** license, and is not intended for
     * redistribution.  Datasworn's build process skips unlicensed content by default.
     */
    license: null | string;
    /**
     * The page number where this item is described in full.
     */
    page?: number;
    /**
     * The title of the source document.
     */
    title: string;
    /**
     * An absolute URL where the source document is available.
     */
    url: string;
}

export interface Author {
    /**
     * An optional email contact for the author
     */
    email?: string;
    name:   string;
    /**
     * An optional URL for the author's website.
     */
    url?: string;
}

/**
 * Describes the common features of progress tracks associated with this move.
 *
 * Describes the features of a type of progress track.
 */
export interface ProgressTrackTypeInfo {
    /**
     * A category label for progress tracks of this type.
     */
    category:  string;
    controls?: { [key: string]: { [key: string]: any } };
}

/**
 * Describes trigger conditions for a move that makes an action roll.
 *
 * Describes trigger conditions for a move that makes no rolls.
 */
export interface TriggerClass {
    /**
     * Specific conditions that qualify for this trigger.
     */
    conditions: TriggerCondition[] | null;
    /**
     * A markdown string containing the primary trigger text for this move.
     *
     * Secondary trigger text (for specific stats or uses of an asset ability) may be described
     * in individual trigger conditions.
     */
    text: string;
}

export interface TriggerCondition {
    by?:    TriggerBy;
    method: RollMethod | null;
    /**
     * The options available when rolling with this trigger condition.
     */
    roll_options: ActionRollOption[] | null;
    /**
     * A markdown string of any trigger text specific to this trigger condition.
     */
    text?: string;
}

/**
 * Represents an input that accepts plain text.
 */
export interface AssetAbilityOptionField {
    field_type: "text";
    /**
     * The unique Datasworn ID for this item.
     */
    id?: string;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label?: string;
    /**
     * The content of this text input, or `null` if it's empty
     */
    value?: null | string;
}

/**
 * Some assets provide a special condition meter of their own. The most common example is
 * the health meters on companion assets. Asset condition meters may also include their own
 * controls, such as the checkboxes that Starforged companion assets use to indicate they
 * are "out of action".
 *
 * Select from player and/or asset enhancements. Use it to describe modal abilities. For
 * examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).
 *
 * Represents a checkbox.
 *
 * When its value is set to `true` it means that the card is flipped over. Some assets use
 * this to represent a 'broken' state (e.g. Starforged Module assets).
 */
export interface AssetControlField {
    field_type: AssetControlFieldFieldType;
    /**
     * Checkbox controls rendered as part of the condition meter.
     */
    controls?: { [key: string]: AssetConditionMeterControlField };
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label: string;
    /**
     * The maximum value of this meter.
     */
    max?: number;
    /**
     * The minimum value of this meter.
     */
    min?: number;
    /**
     * Provides hints for moves that interact with this condition meter, such as suffer and
     * recovery moves.
     */
    moves?: Moves;
    /**
     * The current value of this meter.
     *
     * The current value of this input.
     *
     * Is the box checked?
     *
     * Is the card flipped over?
     */
    value:    boolean | number | null | string;
    choices?: { [key: string]: AssetControlFieldChoice };
    /**
     * Does this field disable the asset when its value is set to `true`?
     */
    disables_asset?: boolean;
    /**
     * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its
     * value is set to `true`?
     */
    is_impact?: boolean;
}

export interface AssetControlFieldChoice {
    option_type: OptionType;
    [property: string]: any;
}

export type OptionType = "option" | "option_group";

/**
 * A checkbox control field, rendered as part of an asset condition meter.
 *
 * Represents a checkbox.
 *
 * When its value is set to `true` it means that the card is flipped over. Some assets use
 * this to represent a 'broken' state (e.g. Starforged Module assets).
 */
export interface AssetConditionMeterControlField {
    field_type: AssetConditionMeterControlFieldFieldType;
    /**
     * Does this field disable the asset when its value is set to `true`?
     */
    disables_asset: boolean;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * Does this field count as an impact (Starforged) or debility (Ironsworn classic) when its
     * value is set to `true`?
     */
    is_impact: boolean;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label: string;
    /**
     * Is the box checked?
     *
     * Is the card flipped over?
     */
    value: boolean;
}

export type AssetConditionMeterControlFieldFieldType = "checkbox" | "card_flip";

export type AssetControlFieldFieldType = "condition_meter" | "select_enhancement" | "checkbox" | "card_flip";

/**
 * Provides hints for moves that interact with this condition meter, such as suffer and
 * recovery moves.
 */
export interface Moves {
    /**
     * The ID(s) of recovery moves associated with this meter.
     */
    recover?: string[];
    /**
     * The ID(s) of suffer moves associated with the condition meter. If the suffer move makes
     * an action roll, this condition meter value should be made available as a roll option.
     */
    suffer?: string[];
}

/**
 * Represents a list of mutually exclusive choices.
 *
 * Select from player and/or asset enhancements. Use it to describe modal abilities. For
 * examples, see Ironclad (classic Ironsworn) and Windbinder (Sundered Isles).
 *
 * Represents an input that accepts plain text.
 */
export interface AssetOptionField {
    field_type: AssetOptionFieldFieldType;
    choices?:   { [key: string]: AssetOptionFieldChoice };
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label: string;
    /**
     * The current value of this input.
     *
     * The content of this text input, or `null` if it's empty
     */
    value: null | string;
}

export interface AssetOptionFieldChoice {
    option_type: OptionType;
    [property: string]: any;
}

export type AssetOptionFieldFieldType = "select_stat" | "select_enhancement" | "text";

export interface Atlas {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    collections?:    { [key: string]: Atlas };
    /**
     * A thematic color associated with this collection.
     */
    color?:    string;
    contents?: { [key: string]: AtlasEntry };
    /**
     * A longer description of this collection, which might include multiple paragraphs. If it's
     * only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * This collection's content enhances the identified collection, rather than being a
     * standalone collection of its own.
     */
    enhances?: string;
    /**
     * An SVG icon associated with this collection.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * This collection replaces the identified collection. References to the replaced collection
     * can be considered equivalent to this collection.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of this collection, no more than a few sentences in length. This is
     * intended for use in application tooltips and similar sorts of hints. Longer text should
     * use the "description" key instead.
     */
    summary?: string;
}

/**
 * An atlas entry, like the Ironlands region entries found in classic Ironsworn.
 */
export interface AtlasEntry {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    description:     string;
    features:        string[];
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name:          string;
    quest_starter: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    summary?:     string;
    your_truth?:  string;
}

/**
 * A delve site with a theme, domain, and denizens.
 */
export interface DelveSite {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    denizens:        DelveSiteDenizen[];
    description:     string;
    domain:          string;
    /**
     * An additional theme or domain card ID, for use with optional rules in Ironsworn: Delve.
     */
    extra_card?: string;
    icon?:       string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    rank: number;
    /**
     * The ID of an atlas entry representing the region in which this delve site is located.
     */
    region?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    theme:        string;
}

export interface DelveSiteDenizen {
    frequency: DelveSiteDenizenFrequency;
    /**
     * The unique Datasworn ID for this item.
     */
    id:    string;
    max:   number;
    min:   number;
    name?: string;
    /**
     * The ID of the relevant NPC entry, if one is specified.
     */
    npc?: string;
}

export type DelveSiteDenizenFrequency = "very_common" | "common" | "uncommon" | "rare" | "unforeseen";

export interface MoveCategory {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * A thematic color associated with this collection.
     */
    color?:    string;
    contents?: { [key: string]: Move };
    /**
     * A longer description of this collection, which might include multiple paragraphs. If it's
     * only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * This collection's content enhances the identified collection, rather than being a
     * standalone collection of its own.
     */
    enhances?: string;
    /**
     * An SVG icon associated with this collection.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * This collection replaces the identified collection. References to the replaced collection
     * can be considered equivalent to this collection.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of this collection, no more than a few sentences in length. This is
     * intended for use in application tooltips and similar sorts of hints. Longer text should
     * use the "description" key instead.
     */
    summary?: string;
}

export interface NpcCollection {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * A thematic color associated with this collection.
     */
    color?:    string;
    contents?: { [key: string]: Npc };
    /**
     * A longer description of this collection, which might include multiple paragraphs. If it's
     * only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * This collection's content enhances the identified collection, rather than being a
     * standalone collection of its own.
     */
    enhances?: string;
    /**
     * An SVG icon associated with this collection.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * This collection replaces the identified collection. References to the replaced collection
     * can be considered equivalent to this collection.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of this collection, no more than a few sentences in length. This is
     * intended for use in application tooltips and similar sorts of hints. Longer text should
     * use the "description" key instead.
     */
    summary?: string;
}

/**
 * A non-player character entry, similar to those in Chapter 5 of the Ironsworn Rulebook, or
 * Chapter 4 of Starforged.
 */
export interface Npc {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    description:     string;
    drives:          string[];
    features:        string[];
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name:          string;
    nature:        string;
    quest_starter: string;
    /**
     * The suggested challenge rank for this NPC.
     */
    rank: number;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    summary?:     string;
    tactics:      string[];
    variants?:    { [key: string]: NpcVariant };
    your_truth?:  string;
}

export interface NpcVariant {
    description: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:     string;
    name:   string;
    nature: string;
    /**
     * The suggested challenge rank for this NPC.
     */
    rank:     number;
    summary?: string;
}

export interface OracleCollection {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    collections?:    { [key: string]: OracleCollection };
    /**
     * A thematic color associated with this collection.
     */
    color?:    string;
    contents?: { [key: string]: OracleTable };
    /**
     * A longer description of this collection, which might include multiple paragraphs. If it's
     * only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * This collection's content enhances the identified collection, rather than being a
     * standalone collection of its own.
     */
    enhances?: string;
    /**
     * An SVG icon associated with this collection.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * The primary name/label for this item.
     */
    name:       string;
    rendering?: OracleCollectionRendering;
    /**
     * This collection replaces the identified collection. References to the replaced collection
     * can be considered equivalent to this collection.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of this collection, no more than a few sentences in length. This is
     * intended for use in application tooltips and similar sorts of hints. Longer text should
     * use the "description" key instead.
     */
    summary?: string;
}

/**
 * Represents a single oracle table, or a single table column of a table that has multiple
 * "Roll" or "Result" columns.
 */
export interface OracleTable {
    _i18n?: I18NHints;
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    /**
     * A longer description of the oracle table's intended usage, which might include multiple
     * paragraphs. If it's only a couple sentences, use the `summary` key instead.
     */
    description?: string;
    /**
     * The roll used to select a result on this table.
     */
    dice: string;
    /**
     * An icon that represents this table.
     */
    icon?: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:      string;
    images?: string[];
    /**
     * Most oracle tables are insensitive to matches, but a few define special match behavior.
     */
    match?: MatchBehavior;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * Describes how how to render this table, when presenting it as a standalone table.
     */
    rendering?: OracleTableRendering;
    /**
     * Indicates that this table replaces the identified table. References to the replaced table
     * can be considered equivalent to this table.
     */
    replaces?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * A brief summary of the oracle table's intended usage, no more than a few sentences in
     * length. This is intended for use in application tooltips and similar sorts of hints.
     * Longer text should use the "description" key instead.
     */
    summary?: string;
    table:    OracleTableRow[];
}

/**
 * Internationalization/localization hints for the text content of this object.
 */
export interface I18NHints {
    description?: I18NHint;
    result?:      I18NHint;
    summary?:     I18NHint;
    template?:    Template;
}

export interface I18NHint {
    part_of_speech?: PartOfSpeech;
}

/**
 * A common noun.
 *
 * A proper noun.
 *
 * A common noun used as an adjective, to modify another noun.
 *
 * A proper noun used as an adjective, to modify another noun.
 *
 * A verb in present tense
 *
 * Gerund or present participle of a verb, e.g. "going", "seeing", "waving"
 *
 * An adjective.
 *
 * A verb used as an adjective, to modify a noun.
 */
export type PartOfSpeech = "common_noun" | "proper_noun" | "adjunct_common_noun" | "adjunct_proper_noun" | "verb" | "gerund" | "adjective" | "attributive_verb";

export interface Template {
    description?: I18NHint;
    result?:      I18NHint;
    summary?:     I18NHint;
}

/**
 * Most oracle tables are insensitive to matches, but a few define special match behavior.
 */
export interface MatchBehavior {
    text: string;
}

/**
 * Describes how how to render this table, when presenting it as a standalone table.
 *
 * Describes the presentation of this table.
 */
export interface OracleTableRendering {
    /**
     * Render as a standalone table.
     *
     * Render as a single column of a table.
     *
     * Render as a table, within a row in another table.
     */
    style:    OracleTableRenderingStyle;
    columns?: { [key: string]: OracleTableColumn };
}

export interface OracleTableColumn {
    /**
     * The thematic color for this column.
     */
    color?:       string;
    content_type: OracleTableColumnContentKey;
    /**
     * The column's header text.
     */
    label: string;
}

/**
 * The value(s) from each OracleTableRow that is rendered in this column.
 *
 * Column displays the roll range (`min` and `max`) of each OracleTableRow.
 *
 * Column displays the OracleTableRow's `result` key.
 *
 * Column displays the OracleTableRow's `summary` key.
 *
 * Column displays the OracleTableRow's `description` key.
 */
export type OracleTableColumnContentKey = "roll" | "result" | "summary" | "description";

export type OracleTableRenderingStyle = "standalone" | "column" | "embed_in_row";

/**
 * An array of objects, each representing a single row of the table.
 *
 * Represents a row in an oracle table.
 */
export interface OracleTableRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * High end of the dice range for this table row. `null` represents an unrollable row,
     * included only for rendering purposes.
     */
    max: number | null;
    /**
     * Low end of the dice range for this table row. `null` represents an unrollable row,
     * included only for rendering purposes.
     */
    min: number | null;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}

export interface OracleTableRoll {
    /**
     * The rulebook explicitly cautions *against* rolling all details at once, so rolling every
     * referenced oracle automatically is not recommended. That said, some oracle results only
     * provide useful information once a secondary roll occurs, such as "Action + Theme". If
     * this value is omitted, assume it's false.
     */
    auto?:   boolean;
    method?: OracleTableRollMethod;
    /**
     * The ID of the oracle table to be rolled. If omitted, it defaults to the ID of this oracle
     * table.
     */
    oracle?: string;
    times?:  number;
}

/**
 * Special roll instructions to use when rolling multiple times on a single oracle table.
 *
 * Duplicates should be re-rolled.
 *
 * Duplicates should be kept.
 *
 * Duplicates should be kept, and they compound to make things worse.
 */
export type OracleTableRollMethod = "no_duplicates" | "keep_duplicates" | "make_it_worse";

/**
 * Provides string templates that may be used in place of the static row text from
 * `OracleTableRow#result`, `OracleTableRow#summary`, and `OracleTableRow#description`.
 *
 * These strings are formatted in Markdown, but use a special syntax for their placeholders:
 * `{{result:some_oracle_table_id}}`. The placeholder should be replaced with the value of a
 * rolled (or selected) `OracleTableRow#result` from the target oracle table ID.
 */
export interface OracleRollTemplate {
    /**
     * A string template that may be used in place of OracleTableRow#description.
     */
    description?: string;
    /**
     * A string template that may be used in place of OracleTableRow#result.
     */
    result?: string;
    /**
     * A string template that may be used in place of OracleTableRow#summary.
     */
    summary?: string;
}

/**
 * Describes the presentation of this oracle collection, which might represent a group of
 * separate tables, or a single table with additional columns.
 */
export interface OracleCollectionRendering {
    /**
     * Presented as a collection of separate tables.
     *
     * Presented as a single table, with its OracleTable children rendered as columns.
     */
    style:    OracleCollectionRenderingStyle;
    columns?: { [key: string]: OracleCollectionTableColumn };
}

export interface OracleCollectionTableColumn {
    /**
     * The thematic color for this column.
     */
    color?:       string;
    content_type: OracleTableColumnContentKey;
    /**
     * The column's header text.
     */
    label: string;
    /**
     * The key of the OracleTable (within this collection), whose data is used to render this
     * column.
     */
    table_key: string;
}

export type OracleCollectionRenderingStyle = "tables" | "multi_table";

export type PackageType = "ruleset" | "expansion";

/**
 * A rarity, as described in Ironsworn: Delve.
 */
export interface Rarity {
    /**
     * The asset augmented by this rarity.
     */
    asset: string;
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    description:     string;
    icon?:           string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    /**
     * From Ironsworn: Delve, p. 174:
     *
     * Some assets will bring a rarity into play more often than others, so the experience point
     * cost for a rarity will vary by the linked asset. These costs are shown in the tables on
     * page 175.
     *
     * If you are playing solo, and aren’t concerned with the relative balance of rarity
     * abilities, you can ignore these variable costs. If so, spend 3 experience points to
     * purchase a rarity.
     */
    xp_cost: number;
}

/**
 * Describes rules for player characters in this ruleset, such as stats and condition meters.
 */
export interface Rules {
    /**
     * Describes the standard condition meters used by player characters in this ruleset.
     */
    condition_meters?: { [key: string]: ConditionMeterRule };
    /**
     * Describes the standard impacts/debilities used by player characters in this ruleset.
     */
    impacts?: { [key: string]: ImpactCategory };
    /**
     * Describes the special tracks used by player characters in this ruleset, like Bonds
     * (classic Ironsworn), Failure (Delve), or Legacies (Starforged).
     */
    special_tracks?: { [key: string]: SpecialTrackRule };
    /**
     * Describes the standard stats used by player characters in this ruleset.
     */
    stats?: { [key: string]: StatRule };
}

/**
 * Describes a standard player character condition meter.
 */
export interface ConditionMeterRule {
    /**
     * A description of this condition meter.
     */
    description: string;
    /**
     * A localized label for this input. In some contexts it may be undesirable to render this
     * text, but it should always be exposed to assistive technology (e.g. with `aria-label` in
     * HTML).
     */
    label: string;
    /**
     * The maximum value of this meter.
     */
    max: number;
    /**
     * The minimum value of this meter.
     */
    min: number;
    /**
     * Is this condition meter shared by all players?
     */
    shared: boolean;
    /**
     * The current value of this meter.
     */
    value: number;
}

/**
 * Describes a category of standard impacts/debilities.
 */
export interface ImpactCategory {
    /**
     * A dictionary object of the Impacts in this category.
     */
    contents: { [key: string]: ImpactRule };
    /**
     * A description of this impact category.
     */
    description: string;
    /**
     * A label for this impact category.
     */
    label: string;
}

/**
 * Describes a standard impact/debility.
 */
export interface ImpactRule {
    /**
     * A description of this impact.
     */
    description: string;
    /**
     * The label for this impact.
     */
    label: string;
    /**
     * Is this impact permanent?
     */
    permanent: boolean;
    /**
     * Keys of ruleset condition meters, to which this impact prevents recovery.
     */
    prevents_recovery: string[];
    /**
     * Is this impact applied to all players at once?
     */
    shared: boolean;
}

/**
 * Describes a special track like Bonds (classic Ironsworn), Failure (Delve), or Legacies
 * (Starforged).
 */
export interface SpecialTrackRule {
    /**
     * A description of this special track.
     */
    description: string;
    /**
     * A label for this special track.
     */
    label: string;
    /**
     * Is this track an optional rule?
     */
    optional: boolean;
    /**
     * Is this track shared by all players?
     */
    shared: boolean;
}

/**
 * Describes a standard player character stat.
 */
export interface StatRule {
    /**
     * A description of this stat.
     */
    description: string;
    /**
     * A label for this stat.
     */
    label: string;
}

/**
 * A delve site Domain card.
 */
export interface DelveSiteDomain {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    dangers:         DelveSiteDomainDangerRow[];
    description?:    string;
    features:        DelveSiteDomainFeatureRow[];
    icon?:           string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * An oracle table ID containing place name elements. For examples, see oracle ID
     * `delve/oracles/site_name/place/barrow`, and its siblings in oracle collection ID
     * `delve/collections/oracles/site_name/place`. These oracles are used by the site name
     * oracle from Ironsworn: Delve (ID: delve/oracles/site_name/format) to create random names
     * for delve sites.
     */
    name_oracle?: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    summary:      string;
}

/**
 * Represents a single Danger entry from a delve site Domain card.
 */
export interface DelveSiteDomainDangerRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * High end of the dice range for this table row.
     */
    max: number;
    /**
     * Low end of the dice range for this table row.
     */
    min: number;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}

/**
 * Represents a single Feature entry from a delve site Domain card.
 */
export interface DelveSiteDomainFeatureRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * High end of the dice range for this table row.
     */
    max: number;
    /**
     * Low end of the dice range for this table row.
     */
    min: number;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}

/**
 * A delve site theme card.
 */
export interface DelveSiteTheme {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    dangers:         DelveSiteThemeDangerRow[];
    description?:    string;
    features:        DelveSiteThemeFeatureRow[];
    icon?:           string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name: string;
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:       Source;
    suggestions?: Suggestions;
    summary:      string;
}

/**
 * Represents a single Danger entry from a delve site Theme card.
 */
export interface DelveSiteThemeDangerRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * High end of the dice range for this table row.
     */
    max: number;
    /**
     * Low end of the dice range for this table row.
     */
    min: number;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}

/**
 * Represents a single Feature entry from a delve site Theme card.
 */
export interface DelveSiteThemeFeatureRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * High end of the dice range for this table row.
     */
    max: number;
    /**
     * Low end of the dice range for this table row.
     */
    min: number;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}

/**
 * A setting truth category.
 */
export interface Truth {
    /**
     * The name of this item as it appears on the page in the book, if it's different from
     * `name`.
     */
    canonical_name?: string;
    icon?:           string;
    /**
     * The unique Datasworn ID for this item.
     */
    id: string;
    /**
     * The primary name/label for this item.
     */
    name:    string;
    options: TruthOption[];
    /**
     * Attribution for the original source (such as a book or website) of this item, including
     * the author and licensing information.
     */
    source:          Source;
    suggestions?:    Suggestions;
    your_character?: string;
}

export interface TruthOption {
    description: string;
    /**
     * The unique Datasworn ID for this item.
     */
    id:            string;
    max?:          number;
    min?:          number;
    quest_starter: string;
    summary?:      string;
    table?:        TruthOptionTableRow[];
}

/**
 * Represents a row in an oracle table.
 */
export interface TruthOptionTableRow {
    /**
     * Optional tertiary text content for this row. Generally, this is longer than both `result`
     * and `summary`.
     */
    description?: string;
    /**
     * Hints that the identified table should be rendered inside this table row.
     */
    embed_table?: string;
    i18n?:        I18NHints;
    icon?:        string;
    /**
     * High end of the dice range for this table row. `null` represents an unrollable row,
     * included only for rendering purposes.
     */
    max: number | null;
    /**
     * Low end of the dice range for this table row. `null` represents an unrollable row,
     * included only for rendering purposes.
     */
    min: number | null;
    /**
     * The primary text content of this row.
     */
    result: string;
    /**
     * Further oracle rolls prompted by this table row.
     */
    rolls?:       OracleTableRoll[];
    suggestions?: Suggestions;
    /**
     * Optional secondary text content for this row. Generally, this is longer than `result`.
     */
    summary?:  string;
    template?: OracleRollTemplate;
}
