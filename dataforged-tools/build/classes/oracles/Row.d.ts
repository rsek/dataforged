import { AttributeSetter, GameObject, MultipleRolls, OracleContent, Suggestions } from "../index.js";
import type { IDisplay, IOracle, IRollTemplate, IRow, IRowNullStub } from "../../json_out/index.js";
import type { ISettingTruthOptionYaml, YamlStub } from "../../yaml_in/index.js";
import type { IRowYaml } from "../../yaml_in/oracles/IRowYaml.js";
/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export declare class Row implements IRow {
    $id: string;
    Floor: number | null;
    Ceiling: number | null;
    Result: string;
    Summary?: string | null | undefined;
    "Oracle rolls"?: IOracle["$id"][] | undefined;
    "Game objects"?: GameObject[] | undefined;
    "Multiple rolls"?: MultipleRolls | undefined;
    Suggestions?: Suggestions | undefined;
    Attributes?: AttributeSetter | undefined;
    "Roll template"?: IRollTemplate | undefined;
    Display?: IDisplay | undefined;
    Content?: OracleContent;
    Subtable?: Row[] | undefined;
    /**
     * Creates an instance of Row.
     */
    constructor(parentId: string, json: IRowYaml | YamlStub<IRow> | ISettingTruthOptionYaml);
}
/**
 * @internal
 */
export declare class RowNullStub implements IRowNullStub {
    Floor: null;
    Ceiling: null;
    Result: string;
    Summary?: string | undefined | null;
    constructor({ Result, Summary }: Omit<IRowNullStub, "Floor" | "Ceiling">);
}
//# sourceMappingURL=Row.d.ts.map