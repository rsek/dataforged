export declare enum AssetTypeName {
    CommandVehicle = "Command Vehicle",
    Companion = "Companion",
    Deed = "Deed",
    Module = "Module",
    Path = "Path",
    SupportVehicle = "Support Vehicle"
}

export declare enum Atmosphere {
    NoneThin = "None / Thin",
    Toxic = "Toxic",
    Corrosive = "Corrosive",
    Marginal = "Marginal",
    Breathable = "Breathable",
    Ideal = "Ideal"
}

/**
 * @public
 */
export declare enum AttributeKey {
    /**
     * {@link Atmosphere}
     */
    Atmosphere = "Atmosphere",
    /**
     * {@link Authority}
     */
    Authority = "Authority",
    /**
     * {@link Behavior}
     */
    Behavior = "Encountered Behavior",
    /**
     * {@link DerelictType}
     */
    DerelictType = "Derelict Type",
    /**
     * {@link Disposition}
     */
    Disposition = "Disposition",
    /**
     * {@link Dominion}
     */
    Dominion = "Dominion",
    /**
     * {@link Environment}
     */
    Environment = "Environment",
    /**
     * {@link FactionType}
     */
    FactionType = "Faction Type",
    /**
     * {@link FringeGroup}
     */
    FringeGroup = "Fringe Group",
    /**
     * {@link Guild}
     */
    Guild = "Guild",
    /**
     * {@link Influence}
     */
    Influence = "Influence",
    /**
     * {@link StarshipInitialContact} {@link SettlementInitialContact}
     */
    InitialContact = "Initial Contact",
    /**
     * {@link Leadership}
     */
    Leadership = "Leadership",
    /**
     * {@link Life}
     */
    Life = "Life",
    /**
     * {@link Location}
     */
    Location = "Location",
    /**
     * {@link LocationTheme}
     */
    LocationTheme = "Location Theme",
    /**
     * {@link PlanetaryClass}
     */
    PlanetaryClass = "Planetary Class",
    /**
     * {@link Population}
     */
    Population = "Population",
    /**
     * {@link Region}
     */
    Region = "Region",
    /**
     * {@link Role}
     */
    Role = "Role",
    /**
     * {@link CreatureScale}
     */
    CreatureScale = "Creature Scale",
    /**
     * {@link Zone}
     */
    Zone = "Zone"
}

export declare enum Authority {
    NoneLawless = "None / lawless",
    Ineffectual = "Ineffectual",
    Tolerant = "Tolerant",
    Fair = "Fair",
    Unyielding = "Unyielding",
    Corrupt = "Corrupt",
    Oppressive = "Oppressive"
}

export declare enum Behavior {
    Ambusher = "Ambusher",
    Hibernator = "Hibernator",
    PackHunter = "Pack hunter",
    ApexPredator = "Apex predator",
    Hoarder = "Hoarder",
    Prey = "Prey",
    Builder = "Builder",
    Hunter = "Hunter",
    Protector = "Protector",
    Camouflager = "Camouflager",
    Lurer = "Lurer",
    Scavenger = "Scavenger",
    Forager = "Forager",
    Migratory = "Migratory",
    Tracker = "Tracker",
    Grazer = "Grazer",
    Mimic = "Mimic",
    Trapper = "Trapper",
    Herder = "Herder",
    Nester = "Nester"
}

export declare enum Biome {
}

export declare enum ChallengeRank {
    Troublesome = 1,
    Dangerous = 2,
    Formidable = 3,
    Extreme = 4,
    Epic = 5
}

export declare enum ClockSegments {
    Four = 4,
    Six = 6,
    Eight = 8,
    Ten = 10
}

export declare enum ClockType {
    Tension = "Tension",
    Campaign = "Campaign"
}

export declare enum CreatureScale {
    Minuscule = "Minuscule",
    Tiny = "Tiny",
    Small = "Small",
    Medium = "Medium",
    Large = "Large",
    Huge = "Huge",
    Titanic = "Titanic",
    Colossal = "Colossal",
    Vast = "Vast"
}

export declare type DelveCardType = "Theme" | "Domain";

export declare enum DerelictType {
    Starship = "Starship",
    Settlement = "Settlement"
}

export declare enum Disposition {
    Cooperative = "Cooperative",
    Curious = "Curious",
    Demanding = "Demanding",
    Desperate = "Desperate",
    Friendly = "Friendly",
    Helpful = "Helpful",
    Hostile = "Hostile",
    Indifferent = "Indifferent",
    Suspicious = "Suspicious",
    Threatening = "Threatening",
    Unfriendly = "Unfriendly",
    Wanting = "Wanting"
}

export declare enum Diversity {
    Simple = 2,
    Diverse = 3,
    Complex = 4,
    GardenWorld = 5
}

export declare enum Dominion {
    Agriculture = "Agriculture",
    Artistry = "Artistry",
    Commerce = "Commerce",
    Conquest = "Conquest",
    Construction = "Construction",
    Diplomacy = "Diplomacy",
    Education = "Education",
    Environmentalism = "Environmentalism",
    Exploration = "Exploration",
    Faith = "Faith",
    History = "History",
    Honor = "Honor",
    Industry = "Industry",
    Isolationism = "Isolationism",
    Law = "Law",
    Mysticism = "Mysticism",
    Pacifism = "Pacifism",
    Prophecy = "Prophecy",
    Science = "Science",
    Secrecy = "Secrecy",
    Technology = "Technology",
    Treachery = "Treachery",
    Warfare = "Warfare",
    Wealth = "Wealth"
}

/**
 * @public
 */
export declare enum EncounterNatureIronsworn {
    Ironlander = "Ironlander",
    Firstborn = "Firstborn",
    Animal = "Animal",
    Beast = "Beast",
    Horror = "Horror",
    Anomaly = "Anomaly"
}

export declare enum EncounterNatureStarforged {
    Creature = "Creature",
    Horror = "Horror",
    Human = "Human",
    Machine = "Machine",
    Monster = "Monster"
}

export declare enum EncounterTags {
    Vehicle = "vehicle"
}

export declare enum Environment {
    Space = "Space",
    Interior = "Interior",
    Land = "Land",
    Liquid = "Liquid",
    Air = "Air"
}

export declare enum FactionType {
    FringeGroup = "Fringe Group",
    Dominion = "Dominion",
    Guild = "Guild"
}

export declare enum FringeGroup {
    Cultists = "Cultists",
    Exiles = "Exiles",
    Gangsters = "Gangsters",
    Hackers = "Hackers",
    MonsterHunters = "Monster hunters",
    Pirates = "Pirates",
    Raiders = "Raiders",
    Rebels = "Rebels",
    RogueAI = "Rogue AI",
    Scavengers = "Scavengers",
    Smugglers = "Smugglers"
}

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export declare interface GameDataRoot {
    $schema?: string | undefined;
    "Asset Types": IAssetType[];
    "Encounters": IEncounterStarforged[] | IEncounterNatureInfo[];
    "Move Categories": IMoveCategory[];
    "Oracle Categories": IOracleCategory[];
    "Setting Truths"?: ISettingTruth[];
}

export declare enum GameObjectType {
    Derelict = "Derelict",
    DerelictZone = "Derelict Zone",
    Starship = "Starship",
    Settlement = "Settlement",
    Planet = "Planet",
    PrecursorVault = "Precursor Vault",
    Character = "Character",
    Creature = "Creature",
    Faction = "Faction"
}

export declare enum Gamespace {
    Starforged = "Starforged",
    Ironsworn = "Ironsworn"
}

export declare enum Guild {
    Assassins = "Assassins",
    BountyHunters = "Bounty Hunters",
    Couriers = "Couriers",
    Courtesans = "Courtesans",
    Engineers = "Engineers",
    Healers = "Healers",
    Industrialists = "Industrialists",
    Mercenaries = "Mercenaries",
    Merchants = "Merchants",
    Mystics = "Mystics",
    Navigators = "Navigators",
    Peacekeepers = "Peacekeepers",
    Researchers = "Researchers",
    Spies = "Spies"
}

/**
 * @public
 */
