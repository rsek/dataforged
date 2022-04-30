import type { IHasDescription, IHasQuestStarter, IRow, RollTemplate } from "../index.js";
/**
 * Interface for 'canonical' options within a SettingTruth category.
 * @see {@link ISettingTruth}
 * @public
 */
export interface ISettingTruthOption extends Omit<IRow, "$id" | "Summary">, IHasQuestStarter, IHasDescription {
    /**
     * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])$
     */
    $id: string;
    "Roll template"?: RollTemplate<"Summary" | "Description"> | undefined;
    Subtable?: ISettingTruthOptionSubtableRow[] | undefined;
}
/**
 * @public
 */
export interface ISettingTruthOptionSubtableRow extends IRow {
    /**
     * @pattern ^(Starforged|Ironsworn)/Setting_Truths/[A-z_-]+/(1-33|34-67|68-100|[1-3])/[1-9][0-9]*(-[1-9][0-9]*)?$
     */
    $id: string;
}
//# sourceMappingURL=ISettingTruthOption.d.ts.map