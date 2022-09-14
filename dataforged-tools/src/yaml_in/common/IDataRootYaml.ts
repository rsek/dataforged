import type { IDelveDomain, IDelveTheme , ISource } from "@json_out/index.js";
import type { IAssetTypeYaml , IDelveDomainYaml, IDelveThemeYaml, IEncounterStarforgedYaml , IIronswornRegionYaml , IMoveCategoryYaml , IOracleSetYaml, ISettingTruthClassicYaml, ISettingTruthYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export interface IDataRootYaml {
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
export interface ITruthRootClassicYaml {
  "Setting Truths": ISettingTruthClassicYaml[]
 }

/**
 * @internal
 */
export interface IOracleSetRootYaml {
  [key: string]: IOracleSetYaml
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
  Themes?: IDelveThemeYaml[] | undefined;
  Domains?: IDelveDomainYaml[] | undefined;
}