export declare interface IAlterMomentum {
    /**
     * Information on how the player's momentum burn is altered.
     */
    Burn?: IAlterMomentumBurn[] | undefined;
    /**
     * Information on how the player's momentum reset is altered.
     */
    Reset?: IAlterMomentumReset[] | undefined;
}

/**
 * @public
 */
export declare interface IAlterMomentumBurn {
    /**
     * The trigger condition for altering the PC's momentum burn.
     */
    Trigger: IHasText;
    /**
     * The effect altering the PC's momentum burn.
     */
    Effect: IHasText;
    Outcomes?: ("Strong Hit" | "Weak Hit")[] | undefined;
}

/**
 * @public
 */
export declare interface IAlterMomentumReset {
    /**
     * The trigger condition for altering the PC's momentum reset.
     */
    Trigger: IHasText;
    /**
     * The amount by which the PC's momentum reset is change.
     */
    Value: number;
}

/**
 * Describes alterations applied to moves by asset abilities.
 * @public
 */
export declare interface IAlterMove extends StubBy<IMove, "Trigger" | "Text", "Name" | "Category" | "Display" | "Source" | "Outcomes" | "Optional"> {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[1-9][0-9]*$
     */
    $id: string;
    /**
     * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply. If it's `undefined`, see `Extends` instead.
     * @nullable
     */
    Moves?: IMove["$id"][] | null | undefined;
    /**
     * Some asset abilities alter/extend other asset abilities, specified as an array of IDs. Only changed properties are specified; other properties are the same.
     */
    Alters?: IAlterMove["$id"][] | undefined;
    /**
     * The trigger required by the asset ability. If `undefined`, the move alteration applies to all uses of the specified moves, so long as they also meet any implicit asset requirements (fictional framing, `IAsset.Requirement`, not being Broken or Out of Action, etc).
     */
    Trigger?: IMoveTrigger | undefined;
    /**
     * Markdown rules text describing added effects which apply *before* the move is rolled, such as adds.
     */
    Text?: string | undefined;
    /**
     * Added rules text that applies on move outcomes.
     */
    Outcomes?: IAlterMoveOutcomes | undefined;
}

/**
 * @public
 */
export declare interface IAlterMoveOutcomes extends Omit<IMoveOutcomes, keyof typeof MoveOutcome> {
    "Strong Hit"?: IAlterOutcomeInfo | undefined;
    "Weak Hit"?: IAlterOutcomeInfo | undefined;
    Miss?: IAlterOutcomeInfo | undefined;
}

/**
 * @public
 */
export declare interface IAlterOutcomeInfo extends Omit<PartialDeep<IOutcomeInfo>, "With a Match"> {
    "With a Match"?: Omit<IAlterOutcomeInfo, "With a Match"> | undefined;
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export declare interface IAsset extends IHasId, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @example "Starforged/Assets/Path/Bounty_Hunter"
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    /**
     * The asset's name - the title printed on the card.
     * @example "Bounty Hunter"
     */
    Name: string;
    Display: IDisplayWithTitle;
    /**
     * Describes any states that the asset might have, such as "Broken". Some states may disable the asset entirely.
     */
    States?: IAssetState[] | undefined;
    /**
     * The ID of the asset's parent AssetType
     * @example "Starforged/Assets/Path"
     */
    "Asset Type": IAssetType["$id"];
    /**
     * Information on the asset's usage, such as whether its abilities are shared amongst the player characters.
     */
    Usage: IAssetUsage;
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    Attachments?: IAssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     */
    Inputs?: (IInputText | IInputSelect)[] | undefined;
    /**
     * An optional markdown string representing the requirement text that appears at the top of some asset cards.
     * @markdown
     * @example "If you wear your finely crafted set of personal armor..."
     */
    Requirement?: string | undefined;
    /**
     * The asset's abilities.
     */
    Abilities: [IAssetAbility, IAssetAbility, IAssetAbility];
    /**
     * Information on this asset's condition meter, if any.
     */
    "Condition Meter"?: IConditionMeter | undefined;
    Tags?: string[] | undefined;
}

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export declare interface IAssetAbility extends IHasId, IHasText {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]$
     */
    $id: string;
    /**
     * Ironsworn companion assets provide names for their abilities. Starforged asset abilities do not have names.
     */
    Name?: string | undefined;
    /**
     * New moves added by this asset ability.
     */
    Moves?: IMove[] | undefined;
    /**
     * User inputs (text, clocks, etc) associated with this asset ability.
     */
    Inputs?: (IInputNumber | IInputClock | IInputText)[] | undefined;
    /**
     * Information on how this ability alters moves when enabled.
     */
    "Alter Moves"?: IAlterMove[] | undefined;
    /**
     * Information on how this ability alters its parent asset when enabled.
     */
    "Alter Properties"?: IAssetAlterProperties | undefined;
    /**
     * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
     */
    "Alter Momentum"?: IAlterMomentum | undefined;
    /**
     * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
     */
    Enabled: boolean;
}

/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `IAssetAlterProperties` that would set `IAsset["Condition Meter"].Max` to 3, and leave its other properties unchanged:
 * ```javascript
 * { "Condition Meter": { Max: 3 } }
 * ```
 * @public
 */
