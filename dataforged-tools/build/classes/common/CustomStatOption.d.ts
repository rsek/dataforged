import type { ICustomStatOption } from "../../json_out/index.js";
/**
 * @internal
 */
export declare class CustomStatOption implements ICustomStatOption {
    $id: ICustomStatOption["$id"];
    Name: string;
    Value: number;
    constructor(json: Omit<ICustomStatOption, "$id">, id: ICustomStatOption["$id"]);
}
//# sourceMappingURL=CustomStatOption.d.ts.map