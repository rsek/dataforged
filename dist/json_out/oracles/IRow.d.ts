import type { AttributeKey } from "../game_objects/AttributeKey.js";
import type { FragmentString, IAttributeChoices, IDisplay, IHasDisplay, IHasGameObjects, IHasOracleContent, IHasRollTemplate, IHasSubtable, IHasSuggestions, IHasSummary, IMultipleRolls, OracleTableId, OracleTableRowId, SentenceString, SettingTruthOptionId, TermString } from "../index.js";
export declare type IRowDisplay = Omit<IDisplay, "Title">;
export interface IRow extends Partial<IHasSummary & IHasRollTemplate<"Result" | "Summary" | "Description"> & IHasSuggestions & IHasDisplay<IRowDisplay> & IHasOracleContent & IHasSubtable & IHasGameObjects> {
    $id?: SettingTruthOptionId | OracleTableRowId | null;
    Floor: number | null;
    Ceiling: number | null;
    Result: TermString | FragmentString | SentenceString;
    Summary?: SentenceString | FragmentString | undefined;
    "Oracle rolls"?: OracleTableId[] | undefined;
    Subtable?: IRow[] | undefined;
    "Multiple rolls"?: IMultipleRolls | undefined;
    Attributes?: IAttributeChoices<AttributeKey>[] | undefined;
}
//# sourceMappingURL=IRow.d.ts.map