export declare interface IAssetAlterProperties extends PartialDeep<IAsset> {
}

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Starship/Assets/Command_Vehicle/Starship`); Rover (`Starship/Assets/Support_Vehicle/Rover`) also has an elective ability that adds this property.
 * @public
 */
export declare interface IAssetAttachment {
    /**
     * The type of asset that this asset accepts as attachments.
     */
    "Asset Types": IAssetType["$id"][];
    /**
     * The maximum number of attached assets accepted by this asset. If undefined or null, there is no maximum.
     * @nullable
     */
    "Max": number | null;
}

/**
 * Describes a possible state for an asset, like the "Broken" status for certain assets (mainly Modules in *Starforged*).
 *
 * States are frequently toggled on and off by players; for real-world gameplay, this is generally represented by flipping the card over. A checkbox or other on/off toggle might serve the same function in a digital implementation.
 * @public
 */
export declare interface IAssetState extends IHasName {
    /**
     * A string label name or label for the state.
     * @example "Broken"
     */
    Name: string;
    /**
     * Whether this state is currently enabled.
     */
    Enabled: boolean;
    /**
     * Whether this state should disable the entire asset when `IAssetState.Enabled === true`
     */
    "Disables asset": boolean;
    /**
     * Whether this state counts as an Impact for the asset's owner.
     *
     * Note that for vehicles, this shouldn't be applied automatically unless your implementation has some way of telling which vehicle the PC is currently using.
     */
    "Impact": boolean;
    /**
     * Whether or not this state is permanent.
     */
    Permanent: boolean;
}

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export declare interface IAssetType extends IHasName, IHasId, IHasDescription, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @example "Ironsworn/Assets/Ritual"
     * @example "Starforged/Assets/Command_Vehicle"
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+$
     */
    $id: string;
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    /**
     * @example "Ritual"
     * @example "Command Vehicle"
     */
    Name: string;
    Display: IDisplayWithTitle;
    Usage: IAssetUsage;
}

export declare interface IAssetUsage {
    /**
     * Whether the asset's abilities are shared with Allies.
     *
     * If set to `true`, the asset's abilities can be invoked by **any** player character; if your app facilitates co-op or guided play, consider how you might expose these abilities to players other than the asset's owner.
     *
     * Defaults to `true` for Command Vehicle, Support Vehicle, and Module assets.
     */
    Shared: boolean;
}

/**
 * Describes an attribute key/value pair, set by an oracle row. The key-value pair should be set on any game object for which that row is generated.
 *
 * Attributes exist to describe prerequisites that might be fulfilled by more than one table, that don't exist on tables at all, or that a generated game object might want to 'force' as one of it's roll results.
 *
 * See documentation for a list of available values.
 * @public
 * @see {@link AttributeKey}, {@link Atmosphere}, {@link Authority}, {@link Behavior}, {@link CreatureScale}, {@link DerelictType}, {@link Disposition}, {@link Dominion}, {@link Environment}, {@link FactionType}, {@link FringeGroup}, {@link Guild}, {@link Influence}, {@link Leadership}, {@link Life}, {@link Location}, {@link LocationTheme}, {@link PlanetaryClass}, {@link Population}, {@link Region}, {@link Role}, {@link SettlementInitialContact}, {@link StarshipInitialContact}, {@link Zone}

 */
export declare interface IAttribute {
    Key: AttributeKey;
    Value?: string | undefined;
}

/**
 * @public
 */
export declare interface IAttributeChoices {
    Key: AttributeKey;
    Values?: string[] | undefined;
}

/**
 * Interface representing a condition meter such as Health, Spirit, Supply, or Integrity.
 * @public
 */
export declare interface IConditionMeter extends IMeterBase {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Condition_Meter$
     */
    $id: string;
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
    Aliases?: MeterAlias[] | undefined;
}

/**
 * @public
 */
export declare interface ICustomStat extends IHasId, IHasName {
    /**
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat$
     */
    $id: string;
    Options: ICustomStatOption[];
}

/**
 * @public
 */
export declare interface ICustomStatOption extends IHasId, IHasName {
    /**
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat/[A-z_-]+$
     */
    $id: string;
    /**
     * The name/label for this specific value of the custom stat.
     */
    Name: string;
    /**
     * The numeric value to be used as +stat when making an Action Roll.
     */
    Value: number;
}

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn*) and Encounters *(Ironsworn* and *Starforged*)
 * @public
 */
export declare interface ICyclopediaEntry extends IHasName, IHasId, IHasDisplay, IHasDescription, IHasSource, Partial<IHasSummary & IHasQuestStarter & IHasTags> {
    /**
     * @pattern ^(Starforged|Ironsworn)/([A-z_-]+/)+$
     */
    $id: string;
    Name: string;
    Tags?: string[] | undefined;
    Features?: string[] | undefined;
}

/**
 * Shared interface describing site Themes and site Domains from *Ironsworn: Delve*.
 * @public
 */
export declare interface IDelveCard extends IHasName, IHasSource, IHasSummary, Partial<IHasDisplay>, Partial<IHasDescription> {
    /**
     * Indicates whether this is a site Theme or a site Domain.
     */
    Type: DelveCardType;
    /**
     * The summary that appears on the card.
     * @markdown
     */
    Summary: string;
    /**
     * An optional extended description for this card that doesn't appear on the card itself.
     * @markdown
     */
    Description: string;
    /**
     * The Features that this card contributes. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
     */
    Features: IRow[];
    /**
     * The Dangers that this card contributes. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: IRow[];
}

/**
 * @public
 */
export declare interface IDelveDomain extends IDelveCard {
    Type: "Domain";
    /**
     * The Features that this Domain card contributes. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
     */
    Features: [
    IRow & {
        Floor: 21;
        Ceiling: 43;
    },
    IRow & {
        Floor: 44;
        Ceiling: 56;
    },
    IRow & {
        Floor: 57;
        Ceiling: 64;
    },
    IRow & {
        Floor: 65;
        Ceiling: 68;
    },
    IRow & {
        Floor: 69;
        Ceiling: 72;
    },
    IRow & {
        Floor: 73;
        Ceiling: 76;
    },
    IRow & {
        Floor: 77;
        Ceiling: 80;
    },
    IRow & {
        Floor: 81;
        Ceiling: 84;
    },
    IRow & {
        Floor: 85;
        Ceiling: 88;
    },
    IRow & {
        Floor: 89;
        Ceiling: 98;
        Result: "Something unusual or unexpected";
    },
    IRow & {
        Floor: 99;
        Ceiling: 99;
        Result: "You transition into a new theme";
    },
    IRow & {
        Floor: 100;
        Ceiling: 100;
        Result: "You transition into a new domain";
    }
    ];
    /**
     * The Dangers that this Domain contributes. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: [
    IRow & {
        Floor: 31;
        Ceiling: 33;
    },
    IRow & {
        Floor: 34;
        Ceiling: 36;
    },
    IRow & {
        Floor: 37;
        Ceiling: 39;
    },
    IRow & {
        Floor: 40;
        Ceiling: 42;
    },
    IRow & {
        Floor: 43;
        Ceiling: 45;
    }
    ];
}

/**
 * @public
 */
export declare interface IDelveTheme extends IDelveCard {
    Type: "Theme";
    /**
     * The Features that this Theme card contributes. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
     */
    Features: [
    IRow & {
        Floor: 1;
        Ceiling: 4;
    },
    IRow & {
        Floor: 5;
        Ceiling: 8;
    },
    IRow & {
        Floor: 9;
        Ceiling: 12;
    },
    IRow & {
        Floor: 13;
        Ceiling: 16;
    },
    IRow & {
        Floor: 17;
        Ceiling: 20;
    }
    ];
    /**
     * The Dangers that this Theme contributes. Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: [
    IRow & {
        Floor: 1;
        Ceiling: 5;
    },
    IRow & {
        Floor: 6;
        Ceiling: 10;
    },
    IRow & {
        Floor: 11;
        Ceiling: 12;
    },
    IRow & {
        Floor: 13;
        Ceiling: 14;
    },
    IRow & {
        Floor: 15;
        Ceiling: 16;
    },
    IRow & {
        Floor: 17;
        Ceiling: 18;
    },
    IRow & {
        Floor: 19;
        Ceiling: 20;
    },
    IRow & {
        Floor: 21;
        Ceiling: 22;
    },
    IRow & {
        Floor: 23;
        Ceiling: 24;
    },
    IRow & {
        Floor: 25;
        Ceiling: 26;
    },
    IRow & {
        Floor: 27;
        Ceiling: 28;
    },
    IRow & {
        Floor: 29;
        Ceiling: 30;
    }
    ];
}

export declare interface IDisplay {
    /**
     * A URL pointing to a single SVG icon.
     * @pattern ^\.\./\.\./img/vector/[A-z-_0-9/]+\.svg$
     */
    Icon?: string | undefined;
    /**
     * An array of URLs pointing to one or more WEBP images.
     * @pattern ^\.\./\.\./img/raster/[A-z-_0-9/]+\.webp$
     */
    Images?: string[] | undefined;
    /**
     * A hex color associated with this item, for use as e.g. an accent color in its display.
     * @pattern ^#[A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9]$
     */
    Color?: string | undefined;
    /**
     * The title of this item as it appears printed in the rulebook. Intended for use as the item's header, label, etc.
     */
    Title?: string | undefined;
}

/**
 * Information on displaying Oracles, including their table(s) are rendered in the original text. Useful if you want your project's rendering of the tables to correspond with the book.
 * @public
 */
export declare interface IDisplayOracle extends IDisplayWithTitle {
    Title: string;
    /**
     * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
     *
     * If `undefined`, this table is rendered as a standalone table.
     *
     * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
     */
    "Column of"?: IOracle["$id"] | undefined;
    /**
     * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
     *
     * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
     */
    Table: ITableDisplayInfo;
    /**
     * This table is displayed as embedded in a row of another table.
     */
    "Embed in"?: IRow["$id"] | undefined;
}

/**
 * @public
 */
export declare interface IDisplayWithTitle extends IDisplay {
    Title: string;
}

/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export declare interface IEncounter extends IEncounterBase {
    Features: string[];
    Drives: string[];
    Tactics: string[];
    "Quest Starter": string;
    /**
     * A markdown string representing the text of the "Your Truth" callout box included with some *Ironsworn* encounters.
     */
    "Your Truth"?: string | undefined;
}

/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*, plus 'stubs' like IEncounterVariant.
 * @see {@link IEncounter}, {@link IEncounterVariant}
 * @public
 */
export declare interface IEncounterBase extends ICyclopediaEntry {
    /**
     * @example "Starforged/Encounters/Chiton"
     * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+$
     */
    $id: string;
    /**
     * @example "Chiton"
     */
    Name: string;
    /**
     * @example "Monster"
     */
    Nature: EncounterNatureStarforged | EncounterNatureIronsworn;
    Display: IDisplayWithTitle;
    /**
     * @example "Insectoid horde"
     * @markdown
     */
    Summary?: string | undefined;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    /**
     * @markdown
     */
    Features?: string[] | undefined;
    /**
     * @markdown
     */
    Drives?: string[] | undefined;
    /**
     * @markdown
     */
    Tactics?: string[] | undefined;
    /**
     * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
     *
     * Only present in Ironsworn encounters.
     * @markdown
     */
    "Your Truth"?: string | undefined;
}

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export declare interface IEncounterIronsworn extends IEncounter {
    /**
     * @pattern ^(Starforged|Ironsworn)/Encounters/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    Nature: EncounterNatureIronsworn;
    "Your Truth"?: string | undefined;
    Summary?: string | undefined;
}

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export declare interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId, IHasDisplay, IHasSummary {
    /**
     * @pattern ^Ironsworn/Encounters/[A-z_-]+$
     */
    $id: string;
    Name: EncounterNatureIronsworn;
    Encounters: IEncounterIronsworn[];
    Summary: string;
    Display: IDisplayWithTitle;
}

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export declare interface IEncounterStarforged extends IEncounter {
    /**
     * @pattern ^Starforged/Encounters/[A-z_-]+$
     */
    $id: string;
    Nature: EncounterNatureStarforged;
    Summary: string;
    Variants: IEncounterVariant[];
}

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export declare interface IEncounterVariant extends StubBy<IEncounterStarforged, never, "Features" | "Drives" | "Tactics" | "Variants" | "Summary" | "Your Truth" | "Quest Starter"> {
    /**
     * @pattern ^Starforged/Encounters/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    "Variant of": IEncounterStarforged["$id"];
}

/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export declare interface IGameObject {
    "Object type": GameObjectType;
    Requires?: IRequirements | undefined;
}

/**
 * Interface for items with aliases.
 * @public
 */
export declare interface IHasAliases {
    /**
     * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
     */
    Aliases: string[];
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export declare interface IHasDescription {
    /**
     * A user-facing markdown description of the item, consisting of one or more paragraphs.
     * @markdown
     */
    Description: string;
}

/**
 * Interface for items with rendering information.
 * @public
 */
export declare interface IHasDisplay {
    /**
     * Data relevant to this item's display/rendering.
     */
    Display: IDisplay;
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export declare interface IHasGameObjects {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    "Game objects": IGameObject[];
}

/**
 * For elements with unique string IDs.
 * @public
 */
export declare interface IHasId {
    /**
     * The item's unique string ID.
     * @pattern ^(Starforged|Ironsworn)/[0-9A-z_/-]+$
     */
    $id: string;
}

/**
 * Interface for items with a Name key.
 * @public
 */
export declare interface IHasName {
    /**
     * The item's internal name. Should be unique among its sibling elements, as this key is often used (along with the object's ancestors) to generate its $id.
     *
     * If the item has Display.Title, that should be preferred for most user-facing labels.
     */
    Name: string;
}

/**
 * @public
 */
export declare interface IHasOptional {
    /**
     * Whether or not the source material presents this rules item as optional.
     * @default false
     */
    Optional: boolean;
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface IHasOracleContent {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    Content: IOracleContent;
}

/**
 * @public
 */
export declare interface IHasQuestStarter {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     */
    "Quest Starter": string;
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export declare interface IHasRequirements {
    /**
     * Prerequisites for this item.
     */
    Requires: IRequirements;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export declare interface IHasRollTemplate {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    "Roll template": IRollTemplate;
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export declare interface IHasSource {
    /**
     * Information on this item's source.
     */
    Source: ISource;
}

/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `IOracle` in the `Oracles` property of this table's parent.
 * @public
 */
export declare interface IHasSubtable {
    Subtable: IRow[];
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export declare interface IHasSuggestions {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    Suggestions: ISuggestions;
}

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export declare interface IHasSummary {
    /**
     * A user-facing markdown summary of the item. `Summary` is shorter than {@link IHasDescription | Description}.
     * @markdown
     */
    Summary: string;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export declare interface IHasTable {
    Table: IRow[];
}

/**
 * @public
 */
export declare interface IHasTags {
    /**
     * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
     */
    Tags: string[];
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export declare interface IHasText {
    /**
     * The item's rules text as a markdown string.
     * @markdown
     */
    Text: string;
}

/**
 * A stub interface representing an input widget of any type.
 * @see {@link IInputNumber}, {@link IInputClock}, {@link IInputText}, {@link IInputSelect}
 * @public
 */
export declare interface IInput extends IHasId, IHasName {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+(/Abilities/[1-3])?/Inputs/[A-z_-]+$
     */
    $id: string;
    "Input Type": InputType;
    /**
     * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
     *
     * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
     */
    Adjustable: boolean;
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @page 239
 * @see {@link InputType.Clock}
 * @public
 */
export declare interface IInputClock extends IInput {
    "Input Type": InputType.Clock;
    /**
     * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
     */
    "Clock Type": ClockType;
    /**
     * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
     *
     * `Filled` should not exceed this number.
     */
    Segments: ClockSegments;
    /**
     * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
     */
    Filled: number;
}

/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner, similar to `<input type='number'>` in HTML.
 * @see {@link InputType.Number}
 * @public
 */
export declare interface IInputNumber extends IInput {
    "Input Type": InputType.Number;
    Min: number;
    /**
     * @nullable
     */
    Max: number | null;
    Step: 1;
    "Value": number;
}

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @example
 * ```
 * {
 *   "Name": "Material",
 *   "Input Type": "Select",
 *   "Attributes": [
 *     { "Key": "Stat", "Type": "Stat" },
 *     { "Key": "Condition Meter", "Type": "Condition Meter" }
 *    ],
 *    "Options": [
 *      {
 *       "Name": "Thunderwood",
 *       "Sets": [
 *         { "Key": "Stat", "Value": "Edge" },
 *         { "Key": "Condition Meter", "Value": "Health" }
 *       ]
 *     }
 *   ]
 * }
 * ```
 * @public
 */
export declare interface IInputSelect extends IInput {
    "Input Type": InputType.Select;
    /**
     * Hints which attribute(s) set by this dropdown's options.
     */
    Sets: IInputSelectAttributeDefinition[];
    Options: IInputSelectOption[];
}

/**
 * Provides hints for the keys and typing of an {@link IInputSelect}'s child {@link IInputSelectOption}s.
 * @typeParam V - The type(s) of the value(s) set by this item's options.
 * @public
 */
export declare interface IInputSelectAttributeDefinition {
    Key: string;
    Type: InputSelectOptionType;
}

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export declare interface IInputSelectOption extends IHasId, IHasName {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+$
     */
    $id: string;
    /**
     * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
     */
    Set: (IInputSelectOptionSetterStat | IInputSelectOptionSetterMeter | IInputSelectOptionSetterNumber | IInputSelectOptionSetterString)[];
}

/**
 * @public
 */
export declare interface IInputSelectOptionSetter extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Inputs/[A-z_-]+/Options/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    Key: string;
    Type: InputSelectOptionType;
    Value: Stat | PlayerConditionMeter | number | string;
}

/**
 * A condition meter set by an {@link IInputSelectOption}.
 * @public
 */
export declare interface IInputSelectOptionSetterMeter extends IInputSelectOptionSetter {
    Type: InputSelectOptionType.ConditionMeter;
    Value: PlayerConditionMeter;
}

/**
 * An integer value set by an {@link IInputSelectOption}.
 * @public
 */
export declare interface IInputSelectOptionSetterNumber extends IInputSelectOptionSetter {
    Type: InputSelectOptionType.Number;
    Value: number;
}

/**
 * A stat set by an {@link IInputSelectOption}.
 * @public
 */
export declare interface IInputSelectOptionSetterStat extends IInputSelectOptionSetter {
    Type: InputSelectOptionType.Stat;
    Value: Stat;
}

/**
 * An arbitrary string value set by an {@link IInputSelectOption}.
 * @public
 */
export declare interface IInputSelectOptionSetterString extends IInputSelectOptionSetter {
    Type: InputSelectOptionType.String;
    Value: string;
}

/**
 * A text input.
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export declare interface IInputText extends IInput {
    "Input Type": InputType.Text;
}

/**
 * @public
 */
export declare interface IIronswornRegion extends ICyclopediaEntry {
    /**
     * @pattern ^Ironsworn/Regions/[A-z_-]$
     */
    $id: string;
    Summary: string;
    Features: string[];
    "Quest Starter": string;
    Source: ISource;
}

/**
 * Interface representing a Meter.
 * @public
 */
export declare interface IMeterBase extends IHasId, IHasName {
    /**
     * The minimum value of the meter. Usually this is 0. Momentum is currently the only exception to this and goes as low as -6.
     */
    Min: number;
    /**
     * The maximum value of the meter.
     */
    Max: number;
    /**
     * The initial value of the meter.
     */
    "Value": number;
}

/**
 * Interface representing a Starforged move.
 * @public
 */
export declare interface IMove extends IHasId, IHasName, IHasText, IHasDisplay, IHasSource, IHasOptional, Partial<IHasSuggestions> {
    /**
     * @example "Starforged/Moves/Adventure/Face_Danger"
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3])/[A-z_-]+$
     */
    $id: string;
    /**
     * @example "Face Danger"
     */
    Name: string;
    /**
     * The ID of the parent Asset of the move, if any.
     */
    Asset?: IAsset["$id"] | undefined;
    /**
     * The ID of the move's category.
     * @example "Starforged/Moves/Adventure"
     */
    Category: IMoveCategory["$id"];
    /**
     * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
     */
    "Progress Move"?: boolean | undefined;
    /**
     * The ID of the move that this move is a variant of, if any.
     */
    "Variant of"?: IMove["$id"] | undefined;
    /**
     * The move's trigger data.
     */
    Trigger: IMoveTrigger;
    /**
     * The IDs of any oracles directly referenced by the move, or vice versa.
     */
    Oracles?: IOracle["$id"][] | undefined;
    /**
     * Outcome information for the move.
     */
    Outcomes?: IMoveOutcomes | undefined;
    Display: IDisplayWithTitle;
    Tags?: string[] | undefined;
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export declare interface IMoveCategory extends IHasId, IHasName, IHasSource, IHasDescription, IHasDisplay, IHasOptional {
    /**
     * @example "Starforged/Moves/Adventure"
     * @pattern ^(Starforged|Ironsworn)/Moves/[A-z_-]+$
     */
    $id: string;
    /**
     * @example "Adventure"
     */
    Name: string;
    Moves: IMove[];
    Display: IDisplayWithTitle;
}

/**
 * @public
 */
export declare interface IMoveOutcomes extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes$
     */
    $id: string;
    "Strong Hit": IOutcomeInfo;
    "Weak Hit": IOutcomeInfo;
    "Miss": IOutcomeInfo;
}

/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export declare interface IMoveReroll extends Partial<IHasText> {
    /**
     * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
     * @markdown
     */
    Text: string;
    /**
     * The dice to be rerolled.
     */
    Dice: RerollType;
}

/**
 * Describes the trigger conditions of the move.
 * @public
 */
export declare interface IMoveTrigger extends IHasId, Partial<IHasText> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Trigger$
     */
    $id: string;
    /**
     * A markdown string containing the primary trigger text for this move.
     *
     * Secondary triggers (for specific stats or uses of an asset ability) are described in `Options`.
     *
     * @markdown
     * @example "When you attempt something risky or react to an imminent threat..."
     */
    Text?: string | undefined;
    /**
     * Information on who can trigger this item. Used mainly by asset abilities, some of which can trigger from an Ally's move.
     *
     * If unspecified, assume `Ally` is `false` and `Player` is `true`.
     */
    By?: IMoveTriggerBy | undefined;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    "Options"?: (IMoveTriggerOptionAction | IMoveTriggerOptionProgress)[] | undefined;
}

/**
 * @public
 */
export declare interface IMoveTriggerBy {
    /**
     * Whether the player character who owns this item can trigger it. Unsurprisingly, this is usually true, but there's a few exceptions: see *Starforged's* LOYALIST asset for an example.
     * @public
     */
    Player: boolean;
    /**
     * Whether an Ally (a player character other than the owner) can trigger this item. This is usually false, but there's several exceptions among asset abilities.
     */
    Ally: boolean;
}

/**
 * @public
 */
export declare interface IMoveTriggerOptionAction extends IMoveTriggerOptionBase {
    "Roll type": RollType.Action;
    Using: RollableStat[];
}

/**
 * @public
 */
export declare interface IMoveTriggerOptionBase extends IHasId, Partial<IHasText> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Trigger/Options/[0-9]+$
     */
    $id: string;
    /**
     * Whether this option is an action roll or progress roll.
     */
    "Roll type": RollType;
    /**
     * The method used to choose the stat or track in the `Using` array.
     */
    Method: RollMethod;
    /**
     * The stat(s) or progress track(s) that may be rolled with this move trigger option.
     */
    Using: (RollableStat | ProgressTypeStarforged | ProgressTypeIronsworn)[];
    /**
     * Defines a custom stat, if one is included in this object's `With` array.
     */
    "Custom stat"?: ICustomStat | undefined;
}

/**
 * @public
 */
export declare interface IMoveTriggerOptionProgress extends IMoveTriggerOptionBase {
    "Roll type": RollType.Progress;
    Using: (ProgressTypeStarforged | ProgressTypeIronsworn)[];
}

/**
 * Describes {@link IRow} results that call for multiple rolls, most commonly "Roll twice" results.
 * @public
 */
export declare interface IMultipleRolls {
    /**
     * The number of rolls to make on the parent oracle table.
     */
    Amount: number;
    /**
     * Whether to allow duplicate results when generating multiple rolls.
     *
     * Implicitly required by `Make it worse`.
     */
    "Allow duplicates": boolean;
    /**
     * Whether duplicate rolls should be compounded in an Ironsworn-style "Make it worse" results.
     *
     * Typically this is accompanied by `IRow.Result` text like "Roll twice more on this table. Both results occur. If they are the same result, make it worse."
     *
     * Can safely be ignored in Starforged-only implementations. Implicitly requires `Allow duplicates`.
     */
    "Make it worse": boolean;
}

export declare enum Influence {
    Forsaken = "Forsaken",
    Isolated = "Isolated",
    Localized = "Localized",
    Established = "Established",
    Notable = "Notable",
    Dominant = "Dominant",
    Inescapable = "Inescapable"
}

/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export declare enum InputSelectOptionType {
    /**
     * A reference to one of the player character's stats: Edge, Heart, Iron, Shadow, or Wits.
     * @see {@link Stat}
     */
    Stat = "Stat",
    /**
     * A reference to one of the player character's condition meters: Health, Spirit, or Supply.
     * @see {@link PlayerConditionMeter}
     */
    ConditionMeter = "Condition Meter",
    /**
     * An arbitrary pre-set string value.
     */
    String = "String",
    /**
     * A arbitrary pre-set number value.
     */
    Number = "Number"
}

export declare enum InputType {
    /**
     * @see {@link IInputText}
     */
    Text = "Text",
    /**
     * @see {@link IInputSelect}
     */
    Select = "Select",
    /**
     * @see {@link IInputNumber}
     */
    Number = "Number",
    /**
     * @see {@link IInputClock}
     */
    Clock = "Clock"
}

/**
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * If you're looking for a way to crawl the oracle hierarchy in search of a specific ID, see {@link IOracleBase}.
 *
 * @public
 */
export declare interface IOracle extends IOracleBase {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?$
     */
    $id: string;
    Display: IDisplayOracle;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;

}

/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link IOracle} and {@link IOracleCategory} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export declare interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent>, IHasId, IHasDisplay, IHasSource, IHasName {
    /**
     * The ID of the most recent OracleCategory ancestor of this item, if any.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-/]+$
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * The ID of the most recent Oracle ancestor of this item, if any.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+/[A-z_-]+$
     */
    "Member of"?: IOracle["$id"] | undefined;
    Display: IDisplayWithTitle;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    Usage?: IOracleUsage | undefined;
    /**
     * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
     *
     * This key appears only on 'leaf' nodes of the oracle hierarchy 'tree' - in other words, many (but not all) {@link IOracle} objects.
     */
    Table?: IRow[] | undefined;
    /**
     * Oracle objects contained by this object.
     *
     * This key appears only on 'branch' nodes of the oracle hierarchy 'tree': {@link IOracleCategory}, and {@link IOracle} (when it contains multiple closely-related tables).
     */
    Oracles?: IOracle[] | undefined;
    /**
     * Subcategories contained by this oracle category.
     *
     * This key appears only on {@link IOracleCategory}, and thus only on 'branch' nodes of the oracle hierarchy 'tree.
     */
    Categories?: IOracleCategory[] | undefined;
}

/**
 * Represents an oracle category: a grouping that can contain both {@link IOracle}s and other instances of {@link IOracleCategory}, but doesn't have its own `Table` key.
 *
 * If you're looking for a way to crawl the oracle hierarchy in search of a specific ID, see {@link IOracleBase}.
 *
 * @public
 */
export declare interface IOracleCategory extends IOracleBase {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
     */
    $id: string;
    Name: string;
    /**
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * A list of sample names for this category (only used by Planetary Class subcategories).
     */
    "Sample Names"?: string[] | undefined;

}

/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface IOracleContent {
    /**
     * The part of speech of this oracle.
     */
    "Part of speech"?: PartOfSpeechTag[] | undefined;
    /**
     * Any arbitrary string tags associated with this oracle.
     */
    "Tags"?: string[] | undefined;
}

/**
 * Describes the recommended usage of this item.
 * @public
 */
export declare interface IOracleUsage extends Partial<IHasRequirements & IHasSuggestions & IHasRollTemplate> {
    /**
     * Whether this table should be included in the initial oracle rolls when generating a game object. This is a somewhat arbitrary recommendation, and may not be appropriate for all implementations (or all game situations). Rather it's a reasonable starting point in *most* cases.
     *
     * That said, the game itself recommends **against** rolling all possible results at once (see "Peeling the Onion", p. 293, *Starforged*). If your goal is to implement the game 'as-written', consider how you might include some means of "progressive disclosure" of oracle results.
     *
     * May be deprecated in the future in favour of dedicated object template information.
     */
    Initial?: boolean | undefined;
    Suggestions?: ISuggestions | undefined;
    Requires?: IRequirements | undefined;
    /**
     * The minimum number of rolls when using this oracle to create a game object, *if* this oracle is rolled. Assume it's 1 if not specified.
     * @deprecated Previous versions of the Starforged Backer Preview had tables that made use of this key, but none do at present. Given the "peeling the onion" philosophy, this key is of limited utility, and will probably be removed in future versions.
     */
    "Min rolls"?: number | undefined;
    /**
     * The maximum number of rolls when using this oracle to create a game object. Assume it's 1 if not specified.
     */
    "Max rolls"?: number | undefined;
    /**
     * Whether the table's standard use is iterative.  Common examples are Feature, Opportunity, and Peril tables, which are most often used repeatedly to describe different areas of/events in a place, rather than being assigned as a description of the place as a whole.
     *
     * Mutually exclusive with `Max rolls`. If undefined, assume `false`.
     */
    Repeatable?: boolean | undefined;
    /**
     * Whether multiple rolls (as in object generation, or with {@link IMultipleRolls}) .
     */
    "Allow duplicates"?: boolean | undefined;
    /**
     * Hints which attributes are set by this table.
     */
    "Sets"?: IAttributeChoices[] | undefined;
}

/**
 * @public
 */
export declare interface IOutcomeInfo extends IHasId, IHasText {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/((Miss|Strong_Hit)(/With_a_Match)?|Weak_Hit)$
     */
    $id: string;
    /**
     * Defines a different outcome for this result with a match. Its text should replace the text of this object.
     */
    "With a Match"?: IOutcomeInfo | undefined;
    /**
     * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
     */
    "Count as"?: keyof typeof MoveOutcome | undefined;
    /**
     * Information on rerolls offered by this move.
     */
    Reroll?: IMoveReroll | undefined;
    /**
     * Whether this outcome leaves the player character in control or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
     */
    "In Control"?: boolean | undefined;
}

/**
 * Data describing an item's requirements.
 * @public
 */
export declare interface IRequirements {
    /**
     * A list of attribute keys, and values of those keys that satisfy the requirements.
     */
    Attributes: IAttributeChoices[];
}

/**
 * @public
 */
export declare interface IRollColumn extends ITableColumnBase {
}

export declare interface IRollTemplate {
    /**
     * A template string for the parent's `Result` property, to be filled with an oracle table roll Result.
     */
    Result?: string | undefined;
    /**
     * A template string for the parent's `Summary` property, to be filled with an oracle table roll Result.
     */
    Summary?: string | undefined;
    /**
     * A template string for the parent's `Description` property, to be filled with an oracle table roll Result.
     */
    Description?: string | undefined;
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export declare interface Ironsworn extends GameDataRoot {
    "Encounters": IEncounterNatureInfo[];
    "Setting Truths"?: ISettingTruth[];
}

/**
 * @public
 */
export declare const ironsworn: Ironsworn;

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export declare interface IRow extends Partial<Nullable<IHasSummary> & IHasRollTemplate & IHasSuggestions & IHasOracleContent & IHasGameObjects & IHasDisplay> {
    /**
     * The ID of this row.
     * @pattern ^(Ironsworn|Starforged)/Oracles(/[A-z_-]+)+/[1-9][0-9]*(-[1-9][0-9]*)?(/Subtable/[1-9][0-9]*(-[1-9][0-9]*)?)?$
     * @nullable
     */
    $id?: string | null;
    /**
     * The low end of the dice range for this row.
     * @minimum 1
     * @maximum 100
     * @nullable
     */
    Floor: number | null;
    /**
     * The high end of the dice range for this row.
     * @minimum 1
     * @maximum 100
     * @nullable
     */
    Ceiling: number | null;
    /**
     * The primary result text for the row, annotated in Markdown.
     * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
     * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
     */
    Result: string;
    /**
     * A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).
     *
     * Generally, `Summary` is longer than `Result`.
     *
     * Some tables label this column as something other than `Result`; see the parent (or grandparent) `IOracle.Display.Table` for more information.
     *
     * `null` is used in cases where an 'empty' `Summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT table roll output), however, `null` values can be safely omitted.
     * @nullable
     */
    Summary?: string | null | undefined;
    /**
     * Additional oracle tables that should be rolled when this row is selected.
     */
    "Oracle rolls"?: IOracle["$id"][] | undefined;
    /**
     * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
     */
    Subtable?: IRow[] | undefined;
    /**
     * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
     */
    "Multiple rolls"?: IMultipleRolls | undefined;
    /**
     * The attributes set by this row.
     */
    Attributes?: IAttribute[] | undefined;
}

