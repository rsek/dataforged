import type { ICounter, MeterCondition } from "../index.js";
/**
 * Interface representing a condition meter.
 */
export interface IConditionMeter extends ICounter {
    "Starting Value": number;
    /**
     * The maximum value for this condition meter.
     */
    Max: number;
    /**
     * The minimum value of the condition meter.
     */
    Min: number;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
}
//# sourceMappingURL=IConditionMeter.d.ts.map