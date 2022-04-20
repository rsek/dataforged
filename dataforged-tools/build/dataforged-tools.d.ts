/**
 * @public
 */
export declare enum ActorType {
    Character = "Character",
    Creature = "Creature",
    Faction = "Faction"
}

/**
 * @public
 */
export declare type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;

/**
 * @public
 */
export declare type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_Moves/${number}`;

/**
 * @public
 */
export declare type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/**
 * @public
 */
export declare type AssetAbilityId = `${Gamespace}/${AssetAbilityIdBase}`;

/**
 * @public
 */
export declare type AssetAbilityIdBase = `${AssetIdBase}/Abilities/${number}`;

/**
 * @public
 */
export declare type AssetConditionMeterId = `${AssetId}/Condition_Meter`;

/**
 * @public
 */
export declare type AssetConditionMeterIdBase = `${AssetId}/Condition_Meter`;

/**
 * @public
 */
export declare type AssetConditionMeterIdYaml = AssetConditionMeterId | Replacement.AssetMeter;

/**
 * An ID that references an asset condition meter.
 * **Attached_Asset_Condition_Meter:** In *Ironsworn: Starforged* is is used by Module assets, which can attach to certain other assets (e.g. Starship, Rover); it indicates that the condition meter of the "parent" asset should be rolled. For example, a Module attached to a Starship would roll the Starship's condition meter.
 * @public
 */
export declare type AssetConditionMeterRef = "Attached_Asset_Condition_Meter" | AssetConditionMeterId;

/**
 * @public
 */
export declare type AssetId = `${Gamespace}/${AssetIdBase}`;

/**
 * @public
 */
export declare type AssetIdBase = `${AssetTypeIdBase}/${string}`;

/**
 * @public
 */
export declare type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;

/**
 * @public
 */
export declare type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;

/**
 * @public
 */
export declare type AssetTypeIdFragment = "Command_Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support_Vehicle";

/**
 * @public
 */
export declare type AssetTypeName = "Command Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support Vehicle";

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
 * @public
 */
export declare type AttributeHash<K extends AttributeKey = AttributeKey> = {
    [key in K]?: IAttributeMaster[K] | IAttributeMaster[K][] | undefined;
};

/**
 * @public
 */
export declare enum AttributeKey {
    /**
     * {@link Json.GameObjects#Atmosphere}
     */
    Atmosphere = "Atmosphere",
    /**
     * {@link Json.GameObjects#Authority}
     */
    Authority = "Authority",
    /**
     * {@link Json.GameObjects#Behavior}
     */
    Behavior = "Encountered Behavior",
    /**
     * {@link Json.GameObjects#DerelictType}
     */
    DerelictType = "Derelict Type",
    /**
     * {@link Json.GameObjects#Disposition}
     */
    Disposition = "Disposition",
    /**
     * {@link Json.GameObjects#Dominion}
     */
    Dominion = "Dominion",
    /**
     * {@link Json.GameObjects#Environment}
     */
    Environment = "Environment",
    /**
     * {@link Json.GameObjects#FactionType}
     */
    FactionType = "Faction Type",
    /**
     * {@link Json.GameObjects#FringeGroup}
     */
    FringeGroup = "Fringe Group",
    /**
     * {@link Json.GameObjects#Guild}
     */
    Guild = "Guild",
    /**
     * {@link Json.GameObjects#Influence}
     */
    Influence = "Influence",
    /**
     * {@link Json.GameObjects#InitialContact}
     */
    InitialContact = "Initial Contact",
    /**
     * {@link Json.GameObjects#Leadership}
     */
    Leadership = "Leadership",
    /**
     * {@link Json.GameObjects#Life}
     */
    Life = "Life",
    /**
     * {@link Json.GameObjects#Location}
     */
    Location = "Location",
    /**
     * {@link Json.GameObjects#LocationTheme}
     */
    LocationTheme = "Location Theme",
    /**
     * {@link Json.GameObjects#PlanetaryClass}
     */
    PlanetaryClass = "Planetary Class",
    /**
     * {@link Json.GameObjects#Population}
     */
    Population = "Population",
    /**
     * {@link Json.GameObjects#Region}
     */
    Region = "Region",
    /**
     * {@link Json.GameObjects#Role}
     */
    Role = "Role",
    /**
     * {@link Json.GameObjects#CreatureScale}
     */
    CreatureScale = "Creature Scale",
    /**
     * {@link Json.GameObjects#Zone}
     */
    Zone = "Zone"
}

/**
 * @public
 */
export declare type AttributeValue<K extends AttributeKey = AttributeKey> = IAttributeMaster[K];

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
 * @beta
 */
export declare enum Biome {
}

/**
 * Enumerates challenge ranks.
 * @seePage 39
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
export declare type ConditionMeterId = AssetConditionMeterId;

/**
 * Standard player character condition meters.
 * @public
 */
export declare enum ConditionMeterName {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}

/**
 * @public
 */
export declare type ConditionMeterType = ConditionMeterName | AssetConditionMeterId;

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
export declare type CustomStatId = `${string}/Custom_stat` | Replacement.CustomStat;

/**
 * @public
 */
export declare type CustomStatOptionId = `${CustomStatId}/${string}`;

/**
 * @public
 */
export declare interface DataforgedJsonRoot {
    assets: IAssetType[];
    encounters: IEncounterStarforged[];
    moves: IMoveCategory[];
    oracles: IOracleCategory[];
    truths: ISettingTruth[];
}

/**
 * @public
 */
export declare const dataIronsworn: {
    assets: IAssetType[];
    encounters: IEncounterNatureInfo[];
    moves: IMoveCategory[];
    oracles: IOracleCategory[];
};

/**
 * @public
 */
export declare const dataStarforged: {
    assets: IAssetType[];
    encounters: IEncounterStarforged[];
    moves: IMoveCategory[];
    oracles: IOracleCategory[];
    truths: ISettingTruth[];
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
 * @public
 */
export declare type EncounterIdIronsworn = `${Gamespace.Ironsworn}/${EncounterIdIronswornBase}`;

/**
 * @public
 */
export declare type EncounterIdIronswornBase = `${EncounterNatureIdBase}/${string}`;

/**
 * @public
 */
export declare type EncounterIdStarforged = `${Gamespace.Starforged}/${EncounterIdStarforgedBase}`;

/**
 * @public
 */
export declare type EncounterIdStarforgedBase = `Encounters/${string}`;

/**
 * @public
 */
export declare type EncounterNatureId = `${Gamespace.Ironsworn}/${EncounterNatureIdBase}`;

/**
 * @public
 */
export declare type EncounterNatureIdBase = `Encounters/${EncounterNatureIronsworn}`;

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
 * @public
 */
export declare type EncounterVariantId = `${EncounterIdStarforged}/${string}`;

/**
 * @public
 */
export declare type EnumLike = Record<string | number, string>;

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
export declare type GameObjectType = (ActorType | PlaceType);

/**
 * Some might say that "Gamespace" is a terrible pun. To them, I reply: you'll never take me alive.
 * @public
 */
export declare enum Gamespace {
    Starforged = "Starforged",
    Ironsworn = "Ironsworn"
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
 * Describes an Action Roll made as part of a {@link IMove | move}.
 * @see {@link IMoveTrigger} {@link IMoveTriggerOption}
 * @public
 */
export declare interface IActionRoll {
    /**
     * Make a single action roll with a stat or condition meter.
     */
    Stat?: RollableStat | undefined;
    /**
     * Make a roll that uses a custom value in place of of stat or condition meter.
     */
    "Custom stat"?: ICustomStat | undefined;
    /**
     * Make a roll for *every* stat in the array.
     */
    "All of"?: RollableStat[] | undefined;
    /**
     * Make a roll for the highest stat in the array.
     */
    "Best of"?: RollableStat[] | undefined;
    /**
     * Make a roll for the lowest stat in the array.
     */
    "Worst of"?: RollableStat[] | undefined;
}

/**
 * @public
 */
export declare interface IAlterMove extends Omit<Partial<IMove>, "$id">, IHasId<AlterMoveId> {
    /**
     * The `$id`s of the move(s) to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply.
     */
    Moves: IMove["$id"][] | null;
    /**
     * The trigger information to be added to the altered move.
     */
    Trigger?: IMoveTrigger | undefined;
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
 * @public
 */
export declare interface IAsset extends IHasId<AssetId>, IHasName, IHasDisplay, IHasSource, Partial<IHasAliases> {
    /**
     * @example "Assets/Path/Bounty_Hunter"
     */
    $id: AssetId;
    /**
     * The asset's name - the title printed on the card.
     * @example "Bounty Hunter"
     */
    Name: string;
    /**
     * The ID of the asset's parent AssetType
     * @example "Assets/Path"
     */
    "Asset Type": IAssetType["$id"];
    /**
     * Details on what attachments (other assets) are accepted by this asset.
     */
    Attachments?: IAssetAttachment | undefined;
    /**
     * Data describing the Input controls that should be embedded in the card. Inputs embedded in specific asset abilities appear as keys of the corresponding ability object, instead.
     */
    Inputs?: IInput<InputType>[] | undefined;
    /**
     * An optional markdown string representing the requirement text that appears at the top of some asset cards.
     * @markdown
     * @example "If you wear your finely crafted set of personal armor..."
     */
    Requirement?: string | undefined;
    /**
     * The asset's abilities.
     */
    Abilities: Tuple<IAssetAbility, 3>;
    /**
     * Information on this asset's condition meter, if any.
     */
    "Condition Meter"?: IConditionMeter | undefined;
}

/**
 * Represents one of an asset's three abilities.
 * @public
 */
export declare interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
    /**
     * New moves added by this asset ability.
     */
    Moves?: IMove[] | undefined;
    /**
     * User inputs (text, clocks, etc) associated with this asset ability.
     */
    Inputs?: IInput<InputType>[] | undefined;
    /**
     * Information on how this ability alters moves when enabled. Currently, it only details additional stat triggers added by the asset ability, but it may expand in the future.
     */
    "Alter Moves"?: IAlterMove[] | undefined;
    /**
     * Information on how this ability alters its parent asset when enabled.
     */
    "Alter Properties"?: Partial<IAsset> | undefined;
    /**
     * Whether the asset ability is enabled or not. In most cases, the first asset ability defaults to 'true' and the others to 'false'. If none of an asset's abilities are set to 'true', the player can pick which the ability they start with when purchasing the asset.
     */
    Enabled?: boolean | undefined;
}

/**
 * Details which assets are valid attachments. The most prominent example in *Ironsworn: Starforged* is the STARSHIP asset (`Assets/Command_Vehicle/Starship`); Rover (`Assets/Support_Vehicle/Rover`) also has an elective ability that adds this property.
 * @public
 */
export declare interface IAssetAttachment {
    /**
     * The type of asset that this asset accepts as attachments.
     */
    "Asset Types": IAssetType["$id"][];
    /**
     * The maximum number of attached assets accepted by this asset. If undefined or null, there is no maximum.
     */
    "Max": number | null;
}

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 * @public
 */
export declare interface IAssetType extends IHasName, IHasId<AssetTypeId>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases> {
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    Name: AssetTypeName;
}

/**
 * @public
 */
export declare interface IAttribute<T extends AttributeKey = AttributeKey> {
    Key: T;
    Value?: AttributeValue<this["Key"]> | undefined;
}

/**
 * @public
 */
export declare interface IAttributeChoices<T extends AttributeKey = AttributeKey> {
    Key: T;
    Values?: NonNullable<IAttribute<T>["Value"]>[] | undefined;
}

/**
 * @public
 */
export declare interface IAttributeMaster {
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
 * Interface representing a condition meter such as Health, Spirit, Supply, or Integrity.
 * @public
 */
export declare interface IConditionMeter extends IMeterBase {
    $id: ConditionMeterId;
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
}

/**
 * @public
 */
export declare interface ICustomStat extends IHasId<CustomStatId>, IHasName {
    Options: ICustomStatOption[];
}

/**
 * @public
 */
export declare interface ICustomStatOption extends IHasId<CustomStatOptionId>, IHasName {
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
 * @public
 */
export declare type IdBase = `${AssetAbilityIdBase | AssetIdBase}/Inputs/${string}`;

/**
 * Interface for data relevant to an item's display/rendering.
 *
 * @public
 */
export declare interface IDisplay {
    /**
     * The title of this item as it appears printed in the rulebook. Intended for use as the item's header, label, etc.
     */
    Title: string;
    /**
     * A URL pointing to a single SVG icon.
     */
    Icon?: ImageUrl<Vector> | undefined;
    /**
     * An array of URLs pointing to one or more WEBP images.
     */
    Images?: ImageUrl<Raster>[] | undefined;
    /**
     * A hex color associated with this item, for use as e.g. an accent color in its display.
     */
    Color?: string | undefined;
}

/**
 * Provides information on how a specific oracle table is rendered in the source text.
 * @public
 */
export declare interface IDisplayTable {
    "Result columns": ITextColumn[];
    "Roll columns": ITableColumnBase[];
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
export declare interface IEncounterBase extends IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterIdStarforged | EncounterIdIronsworn>, Partial<IHasQuestStarter & IHasSummary> {
    /**
     * @example "Starforged/Encounters/Chiton"
     */
    $id: EncounterIdStarforged | EncounterIdIronsworn;
    /**
     * @example "Chiton"
     */
    Name: string;
    /**
     * @example "Monster"
     */
    Nature: EncounterNatureStarforged | EncounterNatureIronsworn;
    /**
     * @example "Insectoid horde"
     * @markdown
     */
    Summary?: string | undefined;
    Tags?: EncounterTags[] | undefined;
    Rank: ChallengeRank;
    Features?: string[] | undefined;
    Drives?: string[] | undefined;
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
    $id: EncounterIdIronsworn;
    Nature: EncounterNatureIronsworn;
    "Your Truth"?: string | undefined;
}

/**
 * Represents the metadata describing an *Ironsworn* encounter's nature; used as a category to contain all Encounters of that type.
 * @public
 */
export declare interface IEncounterNatureInfo extends IHasDescription, IHasSource, IHasName, IHasId<EncounterNatureId>, IHasDisplay, IHasSummary {
    Name: EncounterNatureIronsworn;
    Encounters: IEncounterIronsworn[];
}

/**
 * Represents an *Ironsworn: Starforged* Encounter entry.
 * @public
 */
export declare interface IEncounterStarforged extends IEncounter {
    $id: EncounterIdStarforged;
    Nature: EncounterNatureStarforged;
    Summary: string;
    Variants: IEncounterVariant[];
}

/**
 * Represents a variant encounter 'stubs' included with a parent encounter in *Ironsworn: Starforged*.
 * @public
 */
export declare interface IEncounterVariant extends StubBy<IEncounterStarforged, never, "Features" | "Drives" | "Tactics" | "Variants" | "Summary" | "Your Truth" | "Quest Starter"> {
    $id: EncounterVariantId;
    "Variant of": EncounterIdStarforged;
}

/**
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
export declare interface IHasDisplay<T extends Partial<IDisplay> = IDisplay> {
    /**
     * Data relevant to this item's display/rendering.
     */
    Display: T;
}

/**
 * Interface for items that have associated game objects.
 * @public
 */
export declare interface IHasGameObjects<T extends IGameObject = IGameObject> {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    "Game objects": T[];
}

/**
 * For elements with unique string IDs.
 * @public
 */
export declare interface IHasId<T extends string> {
    /**
     * The item's unique string ID.
     */
    $id: T;
}

/**
 * Interface for items with a Name key.
 * @public
 */
export declare interface IHasName {
    /**
     * The item's internal name. Should be unique among its sibling elements, as this key is often used (along with the object's ancestors) to generate its $id.
     * If the item has Display.Title, that should be preferred for most user-facing labels.
     */
    Name: string;
}

/**
 * Interface for items with metadata that describes an oracle's semantic or lexical content.
 * @public
 */
export declare interface IHasOracleContent<T extends Partial<IOracleContent> = IOracleContent> {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    Content: T;
}

/**
 * @public
 */
export declare interface IHasOracleUsage<T extends Partial<IOracleUsage> = IOracleUsage> {
    /**
     */
    Usage: T;
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
export declare interface IHasRequirements<T extends Partial<IRequirements> = IRequirements> {
    /**
     * Prerequisites for this item.
     */
    Requires: T;
}

/**
 * Interface for items that include roll string templates.
 * @public
 */
export declare interface IHasRollTemplate<T extends string> {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    "Roll template": RollTemplate<T>;
}

/**
 * Interface for items with sourcing information.
 * @public
 */
export declare interface IHasSource<T extends ISource = ISource> {
    /**
     * Information on this item's source.
     */
    Source: T;
}

/**
 * Interface for items that have a subtable-like object.
 * @public
 */
export declare interface IHasSubtable<T extends IRow = IRow> {
    Subtable: T[];
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 * @public
 */
export declare interface IHasSuggestions<T extends ISuggestions = ISuggestions> {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    Suggestions: T;
}

/**
 * Interface for items with a user-facing markdown summary.
 * @public
 */
export declare interface IHasSummary {
    /**
     * A user-facing markdown summary of the item.
     * @markdown
     */
    Summary: string;
}

/**
 * Interface for items that have a table-like object.
 * @public
 */
export declare interface IHasTable<T extends IRow = IRow> {
    Table: T[];
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
export declare interface IInput<T extends InputType> extends IHasId<InputId>, IHasName {
    "Input Type": T;
    /**
     * Whether the input's value is expected to change over the course of a campaign. For example, name fields are typically `false`, while something like a clock or tally would be `true`.
     *
     * It's a good idea to make everything editable regardless, but this property might inform whether your UI presents that functionality "front and center" or as a secondary interaction (via long press, right click, etc);
     */
    Adjustable: boolean;
}

/**
 * An input representing an *Ironsworn: Starforged* clock.
 * @seePage 239
 * @see {@link InputType.Clock}
 * @public
 */
export declare interface IInputClock extends IInput<InputType.Clock> {
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
export declare interface IInputNumber extends IInput<InputType.Number> {
    Min: number;
    Max: number | null;
    Step: 1;
    "Value": number;
}

/**
 * An input where the user selects a single option from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @typeParam K - The name(s) of the key(s) set by this item's options.
 * @typeParam V - The type(s) of the value(s) set by this item's options.
 * @example
 * ```
 * {
 "Name": "Material",
 "Input Type": "Select",
 "Attributes": [
 { "Key": "Stat", "Type": "Stat" },
 { "Key": "Condition Meter", "Type": "Condition Meter" }
 ],
 "Options": [
 {
 "Name": "Thunderwood",
 "Sets": [
 { "Key": "Stat", "Value": "Edge" },
 { "Key": "Condition Meter", "Value": "Health" }
 ]
 }
 ]
 }
 * ```
 * @public
 */
export declare interface IInputSelect<K extends string, V extends InputSelectOptionType> extends IInput<InputType.Select> {
    /**
     * Hints which attribute(s) set by this dropdown's options.
     */
    Sets: IInputSelectAttributeDefinition<K, V>[];
    Options: IInputSelectOption<K, V>[];
}

/**
 * Provides hints for the keys and typing of an {@link IInputSelect}'s child {@link IInputSelectOption}s.
 * @typeParam K - The name(s) of the key(s) set by this item's options.
 * @typeParam V - The type(s) of the value(s) set by this item's options.
 * @public
 */
export declare interface IInputSelectAttributeDefinition<K extends string, V extends InputSelectOptionType> extends IHasId<string> {
    Key: K;
    Type: V;
}

/**
 * Represents an option in an {@link IInputSelect}.
 * @public
 */
export declare interface IInputSelectOption<K extends string, V extends InputSelectOptionType> extends IHasId<InputSelectOptionId>, IHasName {
    /**
     * A array describing what attribute keys should be set to when this option is active. *All* items in the array should be set in this manner.
     */
    Set: IInputSelectOptionSetter<K, V>[];
}

/**
 * @public
 */
export declare interface IInputSelectOptionSetter<K extends string, V extends InputSelectOptionType> extends IHasId<InputSelectOptionSetterId> {
    Key: K;
    Value: V extends InputSelectOptionType.Stat ? Stat : V extends InputSelectOptionType.ConditionMeter ? ConditionMeterName : V extends InputSelectOptionType.Number ? number : string;
}

/**
 * A text input.
 * Suggested rendering: a single-line text input, similar to `<input type='text'>` in HTML.
 * @see {@link InputType.Text}
 * @public
 */
export declare interface IInputText extends IInput<InputType.Text> {
}

/**
 * @public
 */
export declare type ImageType = Vector | Raster;

/**
 * @public
 */
export declare type ImageUrl<T extends ImageType> = `${Url}.${T}`;

/**
 * Interface representing a Meter.
 * @public
 */
export declare interface IMeterBase extends IHasId<string>, IHasName {
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
export declare interface IMove extends IHasId<MoveId>, IHasName, IHasText, IHasDisplay, IHasSource, Partial<IHasSuggestions> {
    /**
     * @example "Moves/Adventure/Face_Danger"
     */
    $id: MoveId;
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
     * @example "Moves/Adventure"
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
     * The IDs of any oracles *directly* referenced by the move.
     */
    Oracles?: IOracle["$id"][] | undefined;
    /**
     * Outcome information for the move.
     */
    Outcomes?: IMoveOutcomes | undefined;
}

/**
 * @public
 */
export declare interface IMoveActionRoll extends IMoveTriggerOption<RollType.Action> {
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 * @public
 */
export declare interface IMoveCategory extends IHasId<MoveCategoryId>, IHasName, IHasSource, IHasDescription, IHasDisplay<IDisplay> {
    /**
     * @example "Moves/Adventure"
     */
    $id: MoveCategoryId;
    /**
     * @example "Adventure"
     */
    Name: MoveCategoryName;
    Moves: IMove[];
}

/**
 * @public
 */
export declare interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
    "With a Match"?: IMoveOutcome | undefined;
}

/**
 * @public
 */
export declare interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}

/**
 * @public
 */
export declare interface IMoveProgressRoll extends Omit<IMoveTriggerOption<RollType.Progress>, "Custom stat"> {
}

/**
 * Describes the trigger conditions of the move.
 * @public
 */
export declare interface IMoveTrigger extends IHasId<MoveTriggerId>, IHasText {
    /**
     * @example `Moves/Adventure/Face_Danger/Trigger`
     */
    $id: MoveTriggerId;
    /**
     * A markdown string containing the primary trigger text for this move.
     * @example `Moves/Adventure/Face_Danger/Trigger.Text`: "When you attempt something risky or react to an imminent threat..."
     */
    Text: string;
    /**
     * Information on any action rolls or progress rolls that are made when this move is triggered (which may describe a specific subset of the primary trigger in their own `Text` property).
     *
     * If there's no action rolls or progress rolls attached to this move, this is `undefined`.
     */
    "Options"?: IMoveTriggerOption<RollType>[] | undefined;
}

/**
 * @public
 */
export declare interface IMoveTriggerOption<T extends RollType> extends IHasId<MoveRollId>, Partial<IHasText> {
    /**
     * Whether this option is an action roll or progress roll.
     */
    "Roll type": T;
    /**
     * The method used to choose the stat or track in the `Using` array.
     *
     * Any = the user can choose any of the options; if there's only one option, use this method.
     *
     * Highest = roll with the highest value in the array.
     *
     * Lowest = roll with the lowest value in the array.
     *
     * All = make one roll with *every* value in the array.
     */
    Method: RollMethod;
    /**
     * The stat(s) or progress track(s) that may be rolled with this move trigger option.
     */
    Using: T extends RollType.Action ? RollableStat[] : T extends RollType.Progress ? ProgressType[] : (RollableStat[] | ProgressType[]);
    /**
     * Defines a custom stat, if one is included in this object's `With` array.
     */
    "Custom stat"?: ICustomStat | undefined;
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
 * @public
 */
export declare type InputId = `${Gamespace}/${IdBase}`;

/**
 * @see {@link IInputSelectOption}
 * @public
 */
export declare type InputSelectOptionId = `${Gamespace}/${InputSelectOptionIdBase}`;

/**
 * @see {@link IInputSelectOption}
 * @public
 */
export declare type InputSelectOptionIdBase = `${IdBase}/Options/${string}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export declare type InputSelectOptionSetterId = `${Gamespace}/${InputSelectOptionSetterIdBase}`;

