/**
 * @public
 */
export declare type ActorRecord<T extends GameObjectType.Character | GameObjectType.Creature | GameObjectType.Faction, K extends AttributeKey> = GameObjectRecordBase<T, K>;

/**
 * @public
 */
export declare interface AlterMiss extends PartialDeep<OutcomeMiss> {
}

/**
 * @public
 */
export declare interface AlterMomentum extends HasId {
    /**
     * Information on how the player's momentum burn is altered.
     */
    Burn?: AlterMomentumBurn[] | undefined;
    /**
     * Information on how the player's momentum reset is altered.
     */
    Reset?: AlterMomentumReset[] | undefined;
}

/**
 * @public
 */
export declare interface AlterMomentumBurn extends HasId {
    /**
     * The trigger condition for altering the PC's momentum burn.
     */
    Trigger: HasText;
    /**
     * The effect altering the PC's momentum burn.
     */
    Effect: HasText;
    Outcomes?: (typeof MoveOutcome[1] | typeof MoveOutcome[2])[] | undefined;
}

/**
 * @public
 */
export declare interface AlterMomentumReset extends HasId {
    /**
     * The trigger condition for altering the PC's momentum reset.
     */
    Trigger: HasText;
    /**
     * The amount by which the PC's momentum reset is change.
     */
    Value: number;
}

/**
 * Describes alterations applied to moves by asset abilities.
 * @public
 */
export declare interface AlterMove extends StubExcept<Move, "$id", "Outcomes"> {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[1-9][0-9]*$
     */
    $id: string;
    /**
     * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply. If it's `undefined`, see `Extends` instead.
     * @nullable
     */
    Moves?: Move["$id"][] | null | undefined;
    /**
     * Some asset abilities alter/extend other asset abilities, specified as an array of IDs. Only changed properties are specified; other properties are the same.
     */
    Alters?: AlterMove["$id"][] | undefined;
    /**
     * The trigger required by the asset ability. If `undefined`, the move alteration applies to all uses of the specified moves, so long as they also meet any implicit asset requirements (fictional framing, `Asset.Requirement`, not being Broken or Out of Action, etc).
     */
    Trigger?: MoveTrigger | undefined;
    /**
     * Markdown rules text describing added effects which apply *before* the move is rolled, such as adds.
     * @localize
     */
    Text?: string | undefined;
    /**
     * Added rules text that applies on move outcomes.
     */
    Outcomes?: AlterMoveOutcomes | undefined;
}

/**
 * @public
 */
export declare interface AlterMoveOutcomes extends Omit<Outcomes, keyof typeof MoveOutcome> {
    "Strong hit"?: AlterStrongHit | undefined;
    "Weak hit"?: AlterWeakHit | undefined;
    Miss?: AlterMiss | undefined;
}

/**
 * @public
 */
export declare interface AlterStrongHit extends PartialDeep<OutcomeStrongHit> {
}

/**
 * @public
 */
export declare interface AlterWeakHit extends PartialDeep<OutcomeWeakHit> {
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export declare interface Asset extends HasId, HasDisplay, HasSource, Partial<HasAliases>, HasTitle {
    /**
     * @example "starforged/assets/path/bounty_hunter"
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    Title: TitleCaseTitle;
    Display: Display;
    /**
     * Describes any states that the asset might have, such as "Broken". Some states may disable the asset entirely.
     */
    States?: AssetState[] | undefined;
    /**
     * The ID of the asset's parent AssetType
     * @example "starforged/assets/path"
     */
    "Asset type": AssetType["$id"];
    /**
     * Information on the asset's usage, such as whether its abilities are shared amongst the player characters.
     */
    Usage: AssetUsage;
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    Attachments?: AssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Inputs?: {
        [key: string]: (InputNumber | InputClock | InputText | InputSelect);
    } | undefined;
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
    Abilities: [AssetAbility, AssetAbility, AssetAbility];
    /**
     * Information on this asset's condition meter, if any.
     */
    "Meter"?: ConditionMeter | undefined;
    Tags?: string[] | undefined;
}

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export declare interface AssetAbility extends HasId, HasText, Partial<HasLabel> {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]$
     */
    $id: string;
    /**
     * Ironsworn companion assets provide labels for their abilities. Starforged asset abilities do not have labels.
     */
    Label?: string | undefined;
    /**
     * New moves added by this asset ability.
     */
    Moves?: Move[] | undefined;
    /**
     * User inputs (text, clocks, etc) associated with this asset ability.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Inputs?: {
        [key: string]: (InputNumber | InputClock | InputText | InputSelect);
    } | undefined;
    /**
     * Information on how this ability alters moves when enabled.
     */
    "Alter moves"?: AlterMove[] | undefined;
    /**
     * Information on how this ability alters its parent asset when enabled.
     */
    "Alter properties"?: AssetAlterProperties | undefined;
    /**
     * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
     */
    "Alter momentum"?: AlterMomentum | undefined;
    /**
     * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
     */
    Enabled: boolean;
}

/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `AssetAlterProperties` that would set `Asset["Condition Meter"].Max` to 3, and leave its other properties unchanged:
 * ```json
 * { "Condition meter": { "Max": 3 } }
 * ```
 * @public
 */
export declare interface AssetAlterProperties extends Omit<PartialDeep<OmitMetadataDeep<Asset>>, "Abilities" | "Attachments" | "Condition meter" | "$id">, HasId {
    $id: string;
    Abilities?: AssetAlterPropertiesAbility[] | undefined;
    Attachments?: AssetAlterPropertiesAttachment | undefined;
    "Condition meter"?: AssetAlterPropertiesConditionMeter | undefined;
    States?: AssetState[] | undefined;
}

/**
 * @public
 */
export declare interface AssetAlterPropertiesAbility extends Partial<AssetAbility> {
}

/**
 * @public
 */
export declare interface AssetAlterPropertiesAttachment extends Partial<AssetAttachment> {
}

/**
 * @public
 */
