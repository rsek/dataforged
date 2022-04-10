import type { AssetType } from "../classes/index.js";
import type { Encounter } from "../classes/index.js";
import type { MoveCategory } from "../classes/index.js";
import type { OracleCategory } from "../classes/index.js";
import type { SettingTruth } from "../classes/index.js";
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
export declare function buildDataforged(): IronswornData;
//# sourceMappingURL=buildDataforged.d.ts.map