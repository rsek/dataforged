export * from "./json_out/index.js";
import type { IAssetType, IEncounterStarforged, IMoveCategory, IOracleCategory, ISettingTruth } from "./json_out/index.js";
/**
 * @public
 */
export interface DataforgedJsonRoot {
    assets: IAssetType[];
    encounters: IEncounterStarforged[];
    moves: IMoveCategory[];
    oracles: IOracleCategory[];
    truths: ISettingTruth[];
}
/**
 * @public
 */
declare const data: DataforgedJsonRoot;
export { data };
//# sourceMappingURL=index.d.ts.map