export declare type IRowRollYaml = [number | null, number | null];

/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export declare interface ISettingTruth extends IHasId, IHasName, IHasSource, IHasDisplay, Partial<IHasSuggestions>, IHasTable {
    /**
     * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+$
     */
    $id: string;
    Name: string;
    /**
     * The 'canonical' options for this setting truth category.
     */
    Table: ISettingTruthOption[];
    /**
     * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
     * @markdown
     */
    Character: string;
    Display: IDisplayWithTitle;
}

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 * @public
 */
export declare interface ISettingTruthOption extends IRow, IHasQuestStarter, IHasDescription {
    /**
     * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])$
     */
    $id: string;
    "Roll template"?: IRollTemplate | undefined;
    Subtable?: IRow[] | undefined;
}

/**
 * @public
 */
export declare interface ISettingTruthOptionSubtableRow extends IRow {
    /**
     * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
     */
    $id: string;
}

/**
 * Interface representing data on this item's source. For 'canonical' content, this is usually a book with numbered pages, but it might also be a link to a web site.
 * @public
 */
export declare interface ISource {
    /**
     * The title of the source.
     *
     * For 'canonical' content, use one of the enumerated `SourceTitle` strings.
     *
     * For 3rd-party content (including homebrew) that's been released as part of a titled document, use the title of that document (e.g. "Steelforged", "Ironsmith").
     *
     * If the source has no particular title (for instance, it's a single custom element in a VTT implementation), use "Custom".
     */
    Title: SourceTitle | string;
    /**
     * The author(s) of this item. For 'canonical' content, this one's usually pretty obvious 😉 However, it's included so that homebrew content can use the same interface/schema.
     * @default ["Shawn Tomkin"]
     */
    Authors: string[];
    /**
     * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
     * @pattern ^(0[1-9]|1[0-2])([0-2][1-9]|3[0-1])([0-9][0-9])$
     */
    Date?: string | undefined;
    /**
     * The page on which the item appears most prominently in the source material (if it's in a format that uses page numbers).
     */
    Page?: number | undefined;
    /**
     * The URL where the source material is available.
     * @pattern ^https?://.*$
     */
    Url?: string | undefined;
}

