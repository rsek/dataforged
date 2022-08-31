import type { IDisplay, IHasDisplay, IHasId, IHasSource, IHasSuggestions, IHasTable, IHasTitle, ISettingTruthOption } from "../index.js";
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
 * Interface for Starforged Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export interface ISettingTruth extends IHasId, IHasSource, IHasDisplay, Partial<IHasSuggestions>, IHasTable, IHasTitle {
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
//# sourceMappingURL=ISettingTruth.d.ts.map