import type { ICustomStatOption, IHasName } from "../index.js";
import type { IHasId } from "../meta/index.js";
export declare type CustomStatId = `${string}/Custom_stat` | "${{Custom stat}}";
export interface ICustomStat extends IHasId<CustomStatId>, IHasName {
    Options: ICustomStatOption[];
}
//# sourceMappingURL=ICustomStat.d.ts.map