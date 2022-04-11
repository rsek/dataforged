import type { IMeterBase, MeterCondition } from "../index.js";
/**
 * Interface representing a condition meter.
 */
export interface IConditionMeter extends IMeterBase {
    Min: 0;
    /**
     * The conditions that can apply to this meter.
     */
    Conditions: MeterCondition[];
}
//# sourceMappingURL=IConditionMeter.d.ts.map