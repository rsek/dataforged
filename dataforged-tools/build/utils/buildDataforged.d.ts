import type { EncounterNatureInfo } from "../classes/encounters/EncounterNatureInfo.js";
import type { AssetType, EncounterStarforged, MoveCategory, OracleCategory, SettingTruth } from "../classes/index.js";
import { Gamespace } from "../json_out/common/Gamespace.js";
export interface IronswornData {
    assets: AssetType[];
    encounters: EncounterStarforged[] | EncounterNatureInfo[];
    moves: MoveCategory[];
    oracles: OracleCategory[];
    setting_truths: SettingTruth[];
}
/**
 * Builds all data for Dataforged.
 * @returns An object keyed with the game data.
*/
export declare function buildDataforged(gamespace?: Gamespace): IronswornData;
//# sourceMappingURL=buildDataforged.d.ts.map