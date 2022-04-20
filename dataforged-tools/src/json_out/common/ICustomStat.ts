import type { Replacement } from "@json_out/common/Replacement.js";
import type { ICustomStatOption , IHasName } from "@json_out/index.js";
import type { IHasId } from "@json_out/meta/index.js";
/**
 * @public
 */
export type CustomStatId = `${string}/Custom_stat` | Replacement.CustomStat;
/**
 * @public
 */
export interface ICustomStat extends IHasId<CustomStatId>, IHasName {
  Options: ICustomStatOption[];
}