/**
 * Describes "non-canonical" suggestions for game content related to the parent item.
 *
 * These are intended be offered as convenient shortcuts for the user (for instance, including a menu dropdown for rolling on suggested tables); having them roll automatically is **not recommended** for most projects.
 *
 * These can be safely ignored if that functionality is not desired.
 * @public
 */
export declare interface ISuggestions {
    /**
     * Suggested game objects and their parameters.
     */
    "Game objects"?: IGameObject[] | undefined;
    /**
     * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
     */
    "Oracle rolls"?: IOracle["$id"][] | undefined;
    /**
     * Suggested move IDs.
     */
    "Moves"?: IMove["$id"][] | undefined;
    /**
     * Suggested asset IDs.
     */
    "Assets"?: IAsset["$id"][] | undefined;
    /**
     * Suggested encounter IDs.
     */
    "Encounters"?: IEncounterStarforged["$id"][] | undefined;
}

/**
 * Interface with elements common to {@link IRollColumn} and {@link ITextColumn}.
 * @public
 */
export declare interface ITableColumnBase {
    Label: string;
    /**
     * The ID of the oracle table to use.
     */
    "Use content from": IOracle["$id"];
}

/**
 * Provides information on how a specific oracle table is rendered in the source text.
 * @public
 */
export declare interface ITableDisplayInfo {
    "Result columns": ITextColumn[];
    "Roll columns": ITableColumnBase[];
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link IRollColumn}, which displays numerical ranges).
 * @public
 */
