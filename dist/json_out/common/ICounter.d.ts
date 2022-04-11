import type { IHasId, IHasName } from "../index.js";
/**
 * Interface representing a Meter.
 */
export interface IMeterBase extends IHasId<string>, IHasName {
    /**
     * The minimum value of the meter. Usually this is 0. Momentum is currently the only exception to this and goes as low as -6.
     */
    Min: number;
    /**
     * The maximum value of the meter.
     */
    Max: number;
    /**
     * The initial value of the meter.
     */
    "Starting Value": number;
}
//# sourceMappingURL=ICounter.d.ts.map