import type { AssetId } from "../index.js";
export declare type AssetConditionMeterIdYaml = AssetConditionMeterId | "${{Asset_Condition_Meter}}";
/**
 * An ID that references an asset condition meter.
 * **Attached_Asset_Condition_Meter:** In *Ironsworn: Starforged* is is used by Module assets, which can attach to certain other assets (e.g. Starship, Rover); it indicates that the condition meter of the "parent" asset should be rolled. For example, a Module attached to a Starship would roll the Starship's condition meter.
 */
export declare type AssetConditionMeterRef = "Attached_Asset_Condition_Meter" | AssetConditionMeterId;
export declare type AssetConditionMeterId = `${AssetId}/Condition_Meter`;
export declare type AssetConditionMeterIdBase = `${AssetId}/Condition_Meter`;
//# sourceMappingURL=AssetConditionMeterId.d.ts.map