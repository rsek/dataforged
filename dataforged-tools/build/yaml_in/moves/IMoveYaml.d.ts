import type { IDisplayWithTitle, IMove, IMoveCategory, IMoveOutcomes, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionProgress, IOutcomeInfo, ISource, MoveOutcome } from "../../json_out/index.js";
import type { YamlStub } from "../index.js";
/**
 * @internal
 */
export interface IMoveCategoryYaml extends YamlStub<IMoveCategory, "", "Moves"> {
    Name: string;
    Source: ISource;
    Description: string;
    Moves: IMoveYaml[];
    Display: IDisplayWithTitle;
}
/**
 * @internal
 */
export interface IMoveYaml extends YamlStub<IMove, "Category" | "Source" | "Display", "Trigger" | "Outcomes"> {
    Trigger: IMoveTriggerYaml;
    Outcomes: IMoveOutcomesYaml;
}
/**
 * @internal
 */
export interface IMoveOutcomesYaml extends YamlStub<IMoveOutcomes, "", MoveOutcome.Strong_Hit | MoveOutcome.Weak_Hit | MoveOutcome.Miss> {
    [MoveOutcome.Strong_Hit]: IOutcomeInfoYaml;
    [MoveOutcome.Weak_Hit]: IOutcomeInfoYaml;
    [MoveOutcome.Miss]: IOutcomeInfoYaml;
}
/**
 * @internal
 */
export interface IOutcomeInfoYaml extends YamlStub<IOutcomeInfo> {
}
/**
 * @internal
 */
export interface IMoveTriggerYaml extends YamlStub<IMoveTrigger, "", "Options"> {
    Options?: (IMoveTriggerOptionActionYaml | IMoveTriggerOptionProgressYaml)[] | undefined;
}
/**
 * @internal
 */
export interface IMoveTriggerOptionActionYaml extends YamlStub<IMoveTriggerOptionAction, "Method" | "Using" | "Roll type"> {
}
/**
 * @internal
 */
export interface IMoveTriggerOptionProgressYaml extends YamlStub<IMoveTriggerOptionProgress, "Method" | "Using" | "Roll type"> {
}
//# sourceMappingURL=IMoveYaml.d.ts.map