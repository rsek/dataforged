import type { Replacement } from "./Replacement.js";
import type { ICustomStatOption, IHasName } from "../index.js";
import type { IHasId } from "../meta/index.js";
/**
 * @public
 */
export declare type CustomStatId = `${string}/Custom_stat` | Replacement.CustomStat;
/**
 * @public
 */
export interface ICustomStat extends IHasId<CustomStatId>, IHasName {
    Options: ICustomStatOption[];
}
//# sourceMappingURL=ICustomStat.d.ts.map