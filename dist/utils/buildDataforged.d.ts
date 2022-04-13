import type { AssetType, Encounter, MoveCategory, OracleCategory, SettingTruth } from "../classes/index.js";
import type { Gamespace } from "../json_out/common/Gamespace.js";
export interface IronswornData {
    assets: AssetType[];
    encounters: Encounter[];
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