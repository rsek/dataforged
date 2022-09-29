/**
 * @public
 */
export declare type ActorRecord<T extends GameObjectType.Character | GameObjectType.Creature | GameObjectType.Faction, K extends AttributeKey> = GameObjectRecordBase<T, K>;

/**
 * Describes changes that an asset ability makes to its parent asset when active. Any properties with object values should be merged recursively.
 *
 * @example An `AssetAlterProperties` that would set `Asset["Condition meter"].Max` to 3, and leave its other properties unchanged:
 * ```json
 * { "Condition meter": { "Max": 3 } }
 * ```
 * @public
 */
export declare interface AlterAsset extends Omit<PartialDeep<OmitMetadataDeep<Asset>>, 'abilities' | 'asset_type' | 'attachments' | 'condition_meter' | '$id'>, MixinId {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/assets/[1-9][0-9]*$
     */
    $id: string;
    abilities?: AlterAssetAbility[] | undefined;
    attachments?: AlterAssetAttachment | undefined;
    'condition_meter'?: AlterAssetConditionMeter | undefined;
    states?: InputToggle[] | undefined;
}

/**
 * @public
 */
export declare interface AlterAssetAbility extends Partial<AssetAbility> {
}

/**
 * @public
 */
export declare interface AlterAssetAttachment extends Partial<AssetAttachment> {
}

/**
 * @public
 */
export declare interface AlterAssetConditionMeter extends Partial<ConditionMeter> {
}

/**
 * @public
 */
export declare interface AlterMiss extends PartialDeep<OutcomeMiss> {
}

/**
 * @public
 */
export declare interface AlterMomentum extends MixinId {
    /**
     * Information on how the player's momentum burn is altered.
     */
    burn?: AlterMomentumBurn[] | undefined;
    /**
     * Information on how the player's momentum reset is altered.
     */
    reset?: AlterMomentumReset[] | undefined;
}

/**
 * @public
 */
export declare interface AlterMomentumBurn extends MixinId {
    /**
     * The trigger condition for altering the PC's momentum burn.
     */
    trigger: MixinText;
    /**
     * The effect altering the PC's momentum burn.
     */
    effect: MixinText;
    outcomes?: Array<typeof MoveOutcome[1] | typeof MoveOutcome[2]> | undefined;
}

/**
 * @public
 */
export declare interface AlterMomentumReset extends MixinId {
    /**
     * The trigger condition for altering the PC's momentum reset.
     */
    trigger: MixinText;
    /**
     * The amount by which the PC's momentum reset is change.
     */
    value: number;
}

/**
 * Describes alterations applied to moves by asset abilities.
 * @public
 */
export declare interface AlterMove extends StubExcept<Move, '$id', 'outcomes'> {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[1-9][0-9]*$
     */
    $id: string;
    /**
     * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply. If it's `undefined`, see `Extends` instead.
     * @nullable
     */
    moves?: Array<Move['$id']> | null | undefined;
    /**
     * Some asset abilities alter/extend other asset abilities, specified as an array of IDs. Only changed properties are specified; other properties are the same.
     */
    alters?: Array<AlterMove['$id']> | undefined;
    /**
     * The trigger required by the asset ability. If `undefined`, the move alteration applies to all uses of the specified moves, so long as they also meet any implicit asset requirements (fictional framing, `Asset.Requirement`, not being Broken or Out of Action, etc).
     */
    trigger?: MoveTrigger | undefined;
    /**
     * Markdown rules text describing added effects which apply *before* the move is rolled, such as adds.
     * @localize
     */
    text?: string | undefined;
    /**
     * Added rules text that applies on move outcomes.
     */
    outcomes?: AlterMoveOutcomes | undefined;
}

/**
 * @public
 */