export declare interface ITextColumn extends ITableColumnBase {
    /**
     * The label or header text to use for this column.
     */
    Label: string;
    /**
     * The ID of the oracle with a `Table` key.
     */
    "Use content from": IOracle["$id"];
    /**
     * The key of each `Row` in the `Table`, whose string value is displayed in the rendered table.
     */
    Key: "Result" | "Summary";
}

export declare type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export declare type KeysWithValuesOfType<T, V> = keyof {
    [P in keyof Required<T> as Required<T>[P] extends V ? P : never]: P;
};

export declare enum Leadership {
    Anarchist = "Anarchist",
    DisputedLeadership = "Disputed leadership",
    AuthoritarianDictatorship = "Authoritarian dictatorship",
    OligarchicalElite = "Oligarchical elite",
    DynasticLineage = "Dynastic lineage",
    FatedOrProphesiedLeader = "Fated or prophesied leader",
    ClanChiefsOrElders = "Clan chiefs or elders",
    ElectedRepresentatives = "Elected representatives",
    MachineIntelligence = "Machine intelligence",
    VariedDecentralized = "Varied / decentralized"
}

export declare enum Life {
    None = "None",
    Extinct = "Extinct",
    Scarce = "Scarce",
    Diverse = "Diverse",
    Bountiful = "Bountiful",
    Overrun = "Overrun"
}

