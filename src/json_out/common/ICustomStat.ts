import type { ICustomStatOption , IHasName } from "@json_out/index.js";
import type { IHasId } from "@json_out/meta/index.js";

export type CustomStatId = `${string}/Custom_stat` | "${{Custom_stat}}";

export interface ICustomStat extends IHasId<CustomStatId>, IHasName {
  Options: ICustomStatOption[];
}
