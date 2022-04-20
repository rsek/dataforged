import type { Gamespace } from "../common/Gamespace.js";
import type { IHasId, IHasName, IHasSource, IHasSuggestions, IHasTable, ISettingTruthOption, ISuggestions } from "../index.js";
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
 * A valid ID for a SettingTruth object.
 * @see {@link ISettingTruth}
 * @public
 */
export declare type SettingTruthId = `${Gamespace}/Setting_Truths/${SettingTruthIdFragment}`;
/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export interface ISettingTruth extends IHasId<string>, IHasName, IHasSource, Partial<IHasSuggestions<ISuggestions>>, IHasTable<ISettingTruthOption> {
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
//# sourceMappingURL=ISettingTruth.d.ts.map