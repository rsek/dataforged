import { Suggestions } from "@dataforged/classes/common/Suggestions.js";
import { AttributeSetter } from "../../../dist/classes/oracles/AttributeSetter.js";
import { GameObject } from "@dataforged/classes/oracles/GameObject.js";
import { MultipleRolls } from "../../../dist/classes/oracles/MultipleRolls.js";
import { OracleContent } from "../../../dist/classes/oracles/OracleContent.js";
import type { FragmentString, IHasSubtable, IRow, IRowDisplay, OracleTableId, OracleTableRowId, RollTemplate, SentenceString, SettingTruthOptionId, TermString } from "@dataforged/json_out/index.js";
import type { IRowYaml } from "../../../dist/yaml_in/oracles/IRowYaml.js";
export declare class Row implements IRow, Partial<IHasSubtable<Row>> {
    $id: OracleTableRowId | SettingTruthOptionId | null;
    Floor: number | null;
    Ceiling: number | null;
    Result: TermString | FragmentString | SentenceString;
    Summary?: SentenceString | FragmentString | undefined;
    "Oracle rolls"?: OracleTableId[] | undefined;
    "Game objects"?: GameObject[] | undefined;
    "Multiple rolls"?: MultipleRolls | undefined;
    Suggestions?: Suggestions | undefined;
    Attributes?: AttributeSetter | undefined;
    "Roll template"?: RollTemplate<"Result" | "Summary" | "Description" | never> | undefined;
    Display?: IRowDisplay;
    Content?: OracleContent;
    constructor(parentId: string, json: IRowYaml | IRow);
    [x: number]: string | undefined;
    Subtable?: Row[] | undefined;
    length?: number | undefined;
    validateRollTemplate(): true | RollTemplate<string & ("Roll template" | keyof this)>;
}
//# sourceMappingURL=Row.d.ts.map