export declare interface AlterMoveOutcomes extends Omit<Outcomes, keyof typeof MoveOutcome> {
    'strong_hit'?: AlterStrongHit | undefined;
    'weak_hit'?: AlterWeakHit | undefined;
    miss?: AlterMiss | undefined;
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
export declare interface Asset extends MixinId, MixinDisplay, MixinSource, Partial<MixinAliases>, MixinTitle {
    /**
     * @example "starforged/assets/path/bounty_hunter"
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    title: TitleCaseTitle;
    display: Display;
    /**
     * {@inheritDoc AssetType.$id}
     */
    asset_type: AssetType['$id'];
    /**
     * Information on the asset's usage, such as whether its abilities are shared amongst the player characters.
     */
    usage: AssetUsage;
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    attachments?: AssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    inputs?: {
        [key: SnakeCaseString]: (InputNumber | InputClock | InputText | InputSelect | InputToggle);
    } | undefined;
    /**
     * An optional markdown string representing the requirement text that appears at the top of some asset cards.
     * @markdown
     * @localize
     * @example "If you wear your finely crafted set of personal armor..."
     */
    requirement?: string | undefined;
    /**
     * The asset's abilities.
     */
    abilities: [AssetAbility, AssetAbility, AssetAbility];
    /**
     * Information on this asset's condition meter, if any.
     */
    'condition_meter'?: ConditionMeter | undefined;
    tags?: AssetTag[] | undefined;
}

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export declare interface AssetAbility extends MixinId, MixinText, Partial<MixinLabel> {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/[1-3]$
     */
    $id: string;
    /**
     * Ironsworn companion assets provide labels for their abilities. Starforged asset abilities do not have labels.
     */
    label?: string | undefined;
    /**
     * New moves added by this asset ability.
     */
    moves?: Move[] | undefined;
    /**
     * User inputs (text, clocks, etc) associated with this asset ability.
     * @patternProperties ^[A-Z].+$
     */
    inputs?: {
        [key: SnakeCaseString]: (InputText | InputNumber | InputToggle | InputClock | InputSelect);
    } | undefined;
    /**
     * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
     */
    enabled: boolean;
    alter?: MixinAlter | undefined;
}

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Starship/Assets/Command_vehicle/Starship`); Rover (`Starship/Assets/Support_vehicle/Rover`) also has an elective ability that adds this property.
 * @public
 */
export declare interface AssetAttachment {
    /**
     * The type of asset that this asset accepts as attachments.
     */
    'asset_types': Array<AssetType['$id']>;
    /**
     * The maximum number of attached assets accepted by this asset. If undefined or null, there is no maximum.
     * @nullable
     */
    'max': number | null;
}

/**
 * @public
 */
export declare enum AssetTag {
    AnimalCompanion = "animal_companion",
    BeastCompanion = "beast_companion",
    IronlanderCompanion = "ironlander_companion",
    Deed = "deed"
}

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export declare interface AssetType extends MixinId, MixinDescription, MixinDisplay, MixinSource, MixinTitle, Partial<MixinAliases> {
    /**
     * @example "ironsworn/assets/ritual"
     * @example "starforged/assets/command_vehicle"
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+$
     */
    $id: string;
    /**
     * The assets that belong to this asset type.
     */
    assets: {
        [key: SnakeCaseString]: Asset;
    };
    /**
     * @example "Ritual"
     * @example "Command vehicle"
     * @localize
     */
    title: Title;
    display: Display;
    usage: AssetUsage;
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
    shared: boolean;
}

/**
 * Set by Oracles / Planets / * / Atmosphere
 * @public
 */
export declare enum Atmosphere {
    NoneThin = "none_thin",
    Toxic = "toxic",
    Corrosive = "corrosive",
    Marginal = "marginal",
    Breathable = "breathable",
    Ideal = "ideal"
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
    key: AttributeKey;
    value?: string | undefined;
}

/**
 * @public
 */
export declare interface AttributeChoices {
    key: AttributeKey;
    value?: string[] | undefined;
}

/**
 * @public
 */
export declare enum AttributeKey {
    /**
     * {@link Atmosphere}
     */
    Atmosphere = "atmosphere",
    /**
     * {@link Authority}
     */
    Authority = "authority",
    /**
     * {@link Behavior}
     */
    Behavior = "encountered_behavior",
    /**
     * {@link DerelictType}
     */
    DerelictType = "derelict_type",
    /**
     * {@link Disposition}
     */
    Disposition = "disposition",
    /**
     * {@link Dominion}
     */
    Dominion = "dominion",
    /**
     * {@link Environment}
     */
    Environment = "environment",
    /**
     * {@link FactionType}
     */
    FactionType = "faction_type",
    /**
     * {@link FringeGroup}
     */
    FringeGroup = "fringe_group",
    /**
     * {@link Guild}
     */
    Guild = "guild",
    /**
     * {@link Influence}
     */
    Influence = "influence",
    /**
     * {@link StarshipInitialContact} {@link SettlementInitialContact}
     */
    InitialContact = "initial_contact",
    /**
     * {@link Leadership}
     */
    Leadership = "leadership",
    /**
     * {@link Life}
     */
    Life = "life",
    /**
     * {@link Location}
     */
    Location = "location",
    /**
     * {@link LocationTheme}
     */
    LocationTheme = "location_theme",
    /**
     * {@link PlanetaryClass}
     */
    PlanetaryClass = "planetary_class",
    /**
     * {@link Population}
     */
    Population = "population",
    /**
     * {@link Region}
     */
    Region = "region",
    /**
     * {@link Role}
     */
    Role = "role",
    /**
     * {@link CreatureScale}
     */
    CreatureScale = "creature_scale",
    /**
     * {@link Zone}
     */
    Zone = "zone"
}

/**
 * @public
 */
export declare type AttributeMap<K extends AttributeKey = AttributeKey> = {
    [key in K]?: Array<AttributeMaster[K]> | undefined | null;
};

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
    NoneLawless = "none_lawless",
    Ineffectual = "ineffectual",
    Tolerant = "tolerant",
    Fair = "fair",
    Unyielding = "unyielding",
    Corrupt = "corrupt",
    Oppressive = "oppressive"
}

/**
 * Set by Oracles / Creatures / Encountered Behavior
 *
 * @public
 */
export declare enum Behavior {
    Ambusher = "ambusher",
    Hibernator = "hibernator",
    PackHunter = "pack_hunter",
    ApexPredator = "apex_predator",
    Hoarder = "hoarder",
    Prey = "prey",
    Builder = "builder",
    Hunter = "hunter",
    Protector = "protector",
    Camouflager = "camouflager",
    Lurer = "lurer",
    Scavenger = "scavenger",
    Forager = "forager",
    Migratory = "migratory",
    Tracker = "tracker",
    Grazer = "grazer",
    Mimic = "mimic",
    Trapper = "trapper",
    Herder = "herder",
    Nester = "nester"
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
export declare type BlacklistPartial = 'Label';

/**
 * @public
 */
export declare interface BondsTrackClassic extends TrackBase {
    'track_type': LegacyTypeClassic.BondsTrack;
    /**
     * @minimum 0
     * @maximum 40
     */
    ticks: number;
}

/**
 * Enumerates *Ironsworn* challenge ranks.
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
export declare interface Clock {
    clock_type: ClockType;
    /**
     * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
     *
     * `Filled` should not exceed this number.
     */
    segments: ClockSegments;
    /**
     * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
     */
    filled: number;
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
    min: number;
    /**
     * @default 5
     */
    max: number;
    /**
     * Certain common types of asset meters, like companion health and vehicle integrity, are collectively referenced by {@link MoveTriggerOptionAction.using}. The array will include an appropriate alias if that is the case.
     */
    aliases?: MeterAlias[] | undefined;
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
    Minuscule = "minuscule",
    Tiny = "tiny",
    Small = "small",
    Medium = "medium",
    Large = "large",
    Huge = "huge",
    Titanic = "titanic",
    Colossal = "colossal",
    Vast = "vast"
}

/**
 * @public
 */
export declare interface CustomStat extends MixinId, MixinLabel {
    /**
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat$
     */
    $id: string;
    options: CustomStatOption[];
}

/**
 * @public
 */
export declare interface CustomStatOption extends MixinId, MixinLabel {
    /**
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[0-9]+)/[a-z_-]+/trigger/options/[0-9]+/custom_stat/[a-z_-]+$
     */
    $id: string;
    /**
     * The numeric value to be used as +stat when making an Action Roll.
     */
    value: number;
    label: string;
}

/**
 * Basic interface for elements common to "cyclopedia" style pages, such as Regions (*Ironsworn* classic) and Encounters (*Ironsworn* classic and *Starforged*)
 * @public
 */
export declare interface CyclopediaEntry extends MixinId, MixinDisplay, MixinDescription, MixinSource, Partial<MixinSummary & MixinQuestStarter & MixinTags>, MixinTitle {
    /**
     * @pattern ^(starforged|ironsworn)/([a-z_-]+/)+$
     */
    $id: string;
    tags?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    features?: string[] | undefined;
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
export declare interface DelveCard extends MixinSource, MixinSummary, MixinDescription, MixinId, MixinTitle {
    /**
     * @pattern ^ironsworn/(themes|domains)/[a-z_-]+$
     */
    $id: string;
    /**
     * Indicates whether this is a site Theme or a site Domain.
     */
    card_type: DelveCardType;
    /**
     * The summary text that appears immediately below the card's title. For best rendering, ensure that it fits on a single line.
     * @markdown
     * @localize
     */
    summary: string;
    /**
     * An extended description for this card that doesn't appear on the card itself. For 'canonical' Themes and Domains, these are presented on p. 84 - 93 of *Ironsworn: Delve*.
     *
     * Most are two paragraphs long, approximately 90 words (600 characters); the longest 'canonical' description clocks in at 98 words (619 characters). Allot space accordingly.
     *
     * @markdown
     * @localize
     */
    description: string;
    /**
     * The Features contributed by this card. Effectively a 'partial' oracle table; combine with the features of another card to complete it.
     */
    features: OracleTableRow[];
    /**
     * The Dangers contributed by this card. Effectively a 'partial' oracle table; combine with the dangers of another card and the Reveal a Danger move oracle table to complete it.
     */
    dangers: OracleTableRow[];
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
export declare interface DelveRarity extends MixinTitle, MixinDisplay, MixinSource, MixinDescription {
    /**
     * @minimum 3
     * @maximum 5
     */
    'xp_cost': number;
    /**
     * The ID of the asset, to which this rarity applies its effects.
     * @see {@link Asset.$id}
     */
    asset: Asset['$id'];
    title: TitleCaseTitle;
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
    'card_type': DelveCardType.Domain;
    /**
     * The Features contributed by this Domain card. Effectively a 'partial' oracle table; combine with the features of a Theme card to complete it.
     */
    features: [
    OracleTableRow<21, 43>,
    OracleTableRow<44, 56>,
    OracleTableRow<57, 64>,
    OracleTableRow<65, 68>,
    OracleTableRow<69, 72>,
    OracleTableRow<73, 76>,
    OracleTableRow<77, 80>,
    OracleTableRow<81, 84>,
    OracleTableRow<85, 88>,
    OracleTableRow<89, 98> & {
        result: 'Something unusual or unexpected';
    },
    OracleTableRow<99, 99> & {
        result: 'You transition into a new theme';
    },
    OracleTableRow<100, 100> & {
        result: 'You transition into a new domain';
    }
    ];
    /**
     * The Dangers contributed by this Domain card. Effectively a 'partial' oracle table; combine with the dangers of Theme and the Reveal a Danger move oracle table to complete it.
     */
    dangers: [
    OracleTableRow<31, 33>,
    OracleTableRow<34, 36>,
    OracleTableRow<37, 39>,
    OracleTableRow<40, 42>,
    OracleTableRow<43, 45>
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
    'card_type': DelveCardType.Theme;
    /**
     * The Features contributed by this Theme card. Effectively a 'partial' oracle table; combine with the features of a Domain card to complete it.
     */
    features: [
    OracleTableRow<1, 4>,
    OracleTableRow<5, 8>,
    OracleTableRow<9, 12>,
    OracleTableRow<13, 16>,
    OracleTableRow<17, 20>
    ];
    /**
     * The Dangers contributed by this Theme card.  Effectively a 'partial' oracle table; combine with the dangers of Domain and the Reveal a Danger move oracle table to complete it.
     */
    dangers: [
    OracleTableRow<1, 5>,
    OracleTableRow<6, 10>,
    OracleTableRow<11, 12>,
    OracleTableRow<13, 14>,
    OracleTableRow<15, 16>,
    OracleTableRow<17, 18>,
    OracleTableRow<19, 20>,
    OracleTableRow<21, 22>,
    OracleTableRow<23, 24>,
    OracleTableRow<25, 26>,
    OracleTableRow<27, 28>,
    OracleTableRow<29, 30>
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
export declare type DerelictSettlementRecord = Omit<SettlementRecord<AttributeKey.DerelictType>, 'Object type'> & {
    'Object type': GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Settlement;
    [AttributeKey.InitialContact]: SettlementInitialContact.Derelict;
};

/**
 * @public
 */
export declare type DerelictStarshipRecord = Omit<StarshipRecord<AttributeKey.DerelictType>, 'Object type'> & {
    'Object type': GameObjectType.Derelict;
    [AttributeKey.DerelictType]: DerelictType.Starship;
    [AttributeKey.InitialContact]: StarshipInitialContact.Derelict;
};

/**
 * Set by oracle: Oracles / Derelicts / Type
 * @public
 */
export declare enum DerelictType {
    Starship = "starship",
    Settlement = "settlement"
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
    icon?: string | undefined;
    /**
     * An array of URLs pointing to one or more WEBP images.
     * @pattern ^img/raster/[A-z-_0-9/]+\.webp$
     */
    images?: string[] | undefined;
    /**
     * A hex color associated with this item, for use as e.g. an accent color in its display.
     * @pattern ^#[A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9][A-f0-9]$
     */
    color?: string | undefined;
}

/**
 * Set by Oracles / Characters / Disposition
 * @public
 */
export declare enum Disposition {
    Cooperative = "cooperative",
    Curious = "curious",
    Demanding = "demanding",
    Desperate = "desperate",
    Friendly = "friendly",
    Helpful = "helpful",
    Hostile = "hostile",
    Indifferent = "indifferent",
    Suspicious = "suspicious",
    Threatening = "threatening",
    Unfriendly = "unfriendly",
    Wanting = "wanting"
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
    Agriculture = "agriculture",
    Artistry = "artistry",
    Commerce = "commerce",
    Conquest = "conquest",
    Construction = "construction",
    Diplomacy = "diplomacy",
    Education = "education",
    Environmentalism = "environmentalism",
    Exploration = "exploration",
    Faith = "faith",
    History = "history",
    Honor = "honor",
    Industry = "industry",
    Isolationism = "isolationism",
    Law = "law",
    Mysticism = "mysticism",
    Pacifism = "pacifism",
    Prophecy = "prophecy",
    Science = "science",
    Secrecy = "secrecy",
    Technology = "technology",
    Treachery = "treachery",
    Warfare = "warfare",
    Wealth = "wealth"
}

/**
 * Represents a full (i.e. not a stub/variant) encounter entry in *Ironsworn* or *Ironsworn: Starforged*.
 * @public
 */
export declare interface Encounter extends EncounterBase {
    features: string[];
    drives: string[];
    tactics: string[];
    quest_starter: string;
    your_truth?: string | undefined;
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
    nature: EncounterNatureTypeStarforged | EncounterNatureTypeClassic;
    display: Display;
    /**
     * @example "Insectoid horde"
     * @markdown
     * @localize
     */
    summary?: string | undefined;
    tags?: EncounterTags[] | undefined;
    rank: ChallengeRank;
    /**
     * @markdown
     * @localize
     */
    features?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    drives?: string[] | undefined;
    /**
     * @markdown
     * @localize
     */
    tactics?: string[] | undefined;
    /**
     * Ironsworn, p. 135: "Some NPCs include a question for you to answer. This is an opportunity to customize the NPC to your vision of the Ironlands. You can do this as you define your world or discover through play. Truths may represent an absolute fact, or merely something the people of your world believe."
     *
     * Only present in Ironsworn encounters.
     * @markdown
     * @localize
     */
    your_truth?: string | undefined;
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
    nature: EncounterNatureTypeClassic;
    your_truth?: string | undefined;
    summary?: string | undefined;
}

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export declare interface EncounterNatureClassic extends MixinDescription, MixinSource, MixinId, MixinDisplay, MixinSummary, MixinTitle {
    /**
     * @pattern ^ironsworn/encounters/[a-z_-]+$
     */
    $id: string;
    encounters: {
        [key: SnakeCaseString]: EncounterClassic;
    };
    title: Title & {
        short: keyof typeof EncounterNatureTypeClassic;
    };
}

/**
 * @public
 */
export declare enum EncounterNatureTypeClassic {
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
export declare enum EncounterNatureTypeStarforged {
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
    nature: EncounterNatureTypeStarforged;
    summary: string;
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    variants?: {
        [key: SnakeCaseString]: EncounterVariant;
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
export declare interface EncounterVariant extends StubBy<EncounterStarforged, never, 'features' | 'drives' | 'tactics' | 'variants' | 'summary' | 'your_truth' | 'quest_starter'> {
    /**
     * @pattern ^starforged/encounters/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    variant_of: EncounterStarforged['$id'];
}

/**
 * Set by Oracles / Creatures / Environment
 * @public
 */
export declare enum Environment {
    Space = "space",
    Interior = "interior",
    Land = "land",
    Liquid = "liquid",
    Air = "air"
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
    FringeGroup = "fringe_group",
    Dominion = "dominion",
    Guild = "guild"
}

/**
 * Set by Oracles / Factions / Fringe Group
 * @public
 */
export declare enum FringeGroup {
    Cultists = "cultists",
    Exiles = "exiles",
    Gangsters = "gangsters",
    Hackers = "hackers",
    MonsterHunters = "monster_hunters",
    Pirates = "pirates",
    Raiders = "raiders",
    Rebels = "rebels",
    RogueAI = "rogue_ai",
    Scavengers = "scavengers",
    Smugglers = "smugglers"
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
export declare interface GameDataRoot extends DataRootBase {
    asset_types: {
        [key: SnakeCaseString]: AssetType;
    };
    encounters: {
        [key: SnakeCaseString]: EncounterStarforged;
    } | {
        [key: SnakeCaseString]: EncounterNatureClassic;
    };
    move_categories: {
        [key: SnakeCaseString]: MoveCategory;
    };
    oracle_sets: {
        [key: SnakeCaseString]: OracleSet;
    };
    setting_truths: {
        [key: SnakeCaseString]: TruthStarforged;
    } | {
        [key: SnakeCaseString]: TruthClassic;
    };
}

/**
 * Describes a game object, with optional required parameters (for example, a specific Location result).
 * @public
 */
export declare interface GameObject {
    object_type: GameObjectType;
    requires?: AttributeMap | undefined;
}

/**
 * @public
 */
export declare type GameObjectRecord = CharacterRecord | CreatureRecord | DerelictRecord | DerelictStarshipRecord | DerelictSettlementRecord | DerelictZoneRecord | FactionRecord | FactionGuildRecord | FactionFringeGroupRecord | FactionDominionRecord | PlanetRecord | PrecursorVaultRecord | SettlementRecord | StarshipRecord;

/**
 * @public
 */
export declare type GameObjectRecordBase<T extends GameObjectType, K extends AttributeKey> = {
    'object_type': T;
    'inherit_rolls'?: boolean | undefined;
} & AttributeMap<K>;

/**
 * @public
 */
export declare enum GameObjectType {
    Derelict = "derelict",
    DerelictZone = "derelict_zone",
    Starship = "starship",
    Settlement = "settlement",
    Planet = "planet",
    PrecursorVault = "precursor_vault",
    Character = "character",
    Creature = "creature",
    Faction = "faction"
}

/**
 * Set by Oracles / Factions / Guild
 * @public
 */
export declare enum Guild {
    Assassins = "assassins",
    BountyHunters = "bounty_hunters",
    Couriers = "couriers",
    Courtesans = "courtesans",
    Engineers = "engineers",
    Healers = "healers",
    Industrialists = "industrialists",
    Mercenaries = "mercenaries",
    Merchants = "merchants",
    Mystics = "mystics",
    Navigators = "navigators",
    Peacekeepers = "peacekeepers",
    Researchers = "researchers",
    Spies = "spies"
}

/**
 * Set by Oracles / Factions / Influence
 * @public
 */
export declare enum Influence {
    Forsaken = "forsaken",
    Isolated = "isolated",
    Localized = "localized",
    Established = "established",
    Notable = "notable",
    Dominant = "dominant",
    Inescapable = "inescapable"
}

/**
 * A stub interface representing an input widget of any type.
 * @see {@link InputNumber}, {@link InputClock}, {@link InputText}, {@link InputSelect}, {@link InputToggle}
 * @public
 */
export declare interface Input extends MixinLabel, MixinDisplay {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/([1-3]/)?inputs/[a-z_-]+$
     */
    $id: string;
    label: string;
    /**
     * The type of input represented by this object.
     */
    input_type: InputType;
    /**
     * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
     *
     * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
     */
    permanent: boolean;
    display: InputDisplay;
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @page 239
 * @see {@link InputType.Clock}
 * @public
 */
export declare interface InputClock extends Input, Clock {
    input_type: InputType.Clock;
    /**
     * Whether the clock is a Tension Clock or a Campaign Clock. For assets this doesn't really matter since they have their own specific trigger conditions, and can probably be ignored.
     */
    clock_type: ClockType;
    /**
     * An integer representing the total number of segments in this Clock. *Ironsworn: Starforged* uses clocks with 4, 6, 8, and 10 segments.
     *
     * `Filled` should not exceed this number.
     */
    segments: ClockSegments;
    /**
     * An integer representing how many filled segments this clock has. This is always 0 in Dataforged; it's included to make it easy to store clock states with the same interface.
     */
    filled: number;
    permanent: false;
}

/**
 * @public
 */
export declare interface InputDisplay extends Display {
    position: InputDisplayPosition;
}

/**
 * @public
 */
export declare enum InputDisplayPosition {
    /**
     * Display as attached to the asset condition meter.
     *
     * @example Starship (*Starforged*)
     */
    ConditionMeter = "condition_meter",
    /**
     * The input appears at the top of the parent element.
     *
     * For inputs whose parent is an {@link Asset}, this means immediately below the asset title, before any {@link Asset.requirement} text.
     *
     * Typically, text inputs with an {@link Asset} parent are displayed this way.
     */
    Top = "top",
    /**
     * The input is rendered at the bottom of the parent element.
     *
     * Typically, text inputs with a {@link AssetAbility} parent are displayed this way.
     *
     * @example Ironclad (*Ironsworn*)
     * @example Blademaster (*Starforged*)
     */
    Bottom = "bottom",
    /**
     * The input is rendered to the right of the parent element.
     *
     * Usually this only occurs with things like clocks and counters who have an {@link AssetAbility} parent.
     *
     * @example Fugitive (*Starforged*)
     * @example Snub Fighter (*Starforged*)
     */
    Right = "right",
    /**
     * Indicates that (in analog play) this state is presumed active when the card is flipped face-down.
     *
     * The most practical way to indicate this in a digital format is up for debate.
     *
     * Canonically, this is only used by *Starforged* modules for "broken" -- see page 55 for more information.
     */
    Back = "back"
}

/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner, similar to `<input type='number'>` in HTML.
 * @see {@link InputType.Number}
 * @public
 */
export declare interface InputNumber extends Input {
    input_type: InputType.Number;
    min: number;
    /**
     * The maximum value for this number input. If it's "null", it has no maximum.
     * @nullable
     */
    max: number | null;
    step: 1;
    value: number;
    permanent: false;
}

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @public
 */
export declare interface InputSelect extends Input {
    input_type: InputType.Select;
    /**
     * Hints which attribute(s) are set by this dropdown's options.
     * @patternProperties ^[A-z][a-z ]+$
     */
    sets_attributes: {
        [key: SnakeCaseString]: InputSelectAttributeDefinition;
    };
    options: {
        [key: SnakeCaseString]: InputSelectOption;
    };
}

/**
 * Provides hints for the keys and typing of an {@link InputSelect}'s child {@link InputSelectOption}s.
 * @public
 */
export declare interface InputSelectAttributeDefinition {
    attribute_type: InputSelectOptionType;
}

/**
 * Represents an option in an {@link InputSelect}.
 * @public
 */
export declare interface InputSelectOption extends MixinId, MixinLabel {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+$
     */
    $id: string;
    /**
     * A keyed object describing what attribute keys should be set to when this option is active. *All* items in the object should be set in this manner.
     */
    set_attributes: {
        [key: keyof InputSelect['sets_attributes']]: InputSelectOptionSetter;
    };
}

/**
 * @public
 */
export declare interface InputSelectOptionSetter extends MixinId {
    /**
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+/inputs/[a-z_-]+/options/[a-z_-]+/[a-z_-]+$
     */
    $id: string;
    attribute_type: InputSelectOptionType;
    value: Stat | PcConditionMeterType | number | string;
}

/**
 * A condition meter set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterMeter extends InputSelectOptionSetter {
    attribute_type: InputSelectOptionType.ConditionMeter;
    value: PcConditionMeterType;
}

/**
 * An integer value set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterNumber extends InputSelectOptionSetter {
    attribute_type: InputSelectOptionType.Number;
    value: number;
}

/**
 * A stat set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterStat extends InputSelectOptionSetter {
    attribute_type: InputSelectOptionType.Stat;
    value: Stat;
}

/**
 * An arbitrary string value set by an {@link InputSelectOption}.
 * @public
 */
export declare interface InputSelectOptionSetterString extends InputSelectOptionSetter {
    attribute_type: InputSelectOptionType.String;
    value: string;
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
     * A reference to one of the player character's condition meters (*Starforged*) or status tracks (*Ironsworn*): health, spirit, or supply.
     * @see {@link PcConditionMeterType}
     */
    ConditionMeter = "condition_meter",
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
 *
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export declare interface InputText extends Input {
    input_type: InputType.Text;
    permanent: true;
}

/**
 * Describes a state that can be toggled "on" and "off".
 *
 * @example "broken" and "battered" used by vehicles in *Starforged*.
 * @example "out of action" used by companions in *Starforged*.
 * @see {@link InputType.Number}
 * @public
 */
export declare interface InputToggle extends Input, MixinText {
    input_type: InputType.Toggle;
    /**
     * Whether this state is currently active.
     */
    enabled: boolean;
    /**
     * Whether this state should disable the entire asset when {@link InputToggle.enabled} is set to `true`.
     */
    disables_asset: boolean;
    /**
     * Whether this state counts as a Debility (*Ironsworn*) or Impact (*Starforged*) for the asset's owner when {@link InputToggle.enabled} is set to `true`.
     *
     * Note that for vehicles, this shouldn't be applied automatically unless your implementation has some way of telling which vehicle the PC is currently using.
     */
    is_impact: boolean;
    /**
     * Rules text that applies when {@link InputToggle.enabled} is set to `true`.
     * @markdown
     * @localize
     */
    text: string;
}

/**
 * @public
 */
export declare enum InputType {
    /**
     * A string input, similar to `<input type="text">`;
     * @see {@link InputText}
     */
    Text = "text",
    /**
     * An input where one option is selected from a list, similar to `<select>`.
     * @see {@link InputSelect}
     */
    Select = "select",
    /**
     * An input with an integer value, similar to `<input type="number">`;
     * @see {@link InputNumber}
     */
    Number = "number",
    /**
     * An input representing a *Starforged*-style clock.
     * @see {@link InputClock}
     */
    Clock = "clock",
    /**
     * An input representing an option with an an "on" and "off" state, similar to `<input type="checkbox">`.
     * @see {@link InputToggle}
     */
    Toggle = "toggle"
}

/**
 * @public
 */
export declare interface IronlandsRegion extends CyclopediaEntry, MixinSummary, MixinQuestStarter {
    /**
     * @pattern ^ironsworn/regions/[a-z_-]$
     */
    $id: string;
    features: string[];
    quest_starter: string;
    summary: string;
    title: TitleCaseTitle;
}

/**
 * Root object for *Ironsworn* game data.
 * @public
 */
export declare interface Ironsworn extends GameDataRoot {
    encounters: {
        [key: SnakeCaseString]: EncounterNatureClassic;
    };
    setting_truths: {
        [key: SnakeCaseString]: TruthClassic;
    };
    delve_site_domains: {
        [key: SnakeCaseString]: DelveSiteDomain;
    };
    delve_site_themes: {
        [key: SnakeCaseString]: DelveSiteTheme;
    };
    ironlands_regions: {
        [key: SnakeCaseString]: IronlandsRegion;
    };
    rarities: {
        [key: SnakeCaseString]: DelveRarity;
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
    Anarchist = "anarchist",
    DisputedLeadership = "disputed_leadership",
    AuthoritarianDictatorship = "authoritarian_dictatorship",
    OligarchicalElite = "oligarchical_elite",
    DynasticLineage = "dynastic_lineage",
    FatedOrProphesiedLeader = "fated_or_prophesied_leader",
    ClanChiefsOrElders = "clan_chiefs_or_elders",
    ElectedRepresentatives = "elected_representatives",
    MachineIntelligence = "machine_intelligence",
    VariedDecentralized = "varied_decentralized"
}

/**
 * Enumerates the amount of {@link LegacyTypeStarforged|legacy} marked for a reward of the given {@link ChallengeRank}, in ticks.
 * @public
 */
export declare enum LegacyRewardStarforged {
    /**
     * 1 tick
     */
    Troublesome = 1,
    /**
     * 2 ticks
     */
    Dangerous = 2,
    /**
     * 1 box (4 ticks)
     */
    Formidable = 4,
    /**
     * 2 boxes (8 ticks)
     */
    Extreme = 8,
    /**
     * 3 boxes (12 ticks)
     */
    Epic = 12
}

/**
 * @public
 */
export declare interface LegacyTrackStarforged extends TrackBase {
    'track_type': LegacyTypeStarforged;
}

/**
 * Enumerates the types of classic *Ironsworn* tracks that are un-ranked and share some behaviour with *Starforged* legacy tracks.
 * @public
 */
export declare enum LegacyTypeClassic {
    BondsTrack = "bonds track"
}

/**
 * Enumerates the types of un-ranked Legacy tracks in *Starforged*.
 * @public
 */
export declare enum LegacyTypeStarforged {
    QuestsLegacy = "quests legacy",
    BondsLegacy = "bonds legacy",
    DiscoveriesLegacy = "discoveries legacy"
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
    None = "none",
    Extinct = "extinct",
    Scarce = "scarce",
    Diverse = "diverse",
    Bountiful = "bountiful",
    Overrun = "overrun"
}

/**
 * Enumerates the keys standardized as localizable strings, which are extracted in bulk to produce localization data.
 * @public
 */
export declare enum LocalizableKey {
    Canonical = "canonical",
    Short = "short",
    Standard = "standard",
    Label = "label",
    Aliases = "aliases",
    Requirement = "requirement",
    Result = "result",
    Summary = "summary",
    Description = "description",
    Text = "text",
    Features = "features",
    Drives = "drives",
    Tactics = "tactics",
    YourTruth = "your_truth",
    Character = "character",
    QuestStarter = "quest_starter"
}

/**
 * Set by Oracles / ** / Location
 * @public
 */
export declare enum Location {
    Planetside = "planetside",
    Orbital = "orbital",
    DeepSpace = "deep_space"
}

/**
 * Set by Oracles / Location Themes / Theme Type
 * @public
 */
export declare enum LocationTheme {
    Chaotic = "chaotic",
    Fortified = "fortified",
    Haunted = "haunted",
    Infested = "infested",
    Inhabited = "inhabited",
    Mechanical = "mechanical",
    Ruined = "ruined",
    Sacred = "sacred"
}

/**
 * @public
 */
export declare type MetadataKey = '$id' | 'title' | 'asset_type' | 'display' | 'source' | 'tags' | 'usage' | 'aliases';

/**
 * Base interface for properties common to all resource meters.
 * @see {@link ConditionMeter}
 * @public
 */
export declare interface Meter extends MixinId, MixinLabel {
    /**
     * The minimum value of the meter. Usually this is 0. Momentum is currently the only exception to this and goes as low as -6.
     */
    min: number;
    /**
     * The maximum value of the meter.
     */
    max: number;
    /**
     * The initial value of the meter.
     */
    value: number;
    /**
     * Whether the meter value can be used in place of a stat in an action roll.
     */
    rollable: boolean;
    /**
     * @pattern ^[a-z].+$
     */
    label: string;
}

/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export declare enum MeterAlias {
    Attached_Asset_Meter = "attached_asset_meter",
    CompanionHealth = "companion_health",
    VehicleIntegrity = "vehicle_integrity",
    CommandVehicleIntegrity = "command_vehicle_integrity",
    SupportVehicleIntegrity = "support_vehicle_integrity",
    IncidentalVehicleIntegrity = "incidental_vehicle_integrity"
}

/**
 * Conditions (such as impacts) that can apply to asset cards with condition meters. These are typically presented as tick boxes on the asset card.
 * @public
 * @deprecated replaced by {@link InputToggle}
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
    OutOfAction = "out_of_action",
    /** Used by "Fleet Commander" asset */
    Wrecked = "wrecked"
}

/**
 * Interface for items with aliases.
 * @public
 */
export declare interface MixinAliases {
    /**
     * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
     * @localize
     */
    [LocalizableKey.Aliases]: string[];
}

/**
 * Describes how an item alters other game elements when it's active.
 * @public
 */
export declare interface MixinAlter extends MixinId {
    /**
     * Information on how this ability alters moves when enabled.
     */
    moves?: AlterMove[] | undefined;
    /**
     * Information on how this ability alters its parent asset when enabled.
     */
    properties?: AlterAsset | undefined;
    /**
     * Information on how this ability alters its owner's momentum (triggers an effect on burn, on reset, etc)
     */
    momentum?: AlterMomentum | undefined;
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
 * @public
 */
export declare interface MixinDescription extends MixinId {
    /**
     * A user-facing markdown description of the item, consisting of one or more paragraphs.
     * @markdown
     * @localize
     */
    [LocalizableKey.Description]: string;
}

/**
 * Interface for items with rendering information.
 * @public
 */
export declare interface MixinDisplay {
    /**
     * Data relevant to this item's display/rendering.
     */
    display: Display;
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export declare interface MixinGameObjects {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    game_objects: GameObject[];
}

/**
 * For elements with unique string IDs. Any object that contains a localizable user-facing string *must* have an ID, so several interfaces inherit this.
 * @public
 */
export declare interface MixinId {
    /**
     * The item's unique string ID. Any object that contains a localizable user-facing string *must* have this key.
     * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+$
     */
    $id: string;
}

/**
 * @public
 */
export declare interface MixinLabel extends MixinId {
    /**
     * The user-facing text label of this item.
     * @localize
     */
    [LocalizableKey.Label]: string;
}

/**
 * @public
 */
export declare interface MixinOptional {
    /**
     * Whether or not the source material presents this rules item as optional.
     * @default false
     */
    optional: boolean;
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface MixinOracleContent {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    content: OracleContent;
}

/**
 * @public
 */
export declare interface MixinQuestStarter extends MixinId {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     * @localize
     */
    [LocalizableKey.QuestStarter]: string;
}

/**
 * Interface for items that have prerequisites.
 * @public
 */
export declare interface MixinRequirements {
    /**
     * Prerequisites for this item.
     */
    requires: Requirements;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export declare interface MixinRollTemplate extends MixinId {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    roll_template: RollTemplate;
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export declare interface MixinSource {
    /**
     * Information on this item's source.
     */
    source: Source;
}

/**
 * Interface for items that have a subtable-like object.
 * @deprecated Currently only used by setting truths. If you need to denote a subtable, use the `Oracle rolls` property to point to an `Oracle` in the `Oracles` property of this table's parent.
 * @public
 */
export declare interface MixinSubtable {
    subtable: OracleTableRow[];
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export declare interface MixinSuggestions {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    suggestions: Suggestions;
}

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export declare interface MixinSummary extends MixinId {
    /**
     * A user-facing markdown summary of the item. Summary is shorter than {@link MixinDescription | Description}, when they're both present.
     * @markdown
     * @localize
     */
    [LocalizableKey.Summary]: string;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export declare interface MixinTable extends MixinId {
    table: OracleTableRow[];
}

/**
 * @public
 */
export declare interface MixinTags {
    /**
     * Arbitrary strings tags that describe optional metadata that doesn't fit in other properties.
     */
    tags: string[];
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 * @public
 */
export declare interface MixinText extends MixinId {
    /**
     * The item's rules text as a markdown string.
     * @markdown
     * @localize
     */
    [LocalizableKey.Text]: string;
}

/**
 * @public
 */
export declare interface MixinTitle extends MixinId {
    title: Title;
}

/**
 * Interface representing a Starforged move.
 * @public
 */
export declare interface Move extends MixinId, MixinText, MixinDisplay, MixinSource, MixinOptional, MixinTitle, Partial<MixinSuggestions & MixinTags> {
    /**
     * @example "starforged/moves/adventure/face_danger"
     * @pattern ^(starforged|ironsworn)/moves/([a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3])/[a-z_-]+$
     */
    $id: string;
    /**
     * Note the "Canonical" key for asset-specific moves is something of a misnomer, as in the original text doesn't name them. They're provided in the same format for convenience, however.
     * @see MixinTitle
     * @example
     * ```json
     * {"Canonical": "Face Danger"}
     * ```
     */
    title: TitleCaseTitle;
    /**
     * The ID of the parent Asset of the move, if any.
     */
    asset?: Asset['$id'] | undefined;
    /**
     * The ID of the move's category.
     * @example "starforged/moves/adventure"
     */
    category: MoveCategory['$id'];
    /**
     * Whether or not the move is a Progress Move. Progress moves roll two challenge dice against a progress score.
     */
    progress_move?: boolean | undefined;
    /**
     * The ID of the move that this move is a variant of, if any.
     */
    variant_of?: Move['$id'] | undefined;
    /**
     * The move's trigger data.
     */
    trigger: MoveTrigger;
    /**
     * The IDs of any oracles directly referenced by the move, or vice versa.
     */
    oracles?: Array<OracleTable['$id']> | undefined;
    /**
     * Outcome information for the move.
     */
    outcomes?: Outcomes | undefined;
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export declare interface MoveCategory extends MixinId, MixinSource, MixinDescription, MixinDisplay, MixinOptional, MixinTitle {
    /**
     * @example "starforged/moves/adventure"
     * @pattern ^(starforged|ironsworn)/moves/[a-z_-]+$
     */
    $id: string;
    /**
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    moves: {
        [key: SnakeCaseString]: Move;
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
    miss = 0,
    weak_hit = 1,
    strong_hit = 2
}

/**
 * Describes a reroll offered by a move outcome. The vast majority of rerolls in *Ironsworn* are elective, so automatic rerolling isn't recommended.
 * @public
 */
export declare interface MoveReroll extends MixinId, Partial<MixinText> {
    /**
     *
     */
    $id: string;
    /**
     * The markdown string describing the conditions of the reroll. It should be presented to the user so that they can decide whether a reroll is appropriate.
     * @markdown
     * @localize
     */
    text?: string | undefined;
    /**
     * The dice to be rerolled.
     */
    dice: RerollType;
}

/**
 * Describes the trigger conditions of the move.
 * @public
 */
export declare interface MoveTrigger extends MixinId, Partial<MixinText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/trigger$
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
    text?: string | undefined;
    /**
     * Information on who can trigger this item. Used mainly by asset abilities, some of which can trigger from an Ally's move.
     *
     * If unspecified, assume `Ally` is `false` and `Player` is `true`.
     */
    by?: MoveTriggerBy | undefined;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    options?: Array<MoveTriggerOptionAction | MoveTriggerOptionProgress> | undefined;
}

/**
 * @public
 */
export declare interface MoveTriggerBy {
    /**
     * Whether the player character who owns this item can trigger it. Unsurprisingly, this is usually true, but there's a few exceptions: see *Starforged's* LOYALIST asset for an example.
     * @public
     */
    player: boolean;
    /**
     * Whether an Ally (a player character other than the owner) can trigger this item. This is usually false, but there's several exceptions among asset abilities.
     */
    ally: boolean;
}

/**
 * @public
 */
export declare interface MoveTriggerOptionAction extends MoveTriggerOptionBase {
    roll_type: RollType.Action;
    using: RollableStat[];
}

/**
 * @public
 */
export declare interface MoveTriggerOptionBase extends MixinId, Partial<MixinText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/trigger/options/[0-9]+$
     */
    $id: string;
    /**
     * Whether this option is an action roll or progress roll.
     */
    roll_type: RollType;
    /**
     * The method used to choose the stat or track in the `Using` array.
     */
    method: RollMethod;
    /**
     * The stat(s) or progress track(s) that may be rolled with this move trigger option.
     */
    using: Array<RollableStat | ProgressTypeStarforged | ProgressTypeClassic | LegacyTypeStarforged | LegacyTypeClassic>;
    /**
     * Defines a custom stat, if one is included in this object's `With` array.
     */
    custom_stat?: CustomStat | undefined;
}

/**
 * @public
 */
export declare interface MoveTriggerOptionProgress extends MoveTriggerOptionBase {
    roll_type: RollType.Progress;
    using: Array<ProgressTypeStarforged | ProgressTypeClassic | LegacyTypeClassic | LegacyTypeStarforged>;
}

/**
 * Describes {@link OracleTableRow} results that call for multiple rolls, most commonly "Roll twice" results.
 * @public
 */
export declare interface MultipleRolls {
    /**
     * An integer representing number of rolls to make on the parent oracle table.
     * @default 2
     */
    amount: number;
    /**
     * Whether to allow duplicate results when generating multiple rolls.
     *
     * Implicitly required by {@link MultipleRolls.make_it_worse}
     */
    allow_duplicates: boolean;
    /**
     * Whether duplicate rolls should be compounded in an Ironsworn-style "Make it worse" results.
     *
     * Typically this is accompanied by `Row.Result` text like "Roll twice more on this table. Both results occur. If they are the same result, make it worse."
     *
     * Can safely be ignored in Starforged-only implementations. Implicitly requires `Allow duplicates`.
     */
    make_it_worse: boolean;
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
export declare type OmitMetadataDeep<T, K extends string = ''> = OmitDeep<Omit<T, K>, MetadataKey>;

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
export declare interface Oracle extends Partial<MixinSummary & MixinDescription & MixinOracleContent & MixinAliases>, MixinId, MixinDisplay, MixinSource, MixinTitle {
    $id: string;
    title: TitleCaseTitle;
    /**
     * An array containing the ID of every {@link OracleSet} ancestor of this item. The array is sorted from the most recent ancestor (e.g. one level up) to the most distant.
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-/]+$
     */
    ancestors: Array<OracleSet['$id']>;
    display: OracleDisplayBase;
    /**
     * Information on the usage of this oracle: recommended number of rolls, etc.
     */
    usage?: OracleUsage | undefined;
    /**
     * Represents a single oracle table, where 'table' is defined as being something with a single roll range.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'leaf' nodes of the oracle hierarchy 'tree'.
     */
    table?: Array<OracleTableRow | RowNullStub> | undefined;
    /**
     * Oracle tables contained by this set.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    tables?: {
        [key: SnakeCaseString]: OracleTable;
    } | undefined;
    /**
     * Oracle sets contained by this set.
     *
     * This key appears only on {@link OracleSet}, and thus only on 'branch' nodes of the oracle hierarchy 'tree'.
     * @patternProperties ^[A-Z][a-z '-]+$
     */
    sets?: {
        [key: SnakeCaseString]: OracleSet;
    } | undefined;
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a localizable string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     *
     * This key appears only on {@link OracleTable}s that have a `Table`.
     */
    on_a_match?: OracleMatch | undefined;
    requires?: Requirements | undefined;
}

/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface OracleContent {
    /**
     * The part of speech of this oracle.
     */
    part_of_speech?: PartOfSpeechTag[] | undefined;
    /**
     * Any arbitrary string tags associated with this oracle.
     */
    tags?: string[] | undefined;
}

/**
 * Base interface inherited by {@link OracleSetDisplay} and {@link OracleTableDisplay}.
 * @public
 */
export declare interface OracleDisplayBase extends Display, MixinId {
    /**
     * If this oracle's `Table` should be rendered as a column of another table, it's indicated here.
     *
     * If `undefined`, this table is rendered as a standalone table.
     *
     * If this is set (and the rendering such 'embedded' columns is desired), then `Display.Table` may be safely ignored.
     */
    column_of?: OracleTable['$id'] | undefined;
    /**
     * Information on the rendering of this table when it's provided as a standalone table (as opposed to a column of another table).
     *
     * If close correspondence to the text's table rendering is desired, `Display["Column of"]` should be preferred (when present).
     */
    columns?: {
        [key: SnakeCaseString]: TableColumnRoll | TableColumnText;
    } | undefined;
    /**
     * This table is displayed as embedded in a row of another table.
     */
    embed_in?: OracleTableRow['$id'] | undefined;
}

/**
 * @public
 */
export declare interface OracleMatch extends MixinId, MixinText {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?/on_a_match$
     */
    $id: string;
}

/**
 * Represents an oracle set: a grouping that can contain both {@link OracleTable}s and other instances of {@link OracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link Oracle} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface OracleSet extends Omit<Oracle, 'table'> {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+(/[a-z_-]+)?$
     */
    $id: string;
    /**
     * A list of sample names for this category. Only used by Planet {@link OracleSet}s.
     */
    sample_names?: string[] | undefined;
    sets?: {
        [key: SnakeCaseString]: OracleSet;
    } | undefined;
    tables?: {
        [key: SnakeCaseString]: OracleTable;
    } | undefined;
    display: OracleSetDisplay;
}

/**
 * Information on displaying {@link OracleSet}, including information on its rendering in the original text.
 *
 * If an {@link OracleSet} has `Columns`, it represents a "supertable" composed of multiple roll or string columns.
 * @public
 */
export declare interface OracleSetDisplay extends Omit<OracleDisplayBase, 'column_of' | 'embed_in'> {
}

/**
 * Represents an oracle that has a `Table` composed of {@link OracleTableRow} objects. Appears only as a 'leaf' note on the oracle hierarchy 'tree'.
 *
 * @see {@link Oracle} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export declare interface OracleTable extends Omit<Oracle, 'sets' | 'tables'> {
    /**
     * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+((/[a-z_-]+)+)?$
     */
    $id: string;
    /**
     * @example
     * ```json
     * {
     *  "canonical": "Spaceborne peril",
     *  "standard": "Spaceborne peril",
     *  "short": "Peril"
     * }
     * ```
     */
    title: Title;
    display: OracleTableDisplay;
    table: Array<OracleTableRow | RowNullStub>;
    /**
     * Describes the match behaviour of this oracle's table, if any, and provides a `Text` string describing it. Only appears on a handful of move oracles like Ask the Oracle and Advance a Threat.
     */
    on_a_match?: OracleMatch | undefined;
}

/**
 * Information on displaying {@link OracleTable}, including information on its rendering in the original text.
 * @public
 */
export declare interface OracleTableDisplay extends OracleDisplayBase {
    columns: {
        [key: SnakeCaseString]: TableColumnRoll | TableColumnText;
    };
}

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export declare interface OracleTableRow<Floor extends number | null = number | null, Ceiling extends number | null = number | null> extends Partial<Nullable<MixinSummary & MixinRollTemplate & MixinSuggestions & MixinOracleContent & MixinGameObjects & MixinDisplay>> {
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
    floor: Floor;
    /**
     * The high end of the dice range for this row.
     * @minimum 1
     * @maximum 100
     * @nullable
     */
    ceiling: Ceiling;
    /**
     * The primary result text for the row, annotated in Markdown.
     * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
     * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
     * @markdown
     * @localize
     */
    result: string;
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
    summary?: string | null | undefined;
    /**
     * Additional oracle tables that should be rolled when this row is selected.
     * @pattern ^(starforged|ironsworn)/oracles/[a-z_-]+/[a-z_-/]+$
     */
    oracle_rolls?: Array<OracleTable['$id']> | undefined;
    /**
     * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
     */
    multiple_rolls?: MultipleRolls | undefined;
    /**
     * The attributes set by this row.
     */
    sets_attributes?: AttributeMap | undefined;
}

/**
 * Describes the recommended usage of this item.
 * @public
 */
export declare interface OracleUsage extends Partial<MixinRequirements & MixinSuggestions & MixinRollTemplate> {
    /**
     * Whether this table should be included in the initial oracle rolls when generating a game object. This is a somewhat arbitrary recommendation, and may not be appropriate for all implementations (or all game situations). Rather it's a reasonable starting point in *most* cases.
     *
     * That said, the game itself recommends **against** rolling all possible results at once (see "Peeling the Onion", p. 293, *Starforged*). If your goal is to implement the game 'as-written', consider how you might include some means of "progressive disclosure" of oracle results.
     *
     * May be deprecated in the future in favour of dedicated object template information.
     */
    initial?: boolean | undefined;
    suggestions?: Suggestions | undefined;
    requires?: Requirements | undefined;
    /**
     * The maximum number of rolls when using this oracle to create a game object. Assume it's 1 if not specified.
     */
    'max_rolls'?: number | undefined;
    /**
     * Whether the table's standard use is iterative.  Common examples are Feature, Opportunity, and Peril tables, which are most often used repeatedly to describe different areas of/events in a place, rather than being assigned as a description of the place as a whole.
     *
     * Mutually exclusive with `Max rolls`. If undefined, assume `false`.
     */
    repeatable?: boolean | undefined;
    /**
     * Whether multiple rolls (as in object generation, or with {@link MultipleRolls}) are allowed.
     */
    allow_duplicates?: boolean | undefined;
    /**
     * Hints which attributes are set by this table.
     */
    sets_attributes?: AttributeMap | undefined;
}

/**
 * @public
 */
export declare interface OutcomeBase<O extends MoveOutcome, RequireText extends boolean = false> extends MixinId, Partial<MixinText> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/((miss|strong_hit)(/with_a_match)?|weak_hit)$
     */
    $id: string;
    /**
     * Defines a different outcome for this result with_a_match. Its text should replace the text of this object.
     */
    with_a_match?: OutcomeBase<O> | undefined;
    /**
     * Count this roll as another roll outcome, e.g. "Count a weak hit as a miss"
     */
    count_as?: keyof typeof MoveOutcome | undefined;
    /**
     * Information on rerolls offered by this move.
     */
    reroll?: MoveReroll | undefined;
    /**
     * Whether this outcome leaves the player character in control (Starforged) or with initiative (Ironsworn) or not. If unspecified, assume that it's `true` on a Strong Hit, and `false` on a Weak Hit or Miss.
     */
    in_control?: boolean | undefined;
    text?: RequireText extends true ? string : (string | undefined);
}

/**
 * @public
 */
export declare interface OutcomeMiss extends MixinId, OutcomeBase<MoveOutcome.miss, true> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/miss$
     */
    $id: string;
    with_a_match?: OutcomeMissMatch | undefined;
    /**
     * @default false
     */
    in_control?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeMissMatch extends Omit<OutcomeMiss, 'with_a_match'> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/miss/with_a_match$
     */
    $id: string;
    /**
     * @default false
     */
    in_control?: boolean | undefined;
}

/**
 * @public
 */
export declare interface Outcomes extends MixinId {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes$
     */
    $id: string;
    strong_hit: OutcomeStrongHit;
    weak_hit: OutcomeWeakHit;
    miss: OutcomeMiss;
}

/**
 * @public
 */
export declare interface OutcomeStrongHit extends MixinId, OutcomeBase<typeof MoveOutcome['strong_hit'], true> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/strong_hit$
     */
    $id: string;
    with_a_match?: OutcomeStrongHitMatch | undefined;
    /**
     * @default true
     */
    in_control?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeStrongHitMatch extends Omit<OutcomeStrongHit, 'with_a_match'> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/strong_hit/with_a_match$
     */
    $id: string;
    /**
     * @default true
     */
    in_control?: boolean | undefined;
}

/**
 * @public
 */
export declare interface OutcomeWeakHit extends Omit<OutcomeBase<typeof MoveOutcome['weak_hit'], true>, 'with_a_match'> {
    /**
     * @pattern ^(starforged|ironsworn)/(moves/[a-z_-]+/[a-z_-]+|assets/[a-z_-]+/[a-z_-]+/[1-3]/alter/moves/[0-9]+|moves/assets/[a-z_-]+/[a-z_-]+/[1-3]/[a-z_-]+)/outcomes/weak_hit$
     */
    $id: string;
    /**
     * @default false
     */
    in_control?: boolean | undefined;
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
export declare type PartialMetadataDeep<T, K extends string = ''> = PartialDeepBy<T, K | MetadataKey>;

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
 * Describes an *Ironsworn* player character.
 * @public
 */
export declare interface Pc {
    stats: PcStats;
    assets: Asset[];
    meters: PcMeters;
    impacts: Record<string, boolean>;
}

/**
 * Standard player character condition meters. Compare to {@link PcMeterType}
 * @public
 */
export declare enum PcConditionMeterType {
    Health = "health",
    Spirit = "spirit",
    Supply = "supply"
}

/**
 * Describes the resource meters of an *Ironsworn* player character.
 * @public
 */
export declare interface PcMeters extends Record<PcMeterType, Meter> {
    [PcMeterType.Health]: ConditionMeter;
    [PcMeterType.Spirit]: ConditionMeter;
    [PcMeterType.Supply]: ConditionMeter;
    [PcMeterType.Momentum]: Meter;
}

/**
 * Standard player character resource meters. Compare to {@link PcConditionMeterType}.
 * @public
 */
export declare enum PcMeterType {
    Health = "health",
    Spirit = "spirit",
    Supply = "supply",
    Momentum = "momentum"
}

/**
 * Describes the stats of an *Ironsworn* player character.
 * @public
 */
export declare interface PcStats extends Record<Stat, number> {
    [Stat.Edge]: number;
    [Stat.Heart]: number;
    [Stat.Iron]: number;
    [Stat.Shadow]: number;
    [Stat.Wits]: number;
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
    Desert = "desert",
    Furnace = "furnace",
    Grave = "grave",
    Ice = "ice",
    Jovian = "jovian",
    Jungle = "jungle",
    Ocean = "ocean",
    Rocky = "rocky",
    Shattered = "shattered",
    Tainted = "tainted",
    Vital = "vital"
}

/**
 * @public
 */
export declare type PlanetRecord = PlaceRecord<GameObjectType.Planet, AttributeKey.Atmosphere | AttributeKey.Life | AttributeKey.PlanetaryClass>;

/**
 * Set by Oracles / Settlements / Population
 * @public
 */
export declare enum Population {
    Few = "few",
    Dozens = "dozens",
    Hundreds = "hundreds",
    Thousands = "thousands",
    TensOfThousands = "tens_of_thousands"
}

/**
 * @public
 */
export declare type PrecursorVaultRecord = PlaceRecord<GameObjectType.PrecursorVault>;

/**
 * @public
 */
export declare interface ProgressTrack extends TrackBase {
    'track_type': ProgressTypeStarforged | ProgressTypeClassic;
    /**
     * @minimum 0
     * @maximum 40
     */
    ticks: number;
    rank: ChallengeRank;
}

/**
 * Enumerates the standard types of ranked progress track in classic *Ironsworn*.
 * @public
 */
export declare enum ProgressTypeClassic {
    Combat = "combat progress",
    Vow = "vow progress",
    Journey = "journey progress",
    Delve = "delve progress",
    SceneChallenge = "scene challenge progress"
}

/**
 * Enumerates the standard types of ranked progress track in *Starforged*.
 * @public
 */
export declare enum ProgressTypeStarforged {
    Combat = "combat progress",
    Vow = "vow progress",
    Expedition = "expedition progress",
    Connection = "connection progress",
    SceneChallenge = "scene challenge progress"
}

/**
 * Enumerates the amount of progress marked for a track of a given {@link ChallengeRank}, in ticks.
 * @public
 */
export declare enum ProgressUnit {
    /**
     * 3 boxes (12 ticks)
     */
    Troublesome = 12,
    /**
     * 2 boxes (8 ticks)
     */
    Dangerous = 8,
    /**
     * 1 box (4 ticks)
     */
    Formidable = 4,
    /**
     * 2 ticks
     */
    Extreme = 2,
    /**
     * 1 tick
     */
    Epic = 1
}

/**
 * @public
 */
export declare enum Region {
    Terminus = "terminus",
    Outlands = "outlands",
    Expanse = "expanse"
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
 * Data describing an item's requirements: attribute keys, and values of those keys that satisfy the requirements.
 * @public
 */
export declare type Requirements<TK extends AttributeKey = AttributeKey> = Record<TK, Array<AttributeMaster[TK]>>;

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
    ChallengeDice = "challenge_dice",
    /**
     * The action die is rerolled.
     */
    ActionDie = "action_die",
    /**
     * The player can choose **one** challenge die to reroll.
     */
    ChallengeDie = "challenge_die",
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
    Agent = "agent",
    AI = "ai",
    Artisan = "artisan",
    Assassin = "assassin",
    BountyHunter = "hunter",
    Courier = "courier",
    Crew = "crew",
    Criminal = "criminal",
    Cultist = "cultist",
    Diplomat = "diplomat",
    Engineer = "engineer",
    Entertainer = "entertainer",
    Explorer = "explorer",
    Farmer = "farmer",
    Fugitive = "fugitive",
    Guard = "guard",
    Guide = "guide",
    Healer = "healer",
    Historian = "historian",
    Hunter = "hunter",
    Investigator = "investigator",
    Laborer = "laborer",
    Lawkeeper = "lawkeeper",
    Leader = "leader",
    Mercenary = "mercenary",
    Merchant = "merchant",
    Miner = "miner",
    Mystic = "mystic",
    Navigator = "navigator",
    Outcast = "outcast",
    Pilgrim = "pilgrim",
    Pilot = "pilot",
    Pirate = "pirate",
    Preacher = "preacher",
    Prophet = "prophet",
    Raider = "raider",
    Researcher = "researcher",
    Scavenger = "scavenger",
    Scholar = "scholar",
    Scout = "scout",
    Shipwright = "shipwright",
    Smuggler = "smuggler",
    Soldier = "soldier",
    Spacer = "spacer",
    Technician = "technician",
    Thief = "thief"
}

/**
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | CustomStat['$id'] | PcConditionMeterType | ConditionMeter['$id'];

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
    StrongHit = "strong_hit",
    /**
     * The move trigger option results in an automatic weak hit - no roll required.
     */
    WeakHit = "weak_hit"
}

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export declare interface RollTemplate extends MixinId, Partial<MixinSummary & MixinDescription> {
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
    result?: string | undefined;
    /**
     * A template string for the parent's `Summary` property, to be filled with an oracle table roll Result.
     * @localize
     */
    summary?: string | undefined;
    /**
     * A template string for the parent's `Description` property, to be filled with an oracle table roll Result.
     * @localize
     * @example
     * ```json
     * "Our computers are limited to simple digital systems and the most basic machine intelligence. This is because: {{starforged/setting_truths/artificial_intelligence/1-33/subtable}}.\n\nThe Adepts serve in place of those advanced systems. They utilize mind-altering drugs to see the universe as a dazzling lattice of data, identifying trends and predicting outcomes with uncanny accuracy. But to gain this insight they sacrifice much of themselves."
     * ```
     */
    description?: string | undefined;
}

/**
 * @public
 */
export declare enum RollType {
    Action = "action_roll",
    Progress = "progress_roll"
}

/**
 * A row stub that has no dice range assigned to it, but still contains user-facing strings that are relevant to rendering the table. Typically, their dice range appears as "--" in the book.
 * @public
 */
export declare interface RowNullStub extends Omit<Partial<OracleTableRow>, '$id'> {
    floor: null;
    ceiling: null;
    result: string;
    summary?: string | undefined | null;
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
    CommunicationAndData = "Communication and data",
    Medicine = "Medicine",
    ArtificialIntelligence = "Artificial intelligence",
    War = "War",
    Lifeforms = "Lifeforms",
    Precursors = "Precursors",
    Horrors = "Horrors"
}

/**
 * @public
 */
export declare enum SettlementInitialContact {
    AskingForHelp = "asking_for_help",
    Captured = "captured",
    Derelict = "derelict",
    Destroyed = "destroyed",
    Hostile = "hostile",
    InBattle = "in_battle",
    NeutralAutomated = "neutral_automated",
    Uncooperative = "uncooperative",
    Unresponsive = "unresponsive",
    Wary = "wary",
    Welcoming = "welcoming"
}

/**
 * @public
 */
export declare type SettlementRecord<K extends AttributeKey | never = never> = PlaceRecord<GameObjectType.Settlement, AttributeKey.Authority | AttributeKey.Population | AttributeKey.InitialContact | K> & {
    [AttributeKey.InitialContact]?: SettlementInitialContact | undefined;
};

/**
 * @pattern ^[a-z_]+$
 * @public
 */
export declare type SnakeCaseString = string;

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
    title: SourceTitle | string;
    /**
     * The author(s) of this item. For 'canonical' content, this one's usually pretty obvious 😉 However, it's included so that homebrew content can use the same interface/schema.
     * @default ['Shawn Tomkin']
     */
    authors: string[];
    /**
     * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
     * @pattern ^(0[1-9]|1[0-2])([0-2][1-9]|3[0-1])([0-9][0-9])$
     */
    date?: string | undefined;
    /**
     * The page on which the item appears most prominently in the source material (if it's in a format that uses page numbers).
     */
    page?: number | undefined;
    /**
     * The URI where the source material is available.
     * @pattern ^https?://.*$
     */
    uri?: string | undefined;
    /**
     * The URI pointing to the license which this content falls under.
     */
    license: License;
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
    'encounters': {
        [key: SnakeCaseString]: EncounterStarforged;
    };
    'setting_truths': {
        [key: SnakeCaseString]: TruthStarforged;
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
    AskingForHelp = "asking for help",
    Derelict = "derelict",
    Destroyed = "destroyed",
    Dismissive = "dismissive",
    Familiar = "familiar",
    Friendly = "friendly",
    Hostile = "hostile",
    InBattle = "in battle",
    NeutralAutomated = "neutral / automated",
    Uncooperative = "uncooperative",
    Unresponsive = "unresponsive",
    Wary = "wary"
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
export declare type StubBy<T, PartialKey extends string = '', OmitKey extends string = ''> = Omit<PartialBy<T, PartialKey>, OmitKey>;

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends string = '', OmitKey extends string = ''> = Omit<PartialExcept<T, ReqKey>, OmitKey>;

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
    game_objects?: GameObject[] | undefined;
    /**
     * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
     * @pattern ^(starforged|ironsworn)/oracles/[a-z_-]+/[a-z_-/]+$
     */
    oracle_rolls?: Array<OracleTable['$id']> | undefined;
    /**
     * Suggested move IDs.
     * @pattern ^(starforged|ironsworn)/moves/[a-z_-]+/[a-z_-]+$
     */
    moves?: Array<Move['$id']> | undefined;
    /**
     * Suggested asset IDs.
     * @pattern ^(starforged|ironsworn)/assets/[a-z_-]+/[a-z_-]+$
     */
    assets?: Array<Asset['$id']> | undefined;
    /**
     * Suggested encounter IDs.
     * @pattern ^(starforged/encounters|ironsworn/encounters/[a-z_-]+)/[a-z_-]+$
     */
    encounters?: Array<EncounterStarforged['$id']> | Array<EncounterClassic['$id']> | undefined;
    /**
     * Suggested delve site themes.
     * @pattern ^ironsworn/themes/[a-z_-]+$
     */
    themes?: Array<DelveSiteTheme['$id']> | undefined;
    /**
     * Suggested delve site domains.
     * @pattern ^ironsworn/domains/[a-z_-]+$
     */
    domains?: Array<DelveSiteDomain['$id']> | undefined;
    /**
     * Suggested Ironlands regions.
     * @pattern ^ironsworn/regions/[a-z_-]+$
     */
    regions?: Array<IronlandsRegion['$id']> | undefined;
}

/**
 * Interface with elements common to {@link TableColumnRoll} and {@link TableColumnText}.
 * @public
 */
export declare interface TableColumnBase extends MixinLabel {
    /**
     * The label or header text to use for this column.
     * @localize
     */
    label: string;
    /**
     * The ID of the {@link OracleTable} whose {@link OracleTable.table} content will be displayed in the table.
     */
    content: OracleTable['$id'];
    column_type: TableColumnType;
    /**
     * The key of each {@link OracleTableRow} in the {@link OracleTable.table}, whose string value is displayed in the rendered table.
     */
    key?: KeysWithValuesOfType<OracleTableRow, string> | undefined;
}

/**
 * @public
 */
export declare interface TableColumnRoll extends Omit<TableColumnBase, 'key'> {
    /**
     * @default "Roll"
     * @localize
     */
    label: string;
    column_type: TableColumnType.DiceRange;
}

/**
 * Describes the rendering of a table column that displays textual content (as opposed to {@link TableColumnRoll}, which displays numerical ranges).
 * @public
 */
export declare interface TableColumnText extends TableColumnBase {
    column_type: TableColumnType.String;
    /**
     * @default "Result"
     * @localize
     */
    label: string;
}

/**
 * Enumerates the type of content shown: a dice range, or a string.
 * @public
 */
export declare enum TableColumnType {
    DiceRange = "dice_range",
    String = "string"
}

/**
 * The number of ticks in a single progress box.
 * @public
 */
export declare const TICKS_PER_BOX = 4;

/**
 * @public
 */
export declare interface Title extends MixinId {
    /**
     * @pattern ^(starforged|ironsworn)/[0-9a-z_/-]+/title$
     */
    $id: string;
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
    [LocalizableKey.Canonical]: string;
    /**
     * The recommended title for most implementations.
     *
     * This is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some Ironsworn oracles (because *nobody* remembers it as "Oracle 15").
     *
     * If you need the shortest possible name, see {@link Title.short} instead.
     * @pattern ^[A-Z][a-z’ -]+$
     * @localize
     */
    [LocalizableKey.Standard]: string;
    /**
     * The shortest title for this item that remains distinct amongst its siblings.
     *
     * Unless you're very pressed for space, most UX should use {@link Title.standard} instead.
     *
     * @pattern ^[A-Z][a-z -]+$
     * @localize
     */
    [LocalizableKey.Short]: string;
}

/**
 * @pattern ^[A-Z0-9][\w\s]+$
 * @public
 */
export declare type TitleCaseString = string;

/**
 * @public
 */
export declare interface TitleCaseTitle extends Title {
    /**
     * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the|\((alternate version|by location|Scene Challenge)\))\s?)+$
     */
    [LocalizableKey.Canonical]: string;
    /**
     * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the|\((alternate version|by location|Scene Challenge)\))\s?)+$
     */
    [LocalizableKey.Standard]: string;
    /**
     * @pattern ^(?:([A-Z1-9][^\s]*|by|of|in|a|an|and|the)\s?)+$
     */
    [LocalizableKey.Short]: string;
}

/**
 * The number of boxes in a progress track.
 * @public
 */
export declare const TRACK_MAX_BOXES = 10;

/**
 * The number of ticks in a progress track.
 * @public
 */
export declare const TRACK_MAX_TICKS: number;

/**
 * Properties common to all track types.
 * @public
 */
export declare interface TrackBase {
    'track_type': ProgressTypeStarforged | LegacyTypeStarforged | ProgressTypeClassic | LegacyTypeClassic;
    /**
     * @minimum 0
     */
    ticks: number;
    /**
     * @minimum 0
     * @maximum 10
     */
    score: number;
}

/**
 * @public
 */
export declare interface TruthClassic extends MixinTitle, MixinSource {
    /**
     * @pattern ^ironsworn/setting_truths/[a-z_-]+$
     */
    $id: string;
    options: TruthOptionClassic[];
    title: TitleCaseTitle;
}

/**
 * @public
 */
export declare interface TruthOptionClassic extends MixinDescription, MixinQuestStarter {
    /**
     * @pattern ^ironsworn/setting_truths/[a-z_-]+/[1-3]$
     */
    $id: string;
}

/**
 * Interface for 'canonical' options within a {@link TruthStarforged} category.
 * @public
 */
export declare interface TruthOptionStarforged<C extends number | null = number | null, F extends number | null = number | null> extends OracleTableRow<C, F>, MixinQuestStarter, MixinDescription {
    /**
     * @pattern ^starforged/setting_truths/[a-z_-]+/(1-33|34-67|68-100)$
     */
    $id: string;
    roll_template?: RollTemplate | undefined;
    /**
     * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
     */
    subtable?: TruthOptionSubtableRowStarforged[] | undefined;
}

/**
 * @see {@link TruthOptionStarforged}, {@link TruthStarforged}
 * @public
 */
export declare interface TruthOptionSubtableRowStarforged<C extends number | null = number | null, F extends number | null = number | null> extends OracleTableRow<C, F> {
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
export declare interface TruthStarforged extends MixinId, MixinSource, MixinDisplay, Partial<MixinSuggestions>, MixinTable, MixinTitle {
    /**
     * @pattern ^starforged/truths/[a-z_-]+$
     */
    $id: string;
    /**
     * The 'canonical' options for this setting truth category.
     */
    table: TruthOptionStarforged[];
    /**
     * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
     * @markdown
     * @localize
     */
    character: string;
    display: Display;
    title: TitleCaseTitle;
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
    Interior = "interior",
    Sanctum = "sanctum"
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
    Access = "access",
    Community = "community",
    Engineering = "engineering",
    Living = "living",
    Medical = "medical",
    Operations = "operations",
    Production = "production",
    Research = "research"
}

export { }