export declare enum Location {
    Planetside = "Planetside",
    Orbital = "Orbital",
    DeepSpace = "Deep Space"
}

export declare enum LocationTheme {
    Chaotic = "Chaotic",
    Fortified = "Fortified",
    Haunted = "Haunted",
    Infested = "Infested",
    Inhabited = "Inhabited",
    Mechanical = "Mechanical",
    Ruined = "Ruined",
    Sacred = "Sacred"
}

export declare enum MeterAlias {
    CompanionHealth = "Companion Health",
    VehicleIntegrity = "Vehicle Integrity",
    CommandVehicleIntegrity = "Command Vehicle Integrity",
    SupportVehicleIntegrity = "Support Vehicle Integrity",
    IncidentalVehicleIntegrity = "Incidental Vehicle Integrity"
}

export declare enum MeterCondition {
    /**
     * Battered may be marked when your vehicle is at 0 integrity and you fail to Withstand Damage. The vehicle is barely holding together.
     * @page 51
     */
    Battered = "Battered",
    /**
     * Cursed may be marked when your command vehicle (STARSHIP asset) is at 0 integrity and you fail to Withstand Damage. This is a permanent impact. Your ship will never be quite right again.
     * @page 51
     */
    Cursed = "Cursed",
    /**
     * When your companion’s health is at 0 and you score a miss, they are out of action. You cannot leverage their support until they gain at least +1 health. Envision what this means in the fiction of your scene.
     * @page 204
     */
    OutOfAction = "Out of Action",
    /** Used by "Fleet Commander" asset */
    Wrecked = "Wrecked"
}

/**
 * Enumerates player character resource meters.
 * @public
 */
export declare enum MeterType {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply",
    Momentum = "Momentum"
}

/**
 * "Assets" is also valid, technically, but it's only used in IDs, so it's omitted here.
 * @public
 */
export declare enum MoveCategoryName {
    Session = "Session",
    Adventure = "Adventure",
    Quest = "Quest",
    Connection = "Connection",
    Exploration = "Exploration",
    Combat = "Combat",
    Suffer = "Suffer",
    Recover = "Recover",
    Threshold = "Threshold",
    Legacy = "Legacy",
    Fate = "Fate"
}

/**
 * @public
 */
export declare enum MoveOutcome {
    Miss = 0,
    "Weak Hit" = 1,
    "Strong Hit" = 2
}

declare type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export declare type OmitNever<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};

/**
 * @public
 */
export declare type OptionalKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never;
}[keyof T];

export declare type PartialBy<T, K extends keyof any = ""> = Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>;

export declare type PartialDeep<T> = Partial<{
    [P in keyof T]: T[P] extends Array<unknown> ? (T[P] | undefined) : Partial<T[P]>;
}>;

/**
 * Makes a type where K and its properties are nullable.
 * @public
 */
export declare type PartialDeepBy<T, K extends keyof any = ""> = Omit<T, K> & PartialDeep<Pick<T, K extends keyof T ? K : never>>;

/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export declare type PartialExcept<T, K extends keyof any = ""> = RequireKey<{
    [P in keyof T]?: T[P];
}, K>;

export declare enum PartOfSpeechTag {
    Noun = "noun",
    CommonNoun = "common noun",
    Fragment = "fragment",
    Adjective = "adjective",
    ProperNoun = "proper noun",
    Verb = "verb",
    Plural = "plural",
    Name = "name",
    ProperNounFragment = "proper noun fragment",
    Sentences = "sentences",
    CompoundNoun = "compound noun",
    PossessiveCase = "possessive case"
}

/**
 * Set by "Oracles / Planets / Class"
 * @public
 */
export declare enum PlanetaryClass {
    Desert = "Desert",
    Furnace = "Furnace",
    Grave = "Grave",
    Ice = "Ice",
    Jovian = "Jovian",
    Jungle = "Jungle",
    Ocean = "Ocean",
    Rocky = "Rocky",
    Shattered = "Shattered",
    Tainted = "Tainted",
    Vital = "Vital"
}

/**
 * Standard player character condition meters.
 * @public
 */
export declare enum PlayerConditionMeter {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}

export declare enum Population {
    Few = "Few",
    Dozens = "Dozens",
    Hundreds = "Hundreds",
    Thousands = "Thousands",
    TensOfThousands = "Tens of thousands"
}