export declare interface AssetAlterPropertiesConditionMeter extends Partial<ConditionMeter> {
}

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Starship/Assets/Command_vehicle/Starship`); Rover (`Starship/Assets/Support_vehicle/Rover`) also has an elective ability that adds this property.
 * @public
 */
export declare interface AssetAttachment {
    /**
     * The type of asset that this asset accepts as attachments.
     */
    "Asset types": AssetType["$id"][];
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
export declare interface AssetState extends HasLabel {
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
     * Whether this state should disable the entire asset when `AssetState.Enabled === true`
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
export declare interface AssetType extends HasId, HasDescription, HasDisplay, HasSource, HasTitle, Partial<HasAliases> {
    /**
     * @example "ironsworn/assets/ritual"
     * @example "starforged/assets/command_vehicle"
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+$
     */
    $id: string;
    /**
     * The assets that belong to this asset type.
     */
    Assets: Asset[];
    /**
     * @example "Ritual"
     * @example "Command Vehicle"
     * @localize
     */
    Title: Title;
    Display: Display;
    Usage: AssetUsage;
}

/**
 * @public
 */
export declare enum AssetTypeName {
    CommandVehicle = "Command vehicle",
    Companion = "Companion",
    Deed = "Deed",
    Module = "Module",
    Path = "Path",
    SupportVehicle = "Support vehicle",
    Ritual = "Ritual",
    CombatTalent = "Combat talent"
}

/**
 * @public
 */
export declare interface AssetUsage {
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
 * Set by Oracles / Planets / * / Atmosphere
 * @public
 */
export declare enum Atmosphere {
    NoneThin = "None / Thin",
    Toxic = "Toxic",
    Corrosive = "Corrosive",
    Marginal = "Marginal",
    Breathable = "Breathable",
    Ideal = "Ideal"
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
export declare interface Attribute {
    Key: AttributeKey;
    Value?: string | undefined;
}

/**
 * @public
 */
export declare interface AttributeChoices {
    Key: AttributeKey;
    Values?: string[] | undefined;
}

/**
 * @public
 */
export declare type AttributeHash<K extends AttributeKey = AttributeKey> = {
    [key in K]?: AttributeMaster[K] | AttributeMaster[K][] | undefined | null;
};

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
    Behavior = "Encountered behavior",
    /**
     * {@link DerelictType}
     */
    DerelictType = "Derelict type",
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
    FactionType = "Faction type",
    /**
     * {@link FringeGroup}
     */
    FringeGroup = "Fringe group",
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
    InitialContact = "Initial contact",
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
    LocationTheme = "Location theme",
    /**
     * {@link PlanetaryClass}
     */
    PlanetaryClass = "Planetary class",
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
    CreatureScale = "Creature scale",
    /**
     * {@link Zone}
     */
    Zone = "Zone"
}

/**
 * @public
 */
export declare interface AttributeMaster {
    [AttributeKey.Atmosphere]: Atmosphere;
    [AttributeKey.Authority]: Authority;
    [AttributeKey.Behavior]: Behavior;
    [AttributeKey.DerelictType]: DerelictType;
    [AttributeKey.Disposition]: Disposition;
    [AttributeKey.Dominion]: Dominion;
    [AttributeKey.Environment]: Environment;
    [AttributeKey.FactionType]: FactionType;
    [AttributeKey.FringeGroup]: FringeGroup;
    [AttributeKey.Guild]: Guild;
    [AttributeKey.Influence]: Influence;
    [AttributeKey.InitialContact]: StarshipInitialContact | SettlementInitialContact;
    [AttributeKey.Leadership]: Leadership;
    [AttributeKey.Life]: Life;
    [AttributeKey.Location]: Location;
    [AttributeKey.LocationTheme]: LocationTheme;
    [AttributeKey.PlanetaryClass]: PlanetaryClass;
    [AttributeKey.Population]: Population;
    [AttributeKey.Region]: Region;
    [AttributeKey.Role]: Role;
    [AttributeKey.CreatureScale]: CreatureScale;
    [AttributeKey.Zone]: Zone;
}

/**
 * @public
 */
export declare type AttributeValue<K extends AttributeKey> = AttributeMaster[K];

/**
 * Set by Oracles / Settlements / Authority
 *
 * @public
 */
export declare enum Authority {
    NoneLawless = "None / lawless",
    Ineffectual = "Ineffectual",
    Tolerant = "Tolerant",
    Fair = "Fair",
    Unyielding = "Unyielding",
    Corrupt = "Corrupt",
    Oppressive = "Oppressive"
}

/**
 * Set by Oracles / Creatures / Encountered Behavior
 *
 * @public
 */
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

/**
 * NYI.
 * @public
 */
export declare enum Biome {
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
    /**
     * Troublesome
     */
    Troublesome = 1,
    /**
     * Dangerous
     */
    Dangerous = 2,
    /**
     * Formidable
     */
    Formidable = 3,
    /**
     * Extreme
     */
    Extreme = 4,
    /**
     * Epic
     */
    Epic = 5
}

/**
 * @public
 */
export declare type CharacterRecord = ActorRecord<GameObjectType.Character, AttributeKey.Disposition | AttributeKey.Role>;

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
    Tension = "tension",
    Campaign = "campaign"
}

/**
 * Interface representing a condition meter such as health, spirit, supply.
 * @public
 */
export declare interface ConditionMeter extends Meter {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/condition_meter$
     */
    $id: string;
    /**
     * @default 0
     */
    Min: number;
    /**
     * @default 5
     */
    Max: number;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
    /**
     * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link MoveTriggerOptionAction.Using}. The array will include an appropriate alias if that is the case.
     */
    Aliases?: MeterAlias[] | undefined;
}

/**
 * @public
 */
export declare type CreatureRecord = ActorRecord<GameObjectType.Creature, AttributeKey.Environment | AttributeKey.CreatureScale | AttributeKey.Behavior>;

/**
 * Set by Oracles / Creatures / Scale/**
 * @public
 */
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

/**
 * @public
 */
export declare interface CustomStat extends HasId, HasLabel {
    /**
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat$
     */
    $id: string;
    Options: CustomStatOption[];
}

/**
 * @public
 */
export declare interface CustomStatOption extends HasId, HasLabel {
    /**
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat/[a-z_-]+$
     */
    $id: string;
    /**
     * The numeric value to be used as +stat when making an Action Roll.
     */
    Value: number;
    Label: string;
}

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 * @public
 */
export declare interface CyclopediaEntry extends HasId, HasDisplay, HasDescription, HasSource, Partial<HasSummary & HasQuestStarter & HasTags>, HasTitle {
    /**
     * @pattern ^(starforged|ironsworn)/([a-z_-]+/)+$
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
 * @see DelveSiteTheme
 * @see DelveSiteDomain
 * @public
 */
export declare interface DelveCard extends HasSource, HasSummary, HasDescription, HasId, HasTitle {
    /**
     * @pattern ^ironsworn/(themes|domains)/[a-z_-]+$
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
    Features: OracleTableRow[];
    /**
     * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: OracleTableRow[];
}

/**
 * @public
 */
export declare enum DelveCardType {
    Theme = "theme",
    Domain = "domain"
}

/**
 * Represents a Rarity (described in Ironsworn: Delve)
 * @public
 */
export declare interface DelveRarity extends HasTitle, HasDisplay, HasSource, HasDescription {
    /**
     * @minimum 3
     * @maximum 5
     */
    "XP cost": number;
    /**
     * The ID of the asset, to which this rarity applies its effects.
     * @see {@link Asset.$id}
     */
    Asset: Asset["$id"];
    Title: TitleCaseTitle;
}

/**
 * Interface describing a delve site domain.
 *
 * The **domain** represents the physical characteristics of the site—the terrain or architecture you must traverse.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteTheme
 * @public
 */
export declare interface DelveSiteDomain extends DelveCard {
    /**
     * @pattern ^ironsworn/domains/[a-z_-]+$
     */
    $id: string;
    Type: DelveCardType.Domain;
    /**
     * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
     */
    Features: [
    OracleTableRow & {
        Floor: 21;
        Ceiling: 43;
    },
    OracleTableRow & {
        Floor: 44;
        Ceiling: 56;
    },
    OracleTableRow & {
        Floor: 57;
        Ceiling: 64;
    },
    OracleTableRow & {
        Floor: 65;
        Ceiling: 68;
    },
    OracleTableRow & {
        Floor: 69;
        Ceiling: 72;
    },
    OracleTableRow & {
        Floor: 73;
        Ceiling: 76;
    },
    OracleTableRow & {
        Floor: 77;
        Ceiling: 80;
    },
    OracleTableRow & {
        Floor: 81;
        Ceiling: 84;
    },
    OracleTableRow & {
        Floor: 85;
        Ceiling: 88;
    },
    OracleTableRow & {
        Floor: 89;
        Ceiling: 98;
        Result: "Something unusual or unexpected";
    },
    OracleTableRow & {
        Floor: 99;
        Ceiling: 99;
        Result: "You transition into a new theme";
    },
    OracleTableRow & {
        Floor: 100;
        Ceiling: 100;
        Result: "You transition into a new domain";
    }
    ];
    /**
     * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: [
    OracleTableRow & {
        Floor: 31;
        Ceiling: 33;
    },
    OracleTableRow & {
        Floor: 34;
        Ceiling: 36;
    },
    OracleTableRow & {
        Floor: 37;
        Ceiling: 39;
    },
    OracleTableRow & {
        Floor: 40;
        Ceiling: 42;
    },
    OracleTableRow & {
        Floor: 43;
        Ceiling: 45;
    }
    ];
}

/**
 * Interface describing a delve site theme.
 *
 * The **theme** represents the condition or state of the site, and indicates the kinds of denizens and threats you might find there.
 *
 * Together, the theme and domain help you visualize your exploration of the site, and provide oracle tables for features and dangers.
 *
 * @see DelveSiteDomain
 * @public
 */
export declare interface DelveSiteTheme extends DelveCard {
    /**
     * @pattern ^ironsworn/themes/[a-z_-]+$
     */
    $id: string;
    Type: DelveCardType.Theme;
    /**
     * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
     */
    Features: [
    OracleTableRow & {
        Floor: 1;
        Ceiling: 4;
    },
    OracleTableRow & {
        Floor: 5;
        Ceiling: 8;
    },
    OracleTableRow & {
        Floor: 9;
        Ceiling: 12;
    },
    OracleTableRow & {
        Floor: 13;
        Ceiling: 16;
    },
    OracleTableRow & {
        Floor: 17;
        Ceiling: 20;
    }
    ];
    /**
     * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
     */
    Dangers: [
    OracleTableRow & {
        Floor: 1;
        Ceiling: 5;
    },
    OracleTableRow & {
        Floor: 6;
        Ceiling: 10;
    },
    OracleTableRow & {
        Floor: 11;
        Ceiling: 12;
    },
    OracleTableRow & {
        Floor: 13;
        Ceiling: 14;
    },
    OracleTableRow & {
        Floor: 15;
        Ceiling: 16;
    },
    OracleTableRow & {
        Floor: 17;
        Ceiling: 18;
    },
    OracleTableRow & {
        Floor: 19;
        Ceiling: 20;
    },
    OracleTableRow & {
        Floor: 21;
        Ceiling: 22;
    },
    OracleTableRow & {
        Floor: 23;
        Ceiling: 24;
    },
    OracleTableRow & {
        Floor: 25;
        Ceiling: 26;
    },
    OracleTableRow & {
        Floor: 27;
        Ceiling: 28;
    },
    OracleTableRow & {
        Floor: 29;
        Ceiling: 30;
    }
    ];
}

/**
 * @public
 */
export declare type DerelictRecord = PlaceRecord<GameObjectType.Derelict, AttributeKey.DerelictType | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict | SettlementInitialContact.Derelict;
};

/**
 * @public
 */
export declare type DerelictSettlementRecord = Omit<SettlementRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Settlement;
    [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};

/**
 * @public
 */
export declare type DerelictStarshipRecord = Omit<StarshipRecord<AttributeKey.DerelictType>, "Object type"> & {
    "Object type": GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Starship;
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};

/**
 * Set by oracle: Oracles / Derelicts / Type
 * @public
 */
export declare enum DerelictType {
    Starship = "Starship",
    Settlement = "Settlement"
}

/**
 * @public
 */
export declare type DerelictZoneRecord = PlaceRecord<GameObjectType.DerelictZone, AttributeKey.DerelictType>;

/**
 * Interface for data relevant to an item's display/rendering.
 * @public
 */
export declare interface Display {
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
 * Set by Oracles / Characters / Disposition
 * @public
 */
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

/**
 * Set by Oracles / Planets / Vital / Diversity
 * @public
 */
export declare enum Diversity {
    Simple = 2,
    Diverse = 3,
    Complex = 4,
    GardenWorld = 5
}

/**
 * Set by Oracles / Factions / Dominion
 * @public
 */
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
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export declare interface Encounter extends EncounterBase {
    Features: string[];
    Drives: string[];
    Tactics: string[];
    "Quest starter": string;
    "Your truth"?: string | undefined;
}

/**
 * Interface common to Encounter entries in *Ironsworn* and *Ironsworn: Starforged*.
 * @public
 */
export declare interface EncounterBase extends CyclopediaEntry {
    /**
     * @example "starforged/encounters/chiton"
     * @pattern ^(starforged|ironsworn)/encounters/[a-z_-]+$
     */
    $id: string;
    /**
     * @example "Monster"
     * @localize
     */
    Nature: EncounterNatureStarforged | EncounterNatureClassic;
    Display: Display;
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
    "Your truth"?: string | undefined;
}

/**
 * Represents an *Ironsworn* Encounter entry.
 * @public
 */
export declare interface EncounterClassic extends Encounter {
    /**
     * @pattern ^(starforged|ironsworn)/encounters/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    Nature: EncounterNatureClassic;
    "Your truth"?: string | undefined;
    Summary?: string | undefined;
}

/**
 * @public
 */
export declare enum EncounterNatureClassic {
    Ironlander = "Ironlander",
    Firstborn = "firstborn",
    Animal = "animal",
    Beast = "beast",
    Horror = "horror",
    Anomaly = "anomaly"
}

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export declare interface EncounterNatureClassicInfo extends HasDescription, HasSource, HasId, HasDisplay, HasSummary, HasTitle {
    /**
     * @pattern ^ironsworn/encounters/[a-z_-]+$
     */
    $id: string;
    Encounters: {
        [key: string]: EncounterClassic;
    };
    Title: Title & {
        Short: NatureKey;
    };
}

/**
 * @public
 */
export declare enum EncounterNatureStarforged {
    Creature = "creature",
    Horror = "horror",
    Human = "human",
    Machine = "machine",
    Monster = "monster"
}

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export declare interface EncounterStarforged extends Encounter {
    /**
     * @pattern ^starforged/encounters/[a-z_-]+$
     */
    $id: string;
    Nature: EncounterNatureStarforged;
    Summary: string;
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Variants?: {
        [key: string]: EncounterVariant;
    } | undefined;
}

/**
 * @public
 */
export declare enum EncounterTags {
    Vehicle = "vehicle"
}

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export declare interface EncounterVariant extends StubBy<EncounterStarforged, never, "Features" | "Drives" | "Tactics" | "Variants" | "Summary" | "Your truth" | "Quest starter"> {
    /**
     * @pattern ^starforged/encounters/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    "Variant of": EncounterStarforged["$id"];
}

/**
 * Set by Oracles / Creatures / Environment
 * @public
 */
export declare enum Environment {
    Space = "Space",
    Interior = "Interior",
    Land = "Land",
    Liquid = "Liquid",
    Air = "Air"
}

/**
 * @public
 */
export declare type FactionDominionRecord = ActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Leadership | AttributeKey.Dominion> & {
    [AttributeKey.FactionType]: FactionType.Dominion;
};

/**
 * @public
 */
export declare type FactionFringeGroupRecord = ActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.FringeGroup> & {
    [AttributeKey.FactionType]: FactionType.FringeGroup;
};

/**
 * @public
 */
export declare type FactionGuildRecord = ActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence | AttributeKey.Guild> & {
    [AttributeKey.FactionType]: FactionType.Guild;
};

/**
 * @public
 */
export declare type FactionRecord = ActorRecord<GameObjectType.Faction, AttributeKey.FactionType | AttributeKey.Influence>;

/**
 * Set by Oracles / Factions / Type
 * @public
 */
export declare enum FactionType {
    FringeGroup = "Fringe Group",
    Dominion = "Dominion",
    Guild = "Guild"
}

/**
 * Set by Oracles / Factions / Fringe Group
 * @public
 */
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
 * @public
 */
export declare enum Game {
    Starforged = "Starforged",
    Ironsworn = "Ironsworn"
}

/**
 * Base interface for *Ironsworn* and *Ironsworn: Starforged* game data.
 * @public
 */
export declare interface GameDataRoot {
    $schema?: string | undefined;
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Asset types": {
        [key: string]: AssetType;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Encounters": {
        [key: string]: EncounterStarforged;
    } | {
        [key: string]: EncounterNatureClassicInfo;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Move categories": {
        [key: string]: MoveCategory;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Oracle sets": {
        [key: string]: OracleSet;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Setting truths": {
        [key: string]: TruthStarforged;
    } | {
        [key: string]: TruthClassic;
    };
}

/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export declare interface GameObject {
    "Object type": GameObjectType;
    Requires?: Requirements | undefined;
}

/**
 * @public
 */
export declare type GameObjectRecord = CharacterRecord | CreatureRecord | DerelictRecord | DerelictStarshipRecord | DerelictSettlementRecord | DerelictZoneRecord | FactionRecord | FactionGuildRecord | FactionFringeGroupRecord | FactionDominionRecord | PlanetRecord | PrecursorVaultRecord | SettlementRecord | StarshipRecord;

/**
 * @public
 */
export declare type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
    "Object type": T;
    "Inherit rolls"?: boolean | undefined;
} & AttributeHash<K>;

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
 * Set by Oracles / Factions / Guild
 * @public
 */
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
 * Interface for items with aliases.
 * @public
 */
export declare interface HasAliases {
    /**
     * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
     */
    Aliases: string[];
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export declare interface HasDescription extends HasId {
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
export declare interface HasDisplay {
    /**
     * Data relevant to this item's display/rendering.
     */
    Display: Display;
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export declare interface HasGameObjects {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    "Game objects": GameObject[];
}

/**
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export declare interface HasId {
    /**
     * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
     * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+$
     */
    $id: string;
}

/**
 * @public
 */
export declare interface HasLabel extends HasId {
    /**
     * The user-facing text label of this item.
     * @localize
     */
    Label: string;
}

/**
 * @public
 */
export declare interface HasOptional {
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
export declare interface HasOracleContent {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    Content: OracleContent;
}

/**
 * @public
 */
export declare interface HasQuestStarter extends HasId {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     * @localize
     */
    "Quest starter": string;
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export declare interface HasRequirements {
    /**
     * Prerequisites for this item.
     */
    Requires: Requirements;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export declare interface HasRollTemplate extends HasId {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    "Roll template": RollTemplate;
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export declare interface HasSource {
    /**
     * Information on this item's source.
     */
    Source: Source;
}

/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `Oracle` in the `Oracles` property of this table's parent.
 * @public
 */
export declare interface HasSubtable {
    Subtable: OracleTableRow[];
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export declare interface HasSuggestions {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    Suggestions: Suggestions;
}

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export declare interface HasSummary extends HasId {
    /**
     * A user-facing markdown summary of the item. Summary is shorter than {@link HasDescription | Description}, when they're both present.
     * @markdown
     * @localize
     */
    Summary: string;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export declare interface HasTable extends HasId {
    Table: OracleTableRow[];
}

/**
 * @public
 */
export declare interface HasTags {
    /**
     * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
     */
    Tags: string[];
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export declare interface HasText extends HasId {
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
export declare interface HasTitle extends HasId {
    Title: Title;
}

/**
 * Set by Oracles / Factions / Influence
 * @public
 */
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
 * A stub interface representing an input widget of any type.
 * @see {@link InputNumber}, {@link InputClock}, {@link InputText}, {@link InputSelect}
 * @public
 */
export declare interface Input extends HasId, HasLabel {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+(/abilities/[1-3])?/inputs/[a-z_-]+$
     */
    $id: string;
    "Input type": InputType;
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
export declare interface InputClock extends Input {
    "Input type": InputType.Clock;
    /**
     * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
     */
    "Clock type": ClockType;
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
export declare interface InputNumber extends Input {
    "Input type": InputType.Number;
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
 * @public
 */
export declare interface InputSelect extends Input {
    "Input type": InputType.Select;
    /**
     * Hints which attribute(s) are set by this dropdown's options.
     * @patternProperties ^[a-z_]+$
     */
    "Sets attributes": {
        [key: string]: InputSelectAttributeDefinition;
    };
    Options: {
        [key: string]: InputSelectOption;
    };
}

/**
 * Provides hints for the keys and typing of an {@link InputSelect}'s child {@link InputSelectOption}s.
 * @public
 */
export declare interface InputSelectAttributeDefinition {
    Type: InputSelectOptionType;
}

/**
 * Represents an option in an {@link InputSelect}.
 * @public
 */
export declare interface InputSelectOption extends HasId, HasLabel {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+$
     */
    $id: string;
    /**
     * A keyed object describing what attribute keys should be set to when this option is active. *All* items in the object should be set in this manner.
     */
    "Set attributes": {
        [key: keyof InputSelect["Sets attributes"]]: InputSelectOptionSetter;
    };
}

/**
 * @public
 */
export declare interface InputSelectOptionSetter extends HasId {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    Type: InputSelectOptionType;
    Value: Stat | PlayerConditionMeter | number | string;
}

/**
 * A condition meter set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterMeter extends InputSelectOptionSetter {
    Type: InputSelectOptionType.ConditionMeter;
    Value: PlayerConditionMeter;
}

/**
 * An integer value set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterNumber extends InputSelectOptionSetter {
    Type: InputSelectOptionType.Number;
    Value: number;
}

/**
 * A stat set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterStat extends InputSelectOptionSetter {
    Type: InputSelectOptionType.Stat;
    Value: Stat;
}

/**
 * An arbitrary string value set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterString extends InputSelectOptionSetter {
    Type: InputSelectOptionType.String;
    Value: string;
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
    Stat = "stat",
    /**
     * A reference to one of the player character's condition meters (Starforged) or status tracks (Ironsworn): health, spirit, or supply.
     * @see {@link PlayerConditionMeter}
     */
    ConditionMeter = "condition meter",
    /**
     * An arbitrary pre-set string value.
     */
    String = "string",
    /**
     * A arbitrary pre-set number value.
     */
    Number = "number"
}

/**
 * A text input.
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export declare interface InputText extends Input {
    "Input type": InputType.Text;
}

/**
 * @public
 */
export declare enum InputType {
    /**
     * @see {@link InputText}
     */
    Text = "text",
    /**
     * @see {@link InputSelect}
     */
    Select = "select",
    /**
     * @see {@link InputNumber}
     */
    Number = "number",
    /**
     * @see {@link InputClock}
     */
    Clock = "clock"
}

/**
 * @public
 */
export declare interface IronlandsRegion extends CyclopediaEntry, HasSummary, HasQuestStarter {
    /**
     * @pattern ^ironsworn/regions/[a-z_-]$
     */
    $id: string;
    Features: string[];
    "Quest starter": string;
    Summary: string;
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export declare interface Ironsworn extends GameDataRoot {
    "Encounters": {
        [key: string]: EncounterNatureClassicInfo;
    };
    "Setting truths": {
        [key: string]: TruthClassic;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Site domains": {
        [key: string]: DelveSiteDomain;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Site themes": {
        [key: string]: DelveSiteTheme;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Regions: {
        [key: string]: IronlandsRegion;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Rarities: {
        [key: string]: DelveRarity;
    };
}

/**
 * @public
 */
export declare const ironsworn: Ironsworn;

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
 * Set by Oracles / Factions / Leadership
 * @public
 */
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

/**
 * @public
 */
export declare enum License {
    CC_BY_NC_SA = "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    CC_BY_SA = "https://creativecommons.org/licenses/by-sa/4.0/",
    None = "None"
}

/**
 * Set by Oracles / Planets / * / Life
 * @public
 */
export declare enum Life {
    None = "None",
    Extinct = "Extinct",
    Scarce = "Scarce",
    Diverse = "Diverse",
    Bountiful = "Bountiful",
    Overrun = "Overrun"
}

/**
 * Set by Oracles / ** / Location
 * @public
 */
export declare enum Location {
    Planetside = "Planetside",
    Orbital = "Orbital",
    DeepSpace = "Deep Space"
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
 * Base interface for properties common to all resource meters.
 * @see {@link ConditionMeter}
 * @public
 */
export declare interface Meter extends HasId, HasLabel {
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
 * Interface representing a Starforged move.
 * @public
 */
export declare interface Move extends HasId, HasText, HasDisplay, HasSource, HasOptional, HasTitle, Partial<HasSuggestions> {
    /**
     * @example "Starforged/Moves/Adventure/Face_Danger"
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3])/[a-z_-]+$
     */
    $id: string;
    /**
     * Note the "Canonical" key for asset-specific moves is something of a misnomer, as in the original text doesn't name them. They're provided in the same format for convenience, however.
     * @see HasTitle
     * @example
     * ```json
     * {"Canonical": "Face Danger"}
     * ```
     */
    Title: TitleCaseTitle;
    /**
     * The ID of the parent Asset of the move, if any.
     */
    Asset?: Asset["$id"] | undefined;
    /**
     * The ID of the move's category.
     * @example "Starforged/Moves/Adventure"
     */
    Category: MoveCategory["$id"];
    /**
     * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
     */
    "Progress move"?: boolean | undefined;
    /**
     * The ID of the move that this move is a variant of, if any.
     */
    "Variant of"?: Move["$id"] | undefined;
    /**
     * The move's trigger data.
     */
    Trigger: MoveTrigger;
    /**
     * The IDs of any oracles directly referenced by the move, or vice versa.
     */
    Oracles?: OracleTable["$id"][] | undefined;
    /**
     * Outcome information for the move.
     */
    Outcomes?: Outcomes | undefined;
    Tags?: string[] | undefined;
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export declare interface MoveCategory extends HasId, HasSource, HasDescription, HasDisplay, HasOptional, HasTitle {
    /**
     * @example "Starforged/Moves/Adventure"
     * @pattern ^(starforged|ironsworn)/moves/[a-z_-]+$
     */
    $id: string;
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Moves: {
        [key: string]: Move;
    };
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
    "Weak hit" = 1,
    "Strong hit" = 2
}

/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export declare interface MoveReroll extends HasId, Partial<HasText> {
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
export declare interface MoveTrigger extends HasId, Partial<HasText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/trigger$
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
    By?: MoveTriggerBy | undefined;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    "Options"?: (MoveTriggerOptionAction | MoveTriggerOptionProgress)[] | undefined;
}

/**
 * @public
 */
export declare interface MoveTriggerBy {
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
export declare interface MoveTriggerOptionAction extends MoveTriggerOptionBase {
    "Roll type": RollType.Action;
    Using: RollableStat[];
}

/**
 * @public
 */
export declare interface MoveTriggerOptionBase extends HasId, Partial<HasText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/trigger/options/[0-9]+$
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
    "Custom stat"?: CustomStat | undefined;
}

/**
 * @public
 */
export declare interface MoveTriggerOptionProgress extends MoveTriggerOptionBase {
    "Roll type": RollType.Progress;
    Using: (ProgressTypeStarforged | ProgressTypeIronsworn)[];
}

/**
 * Describes {@link OracleTableRow} results that call for multiple rolls, most commonly "Roll twice" results.
 * @public
 */
export declare interface MultipleRolls {
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
     * Typically this is accompanied by `Row.Result` text like "Roll twice more on this table. Both results occur. If they are the same result, make it worse."
     *
     * Can safely be ignored in Starforged-only implementations. Implicitly requires `Allow duplicates`.
     */
    "Make it worse": boolean;
}

/**
 * @public
 */
export declare type NatureKey = keyof typeof EncounterNatureClassic;

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
 * Interface with elements common to various Oracle-related interfaces and classes.
 *
 * If you're trying to crawl the tree for a specific ID, I'd recommend using some flavour of JSONpath (I like `jsonpath-plus`) - it's purpose-made for this sort of nested data structure.
 *
 * But if for some reason you can't, you can use this interface to type both {@link OracleTable} and {@link OracleSet} as you recurse the oracle hierarchy. Objects with `Categories` and `Oracles` are "branches", and objects with `Table` are "leaves".
 * @public
 */
export declare interface OracleBase extends Partial<HasSummary & HasDescription & HasOracleContent>, HasId, HasDisplay, HasSource, HasTitle {
    $id: string;
    /**
     * An array containing the ID of every {@link OracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-/]+$
     */
    Ancestors: OracleSet["$id"][];
    Display: OracleDisplayBase;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    Usage?: OracleUsage | undefined;
    /**
     * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
     */
    Table?: (OracleTableRow | RowNullStub)[] | undefined;
    /**
     * Oracle tables contained by this set.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Tables?: {
        [key: string]: OracleTable;
    } | undefined;
    /**
     * Oracle sets contained by this set.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    Sets?: {
        [key: string]: OracleSet;
    } | undefined;
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     *
     * This key appears only on {@link OracleTable}s that have a `Table`.
     */
    "On a match"?: OracleMatch | undefined;
}

/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface OracleContent {
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
 * Base interface inherited by {@link OracleSetDisplay} and {@link OracleTableDisplay}.
 * @public
 */
export declare interface OracleDisplayBase extends Display, HasId {
    /**
     * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
     *
     * If `undefined`, this table is rendered as a standalone table.
     *
     * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
     */
    "Column of"?: OracleTable["$id"] | undefined;
    /**
     * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
     *
     * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
     */
    "Columns"?: [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]] | undefined;
    /**
     * This table is displayed as embedded in a row of another table.
     */
    "Embed in"?: OracleTableRow["$id"] | undefined;
}

/**
 * @public
 */
export declare interface OracleMatch extends HasId, HasText {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?/on_a_match$
     */
    $id: string;
}

/**
 * Represents an oracle set: a grouping that can contain both {@link OracleTable}s and other instances of {@link OracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link OracleBase} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface OracleSet extends Omit<OracleBase, "Table"> {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+(/[a-z_-]+)?$
     */
    $id: string;
    /**
     * A list of sample names for this category. Only used by Planetary Class {@link OracleSet}s.
     */
    "Sample names"?: string[] | undefined;
    Sets?: {
        [key: string]: OracleSet;
    } | undefined;
    Tables?: {
        [key: string]: OracleTable;
    } | undefined;
    Display: OracleSetDisplay;
}

/**
 * Information on displaying {@link OracleSet}, including information on its rendering in the original text.
 *
 * If an {@link OracleSet} has `Columns`, it represents a "supertable" composed of multiple roll or string columns.
 * @public
 */
export declare interface OracleSetDisplay extends Omit<OracleDisplayBase, "Column of" | "Embed in"> {
}

/**
 * Represents an oracle that has a `Table` composed of {@link OracleTableRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link OracleBase} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface OracleTable extends Omit<OracleBase, "Sets" | "Tables"> {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?$
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
    Title: Title;
    Display: OracleTableDisplay;
    "Table": (OracleTableRow | RowNullStub)[];
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     */
    "On a match"?: OracleMatch | undefined;
}

/**
 * Information on displaying {@link OracleTable}, including information on its rendering in the original text.
 * @public
 */
export declare interface OracleTableDisplay extends OracleDisplayBase {
    "Columns": [TableColumnRoll, ...(TableColumnRoll | TableColumnText)[]];
}

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export declare interface OracleTableRow extends Partial<Nullable<HasSummary & HasRollTemplate & HasSuggestions & HasOracleContent & HasGameObjects & HasDisplay>> {
    /**
     * The ID of this row.
     * @pattern ^(ironsworn|starforged)/oracles(/[a-z_-]+)+/[1-9][0-9]*(-[1-9][0-9]*)?(/subtable/[1-9][0-9]*(-[1-9][0-9]*)?)?$
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
     * Some tables label this column as something other than `Result`; see the parent (or grandparent) `Oracle.Display.Table` for more information.
     *
     * `null` is used in cases where an 'empty' `Summary` exists (example: Starship Type, p. 326). In the book, these table cells are rendered with the text `--` (and this is the recommended placeholder for tabular display). For display as a single result (e.g. VTT table roll output), however, `null` values can be safely omitted.
     * @nullable
     * @markdown
     * @localize
     */
    Summary?: string | null | undefined;
    /**
     * Additional oracle tables that should be rolled when this row is selected.
     * @pattern ^(starforged|ironsworn)/oracles/[a-z_-]+/[a-z_-/]+$
     */
    "Oracle rolls"?: OracleTable["$id"][] | undefined;
    /**
     * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
     */
    Subtable?: OracleTableRow[] | TruthOptionSubtableRowStarforged[] | undefined;
    /**
     * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
     */
    "Multiple rolls"?: MultipleRolls | undefined;
    /**
     * The attributes set by this row.
     */
    Attributes?: Attribute[] | undefined;
}

/**
 * Describes the recommended usage of this item.
 * @public
 */
export declare interface OracleUsage extends Partial<HasRequirements & HasSuggestions & HasRollTemplate> {
    /**
     * Whether this table should be included in the initial oracle rolls when generating a game object. This is a somewhat arbitrary recommendation, and may not be appropriate for all implementations (or all game situations). Rather it's a reasonable starting point in *most* cases.
     *
     * That said, the game itself recommends **against** rolling all possible results at once (see "Peeling the Onion", p. 293, *Starforged*). If your goal is to implement the game 'as-written', consider how you might include some means of "progressive disclosure" of oracle results.
     *
     * May be deprecated in the future in favour of dedicated object template information.
     */
    Initial?: boolean | undefined;
    Suggestions?: Suggestions | undefined;
    Requires?: Requirements | undefined;
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
     * Whether multiple rolls (as in object generation, or with {@link MultipleRolls}) .
     */
    "Allow duplicates"?: boolean | undefined;
    /**
     * Hints which attributes are set by this table.
     */
    "Sets"?: AttributeChoices[] | undefined;
}

/**
 * @public
 */
export declare interface OutcomeBase<O extends MoveOutcome, RequireText extends boolean = false> extends HasId, Partial<HasText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/((miss|strong_hit)(/with_a_match)?|weak_hit)$
     */
    $id: string;
    /**
     * Defines a different outcome for this result with a match. Its text should replace the text of this object.
     */
    "With a match"?: OutcomeBase<O> | undefined;
    /**
     * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
     */
    "Count as"?: keyof typeof MoveOutcome | undefined;
    /**
     * Information on rerolls offered by this move.
     */
    Reroll?: MoveReroll | undefined;
    /**
     * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
     */
    "In control"?: boolean | undefined;
    Text?: RequireText extends true ? string : (string | undefined);
}

/**
 * @public
 */
export declare interface OutcomeMiss extends HasId, OutcomeBase<MoveOutcome.Miss, true> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/miss$
     */
    $id: string;
    "With a match"?: OutcomeMissMatch | undefined;
    /**
     * @default false
     */
    "In control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeMissMatch extends Omit<OutcomeMiss, "With a match"> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/miss/with_a_match$
     */
    $id: string;
    /**
     * @default false
     */
    "In control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface Outcomes extends HasId {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes$
     */
    $id: string;
    "Strong hit": OutcomeStrongHit;
    "Weak hit": OutcomeWeakHit;
    "Miss": OutcomeMiss;
}

/**
 * @public
 */
export declare interface OutcomeStrongHit extends HasId, OutcomeBase<typeof MoveOutcome["Strong hit"], true> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/strong_hit$
     */
    $id: string;
    "With a match"?: OutcomeStrongHitMatch | undefined;
    /**
     * @default true
     */
    "In control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeStrongHitMatch extends Omit<OutcomeStrongHit, "With a match"> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/strong_hit/with_a_match$
     */
    $id: string;
    /**
     * @default true
     */
    "In control"?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeWeakHit extends Omit<OutcomeBase<typeof MoveOutcome["Weak hit"], true>, "With a match"> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/alter_moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/abilities/[1-3]/[a-z_-]+)/outcomes/weak_hit$
     */
    $id: string;
    /**
     * @default false
     */
    "In control"?: boolean | undefined;
}

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
 * @public
 */
export declare type PlaceRecord<T extends GameObjectType.Derelict | GameObjectType.DerelictZone | GameObjectType.Starship | GameObjectType.Settlement | GameObjectType.Planet | GameObjectType.PrecursorVault, K extends AttributeKey | never = never> = GameObjectRecordBase<T, K | AttributeKey.Location | AttributeKey.Region | AttributeKey.LocationTheme>;

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
 * @public
 */
export declare type PlanetRecord = PlaceRecord<GameObjectType.Planet, AttributeKey.Atmosphere | AttributeKey.Life | AttributeKey.PlanetaryClass>;

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
 * Set by Oracles / Settlements / Population
 * @public
 */
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
export declare type PrecursorVaultRecord = PlaceRecord<GameObjectType.PrecursorVault>;

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
 * @public
 */
export declare enum Region {
    Terminus = "Terminus",
    Outlands = "Outlands",
    Expanse = "Expanse"
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
 * Data describing an item's requirements.
 * @public
 */
export declare interface Requirements {
    /**
     * A list of attribute keys, and values of those keys that satisfy the requirements.
     */
    Attributes: AttributeChoices[];
}

/**
 * Enumerates which dice are to be rerolled.
 * @public
 */
export declare enum RerollType {
    /**
     * The player can pick and choose which dice to reroll.
     */
    Any = "any",
    /**
     * The player can pick and choose which challenge dice to reroll (none, one, or both).
     */
    ChallengeDice = "challenge dice",
    /**
     * The action die is rerolled.
     */
    ActionDie = "action die",
    /**
     * The player can choose **one** challenge die to reroll.
     */
    ChallengeDie = "challenge die",
    /**
     * Reroll *all* dice
     */
    All = "all"
}

/**
 * @public
 */
export declare type RetainBlacklist<T> = {
    [P in keyof T as T[P] extends BlacklistPartial ? P : never]: T[P];
};

/**
 * Set by Oracles / Character / Role
 * @public
 */
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
export declare type RollableStat = Stat | CustomStat["$id"] | PlayerConditionMeter | ConditionMeter["$id"];

/**
 * The stat(s) or progress track(s) that may be rolled with the parent move trigger option.
 * @public
 */
export declare enum RollMethod {
    /**
     * When rolling with this move trigger option, *every* stat or progress track of the `Using` key is rolled.
     */
    All = "all",
    /**
     * When rolling with this move trigger option, use the highest/best option from the `Using` key.
     */
    Highest = "highest",
    /**
     * When rolling with this move trigger option, use the lowest/worst option from the `Using` key.
     */
    Lowest = "lowest",
    /**
     * When rolling with this move trigger option, the user picks which stat to use.
     *
     * This is the default option for triggers that offer a single stat.
     */
    Any = "any",
    /**
     * This move trigger option has no roll method of its own, and must inherit its roll from another move trigger option.
     *
     * If the parent's `Using` is defined, the inherited roll must use one of those stats/progress tracks.
     *
     * Typically appears on children of `AlterMove`.
     */
    Inherit = "inherit",
    /**
     * The move trigger option results in an automatic strong hit - no roll required.
     */
    StrongHit = "strong hit",
    /**
     * The move trigger option results in an automatic weak hit - no roll required.
     */
    WeakHit = "weak hit"
}

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export declare interface RollTemplate extends HasId, Partial<HasSummary & HasDescription> {
    /**
     * @pattern ^(starforged|ironsworn)/[a-z_-]+/.+/roll_template$
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
 * @public
 */
export declare enum RollType {
    Action = "action roll",
    Progress = "progress roll"
}

/**
 * A row stub that has no dice range assigned to it, but still contains user-facing strings that are relevant to rendering the table. Typically, their dice range appears as "--" in the book.
 * @public
 */
export declare interface RowNullStub extends Omit<Partial<OracleTableRow>, "$id"> {
    Floor: null;
    Ceiling: null;
    Result: string;
    Summary?: string | undefined | null;
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
 * @public
 */
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

/**
 * @public
 */
export declare type SettlementRecord<K extends AttributeKey | never = never> = PlaceRecord<GameObjectType.Settlement, AttributeKey.Authority | AttributeKey.Population | AttributeKey.InitialContact | K> & {
    [AttributeKey.InitialContact]?: SettlementInitialContact | undefined;
};

/**
 * Interface representing data on this item's source. For 'canonical' content, this is usually a book with numbered pages, but it might also be a link to a web site.
 * @public
 */
export declare interface Source {
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
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Encounters": {
        [key: string]: EncounterStarforged;
    };
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    "Setting truths": {
        [key: string]: TruthStarforged;
    };
}

/**
 * @public
 */
export declare const starforged: Starforged;

/**
 * @public
 */
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

/**
 * @public
 */
export declare type StarshipRecord<K extends AttributeKey | never = never> = PlaceRecord<GameObjectType.Starship, K | AttributeKey.InitialContact> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined;
};

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
 * Describes "non-canonical" suggestions for game content related to the parent item.
 *
 * These are intended be offered as convenient shortcuts for the user (for instance, including a menu dropdown for rolling on suggested tables); having them roll automatically is **not recommended** for most projects.
 *
 * These can be safely ignored if that functionality is not desired.
 * @public
 */
export declare interface Suggestions {
    /**
     * Suggested game objects and their parameters.
     */
    "Game objects"?: GameObject[] | undefined;
    /**
     * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
     * @pattern ^(starforged|ironsworn)/oracles/[a-z_-]+/[a-z_-/]+$
     */
    "Oracle rolls"?: OracleTable["$id"][] | undefined;
    /**
     * Suggested move IDs.
     * @pattern ^(starforged|ironsworn)/moves/[a-z_-]+/[a-z_-]+$
     */
    "Moves"?: Move["$id"][] | undefined;
    /**
     * Suggested asset IDs.
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+$
     */
    "Assets"?: Asset["$id"][] | undefined;
    /**
     * Suggested encounter IDs.
     * @pattern ^(starforged/encounters|ironsworn/encounters/[a-z_-]+)/[a-z_-]+$
     */
    "Encounters"?: EncounterStarforged["$id"][] | EncounterClassic["$id"][] | undefined;
    /**
     * Suggested delve site themes.
     * @pattern ^ironsworn/themes/[a-z_-]+$
     */
    "Themes"?: DelveSiteTheme["$id"][] | undefined;
    /**
     * Suggested delve site domains.
     * @pattern ^ironsworn/domains/[a-z_-]+$
     */
    "Domains"?: DelveSiteDomain["$id"][] | undefined;
    /**
     * Suggested Ironlands regions.
     * @pattern ^ironsworn/regions/[a-z_-]+$
     */
    "Regions"?: IronlandsRegion["$id"][] | undefined;
}

/**
 * Interface with elements common to {@link TableColumnRoll} and {@link TableColumnText}.
 * @public
 */
export declare interface TableColumnBase extends HasLabel {
    /**
     * The label or header text to use for this column.
     * @localize
     */
    Label: string;
    /**
     * The ID of the {@link OracleTable} whose {@link OracleTable.Table} content will be displayed in the table.
     */
    "Content": OracleTable["$id"];
    Type: TableColumnType;
    /**
     * The key of each {@link OracleTableRow} in the {@link OracleTable.Table}, whose string value is displayed in the rendered table.
     */
    Key?: KeysWithValuesOfType<OracleTableRow, string> | undefined;
}

/**
 * @public
 */
export declare interface TableColumnRoll extends Omit<TableColumnBase, "Key"> {
    /**
     * @default "Roll"
     * @localize
     */
    Label: string;
    Type: TableColumnType.Range;
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link TableColumnRoll}, which displays numerical ranges).
 * @public
 */
export declare interface TableColumnText extends TableColumnBase {
    Type: TableColumnType.String;
    /**
     * @default "Result"
     * @localize
     */
    Label: string;
    /**
     * @default "Result"
     */
    Key: KeysWithValuesOfType<OracleTableRow, string>;
}

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export declare enum TableColumnType {
    Range = "dice range",
    String = "string"
}

/**
 * @public
 */
export declare interface Title extends HasId {
    /**
     * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+/title$
     */
    $id: string;
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
    Canonical: string;
    /**
     * The recommended title for most implementations.
     *
     * This is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some Ironsworn oracles (because *nobody* remembers it as "Oracle 15").
     *
     * If you need the shortest possible name, see {@link Title.Short} instead.
     * @pattern ^[A-Z][a-z’ -]+$
     * @localize
     */
    Standard: string;
    /**
     * The shortest title for this item that remains distinct amongst its siblings.
     *
     * Unless you're very pressed for space, most UX should use {@link Title.Standard} instead.
     *
     * @pattern ^[A-Z][a-z -]+$
     * @localize
     */
    Short: string;
}

/**
 * @public
 */
export declare interface TitleCaseTitle extends Title {
    /**
     * @pattern ^[A-Z][A-z \(\)-’]+$
     */
    Canonical: string;
    /**
     * @pattern ^[A-Z][A-z \(\)-’]+$
     */
    Standard: string;
    /**
     * @pattern ^[A-Z][A-z -’]+$
     */
    Short: string;
}

/**
 * @public
 */
export declare interface TruthClassic extends HasTitle, HasSource {
    /**
     * @pattern ^ironsworn/setting_truths/[a-z_-]+$
     */
    $id: string;
    Options: TruthOptionClassic[];
}

/**
 * @public
 */
export declare interface TruthOptionClassic extends HasDescription, HasQuestStarter {
    /**
     * @pattern ^ironsworn/setting_truths/[a-z_-]+/[1-3]$
     */
    $id: string;
}

/**
 * Interface for 'canonical' options within a {@link TruthStarforged} category.
 * @public
 */
export declare interface TruthOptionStarforged extends OracleTableRow, HasQuestStarter, HasDescription {
    /**
     * @pattern ^starforged/setting_truths/[a-z_-]+/(1-33|34-67|68-100)$
     */
    $id: string;
    "Roll template"?: RollTemplate | undefined;
    Subtable?: TruthOptionSubtableRowStarforged[] | undefined;
}

/**
 * @see {@link TruthOptionStarforged}, {@link TruthStarforged}
 * @public
 */
export declare interface TruthOptionSubtableRowStarforged extends OracleTableRow {
    /**
     * @pattern ^(starforged|ironsworn)/setting_truths/[a-z_-]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
     */
    $id: string;
}

/**
 * Interface for Starforged Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see TruthOptionStarforged
 * @public
 */
export declare interface TruthStarforged extends HasId, HasSource, HasDisplay, Partial<HasSuggestions>, HasTable, HasTitle {
    /**
     * @pattern ^starforged/truths/[a-z_-]+$
     */
    $id: string;
    /**
     * The 'canonical' options for this setting truth category.
     */
    Table: TruthOptionStarforged[];
    /**
     * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
     * @markdown
     * @localize
     */
    Character: string;
    Display: Display;
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
export declare interface YamlSource extends Partial<Source> {
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
