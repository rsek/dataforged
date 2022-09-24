import type { Asset, DelveDomain, DelveTheme, EncounterClassic, EncounterStarforged , GameObject, IronlandsRegion, Move , OracleTable } from "@schema_json";

/**
 * Describes "non-canonical" suggestions for game content related to the parent item.
 *
 * These are intended be offered as convenient shortcuts for the user (for instance, including a menu dropdown for rolling on suggested tables); having them roll automatically is **not recommended** for most projects.
 *
 * These can be safely ignored if that functionality is not desired.
 * @public
 */
export interface Suggestions  {
  /**
   * Suggested game objects and their parameters.
   */
  "Game objects"?: GameObject[] | undefined;
  /**
   * Suggested oracle rolls, by table ID. Multiples of the same ID can be used to indicate that multiple rolls should be made.
   */
  "Oracle rolls"?: OracleTable["$id"][] | undefined;
  /**
   * Suggested move IDs.
   */
  "Moves"?: Move["$id"][] | undefined;
  /**
   * Suggested asset IDs.
   */
  "Assets"?: Asset["$id"][] | undefined;
  /**
   * Suggested encounter IDs.
   */
  "Encounters"?: EncounterStarforged["$id"][] | EncounterClassic["$id"][] | undefined;
  /**
   * Suggested delve site themes.
   */
  "Themes"?: DelveTheme["$id"][] | undefined
  /**
   * Suggested delve site domains.
   */
  "Domains"?: DelveDomain["$id"][] | undefined
  /**
   * Suggested Ironlands regions.
   */
  "Regions"?: IronlandsRegion["$id"][] | undefined
}
