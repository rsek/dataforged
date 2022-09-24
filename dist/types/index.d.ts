/**
 * @public
 */
export declare enum AssetTypeName {
    CommandVehicle = "Command Vehicle",
    Companion = "Companion",
    Deed = "Deed",
    Module = "Module",
    Path = "Path",
    SupportVehicle = "Support Vehicle",
    Ritual = "Ritual",
    CombatTalent = "Combat Talent"
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

/**
 * @public
 */
export declare type BlacklistPartial = "Label";

/**
 * Enumerates challenge ranks.
 * @page 39
 * @public
 */
export declare enum ChallengeRank {
    Troublesome = 1,
    Dangerous = 2,
    Formidable = 3,
    Extreme = 4,
    Epic = 5
}

/**
 * @public
 */
export declare enum ClockSegments {
    Four = 4,
    Six = 6,
    Eight = 8,
    Ten = 10
}

/**
 * See clocks (p. 234) for more information.
 * @public
 */
export declare enum ClockType {
    Tension = "Tension",
    Campaign = "Campaign"
}

/**
 * @public
 */
export declare enum DelveCardType {
    Theme = "Theme",
    Domain = "Domain"
}

/**
 * @public
 */
export declare enum EncounterNatureIronsworn {
    Ironlander = "Ironlander",
    Firstborn = "firstborn",
    Animal = "animal",
    Beast = "beast",
    Horror = "horror",
    Anomaly = "anomaly"
}

/**
 * @public
 */
export declare enum EncounterNatureStarforged {
    Creature = "Creature",
    Horror = "Horror",
    Human = "Human",
    Machine = "Machine",
    Monster = "Monster"
}

/**
 * @public
 */
export declare enum EncounterTags {
    Vehicle = "vehicle"
}

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export declare interface GameDataRoot {
    $schema?: string | undefined;
    "Asset Types": {
        [key: string]: IAssetType;
    };
    "Encounters": {
        [key: string]: IEncounterStarforged;
    } | {
        [key: string]: IEncounterNatureInfo;
    };
    "Move Categories": {
        [key: string]: IMoveCategory;
    };
    "Oracle Sets": {
        [key: string]: IOracleSet;
    };
    "Setting Truths": {
        [key: string]: ISettingTruth;
    } | {
        [key: string]: ISettingTruthClassic;
    };
}

/**
 * @public
 */
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

/**
 * Some might say that "Gamespace" is a terrible pun. To them, I reply: you'll never take me alive.
 * @public
 */
export declare enum Gamespace {
    Starforged = "Starforged",
    Ironsworn = "Ironsworn"
}

/**
 * @public
 */
export declare interface IAlterMiss extends PartialDeep<IOutcomeMiss> {
}

/**
 * @public
 */
export declare interface IAlterMomentum extends IHasId {
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
export declare interface IAlterMomentumBurn extends IHasId {
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
export declare interface IAlterMomentumReset extends IHasId {
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
export declare interface IAlterMove extends StubExcept<IMove, "$id", "Outcomes"> {
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
     * @localize
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
    "Strong Hit"?: IAlterStrongHit | undefined;
    "Weak Hit"?: IAlterWeakHit | undefined;
    Miss?: IAlterMiss | undefined;
}

/**
 * @public
 */
export declare interface IAlterStrongHit extends PartialDeep<IOutcomeStrongHit> {
}

/**
 * @public
 */
export declare interface IAlterWeakHit extends PartialDeep<IOutcomeWeakHit> {
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export declare interface IAsset extends IHasId, IHasDisplay, IHasSource, Partial<IHasAliases>, IHasTitle {
    /**
     * @example "Starforged/Assets/Path/Bounty_Hunter"
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+$
     */
    $id: string;
    Display: IDisplay;
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
     * @localize
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
export declare interface IAssetAbility extends IHasId, IHasText, Partial<IHasLabel> {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]$
     */
    $id: string;
    /**
     * Ironsworn companion assets provide labels for their abilities. Starforged asset abilities do not have labels.
     */
    Label?: string | undefined;
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
 * ```json
 * { "Condition Meter": { "Max": 3 } }
 * ```
 * @public
 */
export declare interface IAssetAlterProperties extends Omit<PartialDeep<OmitMetadataDeep<IAsset>>, "Abilities" | "Attachments" | "Condition Meter" | "$id">, IHasId {
    $id: string;
    Abilities?: IAssetAlterPropertiesAbility[] | undefined;
    Attachments?: IAssetAlterPropertiesAttachment | undefined;
    "Condition Meter"?: IAssetAlterPropertiesConditionMeter | undefined;
    States?: IAssetState[] | undefined;
}

/**
 * @public
 */
export declare interface IAssetAlterPropertiesAbility extends Partial<IAssetAbility> {
}

/**
 * @public
 */
export declare interface IAssetAlterPropertiesAttachment extends Partial<IAssetAttachment> {
}

/**
 * @public
 */
export declare interface IAssetAlterPropertiesConditionMeter extends Partial<IConditionMeter> {
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
 * Describes a possible state for an asset, like the "broken" status for certain assets (mainly Modules in *Starforged*).
 *
 * States are frequently toggled on and off by players; for real-world gameplay, this is generally represented by flipping the card over. A checkbox or other on/off toggle might serve the same function in a digital implementation.
 * @public
 */
export declare interface IAssetState extends IHasLabel {
    /**
     * A string label for the state.
     * @example "broken"
     * @localize
     * @pattern ^[a-z].+$
     */
    Label: string;
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
export declare interface IAssetType extends IHasId, IHasDescription, IHasDisplay, IHasSource, IHasTitle, Partial<IHasAliases> {
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
     * @localize
     */
    Title: ITitle;
    Display: IDisplay;
    Usage: IAssetUsage;
}

/**
 * @public
 */
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
 * Interface representing a condition meter such as health, spirit, supply.
 * @public
 */
export declare interface IConditionMeter extends IMeter {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Condition_Meter$
     */
    $id: string;
    /**
     * @default 0
     */
    Min: number;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
    /**
     * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link IMoveTriggerOptionAction.Using}. The array will include an appropriate alias if that is the case.
     */
    Aliases?: MeterAlias[] | undefined;
}

/**
 * @public
 */
export declare interface ICustomStat extends IHasId, IHasLabel {
    /**
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat$
     */
    $id: string;
    Options: ICustomStatOption[];
}

/**
 * @public
 */
export declare interface ICustomStatOption extends IHasId, IHasLabel {
    /**
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[0-9]+)/[A-z_-]+/Trigger/Options/[0-9]+/Custom_stat/[A-z_-]+$
     */
    $id: string;
    /**
     * The numeric value to be used as +stat when making an Action Roll.
     */
    Value: number;
    Label: string;
}

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn*) and Encounters *(Ironsworn* and *Starforged*)
 * @public
 */
export declare interface ICyclopediaEntry extends IHasId, IHasDisplay, IHasDescription, IHasSource, Partial<IHasSummary & IHasQuestStarter & IHasTags>, IHasTitle {
    /**
     * @pattern ^(Starforged|Ironsworn)/([A-z_-]+/)+$
     */
    $id: string;
    Tags?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    Features?: string[] | undefined;
}

/**
 * Interface describing common characteristics of themes and domains from *Ironsworn: Delve*.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveTheme
 * @see IDelveDomain
 * @public
 */
export declare interface IDelveCard extends IHasSource, IHasSummary, IHasDescription, IHasId, IHasTitle {
    /**
     * @pattern ^Ironsworn/(Themes|Domains)/[A-z_-]+$
     */
    $id: string;
    /**
     * Indicates whether this is a site Theme or a site Domain.
     */
    Type: DelveCardType;
    /**
     * The summary text that appears immediately below the card's title. For best rendering, ensure that it fits on a single line.
     * @markdown
     * @localize
     */
    Summary: string;
    /**
     * An extended description for this card that doesn't appear on the card itself. For 'canonical' Themes and Domains, these are presented on p. 84 - 93 of *Ironsworn: Delve*.
     *
     * Most are two paragraphs long, approximately 90 words (600 characters); the longest 'canonical' description clocks in at 98 words (619 characters). Allot space accordingly.
     *
     * @markdown
     * @localize
     */
    Description: string;
    /**
     * The Features contributed by this card. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
     */
    Features: IRow[];
    /**
     * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: IRow[];
}

/**
 * Interface describing a delve site domain.
 *
 * The **domain** represents the physical characteristics of the site—the terrain or architecture you must traverse.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveTheme
 * @public
 */
export declare interface IDelveDomain extends IDelveCard {
    /**
     * @pattern ^Ironsworn/Domains/[A-z_-]+$
     */
    $id: string;
    Type: DelveCardType.Domain;
    /**
     * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
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
     * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
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
 * Represents a Rarity (described in Ironsworn: Delve)
 * @public
 */
export declare interface IDelveRarity extends IHasTitle, IHasDisplay, IHasSource, IHasDescription {
    /**
     * @minimum 3
     * @maximum 5
     */
    "XP Cost": number;
    /**
     * The ID of the asset, to which this rarity applies its effects.
     * @see {@link IAsset.$id}
     */
    Asset: IAsset["$id"];
}

/**
 * Interface describing a delve site theme.
 *
 * The **theme** represents the condition or state of the site, and indicates the kinds of denizens and threats you might find there.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see IDelveDomain
 * @public
 */
export declare interface IDelveTheme extends IDelveCard {
    /**
     * @pattern ^Ironsworn/Themes/[A-z_-]+$
     */
    $id: string;
    Type: DelveCardType.Theme;
    /**
     * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
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
     * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
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

/**
 * Interface for data relevant to an item's display/rendering.
 * @public
 */
export declare interface IDisplay {
    /**
     * A URL pointing to a single SVG icon.
     * @pattern ^img/vector/[A-z-_0-9/]+\.svg$
     */
    Icon?: string | undefined;
    /**
     * An array of URLs pointing to one or more WEBP images.
     * @pattern ^img/raster/[A-z-_0-9/]+\.webp$
     */
    Images?: string[] | undefined;
    /**
     * A hex color associated with this item, for use as e.g. an accent color in its display.
     * @pattern ^#[A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9]$
     */
    Color?: string | undefined;
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
     * @example "Monster"
     * @localize
     */
    Nature: EncounterNatureStarforged | EncounterNatureIronsworn;
    Display: IDisplay;
    /**
     * @example "Insectoid horde"
     * @markdown
     * @localize
     */
    Summary?: string | undefined;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    /**
     * @markdown
     * @localize
     */
    Features?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    Drives?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    Tactics?: string[] | undefined;
    /**
     * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
     *
     * Only present in Ironsworn encounters.
     * @markdown
     * @localize
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
export declare interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasId, IHasDisplay, IHasSummary, IHasTitle {
    /**
     * @pattern ^Ironsworn/Encounters/[A-z_-]+$
     */
    $id: string;
    Encounters: IEncounterIronsworn[];
    Summary: string;
    Display: IDisplay;
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
    Variants?: IEncounterVariant[] | undefined;
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
export declare interface IHasDescription extends IHasId {
    /**
     * A user-facing markdown description of the item, consisting of one or more paragraphs.
     * @markdown
     * @localize
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
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export declare interface IHasId {
    /**
     * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
     * @pattern ^(Starforged|Ironsworn)/[0-9A-z_/-]+$
     */
    $id: string;
}

/**
 * @public
 */
export declare interface IHasLabel extends IHasId {
    /**
     * The user-facing text label of this item.
     * @localize
     */
    Label: string;
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
export declare interface IHasQuestStarter extends IHasId {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     * @localize
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
export declare interface IHasRollTemplate extends IHasId {
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
export declare interface IHasSummary extends IHasId {
    /**
     * A user-facing markdown summary of the item. Summary is shorter than {@link IHasDescription | Description}, when they're both present.
     * @markdown
     * @localize
     */
    Summary: string;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export declare interface IHasTable extends IHasId {
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
export declare interface IHasText extends IHasId {
    /**
     * The item's rules text as a markdown string.
     * @markdown
     * @localize
     */
    Text: string;
}

/**
 * @public
 */
export declare interface IHasTitle extends IHasId {
    Title: ITitle;
}

/**
 * A stub interface representing an input widget of any type.
 * @see {@link IInputNumber}, {@link IInputClock}, {@link IInputText}, {@link IInputSelect}
 * @public
 */
export declare interface IInput extends IHasId, IHasLabel {
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
    Label: string;
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
    Value: number;
}

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @example
 * ```json
 * {
 *   "Label": "Material",
 *   "Input Type": "Select",
 *   "Attributes": [
 *     { "Key": "stat", "Type": "Stat" },
 *     { "Key": "condition_meter", "Type": "Condition Meter" }
 *    ],
 *    "Options": [
 *      {
 *       "Label": "Thunderwood",
 *       "Sets": [
 *         { "Key": "stat", "Value": "edge" },
 *         { "Key": "condition_meter", "Value": "health" }
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
    /**
     * @pattern ^[a-z_]+$
     */
    Key: string;
    Type: InputSelectOptionType;
}

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export declare interface IInputSelectOption extends IHasId, IHasLabel {
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
    Key: IInputSelectAttributeDefinition["Key"];
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
 * Base interface for properties common to all resource meters.
 * @see {@link IConditionMeter}
 * @public
 */
export declare interface IMeter extends IHasId, IHasLabel {
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
    Value: number;
    /**
     * Whether the meter value can be used in place of a stat in an action roll.
     */
    Rollable: boolean;
    /**
     * @pattern ^[a-z].+$
     */
    Label: string;
}

/**
 * Interface representing a Starforged move.
 * @public
 */
export declare interface IMove extends IHasId, IHasText, IHasDisplay, IHasSource, IHasOptional, IHasTitle, Partial<IHasSuggestions> {
    /**
     * @example "Starforged/Moves/Adventure/Face_Danger"
     * @pattern ^(Starforged|Ironsworn)/Moves/([A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3])/[A-z_-]+$
     */
    $id: string;
    /**
     * Note the "Canonical" key for asset-specific moves is something of a misnomer, as in the original text doesn't name them. They're provided in the same format for convenience, however.
     * @see IHasTitle
     * @example
     * ```json
     * {"Canonical": "Face Danger"}
     * ```
     */
    Title: ITitle;
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
    Oracles?: IOracleTable["$id"][] | undefined;
    /**
     * Outcome information for the move.
     */
    Outcomes?: IMoveOutcomes | undefined;
    Display: IDisplay;
    Tags?: string[] | undefined;
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export declare interface IMoveCategory extends IHasId, IHasSource, IHasDescription, IHasDisplay, IHasOptional, IHasTitle {
    /**
     * @example "Starforged/Moves/Adventure"
     * @pattern ^(Starforged|Ironsworn)/Moves/[A-z_-]+$
     */
    $id: string;
    Moves: {
        [key: string]: IMove;
    };
    Display: IDisplay;
}

/**
 * @public
 */
export declare interface IMoveOutcomes extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes$
     */
    $id: string;
    "Strong Hit": IOutcomeStrongHit;
    "Weak Hit": IOutcomeWeakHit;
    "Miss": IOutcomeMiss;
}

/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export declare interface IMoveReroll extends IHasId, Partial<IHasText> {
    /**
     *
     */
    $id: string;
    /**
     * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
     * @markdown
     * @localize
     */
    Text?: string | undefined;
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
     * @localize
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

/**
 * The type of an attribute set by a Select Input.
 * @public
 */
export declare enum InputSelectOptionType {
    /**
     * A reference to one of the player character's stats: edge, heart, iron, shadow, or wits.
     * @see {@link Stat}
     */
    Stat = "Stat",
    /**
     * A reference to one of the player character's condition meters (Starforged) or status tracks (Ironsworn): health, spirit, or supply.
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

/**
 * @public
 */
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
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link IOracleTable} and {@link IOracleSet} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export declare interface IOracleBase extends Partial<IHasAliases & IHasSummary & IHasDescription & IHasOracleContent>, IHasId, IHasDisplay, IHasSource, IHasTitle {
    $id: string;
    /**
     * An array containing the ID of every {@link IOracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-/]+$
     */
    Ancestors: IOracleSet["$id"][];
    Display: IOracleDisplayBase;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    Usage?: IOracleUsage | undefined;
    /**
     * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
     */
    Table?: (IRow | IRowNullStub)[] | undefined;
    /**
     * Oracle tables contained by this set.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     */
    Tables?: {
        [key: string]: IOracleTable;
    } | undefined;
    /**
     * Oracle sets contained by this set.
     *
     * This key appears only on {@link IOracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     */
    Sets?: {
        [key: string]: IOracleSet;
    } | undefined;
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     *
     * This key appears only on {@link IOracleTable}s that have a `Table`.
     */
    "On a Match"?: IOracleMatch | undefined;
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
 * Base interface inherited by {@link IOracleSetDisplay} and {@link IOracleTableDisplay}.
 * @public
 */
export declare interface IOracleDisplayBase extends IDisplay, IHasId {
    /**
     * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
     *
     * If `undefined`, this table is rendered as a standalone table.
     *
     * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
     */
    "Column of"?: IOracleTable["$id"] | undefined;
    /**
     * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
     *
     * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
     */
    "Columns"?: [ITableColumnRoll, ...(ITableColumnRoll | ITableColumnText)[]] | undefined;
    /**
     * This table is displayed as embedded in a row of another table.
     */
    "Embed in"?: IRow["$id"] | undefined;
}

/**
 * @public
 */
export declare interface IOracleMatch extends IHasId, IHasText {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?/On_a_Match$
     */
    $id: string;
}

/**
 * Represents an oracle set: a grouping that can contain both {@link IOracleTable}s and other instances of {@link IOracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracleTable} and {@link IOracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface IOracleSet extends Omit<IOracleBase, "Table"> {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+(/[A-z_-]+)?$
     */
    $id: string;
    /**
     * A list of sample names for this category. Only used by Planetary Class {@link IOracleSet}s.
     */
    "Sample Names"?: string[] | undefined;
    Sets?: {
        [key: string]: IOracleSet;
    } | undefined;
    Tables?: {
        [key: string]: IOracleTable;
    } | undefined;
    Display: IOracleSetDisplay;
}

/**
 * Information on displaying {@link IOracleSet}, including information on its rendering in the original text.
 *
 * If an {@link IOracleSet} has `Columns`, it represents a "supertable" composed of multiple roll or string columns.
 * @public
 */
export declare interface IOracleSetDisplay extends Omit<IOracleDisplayBase, "Column of" | "Embed in"> {
}

/**
 * Represents an oracle that has a `Table` composed of {@link IRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link IOracleBase} if you need to type both {@link IOracleTable} and {@link IOracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface IOracleTable extends Omit<IOracleBase, "Sets" | "Tables"> {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?$
     */
    $id: string;
    /**
     * @example
     * ```json
     * {
     *  "Canonical": "Character Revealed Aspect",
     *  "Short": "Revealed Aspect"
     * }
     * ```
     * @example
     * ```json
     * {
     *  "Canonical": "Spaceborne Peril",
     *  "Short": "Peril"
     * }
     * ```
     */
    Title: ITitle;
    Display: IOracleTableDisplay;
    "Table": (IRow | IRowNullStub)[];
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     */
    "On a Match"?: IOracleMatch | undefined;
}

/**
 * Information on displaying {@link IOracleTable}, including information on its rendering in the original text.
 * @public
 */
export declare interface IOracleTableDisplay extends IOracleDisplayBase {
    "Columns": [ITableColumnRoll, ...(ITableColumnRoll | ITableColumnText)[]];
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
export declare interface IOutcomeInfoBase<O extends MoveOutcome, RequireText extends boolean = false> extends IHasId, Partial<IHasText> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/((Miss|Strong_Hit)(/With_a_Match)?|Weak_Hit)$
     */
    $id: string;
    /**
     * Defines a different outcome for this result with a match. Its text should replace the text of this object.
     */
    "With a Match"?: IOutcomeInfoBase<O> | undefined;
    /**
     * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
     */
    "Count as"?: keyof typeof MoveOutcome | undefined;
    /**
     * Information on rerolls offered by this move.
     */
    Reroll?: IMoveReroll | undefined;
    /**
     * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
     */
    "In Control"?: boolean | undefined;
    Text?: RequireText extends true ? string : (string | undefined);
}

/**
 * @public
 */
export declare interface IOutcomeMiss extends IHasId, IOutcomeInfoBase<MoveOutcome.Miss, true> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss$
     */
    $id: string;
    "With a Match"?: IOutcomeMissMatch | undefined;
    /**
     * @default false
     */
    "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface IOutcomeMissMatch extends Omit<IOutcomeMiss, "With a Match"> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Miss/With_a_Match$
     */
    $id: string;
    /**
     * @default false
     */
    "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface IOutcomeStrongHit extends IHasId, IOutcomeInfoBase<typeof MoveOutcome["Strong Hit"], true> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Strong_Hit$
     */
    $id: string;
    "With a Match"?: IOutcomeStrongHitMatch | undefined;
    /**
     * @default true
     */
    "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface IOutcomeStrongHitMatch extends Omit<IOutcomeStrongHit, "With a Match"> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Strong_Hit/With_a_Match$
     */
    $id: string;
    /**
     * @default true
     */
    "In Control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface IOutcomeWeakHit extends Omit<IOutcomeInfoBase<typeof MoveOutcome["Weak Hit"], true>, "With a Match"> {
    /**
     * @pattern ^(Starforged|Ironsworn)/(Moves/[A-z_-]+/[A-z_-]+|Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/Alter_Moves/[0-9]+|Moves/Assets/[A-z_-]+/[A-z_-]+/Abilities/[1-3]/[A-z_-]+)/Outcomes/Weak_Hit$
     */
    $id: string;
    /**
     * @default false
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
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export declare interface IRollTemplate extends IHasId, Partial<IHasSummary & IHasDescription> {
    /**
     * @pattern ^(Starforged|Ironsworn)/[A-z_-]+/.+/Roll_template$
     */
    $id: string;
    /**
     * A template string for the parent's `Result` property, to be filled with an oracle table roll Result.
     * @localize
     * @example
     * ```json
     * "{{Starforged/Oracles/Factions/Affiliation}} of the {{Starforged/Oracles/Factions/Legacy}} {{Starforged/Oracles/Factions/Identity}}"
     * ```
     */
    Result?: string | undefined;
    /**
     * A template string for the parent's `Summary` property, to be filled with an oracle table roll Result.
     * @localize
     */
    Summary?: string | undefined;
    /**
     * A template string for the parent's `Description` property, to be filled with an oracle table roll Result.
     * @localize
     * @example
     * ```json
     * "Our computers are limited to simple digital systems and the most basic machine intelligence. This is because: {{Starforged/Setting_Truths/Artificial_Intelligence/1-33/Subtable}}.\n\nThe Adepts serve in place of those advanced systems. They utilize mind-altering drugs to see the universe as a dazzling lattice of data, identifying trends and predicting outcomes with uncanny accuracy. But to gain this insight they sacrifice much of themselves."
     * ```
     */
    Description?: string | undefined;
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export declare interface Ironsworn extends GameDataRoot {
    "Encounters": {
        [key: string]: IEncounterNatureInfo;
    };
    "Setting Truths": {
        [key: string]: ISettingTruthClassic;
    };
    "Site Domains": {
        [key: string]: IDelveDomain;
    };
    "Site Themes": {
        [key: string]: IDelveTheme;
    };
    Regions?: {
        [key: string]: IIronswornRegion;
    };
    Rarities?: {
        [key: string]: IDelveRarity;
    };
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
     */
    $id: string;
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
     * @markdown
     * @localize
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
     * @markdown
     * @localize
     */
    Summary?: string | null | undefined;
    /**
     * Additional oracle tables that should be rolled when this row is selected.
     */
    "Oracle rolls"?: IOracleTable["$id"][] | undefined;
    /**
     * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
     */
    Subtable?: IRow[] | ISettingTruthOptionSubtableRow[] | undefined;
    /**
     * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
     */
    "Multiple rolls"?: IMultipleRolls | undefined;
    /**
     * The attributes set by this row.
     */
    Attributes?: IAttribute[] | undefined;
}

/**
 * A row stub that has no dice range assigned to it, but still contains user-facing strings that are relevant to rendering the table. Typically, their dice range appears as "--" in the book.
 * @public
 */
export declare interface IRowNullStub extends Omit<Partial<IRow>, "$id"> {
    Floor: null;
    Ceiling: null;
    Result: string;
    Summary?: string | undefined | null;
}

/**
 * Interface for Starforged Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export declare interface ISettingTruth extends IHasId, IHasSource, IHasDisplay, Partial<IHasSuggestions>, IHasTable, IHasTitle {
    /**
     * @pattern ^Starforged/Setting_Truths/[A-z_-]+$
     */
    $id: string;
    /**
     * The 'canonical' options for this setting truth category.
     */
    Table: ISettingTruthOption[];
    /**
     * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
     * @markdown
     * @localize
     */
    Character: string;
    Display: IDisplay;
}

/**
 * @public
 */
export declare interface ISettingTruthClassic extends IHasTitle, IHasSource {
    /**
     * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+$
     */
    $id: string;
    Options: ISettingTruthOptionClassic[];
}

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 * @public
 */
export declare interface ISettingTruthOption extends IRow, IHasQuestStarter, IHasDescription {
    /**
     * @pattern ^Starforged/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100)$
     */
    $id: string;
    "Roll template"?: IRollTemplate | undefined;
    Subtable?: ISettingTruthOptionSubtableRow[] | undefined;
}

/**
 * @public
 */
export declare interface ISettingTruthOptionClassic extends IHasDescription, IHasQuestStarter {
    /**
     * @pattern ^Ironsworn/Setting_Truths/[A-z_-]+/[1-3]$
     */
    $id: string;
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
    /**
     * The URL pointing to the license which this content falls under.
     */
    License: License;
}

/**
 * @public
 */
export declare interface ISourceYaml extends Partial<ISource> {
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
    "Oracle rolls"?: IOracleTable["$id"][] | undefined;
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
    "Encounters"?: IEncounterStarforged["$id"][] | IEncounterIronsworn["$id"][] | undefined;
    /**
     * Suggested delve site themes.
     */
    "Themes"?: IDelveTheme["$id"][] | undefined;
    /**
     * Suggested delve site domains.
     */
    "Domains"?: IDelveDomain["$id"][] | undefined;
    /**
     * Suggested Ironlands regions.
     */
    "Regions"?: IIronswornRegion["$id"][] | undefined;
}

/**
 * Interface with elements common to {@link ITableColumnRoll} and {@link ITableColumnText}.
 * @public
 */
export declare interface ITableColumnBase extends IHasLabel {
    /**
     * The label or header text to use for this column.
     * @localize
     */
    Label: string;
    /**
     * The ID of the {@link IOracleTable} whose {@link IOracleTable.Table} content will be displayed in the table.
     */
    "Content": IOracleTable["$id"];
    Type: TableColumnType;
    /**
     * The key of each {@link IRow} in the {@link IOracleTable.Table}, whose string value is displayed in the rendered table.
     */
    Key?: KeysWithValuesOfType<IRow, string> | undefined;
}

/**
 * @public
 */
export declare interface ITableColumnRoll extends Omit<ITableColumnBase, "Key"> {
    /**
     * @default "Roll"
     * @localize
     */
    Label: string;
    Type: TableColumnType.Range;
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link ITableColumnRoll}, which displays numerical ranges).
 * @public
 */
export declare interface ITableColumnText extends ITableColumnBase {
    Type: TableColumnType.String;
    /**
     * @default "Result"
     * @localize
     */
    Label: string;
    /**
     * @default "Result"
     */
    Key: KeysWithValuesOfType<IRow, string>;
}

/**
 * @public
 */
export declare interface ITitle extends IHasId {
    /**
     * @pattern ^(Starforged|Ironsworn)/[0-9A-z_/-]+/Title$
     */
    $id: string;
    /**
     * The title of this item, which here is defined as the associated header text *exactly* as it appears on the page.
     *
     * For items that represent a single table column, this is the label that appears at the top of the column.
     *
     * Use this title if you want high fidelity to the book. For most interactive UX, it's recommended to use {@link ITitle.Standard} instead.
     *
     * @localize
     */
    Canonical: string;
    /**
     * The recommended title for most implementations.
     *
     * This is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some Ironsworn oracles (because *nobody* remembers it as "Oracle 15").
     *
     * If you need the shortest possible name, see {@link ITitle.Short} instead.
     * @localize
     */
    Standard: string;
    /**
     * The shortest title for this item that remains distinct amongst its siblings.
     *
     * Unless you're very pressed for space, most UX should use {@link ITitle.Standard} instead.
     *
     * @localize
     */
    Short: string;
}

/**
 * @public
 */
export declare type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/**
 * @public
 */
export declare type KeysWithValuesOfType<T, V> = keyof {
    [P in keyof T]: T[P] extends V | undefined ? V : never;
};

/**
 * @public
 */
export declare enum License {
    CC_BY_NC_SA = "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    CC_BY_SA = "https://creativecommons.org/licenses/by-sa/4.0/",
    None = "None"
}

/**
 * Set by Oracles / Location Themes / Theme Type
 * @public
 */
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

/**
 * @public
 */
export declare type MetadataKey = "$id" | "Title" | "Asset Type" | "Display" | "Source" | "Tags" | "Usage" | "Aliases";

/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export declare enum MeterAlias {
    Attached_Asset_Meter = "attached asset meter",
    CompanionHealth = "companion health",
    VehicleIntegrity = "vehicle integrity",
    CommandVehicleIntegrity = "command vehicle integrity",
    SupportVehicleIntegrity = "support vehicle integrity",
    IncidentalVehicleIntegrity = "incidental vehicle integrity"
}

/**
 * Conditions (such as impacts) that can apply to asset cards with condition meters. These are typically presented as tick boxes on the asset card.
 * @public
 */
export declare enum MeterCondition {
    /**
     * Battered may be marked when your vehicle is at 0 integrity and you fail to Withstand Damage. The vehicle is barely holding together.
     * @page 51
     */
    Battered = "battered",
    /**
     * Cursed may be marked when your command vehicle (STARSHIP asset) is at 0 integrity and you fail to Withstand Damage. This is a permanent impact. Your ship will never be quite right again.
     * @page 51
     */
    Cursed = "cursed",
    /**
     * When your companion’s health is at 0 and you score a miss, they are out of action. You cannot leverage their support until they gain at least +1 health. Envision what this means in the fiction of your scene.
     * @page 204
     */
    OutOfAction = "out of action",
    /** Used by "Fleet Commander" asset */
    Wrecked = "wrecked"
}

/**
 * Enumerates player character resource meters.
 * @public
 */
export declare enum MeterType {
    Health = "health",
    Spirit = "spirit",
    Supply = "supply",
    Momentum = "momentum"
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

/**
 * @public
 */
export declare type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

/**
 * @public
 */
export declare type NullableKey<T, K> = {
    [P in keyof T]: P extends K ? T[P] | null : T[P];
};

/**
 * Similar to "Omit", but recurses through any keyed object children to omit K from them, too.
 * @public
 */
export declare type OmitDeep<T, K extends string> = {
    [P in keyof T]: P extends K ? never : T[P] extends Record<string, unknown> ? OmitDeep<T[P], K> : T[P];
};

/**
 * A stub that omits common metadata recursively. Use it to create things like e.g. AssetAlterProperties.
 *
 * Additional keys to omit (non-recursively) may optionally be provided with K.
 * @public
 */
export declare type OmitMetadataDeep<T, K extends string = ""> = OmitDeep<Omit<T, K>, MetadataKey>;

/**
 * Omits "never" types.
 * @public
 */
export declare type OmitNever<T> = {
    [K in keyof T as T[K] extends never ? never : K]: T[K];
};

/**
 * @public
 */
export declare type OptionalKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * Makes a type where K is nullable.
 * @public
 */
export declare type PartialBy<T, K extends string> = Omit<T, K> & Partial<Pick<T, K extends keyof T ? K : never>>;

/**
 * Similar to 'Partial', but recurses through all properties and their children, too. Use with care, as it can sometimes cause compiler segfaults. It's recommended to combine this with Omit if there's properties that you're sure you won't need (make {@link PartialDeep} the outermost generic type, in this case).
 *
 * @public
 */
export declare type PartialDeep<T> = Partial<{
    [P in keyof T]?: (T[P] extends Record<string, unknown> ? PartialDeep<T[P]> : T[P]) | undefined;
}>;

/**
 * Makes a type where K and its properties are nullable.
 * @public
 */
export declare type PartialDeepBy<T, K extends string> = Omit<T, K> & PartialDeep<Pick<T, K extends keyof T ? K : never>>;

/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export declare type PartialExcept<T, K extends string> = RequireKey<{
    [P in keyof T]?: T[P];
}, K>;

/**
 * A stub that with recursively optional metadata. Additional keys to make partial may optionally be provided with K.
 * @public
 */
export declare type PartialMetadataDeep<T, K extends string = ""> = PartialDeepBy<T, K | MetadataKey>;

/**
 * @public
 */
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
    Health = "health",
    Spirit = "spirit",
    Supply = "supply"
}

/**
 * @public
 */
export declare enum ProgressTypeIronsworn {
    Combat = "combat progress",
    Vow = "vow progress",
    Journey = "journey progress",
    Delve = "delve progress",
    SceneChallenge = "scene challenge progress",
    BondsTrack = "bonds track"
}

/**
 * @public
 */
export declare enum ProgressTypeStarforged {
    Combat = "combat progress",
    Vow = "vow progress",
    Expedition = "expedition progress",
    Connection = "connection progress",
    SceneChallenge = "scene challenge progress",
    QuestsLegacy = "quests legacy",
    BondsLegacy = "bonds legacy",
    DiscoveriesLegacy = "discoveries legacy"
}

/**
 * Standard replacement strings, used by constructors when processing the master YAML data.
 * @public
 */
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

/**
 * @public
 */
export declare type RequiredKeys<T> = {
    [K in keyof T]-?: Record<string, unknown> extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * Generic type: require specific keys to be NonNullable.
 * @public
 */
export declare type RequireKey<T, K extends string> = T & {
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

/**
 * @public
 */
export declare type RetainBlacklist<T> = {
    [P in keyof T as T[P] extends BlacklistPartial ? P : never]: T[P];
};

/**
 * Enumerates the ID of every 'canonical' Starforged oracle that can be rolled directly. Provided to make it easy to type-check e.g. functions that accept an oracle ID as an argument.
 * @public
 */
export declare enum RollableOraclesSF {
    Character_Creation_Background_Assets = "Starforged/Oracles/Character_Creation/Background_Assets",
    Character_Creation_Backstory_Prompts = "Starforged/Oracles/Character_Creation/Backstory_Prompts",
    Character_Creation_Inciting_Incident = "Starforged/Oracles/Character_Creation/Inciting_Incident",
    Character_Creation_Sector_Trouble = "Starforged/Oracles/Character_Creation/Sector_Trouble",
    Character_Creation_Starship_History = "Starforged/Oracles/Character_Creation/Starship_History",
    Character_Creation_Starship_Quirks = "Starforged/Oracles/Character_Creation/Starship_Quirks",
    Characters_Disposition = "Starforged/Oracles/Characters/Disposition",
    Characters_First_Look = "Starforged/Oracles/Characters/First_Look",
    Characters_Goal = "Starforged/Oracles/Characters/Goal",
    Characters_Name_Callsign = "Starforged/Oracles/Characters/Name/Callsign",
    Characters_Name_Family_Name = "Starforged/Oracles/Characters/Name/Family_Name",
    Characters_Name_Given_Name = "Starforged/Oracles/Characters/Name/Given_Name",
    Characters_Revealed_Aspect = "Starforged/Oracles/Characters/Revealed_Aspect",
    Characters_Role = "Starforged/Oracles/Characters/Role",
    Core_Action = "Starforged/Oracles/Core/Action",
    Core_Descriptor = "Starforged/Oracles/Core/Descriptor",
    Core_Focus = "Starforged/Oracles/Core/Focus",
    Core_Theme = "Starforged/Oracles/Core/Theme",
    Creatures_Basic_Form_Air = "Starforged/Oracles/Creatures/Basic_Form/Air",
    Creatures_Basic_Form_Interior = "Starforged/Oracles/Creatures/Basic_Form/Interior",
    Creatures_Basic_Form_Land = "Starforged/Oracles/Creatures/Basic_Form/Land",
    Creatures_Basic_Form_Liquid = "Starforged/Oracles/Creatures/Basic_Form/Liquid",
    Creatures_Basic_Form_Space = "Starforged/Oracles/Creatures/Basic_Form/Space",
    Creatures_Encountered_Behavior = "Starforged/Oracles/Creatures/Encountered_Behavior",
    Creatures_Environment = "Starforged/Oracles/Creatures/Environment",
    Creatures_First_Look = "Starforged/Oracles/Creatures/First_Look",
    Creatures_Revealed_Aspect = "Starforged/Oracles/Creatures/Revealed_Aspect",
    Creatures_Scale = "Starforged/Oracles/Creatures/Scale",
    Creatures_Ultra_scale = "Starforged/Oracles/Creatures/Ultra-scale",
    Derelicts_Access_Area = "Starforged/Oracles/Derelicts/Access/Area",
    Derelicts_Access_Feature = "Starforged/Oracles/Derelicts/Access/Feature",
    Derelicts_Access_Opportunity = "Starforged/Oracles/Derelicts/Access/Opportunity",
    Derelicts_Access_Peril = "Starforged/Oracles/Derelicts/Access/Peril",
    Derelicts_Community_Area = "Starforged/Oracles/Derelicts/Community/Area",
    Derelicts_Community_Feature = "Starforged/Oracles/Derelicts/Community/Feature",
    Derelicts_Community_Opportunity = "Starforged/Oracles/Derelicts/Community/Opportunity",
    Derelicts_Community_Peril = "Starforged/Oracles/Derelicts/Community/Peril",
    Derelicts_Condition = "Starforged/Oracles/Derelicts/Condition",
    Derelicts_Engineering_Area = "Starforged/Oracles/Derelicts/Engineering/Area",
    Derelicts_Engineering_Feature = "Starforged/Oracles/Derelicts/Engineering/Feature",
    Derelicts_Engineering_Opportunity = "Starforged/Oracles/Derelicts/Engineering/Opportunity",
    Derelicts_Engineering_Peril = "Starforged/Oracles/Derelicts/Engineering/Peril",
    Derelicts_Inner_First_Look = "Starforged/Oracles/Derelicts/Inner_First_Look",
    Derelicts_Living_Area = "Starforged/Oracles/Derelicts/Living/Area",
    Derelicts_Living_Feature = "Starforged/Oracles/Derelicts/Living/Feature",
    Derelicts_Living_Opportunity = "Starforged/Oracles/Derelicts/Living/Opportunity",
    Derelicts_Living_Peril = "Starforged/Oracles/Derelicts/Living/Peril",
    Derelicts_Location = "Starforged/Oracles/Derelicts/Location",
    Derelicts_Medical_Area = "Starforged/Oracles/Derelicts/Medical/Area",
    Derelicts_Medical_Feature = "Starforged/Oracles/Derelicts/Medical/Feature",
    Derelicts_Medical_Opportunity = "Starforged/Oracles/Derelicts/Medical/Opportunity",
    Derelicts_Medical_Peril = "Starforged/Oracles/Derelicts/Medical/Peril",
    Derelicts_Operations_Area = "Starforged/Oracles/Derelicts/Operations/Area",
    Derelicts_Operations_Feature = "Starforged/Oracles/Derelicts/Operations/Feature",
    Derelicts_Operations_Opportunity = "Starforged/Oracles/Derelicts/Operations/Opportunity",
    Derelicts_Operations_Peril = "Starforged/Oracles/Derelicts/Operations/Peril",
    Derelicts_Outer_First_Look = "Starforged/Oracles/Derelicts/Outer_First_Look",
    Derelicts_Production_Area = "Starforged/Oracles/Derelicts/Production/Area",
    Derelicts_Production_Feature = "Starforged/Oracles/Derelicts/Production/Feature",
    Derelicts_Production_Opportunity = "Starforged/Oracles/Derelicts/Production/Opportunity",
    Derelicts_Production_Peril = "Starforged/Oracles/Derelicts/Production/Peril",
    Derelicts_Research_Area = "Starforged/Oracles/Derelicts/Research/Area",
    Derelicts_Research_Feature = "Starforged/Oracles/Derelicts/Research/Feature",
    Derelicts_Research_Opportunity = "Starforged/Oracles/Derelicts/Research/Opportunity",
    Derelicts_Research_Peril = "Starforged/Oracles/Derelicts/Research/Peril",
    Derelicts_Type_Deep_Space = "Starforged/Oracles/Derelicts/Type/Deep_Space",
    Derelicts_Type_Orbital = "Starforged/Oracles/Derelicts/Type/Orbital",
    Derelicts_Type_Planetside = "Starforged/Oracles/Derelicts/Type/Planetside",
    Derelicts_Zones_Settlement = "Starforged/Oracles/Derelicts/Zones/Settlement",
    Derelicts_Zones_Starship = "Starforged/Oracles/Derelicts/Zones/Starship",
    Factions_Affiliation = "Starforged/Oracles/Factions/Affiliation",
    Factions_Dominion = "Starforged/Oracles/Factions/Dominion",
    Factions_Fringe_Group = "Starforged/Oracles/Factions/Fringe_Group",
    Factions_Guild = "Starforged/Oracles/Factions/Guild",
    Factions_Identity = "Starforged/Oracles/Factions/Identity",
    Factions_Influence = "Starforged/Oracles/Factions/Influence",
    Factions_Leadership = "Starforged/Oracles/Factions/Leadership",
    Factions_Legacy = "Starforged/Oracles/Factions/Legacy",
    Factions_Name_Template = "Starforged/Oracles/Factions/Name_Template",
    Factions_Projects = "Starforged/Oracles/Factions/Projects",
    Factions_Quirks = "Starforged/Oracles/Factions/Quirks",
    Factions_Relationships = "Starforged/Oracles/Factions/Relationships",
    Factions_Rumors = "Starforged/Oracles/Factions/Rumors",
    Factions_Type = "Starforged/Oracles/Factions/Type",
    Location_Themes_Chaotic_Feature = "Starforged/Oracles/Location_Themes/Chaotic/Feature",
    Location_Themes_Chaotic_Opportunity = "Starforged/Oracles/Location_Themes/Chaotic/Opportunity",
    Location_Themes_Chaotic_Peril = "Starforged/Oracles/Location_Themes/Chaotic/Peril",
    Location_Themes_Fortified_Feature = "Starforged/Oracles/Location_Themes/Fortified/Feature",
    Location_Themes_Fortified_Opportunity = "Starforged/Oracles/Location_Themes/Fortified/Opportunity",
    Location_Themes_Fortified_Peril = "Starforged/Oracles/Location_Themes/Fortified/Peril",
    Location_Themes_Haunted_Feature = "Starforged/Oracles/Location_Themes/Haunted/Feature",
    Location_Themes_Haunted_Opportunity = "Starforged/Oracles/Location_Themes/Haunted/Opportunity",
    Location_Themes_Haunted_Peril = "Starforged/Oracles/Location_Themes/Haunted/Peril",
    Location_Themes_Infested_Feature = "Starforged/Oracles/Location_Themes/Infested/Feature",
    Location_Themes_Infested_Opportunity = "Starforged/Oracles/Location_Themes/Infested/Opportunity",
    Location_Themes_Infested_Peril = "Starforged/Oracles/Location_Themes/Infested/Peril",
    Location_Themes_Inhabited_Feature = "Starforged/Oracles/Location_Themes/Inhabited/Feature",
    Location_Themes_Inhabited_Opportunity = "Starforged/Oracles/Location_Themes/Inhabited/Opportunity",
    Location_Themes_Inhabited_Peril = "Starforged/Oracles/Location_Themes/Inhabited/Peril",
    Location_Themes_Mechanical_Feature = "Starforged/Oracles/Location_Themes/Mechanical/Feature",
    Location_Themes_Mechanical_Opportunity = "Starforged/Oracles/Location_Themes/Mechanical/Opportunity",
    Location_Themes_Mechanical_Peril = "Starforged/Oracles/Location_Themes/Mechanical/Peril",
    Location_Themes_Ruined_Feature = "Starforged/Oracles/Location_Themes/Ruined/Feature",
    Location_Themes_Ruined_Opportunity = "Starforged/Oracles/Location_Themes/Ruined/Opportunity",
    Location_Themes_Ruined_Peril = "Starforged/Oracles/Location_Themes/Ruined/Peril",
    Location_Themes_Sacred_Feature = "Starforged/Oracles/Location_Themes/Sacred/Feature",
    Location_Themes_Sacred_Opportunity = "Starforged/Oracles/Location_Themes/Sacred/Opportunity",
    Location_Themes_Sacred_Peril = "Starforged/Oracles/Location_Themes/Sacred/Peril",
    Location_Themes_Theme_Type = "Starforged/Oracles/Location_Themes/Theme_Type",
    Misc_Anomaly_Effect = "Starforged/Oracles/Misc/Anomaly_Effect",
    Misc_Combat_Action = "Starforged/Oracles/Misc/Combat_Action",
    Misc_Story_Clue = "Starforged/Oracles/Misc/Story_Clue",
    Misc_Story_Complication = "Starforged/Oracles/Misc/Story_Complication",
    Moves_Ask_the_Oracle_Almost_Certain = "Starforged/Oracles/Moves/Ask_the_Oracle/Almost_Certain",
    Moves_Ask_the_Oracle_Fifty_fifty = "Starforged/Oracles/Moves/Ask_the_Oracle/Fifty-fifty",
    Moves_Ask_the_Oracle_Likely = "Starforged/Oracles/Moves/Ask_the_Oracle/Likely",
    Moves_Ask_the_Oracle_Small_Chance = "Starforged/Oracles/Moves/Ask_the_Oracle/Small_Chance",
    Moves_Ask_the_Oracle_Unlikely = "Starforged/Oracles/Moves/Ask_the_Oracle/Unlikely",
    Moves_Begin_a_Session = "Starforged/Oracles/Moves/Begin_a_Session",
    Moves_Confront_Chaos = "Starforged/Oracles/Moves/Confront_Chaos",
    Moves_Endure_Harm = "Starforged/Oracles/Moves/Endure_Harm",
    Moves_Endure_Stress = "Starforged/Oracles/Moves/Endure_Stress",
    Moves_Make_a_Discovery = "Starforged/Oracles/Moves/Make_a_Discovery",
    Moves_Pay_the_Price = "Starforged/Oracles/Moves/Pay_the_Price",
    Moves_Take_Decisive_Action = "Starforged/Oracles/Moves/Take_Decisive_Action",
    Moves_Withstand_Damage = "Starforged/Oracles/Moves/Withstand_Damage",
    Planets_Class = "Starforged/Oracles/Planets/Class",
    Planets_Desert_Atmosphere = "Starforged/Oracles/Planets/Desert/Atmosphere",
    Planets_Desert_Feature = "Starforged/Oracles/Planets/Desert/Feature",
    Planets_Desert_Life = "Starforged/Oracles/Planets/Desert/Life",
    Planets_Desert_Observed_From_Space = "Starforged/Oracles/Planets/Desert/Observed_From_Space",
    Planets_Desert_Settlements_Expanse = "Starforged/Oracles/Planets/Desert/Settlements/Expanse",
    Planets_Desert_Settlements_Outlands = "Starforged/Oracles/Planets/Desert/Settlements/Outlands",
    Planets_Desert_Settlements_Terminus = "Starforged/Oracles/Planets/Desert/Settlements/Terminus",
    Planets_Furnace_Atmosphere = "Starforged/Oracles/Planets/Furnace/Atmosphere",
    Planets_Furnace_Feature = "Starforged/Oracles/Planets/Furnace/Feature",
    Planets_Furnace_Life = "Starforged/Oracles/Planets/Furnace/Life",
    Planets_Furnace_Observed_From_Space = "Starforged/Oracles/Planets/Furnace/Observed_From_Space",
    Planets_Furnace_Settlements_Expanse = "Starforged/Oracles/Planets/Furnace/Settlements/Expanse",
    Planets_Furnace_Settlements_Outlands = "Starforged/Oracles/Planets/Furnace/Settlements/Outlands",
    Planets_Furnace_Settlements_Terminus = "Starforged/Oracles/Planets/Furnace/Settlements/Terminus",
    Planets_Grave_Atmosphere = "Starforged/Oracles/Planets/Grave/Atmosphere",
    Planets_Grave_Feature = "Starforged/Oracles/Planets/Grave/Feature",
    Planets_Grave_Life = "Starforged/Oracles/Planets/Grave/Life",
    Planets_Grave_Observed_From_Space = "Starforged/Oracles/Planets/Grave/Observed_From_Space",
    Planets_Grave_Settlements_Expanse = "Starforged/Oracles/Planets/Grave/Settlements/Expanse",
    Planets_Grave_Settlements_Outlands = "Starforged/Oracles/Planets/Grave/Settlements/Outlands",
    Planets_Grave_Settlements_Terminus = "Starforged/Oracles/Planets/Grave/Settlements/Terminus",
    Planets_Ice_Atmosphere = "Starforged/Oracles/Planets/Ice/Atmosphere",
    Planets_Ice_Feature = "Starforged/Oracles/Planets/Ice/Feature",
    Planets_Ice_Life = "Starforged/Oracles/Planets/Ice/Life",
    Planets_Ice_Observed_From_Space = "Starforged/Oracles/Planets/Ice/Observed_From_Space",
    Planets_Ice_Settlements_Expanse = "Starforged/Oracles/Planets/Ice/Settlements/Expanse",
    Planets_Ice_Settlements_Outlands = "Starforged/Oracles/Planets/Ice/Settlements/Outlands",
    Planets_Ice_Settlements_Terminus = "Starforged/Oracles/Planets/Ice/Settlements/Terminus",
    Planets_Jovian_Atmosphere = "Starforged/Oracles/Planets/Jovian/Atmosphere",
    Planets_Jovian_Feature = "Starforged/Oracles/Planets/Jovian/Feature",
    Planets_Jovian_Life = "Starforged/Oracles/Planets/Jovian/Life",
    Planets_Jovian_Observed_From_Space = "Starforged/Oracles/Planets/Jovian/Observed_From_Space",
    Planets_Jovian_Settlements_Expanse = "Starforged/Oracles/Planets/Jovian/Settlements/Expanse",
    Planets_Jovian_Settlements_Outlands = "Starforged/Oracles/Planets/Jovian/Settlements/Outlands",
    Planets_Jovian_Settlements_Terminus = "Starforged/Oracles/Planets/Jovian/Settlements/Terminus",
    Planets_Jungle_Atmosphere = "Starforged/Oracles/Planets/Jungle/Atmosphere",
    Planets_Jungle_Feature = "Starforged/Oracles/Planets/Jungle/Feature",
    Planets_Jungle_Life = "Starforged/Oracles/Planets/Jungle/Life",
    Planets_Jungle_Observed_From_Space = "Starforged/Oracles/Planets/Jungle/Observed_From_Space",
    Planets_Jungle_Settlements_Expanse = "Starforged/Oracles/Planets/Jungle/Settlements/Expanse",
    Planets_Jungle_Settlements_Outlands = "Starforged/Oracles/Planets/Jungle/Settlements/Outlands",
    Planets_Jungle_Settlements_Terminus = "Starforged/Oracles/Planets/Jungle/Settlements/Terminus",
    Planets_Ocean_Atmosphere = "Starforged/Oracles/Planets/Ocean/Atmosphere",
    Planets_Ocean_Feature = "Starforged/Oracles/Planets/Ocean/Feature",
    Planets_Ocean_Life = "Starforged/Oracles/Planets/Ocean/Life",
    Planets_Ocean_Observed_From_Space = "Starforged/Oracles/Planets/Ocean/Observed_From_Space",
    Planets_Ocean_Settlements_Expanse = "Starforged/Oracles/Planets/Ocean/Settlements/Expanse",
    Planets_Ocean_Settlements_Outlands = "Starforged/Oracles/Planets/Ocean/Settlements/Outlands",
    Planets_Ocean_Settlements_Terminus = "Starforged/Oracles/Planets/Ocean/Settlements/Terminus",
    Planets_Opportunity_Lifebearing = "Starforged/Oracles/Planets/Opportunity/Lifebearing",
    Planets_Opportunity_Lifeless = "Starforged/Oracles/Planets/Opportunity/Lifeless",
    Planets_Peril_Lifebearing = "Starforged/Oracles/Planets/Peril/Lifebearing",
    Planets_Peril_Lifeless = "Starforged/Oracles/Planets/Peril/Lifeless",
    Planets_Rocky_Atmosphere = "Starforged/Oracles/Planets/Rocky/Atmosphere",
    Planets_Rocky_Feature = "Starforged/Oracles/Planets/Rocky/Feature",
    Planets_Rocky_Life = "Starforged/Oracles/Planets/Rocky/Life",
    Planets_Rocky_Observed_From_Space = "Starforged/Oracles/Planets/Rocky/Observed_From_Space",
    Planets_Rocky_Settlements_Expanse = "Starforged/Oracles/Planets/Rocky/Settlements/Expanse",
    Planets_Rocky_Settlements_Outlands = "Starforged/Oracles/Planets/Rocky/Settlements/Outlands",
    Planets_Rocky_Settlements_Terminus = "Starforged/Oracles/Planets/Rocky/Settlements/Terminus",
    Planets_Shattered_Atmosphere = "Starforged/Oracles/Planets/Shattered/Atmosphere",
    Planets_Shattered_Feature = "Starforged/Oracles/Planets/Shattered/Feature",
    Planets_Shattered_Life = "Starforged/Oracles/Planets/Shattered/Life",
    Planets_Shattered_Observed_From_Space = "Starforged/Oracles/Planets/Shattered/Observed_From_Space",
    Planets_Shattered_Settlements_Expanse = "Starforged/Oracles/Planets/Shattered/Settlements/Expanse",
    Planets_Shattered_Settlements_Outlands = "Starforged/Oracles/Planets/Shattered/Settlements/Outlands",
    Planets_Shattered_Settlements_Terminus = "Starforged/Oracles/Planets/Shattered/Settlements/Terminus",
    Planets_Tainted_Atmosphere = "Starforged/Oracles/Planets/Tainted/Atmosphere",
    Planets_Tainted_Feature = "Starforged/Oracles/Planets/Tainted/Feature",
    Planets_Tainted_Life = "Starforged/Oracles/Planets/Tainted/Life",
    Planets_Tainted_Observed_From_Space = "Starforged/Oracles/Planets/Tainted/Observed_From_Space",
    Planets_Tainted_Settlements_Expanse = "Starforged/Oracles/Planets/Tainted/Settlements/Expanse",
    Planets_Tainted_Settlements_Outlands = "Starforged/Oracles/Planets/Tainted/Settlements/Outlands",
    Planets_Tainted_Settlements_Terminus = "Starforged/Oracles/Planets/Tainted/Settlements/Terminus",
    Planets_Vital_Atmosphere = "Starforged/Oracles/Planets/Vital/Atmosphere",
    Planets_Vital_Biomes = "Starforged/Oracles/Planets/Vital/Biomes",
    Planets_Vital_Diversity = "Starforged/Oracles/Planets/Vital/Diversity",
    Planets_Vital_Feature = "Starforged/Oracles/Planets/Vital/Feature",
    Planets_Vital_Life = "Starforged/Oracles/Planets/Vital/Life",
    Planets_Vital_Observed_From_Space = "Starforged/Oracles/Planets/Vital/Observed_From_Space",
    Planets_Vital_Settlements_Expanse = "Starforged/Oracles/Planets/Vital/Settlements/Expanse",
    Planets_Vital_Settlements_Outlands = "Starforged/Oracles/Planets/Vital/Settlements/Outlands",
    Planets_Vital_Settlements_Terminus = "Starforged/Oracles/Planets/Vital/Settlements/Terminus",
    Settlements_Authority = "Starforged/Oracles/Settlements/Authority",
    Settlements_First_Look = "Starforged/Oracles/Settlements/First_Look",
    Settlements_Initial_Contact = "Starforged/Oracles/Settlements/Initial_Contact",
    Settlements_Location = "Starforged/Oracles/Settlements/Location",
    Settlements_Name = "Starforged/Oracles/Settlements/Name",
    Settlements_Population_Expanse = "Starforged/Oracles/Settlements/Population/Expanse",
    Settlements_Population_Outlands = "Starforged/Oracles/Settlements/Population/Outlands",
    Settlements_Population_Terminus = "Starforged/Oracles/Settlements/Population/Terminus",
    Settlements_Projects = "Starforged/Oracles/Settlements/Projects",
    Settlements_Trouble = "Starforged/Oracles/Settlements/Trouble",
    Space_Opportunity = "Starforged/Oracles/Space/Opportunity",
    Space_Peril = "Starforged/Oracles/Space/Peril",
    Space_Sector_Name_Prefix = "Starforged/Oracles/Space/Sector_Name/Prefix",
    Space_Sector_Name_Suffix = "Starforged/Oracles/Space/Sector_Name/Suffix",
    Space_Sighting_Expanse = "Starforged/Oracles/Space/Sighting/Expanse",
    Space_Sighting_Outlands = "Starforged/Oracles/Space/Sighting/Outlands",
    Space_Sighting_Terminus = "Starforged/Oracles/Space/Sighting/Terminus",
    Space_Stellar_Object = "Starforged/Oracles/Space/Stellar_Object",
    Starships_First_Look = "Starforged/Oracles/Starships/First_Look",
    Starships_Fleet = "Starforged/Oracles/Starships/Fleet",
    Starships_Initial_Contact = "Starforged/Oracles/Starships/Initial_Contact",
    Starships_Mission_Expanse = "Starforged/Oracles/Starships/Mission/Expanse",
    Starships_Mission_Outlands = "Starforged/Oracles/Starships/Mission/Outlands",
    Starships_Mission_Terminus = "Starforged/Oracles/Starships/Mission/Terminus",
    Starships_Name = "Starforged/Oracles/Starships/Name",
    Starships_Type = "Starforged/Oracles/Starships/Type",
    Vaults_Form = "Starforged/Oracles/Vaults/Form",
    Vaults_Interior_Feature = "Starforged/Oracles/Vaults/Interior/Feature",
    Vaults_Interior_First_Look = "Starforged/Oracles/Vaults/Interior/First_Look",
    Vaults_Interior_Opportunity = "Starforged/Oracles/Vaults/Interior/Opportunity",
    Vaults_Interior_Peril = "Starforged/Oracles/Vaults/Interior/Peril",
    Vaults_Location = "Starforged/Oracles/Vaults/Location",
    Vaults_Material = "Starforged/Oracles/Vaults/Material",
    Vaults_Outer_First_Look = "Starforged/Oracles/Vaults/Outer_First_Look",
    Vaults_Sanctum_Feature = "Starforged/Oracles/Vaults/Sanctum/Feature",
    Vaults_Sanctum_Opportunity = "Starforged/Oracles/Vaults/Sanctum/Opportunity",
    Vaults_Sanctum_Peril = "Starforged/Oracles/Vaults/Sanctum/Peril",
    Vaults_Sanctum_Purpose = "Starforged/Oracles/Vaults/Sanctum/Purpose",
    Vaults_Scale = "Starforged/Oracles/Vaults/Scale",
    Vaults_Shape = "Starforged/Oracles/Vaults/Shape"
}

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ICustomStat["$id"] | PlayerConditionMeter | IConditionMeter["$id"];

/**
 * The stat(s) or progress track(s) that may be rolled with the parent move trigger option.
 * @public
 */
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

/**
 * Enumerates valid sourcebook titles.
 * @public
 */
export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    SunderedIslesPreview = "Sundered Isles Preview",
    Ironsworn = "Ironsworn Rulebook",
    IronswornAssets = "Ironsworn Assets",
    IronswornDelve = "Ironsworn: Delve",
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
    IronswornDelve = "https://shawn-tomkin.itch.io/ironsworn-delve"
}

/**
 * Root object for *Ironsworn: Starforged* game data.
 * @public
 */
export declare interface Starforged extends GameDataRoot {
    "Encounters": {
        [key: string]: IEncounterStarforged;
    };
    "Setting Truths": {
        [key: string]: ISettingTruth;
    };
}

/**
 * @public
 */
export declare const starforged: Starforged;

/**
 * Enumerates player character stats.
 * @public
 */
export declare enum Stat {
    Edge = "edge",
    Heart = "heart",
    Iron = "iron",
    Shadow = "shadow",
    Wits = "wits"
}

/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export declare type StubBy<T, PartialKey extends string = "", OmitKey extends string = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends string = "", OmitKey extends string = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export declare enum TableColumnType {
    Range = "dice range",
    String = "string"
}

/**
 * Represents a tuple: a typed array with a fixed length.
 * @public
 */
export declare type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
    length: TLength;
};

/**
 * @public
 */
export declare enum VaultZone {
    Interior = "Interior",
    Sanctum = "Sanctum"
}

/**
 * @public
 */
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