/**
 * @public
 */
export declare enum ProgressTypeIronsworn {
    Combat = "Combat",
    Vow = "Vow",
    Journey = "Journey",
    Delve = "Delve",
    SceneChallenge = "Scene Challenge",
    Bonds = "Bonds"
}

export declare enum ProgressTypeStarforged {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge",
    Quests = "Quests Legacy",
    Bonds = "Bonds Legacy",
    Discoveries = "Discoveries Legacy"
}

export declare enum Region {
    Terminus = "Terminus",
    Outlands = "Outlands",
    Expanse = "Expanse"
}

export declare enum Replacement {
    /**
     * Replace with the ID of the nearest ancestor asset.
     */
    Asset = "${{@ASSET}}",
    /**
     * Replace with the ID of the nearest ancestor asset's condition meter.
     */
    AssetMeter = "${{@ASSET_METER}}",
    /**
     * Replace with the ID of the nearest ancestor move trigger's custom stat.
     */
    CustomStat = "${{@CUSTOM_STAT}}",
    /**
     * Replace with the ID of the nearest select option value of the Stat type
     */
    AssetSelectStat = "${{@ASSET_SELECT_STAT}}",
    /**
     * Replace with the ID of the nearest select option value of the ConditionMeter type.
     */
    AssetSelectMeter = "${{@ASSET_SELECT_METER}}"
}

export declare type RequiredKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K;
}[keyof T];

export declare type RequireKey<T, K extends keyof any = ""> = T & {
    [P in K]-?: NonNullable<T[P extends keyof T ? P : never]>;
};

/**
 * Enumerates which dice are to be rerolled.
 * @public
 */
export declare enum RerollType {
    /**
     * The player can pick and choose which dice to reroll.
     */
    Any = "Any",
    /**
     * The player can pick and choose which challenge dice to reroll.
     */
    ChallengeDice = "Challenge dice",
    /**
     * The action die is rerolled.
     */
    ActionDie = "Action die",
    /**
     * The player can choose one challenge die to reroll.
     */
    ChallengeDie = "Challenge die",
    /**
     * Reroll *all* dice
     */
    All = "All"
}

export declare enum Role {
    Agent = "Agent",
    AI = "AI",
    Artisan = "Artisan",
    Assassin = "Assassin",
    BountyHunter = "Hunter",
    Courier = "Courier",
    Crew = "Crew",
    Criminal = "Criminal",
    Cultist = "Cultist",
    Diplomat = "Diplomat",
    Engineer = "Engineer",
    Entertainer = "Entertainer",
    Explorer = "Explorer",
    Farmer = "Farmer",
    Fugitive = "Fugitive",
    Guard = "Guard",
    Guide = "Guide",
    Healer = "Healer",
    Historian = "Historian",
    Hunter = "Hunter",
    Investigator = "Investigator",
    Laborer = "Laborer",
    Lawkeeper = "Lawkeeper",
    Leader = "Leader",
    Mercenary = "Mercenary",
    Merchant = "Merchant",
    Miner = "Miner",
    Mystic = "Mystic",
    Navigator = "Navigator",
    Outcast = "Outcast",
    Pilgrim = "Pilgrim",
    Pilot = "Pilot",
    Pirate = "Pirate",
    Preacher = "Preacher",
    Prophet = "Prophet",
    Raider = "Raider",
    Researcher = "Researcher",
    Scavenger = "Scavenger",
    Scholar = "Scholar",
    Scout = "Scout",
    Shipwright = "Shipwright",
    Smuggler = "Smuggler",
    Soldier = "Soldier",
    Spacer = "Spacer",
    Technician = "Technician",
    Thief = "Thief"
}

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ICustomStat["$id"] | PlayerConditionMeter | IConditionMeter["$id"];

export declare enum RollMethod {
    /**
     * When rolling with this move trigger option, *every* stat or progress track of the `Using` key is rolled.
     */
    All = "All",
    /**
     * When rolling with this move trigger option, use the highest/best option from the `Using` key.
     */
    Highest = "Highest",
    /**
     * When rolling with this move trigger option, use the lowest/worst option from the `Using` key.
     */
    Lowest = "Lowest",
    /**
     * When rolling with this move trigger option, the user picks which stat to use.
     *
     * This is the default option for triggers that offer a single stat.
     */
    Any = "Any",
    /**
     * This move trigger option has no roll method of its own, and must inherit its roll from another move trigger option.
     *
     * If the parent's `Using` is defined, the inherited roll must use one of those stats/progress tracks.
     *
     * Typically appears on children of `IAlterMove`.
     */
    Inherit = "Inherit",
    /**
     * The move trigger option results in an automatic strong hit - no roll required.
     */
    StrongHit = "Strong Hit",
    /**
     * The move trigger option results in an automatic weak hit - no roll required.
     */
    WeakHit = "Weak Hit"
}

/**
 * @public
 */
export declare enum RollType {
    Action = "Action roll",
    Progress = "Progress roll"
}

/**
 * @public
 */
export declare enum SettingTruthName {
    Cataclysm = "Cataclysm",
    Exodus = "Exodus",
    Communities = "Communities",
    Iron = "Iron",
    Laws = "Laws",
    Religion = "Religion",
    Magic = "Magic",
    CommunicationAndData = "Communication and Data",
    Medicine = "Medicine",
    ArtificialIntelligence = "Artificial Intelligence",
    War = "War",
    Lifeforms = "Lifeforms",
    Precursors = "Precursors",
    Horrors = "Horrors"
}

export declare enum SettlementInitialContact {
    AskingForHelp = "Asking for help",
    Captured = "Captured",
    Derelict = "Derelict",
    Destroyed = "Destroyed",
    Hostile = "Hostile",
    InBattle = "In battle",
    NeutralAutomated = "Neutral / automated",
    Uncooperative = "Uncooperative",
    Unresponsive = "Unresponsive",
    Wary = "Wary",
    Welcoming = "Welcoming"
}

export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    SunderedIslesPreview = "Sundered Isles Preview",
    Ironsworn = "Ironsworn Rulebook",
    IronswornAssets = "Ironsworn Assets",
    IronswornDelve = "Ironsworn: Delve",
    IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)",
    Custom = "Custom"
}

/**
 * Enumerates valid source URLs.
 * @public
 */
export declare enum SourceUrl {
    Starforged = "https://getstarforged.com",
    StarforgedAssets = "https://getstarforged.com",
    Ironsworn = "https://shawn-tomkin.itch.io/ironsworn",
    IronswornAssets = "https://shawn-tomkin.itch.io/ironsworn",
    IronswornDelve = "https://shawn-tomkin.itch.io/ironsworn-delve",
    IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view"
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export declare interface Starforged extends GameDataRoot {
    "Encounters": IEncounterStarforged[];
    "Setting Truths": ISettingTruth[];
}

/**
 * @public
 */
export declare const starforged: Starforged;

export declare enum StarshipInitialContact {
    AskingForHelp = "Asking for help",
    Derelict = "Derelict",
    Destroyed = "Destroyed",
    Dismissive = "Dismissive",
    Familiar = "Familiar",
    Friendly = "Friendly",
    Hostile = "Hostile",
    InBattle = "In battle",
    NeutralAutomated = "Neutral / automated",
    Uncooperative = "Uncooperative",
    Unresponsive = "Unresponsive",
    Wary = "Wary"
}

export declare enum Stat {
    Edge = "Edge",
    Heart = "Heart",
    Iron = "Iron",
    Shadow = "Shadow",
    Wits = "Wits"
}

/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export declare type StubBy<T, PartialKey extends keyof any = "", OmitKey extends keyof any = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends keyof any = "", OmitKey extends keyof any = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;

export declare type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
    length: TLength;
};

export declare enum VaultZone {
    Interior = "Interior",
    Sanctum = "Sanctum"
}

export declare enum Zone {
    Access = "Access",
    Community = "Community",
    Engineering = "Engineering",
    Living = "Living",
    Medical = "Medical",
    Operations = "Operations",
    Production = "Production",
    Research = "Research"
}

export { }
