import type { IAssetType, IEncounterNatureInfo, IMoveCategory, IOracleCategory, ISettingTruth } from "@json_out/index.js";

/**
 * Root object for *Ironsworn* data.
 * @public
 */
export interface Ironsworn {
  $schema?: string | undefined;
  assets: IAssetType[];
  encounters: IEncounterNatureInfo[];
  moves: IMoveCategory[];
  oracles: IOracleCategory[];
  truths?: ISettingTruth[];
}