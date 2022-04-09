import type { ICustomStatOption } from "../../json_out/index.js";
export declare class CustomStatOption implements ICustomStatOption {
    $id: string;
    Name: string;
    Value: number;
    constructor(json: Omit<ICustomStatOption, "$id">, id: string);
}
//# sourceMappingURL=CustomStatOption.d.ts.map