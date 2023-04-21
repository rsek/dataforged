import type { IMeterBase } from "../../json_out/index.js";
import type { YamlStub } from "../../yaml_in/index.js";
/**
 * Class representing a counter embedded in a Starforged Asset.
 * @internal
 */
export declare abstract class MeterBase implements IMeterBase {
    $id: string;
    Name: string;
    Min: number;
    Max: number;
    "Value": number;
    /**
     * @param json - the json object to build the counter from
     * @param id - the id of the Counter
     */
    constructor(json: YamlStub<IMeterBase, "Min" | "Value">, id: string);
}
//# sourceMappingURL=MeterBase.d.ts.map