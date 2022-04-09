import type { ICounter } from "../../../dist/json_out/index.js";
import type { StubExcept } from "../../../dist/utils/types/Stub.js";
export declare class Counter implements ICounter {
    $id: string;
    Name: string;
    Min: number;
    Max: number | null;
    "Starting Value": number;
    constructor(json: StubExcept<ICounter, "Name", "$id">, id: string);
}
//# sourceMappingURL=Counter.d.ts.map