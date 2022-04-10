import type { IHasName } from "../index.js";
import type { IHasId } from "../meta/IHas.js";
export interface ICustomStatOption extends IHasId, IHasName {
    $id: string;
    /**
     * The name/label for this option.
     */
    Name: string;
    /**
     * The numeric value to be added as a stat when making an Action Roll.
     */
    Value: number;
}
//# sourceMappingURL=ICustomStatOption.d.ts.map