/**
 * @see {@link IInputSelectOptionSetter}
 * @public
 */
export declare type InputSelectOptionSetterIdBase = `${InputSelectOptionIdBase}/${string}`;

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
     * @see {@link ConditionMeterName}
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
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * The distinction between {@link IOracleCategory} and IOracles that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export declare interface IOracle extends IOracleBase, IHasName {
    $id: OracleTableId;
    Display: ITableDisplay;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;
}

/**
 * Interface with elements common to various Oracle-related interfaces and classes.
 * @public
 */
export declare interface IOracleBase extends Partial<IHasAliases & IHasDescription & IHasOracleContent<IOracleContent> & IHasOracleUsage<IOracleUsage>>, IHasId<string>, IHasDisplay<IDisplay>, IHasSource {
    /**
     * The ID of the most recent OracleCategory ancestor of this item, if any.
     */
    Category?: IOracleCategory["$id"] | undefined;
    /**
     * Oracle objects contained by this object.
     */
    Oracles?: IOracle[] | undefined;
    /**
     * The ID of the most recent Oracle ancestor of this item, if any.
     */
    "Member of"?: IOracle["$id"] | undefined;
}

/**
 * Represents an oracle category: a grouping that can contain both Oracles and other Oracle categories, but doesn't have its own `Table` key.
 *
 * The distinction between this and {@link IOracle}s that lack their own `Table` is a little arbitrary (and may be revised in the future).
 * @public
 */
