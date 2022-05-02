import type { ISource } from "@json_out/index.js";
import type { IAssetTypeYaml , IEncounterStarforgedYaml , IMoveCategoryYaml , IOracleCategoryYaml , ISettingTruthYaml } from "@yaml_in/index.js";

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
  Categories: IMoveCategoryYaml[];
}

/**
 * @internal
 */
export interface ITruthRootYaml extends IDataRootYaml {
  Truths: ISettingTruthYaml[];
}

/**
 * @internal
 */
export interface IOracleCatRootYaml extends Record<string, IOracleCategoryYaml> {}