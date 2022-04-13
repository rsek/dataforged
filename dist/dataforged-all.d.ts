export declare enum ActorType {
    Character = "Character",
    Creature = "Creature",
    Faction = "Faction"
}

export declare type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;

export declare type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_${MoveIdBase | MoveIdGenericBase}`;

export declare type AssetAbilityId = `${Gamespace}/${AssetAbilityIdBase}`;

export declare type AssetAbilityIdBase = `${AssetIdBase}/Abilities/${number}`;

export declare type AssetConditionMeterId = `${AssetId}/Condition_Meter`;

export declare type AssetConditionMeterIdBase = `${AssetId}/Condition_Meter`;

export declare type AssetConditionMeterIdYaml = AssetConditionMeterId | "${{Asset_Condition_Meter}}";

/**
 * An ID that references an asset condition meter.
 * **Attached_Asset_Condition_Meter:** In *Ironsworn: Starforged* is is used by Module assets, which can attach to certain other assets (e.g. Starship, Rover); it indicates that the condition meter of the "parent" asset should be rolled. For example, a Module attached to a Starship would roll the Starship's condition meter.
 */
export declare type AssetConditionMeterRef = "Attached_Asset_Condition_Meter" | AssetConditionMeterId;

export declare type AssetId = `${Gamespace}/${AssetIdBase}`;

export declare type AssetIdBase = `${AssetTypeIdBase}/${string}`;

export declare type AssetTypeId = `${Gamespace}/${AssetTypeIdBase}`;

export declare type AssetTypeIdBase = `Assets/${AssetTypeIdFragment}`;

export declare type AssetTypeIdFragment = "Command_Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support_Vehicle";

export declare type AssetTypeName = "Command Vehicle" | "Companion" | "Deed" | "Module" | "Path" | "Support Vehicle";

/**
 * Set by Oracles / Planets / * / Atmosphere
 */
export declare enum Atmosphere {
    NoneThin = "None / Thin",
    Toxic = "Toxic",
    Corrosive = "Corrosive",
    Marginal = "Marginal",
    Breathable = "Breathable",
    Ideal = "Ideal"
}

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

export declare type AttributeValue<K extends AttributeKey = AttributeKey> = IAttributeMaster[K];

/**
 * Set by Oracles / Settlements / Authority
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
 * Set by Oracles / Creatures / Encountered Behavior
 * @ignore
 * @todo implement
 */
export declare enum Biome {
}

/**
 * Enumerates challenge ranks.
 * @seePage 39
 */
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

/**
 * See clocks (p. 234) for more information.
 */
export declare enum ClockType {
    Tension = "Tension",
    Campaign = "Campaign"
}

declare type ConditionMeterId = AssetConditionMeterId;

/**
 * Standard player character condition meters.
 */
export declare enum ConditionMeterName {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}

export declare type ConditionMeterType = ConditionMeterName | AssetConditionMeterId;

/**
 * Set by Oracles / Creatures / Scale
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

export declare type CustomStatId = `${string}/Custom_stat` | "${{Custom_stat}}";

export declare type CustomStatOptionId = `${CustomStatId}/${string}`;

export declare const data: {
    assets: IAssetType[];
    encounters: IEncounter[];
    moves: IMoveCategory[];
    oracles: IOracleCategory[];
    truths: ISettingTruth[];
};

/**
 * Set by oracle: Oracles / Derelicts / Type
 */
export declare enum DerelictType {
    Starship = "Starship",
    Settlement = "Settlement"
}

/**
 * Set by Oracles / Characters / Disposition
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
 */
export declare enum Diversity {
    Simple = 2,
    Diverse = 3,
    Complex = 4,
    GardenWorld = 5
}

/**
 * Set by Oracles / Factions / Dominion
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

export declare type EncounterId = `${Gamespace}/Encounters/${string}`;

export declare enum EncounterNature {
    Creature = "Creature",
    Horror = "Horror",
    Human = "Human",
    Machine = "Machine",
    Monster = "Monster"
}

export declare enum EncounterTags {
    Vehicle = "vehicle"
}

export declare type EncounterVariantId = `${EncounterId}/${string}`;

/**
 * Set by Oracles / Creatures / Environment
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
 */
export declare enum FactionType {
    FringeGroup = "Fringe Group",
    Dominion = "Dominion",
    Guild = "Guild"
}

/**
 * Set by Oracles / Factions / Fringe Group
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

export declare type GameObjectType = (ActorType | PlaceType);

/**
 * Some might say that "Gamespace" is a terrible pun. To them, I reply: you'll never take me alive.
 */
declare type Gamespace = "Starforged" | "Ironsworn";

/**
 * Set by Oracles / Factions / Guild
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

export declare interface IAlterMove extends Omit<Partial<IMove>, "$id">, IHasId<AlterMoveId> {
    /**
     * The `$id` of the move to be altered. If it's `null`, it can alter *any* move to which its trigger conditions apply
     */
    Move?: IMove["$id"] | null;
    /**
     * The trigger information to be added to the altered move.
     */
    Trigger?: IMoveTrigger | undefined;
}

/**
 * An interface representing an *Ironsworn: Starforged* asset card.
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
    Inputs?: IAssetInput[] | undefined;
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
 */
export declare interface IAssetAbility extends IHasId<AssetAbilityId>, IHasText {
    /**
     * New moves added by this asset ability.
     */
    Moves?: IMove[] | undefined;
    /**
     * User inputs (text, clocks, etc) associated with this asset ability.
     */
    Inputs?: IAssetInput[] | undefined;
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

export declare type IAssetInput = INumberInput | ISelectInput | ITextInput | IClockInput;

/**
 * Represents an Asset Type such as Command Vehicle, Companion, or Path, and serves as a container for all assets of that type.
 */
export declare interface IAssetType extends IHasName, IHasId<AssetTypeId>, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">>, IHasSource, Partial<IHasAliases> {
    /**
     * The assets that belong to this asset type.
     */
    Assets: IAsset[];
    Name: AssetTypeName;
}

export declare interface IAttribute<T extends AttributeKey = AttributeKey> {
    Key: T;
    Value?: AttributeValue<this["Key"]> | undefined;
}

export declare interface IAttributeChoices<T extends AttributeKey = AttributeKey> {
    Key: T;
    Values?: NonNullable<IAttribute<T>["Value"]>[] | undefined;
}

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
 * An input representing an *Ironsworn: Starforged* clock.
 * @seePage 239
 * @see {@link InputType.Clock}
 */
export declare interface IClockInput extends IInputBase {
    Name: string;
    "Input Type": InputType.Clock;
    "Clock Type": ClockType;
    Segments: ClockSegments;
    Filled: number;
}

/**
 * Interface representing a condition meter.
 */
export declare interface IConditionMeter extends IMeterBase {
    $id: ConditionMeterId;
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
}

export declare interface ICustomStat extends IHasId<CustomStatId>, IHasName {
    Options: ICustomStatOption[];
}

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
 * Interface for data relevant to an item's display/rendering.
 *
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

export declare interface IDisplayTable {
    "Result columns": IResultColumn[];
    "Roll columns": ITableColumnBase[];
}

/**
 * Interface representing an *Ironsworn: Starforged* Encounter entry.
 */
export declare interface IEncounter extends IEncounterBase {
    "Quest Starter": string;
    Summary: string;
    Features: string[];
    Drives: string[];
    Tactics: string[];
    Variants: IEncounterVariant[];
}

/**
 * Interface common to Encounter and Foe entries in *Ironsworn* and *Ironsworn: Starforged*.
 * @see {@link IEncounter}, {@link IEncounterVariant}
 */
declare interface IEncounterBase extends IHasDisplay<IDisplay>, IHasDescription, IHasSource, IHasName, IHasId<EncounterId>, Partial<IHasQuestStarter & IHasSummary> {
    /**
     * @example "Encounters/Chiton"
     */
    $id: EncounterId;
    /**
     * @example "Chiton"
     */
    Name: string;
    /**
     * @example "Monster"
     */
    Nature: EncounterNature;
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
}

export declare interface IEncounterVariant extends IEncounterBase {
    $id: EncounterVariantId;
    "Variant of": EncounterId;
}

export declare interface IGameObject {
    "Object type": GameObjectType;
    Requires?: IRequirements | undefined;
}

/**
 * Interface for items with aliases.
 */
export declare interface IHasAliases {
    /**
     * Alternate names for this item, including: names it had earlier in development that have since changed, alternate spellings/punctuation, common misspellings, and so on.
     */
    Aliases: string[];
}

/**
 * Interface for items with a user-facing markdown description, consisting of one or more paragraphs.
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
 */
export declare interface IHasDisplay<T extends Partial<IDisplay> = IDisplay> {
    /**
     * Data relevant to this item's display/rendering.
     */
    Display: T;
}

/**
 * Interface for items that have associated game objects.
 */
export declare interface IHasGameObjects<T extends IGameObject = IGameObject> {
    /**
     * Any game objects that are explicitly pointed to by the original text. For most implementations, it is *not* recommended to generate them automatically - see "Peeling the Onion", p. 293.
     */
    "Game objects": T[];
}

/**
 * For elements with unique string IDs.
 */
export declare interface IHasId<T extends string> {
    /**
     * The item's unique string ID.
     */
    $id: T;
}

/**
 * Interface for items with a Name key.
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
 */
export declare interface IHasOracleContent<T extends Partial<IOracleContent> = IOracleContent> {
    /**
     * Metadata that describes an oracle's semantic or lexical content.
     */
    Content: T;
}

/**
 *
 *
 */
export declare interface IHasOracleUsage<T extends Partial<IOracleUsage> = IOracleUsage> {
    /**
     */
    Usage: T;
}

export declare interface IHasQuestStarter {
    /**
     * A markdown string describing the quest starter associated with this item.
     * @markdown
     */
    "Quest Starter": string;
}

/**
 * Interface for items that have prerequisites.
 */
export declare interface IHasRequirements<T extends Partial<IRequirements> = IRequirements> {
    /**
     * Prerequisites for this item.
     */
    Requires: T;
}

/**
 * Interface for items that include roll string templates.
 */
export declare interface IHasRollTemplate<T extends string> {
    /**
     * Describes the string values of this item that should be replaced with template strings and filled with the results of one or more oracle rolls.
     */
    "Roll template": RollTemplate<T>;
}

/**
 * Interface for items with sourcing information.
 */
export declare interface IHasSource<T extends ISource = ISource> {
    /**
     * Information on this item's source.
     */
    Source: T;
}

/**
 * Interface for items that have a subtable-like object.
 */
export declare interface IHasSubtable<T extends IRow = IRow> {
    Subtable: T[];
}

/**
 * Interface for items that include "non-canonical" suggestions of related items.
 */
export declare interface IHasSuggestions<T extends ISuggestions = ISuggestions> {
    /**
     * "Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.
     */
    Suggestions: T;
}

/**
 * Interface for items with a user-facing markdown summary.
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
 */
export declare interface IHasTable<T extends IRow = IRow> {
    Table: T[];
}

/**
 * Interface for items that reproduce Starforged rules text in markdown.
 */
export declare interface IHasText {
    /**
     * The item's rules text as a markdown string.
     * @markdown
     */
    Text: string;
}

/**
 */
export declare interface IInputBase extends IHasId<string>, IHasName {
    "Input Type": InputType;
    Adjustable?: boolean;
}

export declare type ImageType = Vector | Raster;

export declare type ImageUrl<T extends ImageType> = `${Url}.${T}`;

/**
 * Interface representing a Meter.
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
    "Starting Value": number;
}

/**
 * Interface representing a Starforged move.
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

export declare interface IMoveActionRoll extends IMoveTriggerOption<RollType.Action> {
}

/**
 * Represents a category of moves such as "Session Moves" or "Combat Moves", and serves as a container for moves within that category.
 */
export declare interface IMoveCategory extends IHasId<MoveCategoryId>, IHasName, IHasSource, IHasDescription, IHasDisplay<RequireKey<IDisplay, "Color">> {
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

export declare interface IMoveOutcome extends IHasId<MoveOutcomeId>, IHasText {
    "With a Match"?: IMoveOutcome | undefined;
}

export declare interface IMoveOutcomes extends IHasId<MoveOutcomesId> {
    "Strong Hit": IMoveOutcome;
    "Weak Hit": IMoveOutcome;
    "Miss": IMoveOutcome;
}

export declare interface IMoveProgressRoll extends Omit<IMoveTriggerOption<RollType.Progress>, "Custom stat"> {
}

/**
 * Describes the trigger conditions of the move.
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

export declare interface IMultipleRolls {
    Amount: number;
    "Allow duplicates"?: boolean | undefined;
    "Make it worse"?: boolean | undefined;
}

/**
 * Set by Oracles / Factions / Influence
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

export declare enum InputType {
    /**
     * @see {@link ITextInput}
     */
    Text = "Text",
    /**
     * @see {@link ISelectInput}
     */
    Select = "Select",
    /**
     * @see {@link INumberInput}
     */
    Number = "Number",
    /**
     * @see {@link IClockInput}
     */
    Clock = "Clock"
}

/**
 * An input where the user sets an integer.
 * Suggested rendering: a number input spinner.
 * @see {@link InputType.Number}
 */
export declare interface INumberInput extends IInputBase {
    Name: string;
    "Input Type": InputType.Number;
    Min: number;
    Max?: number | undefined;
    Step?: number | undefined;
    "Starting Value": number;
}

export declare interface IOracle extends IOracleBase, IHasName {
    $id: OracleTableId;
    Display: ITableDisplay;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;
}

/**
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

export declare interface IOracleUsage extends Partial<IHasRequirements & IHasSuggestions> {
    Initial?: boolean | undefined;
    Suggestions?: ISuggestions | undefined;
    Requires?: IRequirements | undefined;
    "Min rolls"?: number | undefined;
    "Max rolls"?: number | undefined;
    Repeatable?: boolean | undefined;
    "Allow duplicates"?: boolean | undefined;
    "Sets attributes"?: IAttributeChoices[] | undefined;
}

export declare interface IProgressRoll {
    Track?: ProgressType | undefined;
    "All of"?: ProgressType[] | undefined;
    "Best of"?: ProgressType[] | undefined;
    "Worst of"?: ProgressType[] | undefined;
}

/**
 * Data describing an item's requirements.
 *
 */
export declare interface IRequirements {
    /**
     * A list of attribute keys, and values of those keys that satisfy the requirements.
     */
    Attributes: IAttributeChoices[];
}

export declare interface IResultColumn extends ITableColumnBase {
    Label: string;
    "Use content from": IOracle["$id"];
    Key: keyof IRow;
}

/**
 * Interface representing a single row in an oracle table.
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
 */
export declare type IRowDisplay = Omit<IDisplay, "Title">;

/**
 * An input where the user selects from a list of pre-set options.
 * Suggested rendering: a drop-down selection menu.
 * @see {@link InputType.Select}
 */
export declare interface ISelectInput extends IInputBase {
    Name: string;
    "Input Type": InputType.Select;
    "Option Type": SelectInputOptionType;
    Options: ISelectInputOption<this["Option Type"]>[];
}

export declare interface ISelectInputCustomOption extends ISelectInputOption<SelectInputOptionType.Custom> {
    Value: string;
}

export declare interface ISelectInputMeterOption extends ISelectInputOption<SelectInputOptionType.ConditionMeter> {
    "Condition Meter": ConditionMeterName | AssetConditionMeterId;
}

/**
 */
export declare interface ISelectInputOption<T extends SelectInputOptionType> extends IHasId<string>, IHasName {
    "Option Type": T;
}

export declare interface ISelectInputStatOption extends ISelectInputOption<SelectInputOptionType.Stat> {
    Stat: Stat;
}

/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
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
 */
export declare interface ISettingTruthOption extends Omit<IRow, "$id" | "Summary">, IHasQuestStarter, IHasDescription {
    $id: SettingTruthOptionId;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
}

/**
 * Interface representing data on the game's source.
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
    "Encounters"?: IEncounter["$id"][] | undefined;
}

export declare interface ITableColumnBase {
    Label: string;
    /**
     * The ID of the oracle table to use.
     */
    "Use content from": IOracle["$id"];
}

export declare interface ITableDisplay extends IDisplay {
    Title: string;
    "Column of"?: IOracle["$id"] | undefined;
    Table: IDisplayTable;
}

/**
 * A text input.
 * Suggested rendering: a single-line text input.
 * @see {@link InputType.Text}
 */
export declare interface ITextInput extends IInputBase {
    Name: string;
    "Input Type": InputType.Text;
}

/**
 * Set by Oracles / Factions / Leadership
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

export declare enum LegacyType {
    Quests = "Quests",
    Bonds = "Bonds",
    Discoveries = "Discoveries"
}

/**
 * Set by Oracles / Planets / * / Life
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
 */
export declare enum Location {
    Planetside = "Planetside",
    Orbital = "Orbital",
    DeepSpace = "Deep Space"
}

/**
 * Set by Oracles / Location Themes / Theme Type
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

export declare type MatchIdFragment = "With_a_Match";

/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
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

export declare type MeterType = "Momentum" | ConditionMeterName;

export declare type MoveCategoryId = `${Gamespace}/${MoveCategoryIdBase}`;

export declare type MoveCategoryIdBase = `Moves/${MoveCategoryName | "Assets"}`;

/**
 * "Assets" is also valid, technically, but it's only used in IDs, so it's omitted here.
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

export declare type MoveCategoryTitle = `${MoveCategoryName} Moves`;

export declare type MoveId = `${Gamespace}/${MoveIdBase}`;

export declare type MoveIdBase = `Moves/${MoveCategoryName | "Assets"}/${string}` | `Moves/${AssetAbilityIdBase}/${string}`;

/**
 * Placeholder Move ID indicating that *any* move is valid. For example, an {@link IAlterMove} with this as a `Move` key can be applied to any move that meets its other requirements.
 */
export declare type MoveIdGeneric = `${Gamespace}/${MoveIdGenericBase}`;

export declare type MoveIdGenericBase = "Moves/*";

export declare type MoveOutcomeId = `${MoveOutcomesId}/${RollOutcomeTypeIdFragment}${"" | `/${MatchIdFragment}`}`;

export declare type MoveOutcomesId = `${MoveId}/Outcomes`;

declare type MoveRollId = `${string}/Options/${number}`;

export declare type MoveTriggerId = `${MoveId}/Trigger`;

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

export declare type OracleCategoryFlatPath = `${OracleRoot}/${OracleCategoryFlatFragment}`;

export declare type OracleCategoryId = OracleSubcategoryId | OracleCategoryFlatPath | OracleCategoryJaggedId;

export declare enum OracleCategoryJaggedFragment {
    Derelicts = "Derelicts",
    LocationThemes = "Location_Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}

export declare type OracleCategoryJaggedId = `${OracleRoot}/${OracleCategoryJaggedFragment}`;

export declare enum OracleCategoryJaggedName {
    Derelicts = "Derelicts",
    LocationThemes = "Location Themes",
    Planets = "Planets",
    Vaults = "Vaults"
}

export declare type OracleCategoryName = OracleCategoryFlatPath | OracleCategoryJaggedId | OracleSubcategoryName;

export declare type OracleRoot = `${Gamespace}/Oracles`;

export declare type OracleSubcategoryId = `${OracleRoot}/${OracleSubcategoryPath}`;

export declare type OracleSubcategoryName = PlanetaryClass | Zone | LocationTheme | VaultZone;

export declare type OracleSubcategoryPath = `Derelicts/${Zone}` | `Location_Themes/${LocationTheme}` | `Planets/${PlanetaryClass}` | `Vaults/${VaultZone}`;

/**
 * An ID valid for a subtable embedded in a table Row.
 */
export declare type OracleSubtableId = `${SettingTruthId | OracleTableId}/${number}-${number}/Subtable` | `${SettingTruthId | OracleTableId}/${number}/Subtable`;

export declare type OracleTableId = `${OracleCategoryId}/${string}`;

export declare type OracleTableRowId = `${OracleTableId}/${RollRange}`;

export declare type PartOfSpeechTag = "noun" | "common noun" | "fragment" | "adjective" | "proper noun" | "verb" | "plural" | "name" | "proper noun fragment" | "sentences" | "compound noun" | "possessive case";

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
 */
export declare enum Population {
    Few = "Few",
    Dozens = "Dozens",
    Hundreds = "Hundreds",
    Thousands = "Thousands",
    TensOfThousands = "Tens of thousands"
}

export declare enum ProgressTrackType {
    Combat = "Combat",
    Vow = "Vow",
    Expedition = "Expedition",
    Connection = "Connection",
    SceneChallenge = "Scene Challenge"
}

export declare type ProgressType = LegacyType | ProgressTrackType;

export declare type Protocol = "http" | "https";

export declare type Raster = "webp";

export declare enum Region {
    Terminus = "Terminus",
    Outlands = "Outlands",
    Expanse = "Expanse"
}

/**
 * Generic type: require specific keys to be NonNullable.
 */
export declare type RequireKey<T, K extends keyof T> = T & {
    [P in K]-?: NonNullable<T[P]>;
};

/**
 * Set by Oracles / Character / Role
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
 */
export declare type RollableStat = Stat | ConditionMeterType | CustomStatId;

export declare enum RollMethod {
    All = "All",
    Highest = "Highest",
    Lowest = "Lowest",
    Any = "Any"
}

export declare type RollOutcomeType = "Miss" | "Weak Hit" | "Strong Hit";

export declare type RollOutcomeTypeIdFragment = "Miss" | "Weak_Hit" | "Strong_Hit";

export declare type RollRange = number | `${number}-${number}`;

/**
 * Describes the string keys of this item that should be replaced with template strings and filled with the results of one or more oracles.
 */
export declare type RollTemplate<T extends string> = {
    [P in T | never]?: RollTemplateString | undefined;
};

/**
 * Represents a template string to be filled with results from specific oracle tables.
 */
export declare type RollTemplateString = `${string | ""}\${{${SettingTruthId | OracleTableId | OracleSubtableId}}}${string | ""}`;

export declare enum RollType {
    Action = "Action roll",
    Progress = "Progress roll"
}

export declare enum SelectInputOptionType {
    Stat = "Stat",
    ConditionMeter = "Condition Meter",
    Custom = "Custom"
}

/**
 * A valid ID for a SettingTruth object.
 * @see {@link ISettingTruth}
 */
export declare type SettingTruthId = `${Gamespace}/Setting_Truths/${SettingTruthIdFragment}`;

export declare type SettingTruthIdFragment = "Cataclysm" | "Exodus" | "Communities" | "Iron" | "Laws" | "Religion" | "Magic" | "Communication_and_Data" | "Medicine" | "Artificial_Intelligence" | "War" | "Lifeforms" | "Precursors" | "Horrors";

export declare type SettingTruthName = "Cataclysm" | "Exodus" | "Communities" | "Iron" | "Laws" | "Religion" | "Magic" | "Communication and Data" | "Medicine" | "Artificial Intelligence" | "War" | "Lifeforms" | "Precursors" | "Horrors";

/**
 * A valid setting truth option ID.
 */
export declare type SettingTruthOptionId = `${SettingTruthId}/${number}-${number}`;

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
 */
export declare enum SourceTitle {
    Starforged = "Ironsworn: Starforged Rulebook",
    StarforgedBackerPreview = "Starforged Backer Preview",
    StarforgedAssets = "Ironsworn: Starforged Assets",
    Ironsworn = "Ironsworn Rulebook",
    IronswornDelve = "Ironsworn: Delve",
    IronswornAssets = "Ironsworn Assets",
    IronswornBonusAssets = "Ironsworn Bonus Assets (July 2020)"
}

/**
 * Enumerates valid source URLs.
 */
export declare enum SourceUrl {
    IronswornBonusAssets = "https://drive.google.com/file/d/1bWyWxJzV_SVtyE_SeEGS4TMJ1ZBHfrdv/view",
    IronswornRulebook = "https://www.ironswornrpg.com/downloads"
}

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
 * Represents a tuple: a typed array with a fixed length.
 */
export declare type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & {
    length: TLength;
};

export declare type Url = `${Protocol}://${string}`;

export declare enum VaultZone {
    Interior = "Interior",
    Sanctum = "Sanctum"
}

export declare type Vector = "svg";

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