export declare interface IOracleCategory extends IOracleBase, IHasName {
    $id: OracleCategoryId;
    Name: OracleCategoryName;
    Category?: IOracleCategory["$id"] | undefined;
    Categories?: IOracleCategory[] | undefined;
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
export declare interface IOracleUsage extends Partial<IHasRequirements & IHasSuggestions> {
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
     * @beta
     */
    "Sets attributes"?: IAttributeChoices[] | undefined;
}

/**
 * @public
 */
export declare interface IProgressRoll {
    Track?: ProgressType | undefined;
    "All of"?: ProgressType[] | undefined;
    "Best of"?: ProgressType[] | undefined;
    "Worst of"?: ProgressType[] | undefined;
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

/**
 * Interface representing a single row in an oracle table.
 * @public
 */
export declare interface IRow extends Partial<IHasSummary & IHasRollTemplate<"Result" | "Summary" | "Description"> & IHasSuggestions & IHasDisplay<IRowDisplay> & IHasOracleContent & IHasSubtable & IHasGameObjects> {
    $id?: string | null;
    /**
     * The low end of the dice range for this row.
     */
    Floor: number | null;
    /**
     * The high end of the dice range for this row.
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
     * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
     */
    Summary?: string | undefined;
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
    Attributes?: IAttributeChoices<AttributeKey>[] | undefined;
}

/**
 * Display properties for a single row in an oracle table.
 * @public
 */
export declare type IRowDisplay = Omit<IDisplay, "Title">;

/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export declare interface ISettingTruth extends IHasId<string>, IHasName, IHasSource, Partial<IHasSuggestions<ISuggestions>>, IHasTable<ISettingTruthOption> {
    Name: SettingTruthName;
    /**
     * The 'canonical' options for this setting truth category.
     */
    Table: ISettingTruthOption[];
    /**
     * A Markdown version of the text that appears at the end of each Truth entry; it offers suggestions on the character's assets and background.
     * @markdown
     */
    Character: string;
}

/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 * @public
 */
export declare interface ISettingTruthOption extends Omit<IRow, "$id" | "Summary">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}

/**
 * Interface representing data on the game's source.
 * @public
 */
export declare interface ISource {
    /**
     * The title of the source.
     */
    Title: SourceTitle;
    /**
     * The 6-number date string formatted as `MMDDYY`. Relevant only during Starforged development; it will be deprecated once the game is released.
     */
    Date?: string | undefined;
    /**
     * The page on which the item appears most prominently.
     */
    Page?: number | undefined;
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
 * Information on displaying Oracles, including their table(s) are rendered in the original text. Useful if you want your project's rendering of the tables to correspond with the book.
 * @public
 */
export declare interface ITableDisplay extends IDisplay {
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
    Table: IDisplayTable;
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
    Key: KeysWithValuesOfType<IRow, string>;
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
    [P in keyof Required<T> as Required<T>[P] extends V ? P : never]: P;
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
export declare enum LegacyType {
    Quests = "Quests",
    Bonds = "Bonds",
    Discoveries = "Discoveries"
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
export declare type MatchIdFragment = "With_a_Match";

/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export declare enum MeterAlias {
    CompanionHealth = "Companion Health",
    VehicleIntegrity = "Vehicle Integrity",
    CommandVehicleIntegrity = "Command Vehicle Integrity",
    SupportVehicleIntegrity = "Support Vehicle Integrity",
    IncidentalVehicleIntegrity = "Incidental Vehicle Integrity"
}

/**
 * Conditions (such as impacts) that can apply to asset cards with condition meters. These are typically presented as tick boxes on the asset card.
 * @public
 */
export declare enum MeterCondition {
    /**
     * Battered may be marked when your vehicle is at 0 integrity and you fail to Withstand Damage. The vehicle is barely holding together.
     * @seePage 51
     */
    Battered = "Battered",
    /**
     * Cursed may be marked when your command vehicle (STARSHIP asset) is at 0 integrity and you fail to Withstand Damage. This is a permanent impact. Your ship will never be quite right again.
     * @seePage 51
     */
    Cursed = "Cursed",
    /**
     * When your companion’s health is at 0 and you score a miss, they are out of action. You cannot leverage their support until they gain at least +1 health. Envision what this means in the fiction of your scene.
     * @seePage 204
     */
    OutOfAction = "Out of Action"
}

/**
 * @public
 */
export declare type MeterType = "Momentum" | ConditionMeterName;

/**
 * @public
 */
export declare type MoveCategoryId = `${Gamespace}/${MoveCategoryIdBase}`;

/**
 * @public
 */
export declare type MoveCategoryIdBase = `Moves/${MoveCategoryName | "Assets"}`;

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
export declare type MoveCategoryTitle = `${MoveCategoryName} Moves`;

/**
 * @public
 */
export declare type MoveId = `${Gamespace}/${MoveIdBase}`;

/**
 * @public
 */
export declare type MoveIdBase = `Moves/${MoveCategoryName | "Assets"}/${string}` | `Moves/${AssetAbilityIdBase}/${string}`;

/**
 * Placeholder Move ID indicating that *any* move is valid. For example, an {@link IAlterMove} with this as a `Move` key can be applied to any move that meets its other requirements.
 * @public
 */
export declare type MoveIdGeneric = `${Gamespace}/${MoveIdGenericBase}`;

/**
 * @public
 */
export declare type MoveIdGenericBase = "Moves/*";

/**
 * @public
 */
export declare type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;

/**
 * @public
 */
export declare type MoveOutcomesId = `${MoveId}/Outcomes`;

/**
 * @public
 */
export declare type MoveRollId = `${string}/Options/${number}`;

/**
 * @public
 */
export declare type MoveTriggerId = `${MoveId}/Trigger`;

/**
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
 * @public
 */
export declare enum OracleCategoryFlatFragment {
    CharacterCreation = "Character_Creation",
    Characters = "Characters",
    Core = "Core",
    Creatures = "Creatures",
    Factions = "Factions",
    Misc = "Misc",
    Moves = "Moves",
    Space = "Space",
    Starships = "Starships"
}

/**
 * @public
 */
export declare enum OracleCategoryFlatName {
    CharacterCreation = "Character Creation",
    Characters = "Characters",
    Core = "Core",
    Creatures = "Creatures",
    Factions = "Factions",
    Misc = "Misc",
    Moves = "Moves",
    Space = "Space",
    Starships = "Starships"
}

/**
 * @public
 */
export declare type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;

/**
 * @public
 */
export declare type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;

/**
 * @public
 */
export declare enum OracleCategoryJaggedFragment {
    Derelicts = "Derelicts",
    LocationThemes = "Location_Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}

/**
 * @public
 */
export declare type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;

/**
 * @public
 */
export declare enum OracleCategoryJaggedName {
    Derelicts = "Derelicts",
    LocationThemes = "Location Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}

/**
 * @public
 */
export declare type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

/**
 * @public
 */
export declare type OracleRoot = `${Gamespace}/Oracles`;

/**
 * @public
 */
export declare type OracleSubcategoryId = `${OracleRoot}/${OracleSubcategoryPath}`;

/**
 * @public
 */
export declare type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

/**
 * @public
 */
export declare type OracleSubcategoryPath = `Derelicts/${Zone}` | `Location_Themes/${LocationTheme}` | `Planets/${PlanetaryClass}` | `Vaults/${VaultZone}`;

/**
 * An ID valid for a subtable embedded in a table Row.
 * @public
 */
export declare type OracleSubtableId = `${SettingTruthId | OracleTableId}/${number}-${number}/Subtable` | `${SettingTruthId | OracleTableId}/${number}/Subtable`;

/**
 * @public
 */
export declare type OracleTableId = `${OracleCategoryId}/${string}`;

/**
 * @public
 */
export declare type OracleTableRowId = `${OracleTableId}/${RollRange}`;

/**
 * Makes a type where K is nullable.
 * @public
 */
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make all properties of T nullable except for K, which is required.
 * @public
 */
export declare type PartialExcept<T, K extends keyof T> = RequireKey<{
    [P in keyof T]?: T[P];
}, K>;

/**
 * @public
 */
export declare type PartOfSpeechTag = "noun" | "common noun" | "fragment" | "adjective" | "proper noun" | "verb" | "plural" | "name" | "proper noun fragment" | "sentences" | "compound noun" | "possessive case";

/**
 * @public
 */
export declare enum PlaceType {
    Derelict = "Derelict",
    DerelictZone = "Derelict Zone",
    Starship = "Starship",
    Settlement = "Settlement",
    Planet = "Planet",
    PrecursorVault = "Precursor Vault"
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
export declare enum ProgressTrackType {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge"
}

/**
 * @public
 */
export declare type ProgressType = LegacyType | ProgressTrackType;

/**
 * @public
 */
export declare type Protocol = "http" | "https";

/**
 * @public
 */
export declare type Raster = "webp";

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
export declare type RequireKey<T, K extends keyof T> = T & {
    [P in K]-?: NonNullable<T[P]>;
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
 * Standard player character stats or condition meters that can be used as +stat in an action roll.
 * @public
 */
export declare type RollableStat = Stat | ConditionMeterType | CustomStatId;

/**
 * @public
 */
export declare enum RollMethod {
    All = "All",
    Highest = "Highest",
    Lowest = "Lowest",
    Any = "Any"
}

/**
 * @public
 */
export declare type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";

/**
 * @public
 */
export declare type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";

/**
 * @public
 */
export declare type RollRange = number | `${number}-${number}`;

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 * @public
 */
export declare type RollTemplate<T extends string> = {
    [P in T | never]?: RollTemplateString | undefined;
};

/**
 * Represents a template string to be filled with results from specific oracle tables.
 * @public
 */
export declare type RollTemplateString = `${string | ""}\${{${SettingTruthId | OracleTableId | OracleSubtableId}}}${string | ""}`;

/**
 * @public
 */
export declare enum RollType {
    Action = "Action roll",
    Progress = "Progress roll"
}

/**
 * A valid ID for a SettingTruth object.
 * @see {@link ISettingTruth}
 * @public
 */
export declare type SettingTruthId = `${Gamespace}/Setting_Truths/${SettingTruthIdFragment}`;

/**
 * @public
 */
export declare enum SettingTruthIdFragment {
    Cataclysm = "Cataclysm",
    Exodus = "Exodus",
    Communities = "Communities",
    Iron = "Iron",
    Laws = "Laws",
    Religion = "Religion",
    Magic = "Magic",
    CommunicationAndData = "Communication_and_Data",
    Medicine = "Medicine",
    ArtificialIntelligence = "Artificial_Intelligence",
    War = "War",
    Lifeforms = "Lifeforms",
    Precursors = "Precursors",
    Horrors = "Horrors"
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
 * A valid setting truth option ID.
 * @public
 */
export declare type SettingTruthOptionId = `${SettingTruthId}/${number}-${number}`;

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
 * Enumerates valid sourcebook titles.
 * @public
 */
export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    Ironsworn = "Ironsworn Rulebook",
    IronswornAssets = "Ironsworn Assets",
    IronswornDelve = "Ironsworn: Delve",
    IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)"
}

/**
 * Enumerates valid source URLs.
 * @public
 */
export declare enum SourceUrl {
    IronswornRulebook = "https://shawn-tomkin.itch.io/ironsworn",
    IronswornAssets = "https://shawn-tomkin.itch.io/ironsworn",
    IronswornDelve = "https://shawn-tomkin.itch.io/ironsworn-delve",
    IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view"
}

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
export declare type StubBy<T, PartialKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;

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
export declare type Url = `${Protocol}://${string}`;

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
export declare type Vector = "svg";

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
