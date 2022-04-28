import { AttributeSetter, GameObject, MultipleRolls, OracleContent, Suggestions } from "../index.js";
import type { IHasSubtable, IOracle, IRow, IRowDisplay, OracleTableRowId, RollTemplate, SettingTruthOptionId } from "../../json_out/index.js";
import type { IRowYaml } from "../../yaml_in/oracles/IRowYaml.js";
/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export declare class Row implements IRow, Partial<IHasSubtable<Row>> {
    /**
     */
    $id: OracleTableRowId | SettingTruthOptionId | null;
    Floor: number | null;
    Ceiling: number | null;
    /**
     */
    Result: string;
    /**
     */
    Summary?: string | null | undefined;
    /**
     */
    "Oracle rolls"?: IOracle["$id"][] | undefined;
    /**
     */
    "Game objects"?: GameObject[] | undefined;
    /**
     */
    "Multiple rolls"?: MultipleRolls | undefined;
    /**
     */
    Suggestions?: Suggestions | undefined;
    /**
     */
    Attributes?: AttributeSetter | undefined;
    /**
     */
    "Roll template"?: RollTemplate<"Result" | "Summary" | "Description" | never> | undefined;
    /**
     */
    Display?: IRowDisplay;
    /**
     */
    Content?: OracleContent;
    /**
     * Creates an instance of Row.
     */
    constructor(parentId: string, json: IRowYaml | IRow);
    [x: number]: string | undefined;
    Subtable?: Row[] | undefined;
    length?: number | undefined;
    validateRollTemplate(): true | RollTemplate<string & ("Roll template" | keyof this)>;
}
//# sourceMappingURL=Row.d.ts.map