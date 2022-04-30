import type { Gamespace } from "@json_out/common/Gamespace.js";
import type { IDisplayWithTitle, IHasDisplay, IHasId, IHasName, IHasSource, IHasSuggestions, IHasTable, ISettingTruthOption, ISuggestions  } from "@json_out/index.js";

/**
 * @public
 */
export enum SettingTruthIdFragment {
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
export enum SettingTruthName {
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
 * @internal
 */
export type SettingTruthId = `${Gamespace}/Setting_Truths/${SettingTruthIdFragment}`;


/**
 * Interface for Setting Truth categories such as "Exodus" and "Cataclysm". See page XX of Starforged for further information.
 * @see ISettingTruthOption
 * @public
 */
export interface ISettingTruth extends IHasId, IHasName, IHasSource, IHasDisplay, Partial<IHasSuggestions<ISuggestions>>, IHasTable<ISettingTruthOption> {
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
