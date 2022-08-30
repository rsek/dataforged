import type { IMeter, MeterAlias, MeterCondition } from "../index.js";
/**
 * Standard player character condition meters.
 * @public
 */
export declare enum PlayerConditionMeter {
    Health = "Health",
    Spirit = "Spirit",
    Supply = "Supply"
}
/**
 * Interface representing a condition meter such as Health, Spirit, Supply, or Integrity.
 * @public
 */
export interface IConditionMeter extends IMeter {
    /**
     * @pattern ^(Starforged|Ironsworn)/Assets/[A-z_-]+/[A-z_-]+/Condition_Meter$
     */
    $id: string;
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
    Aliases?: MeterAlias[] | undefined;
}
//# sourceMappingURL=IConditionMeter.d.ts.map