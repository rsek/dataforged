import type { ICounter } from "../../json_out/index.js";
import type { StubExcept } from "../../utils/types/Stub.js";
/**
 * Class representing a counter embedded in a Starforged Asset.
 */
export declare class Counter implements ICounter {
    $id: string;
    Name: string;
    Min: number;
    Max: number | null;
    "Starting Value": number;
    /**
     * @param json - the json object to build the counter from
     * @param id - the id of the Counter
     */
    constructor(json: StubExcept<ICounter, "Name", "$id">, id: string);
}
//# sourceMappingURL=Counter.d.ts.map