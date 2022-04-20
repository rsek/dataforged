import type { AssetConditionMeterId, IMeterBase, MeterCondition } from "../index.js";
/**
 * Standard player character condition meters.
 * @public
 */
export declare enum ConditionMeterName {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}
/**
 * @public
 */
export declare type ConditionMeterType = ConditionMeterName | AssetConditionMeterId;
/**
 * @public
 */
export declare type ConditionMeterId = AssetConditionMeterId;
/**
 * Interface representing a condition meter such as Health, Spirit, Supply, or Integrity.
 * @public
 */
export interface IConditionMeter extends IMeterBase {
    $id: ConditionMeterId;
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
}
//# sourceMappingURL=IConditionMeter.d.ts.map