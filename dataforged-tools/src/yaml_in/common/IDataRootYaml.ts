//License: MIT
import type { IDelveDomain, IDelveTheme , ISource } from "@json_out/index.js";
import type { IAssetTypeYaml , IEncounterStarforgedYaml , IIronswornRegionYaml , IMoveCategoryYaml , IOracleCategoryYaml, ISettingTruthYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IDataRootYaml {
  Name: string;
  Source: ISource;
}

/**
 * @internal
 */
export interface IAssetRootYaml extends IDataRootYaml {
  "Asset Types": IAssetTypeYaml[];
}

/**
 * @internal
 */
export interface IEncounterRootYaml extends IDataRootYaml {
  Encounters: IEncounterStarforgedYaml[];
}

/**
 * @internal
 */
export interface IMoveRootYaml extends IDataRootYaml {
  "Move Categories": IMoveCategoryYaml[];
}

/**
 * @internal
 */
export interface ITruthRootYaml extends IDataRootYaml {
  "Setting Truths": ISettingTruthYaml[];
}

/**
 * @internal
 */
export interface IOracleCatRootYaml {
  [key: string]: IOracleCategoryYaml
};

/**
 * @internal
 */
export interface ICyclopediaRootYaml {
  Regions?: IIronswornRegionYaml[] | undefined;
}

/**
 * @internal
*/
export interface IDelveSiteRootYaml {
  Themes?: IDelveTheme[] | undefined;
  Domains?: IDelveDomain[] | undefined;
}