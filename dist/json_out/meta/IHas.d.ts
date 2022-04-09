import type { Suggestions } from "../../../dist/classes/common/Suggestions.js";
import type { FragmentString, IDisplay, IGameObject, IOracleContent, IOracleUsage, IRequirements, IRow, ISource, ISuggestions, ParagraphsString, RollTemplate, SentenceString } from "@dataforged/json_out/index.js";
export interface IHasSummary {
    Summary: SentenceString | FragmentString;
}
export interface IHasDescription {
    Description: ParagraphsString;
}
export interface IHasAliases<T extends string = string> {
    Aliases: T[];
}
export interface IHasSource<T extends ISource = ISource> {
    Source: T;
}
export interface IHasId<T extends string = string> {
    $id: T;
}
export interface IHasName<T extends string = string> {
    Name: T;
}
export interface IHasDisplay<T extends Partial<IDisplay> = Partial<IDisplay>> {
    Display: T;
}
export interface IHasText<T extends ParagraphsString | SentenceString | FragmentString = ParagraphsString> {
    Text: T;
}
export interface IHasSuggestions<T extends ISuggestions | Suggestions = ISuggestions> {
    Suggestions: T;
}
export interface IHasRollTemplate<T extends string> {
    "Roll template": RollTemplate<T>;
}
export interface IHasOracleUsage<T extends Partial<IOracleUsage> = IOracleUsage> {
    Usage: T;
}
export interface IHasOracleContent<T extends Partial<IOracleContent> = IOracleContent> {
    Content: T;
}
export interface IHasRequirements<T extends Partial<IRequirements> = IRequirements> {
    Requires: T;
}
export interface IHasTable<T extends IRow = IRow> {
    Table: T[];
}
export interface IHasSubtable<T extends IRow = IRow> {
    Subtable: T[];
}
export interface IHasGameObjects<T extends IGameObject = IGameObject> {
    "Game objects": T[];
}
export interface IHasQuestStarter {
    "Quest Starter": ParagraphsString;
}
//# sourceMappingURL=IHas.d.ts.map