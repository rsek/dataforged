import type { AssetType } from "../../dist/classes/assets/AssetType.js";
import type { Encounter } from "../../dist/classes/encounters/Encounter.js";
import type { MoveCategory } from "../../dist/classes/moves/MoveCategory.js";
import type { OracleCategory } from "../../dist/classes/oracles/OracleCategory.js";
import type { SettingTruth } from "../../dist/classes/setting_truths/SettingTruth.js";
export interface IronswornData {
    assets: AssetType[];
    encounters: Encounter[];
    moves: MoveCategory[];
    oracles: OracleCategory[];
    setting_truths: SettingTruth[];
}
export declare function buildDataforged(): IronswornData;
//# sourceMappingURL=buildDataforged.d.ts.map