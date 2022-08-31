import type { ICustomStat, ICustomStatOption, IDisplay, IMove, IMoveCategory, IMoveOutcomes, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionProgress, IOutcomeInfo, ISource, MoveOutcome } from "../../json_out/index.js";
import type { YamlStub, YamlStubTitle } from "../index.js";
/**
 * @internal
 */
export interface IMoveCategoryYaml extends YamlStubTitle<IMoveCategory, "Display" | "Source", "Moves"> {
    Description: string;
    Moves: IMoveYaml[];
    Display?: IDisplay | undefined;
    Source: Partial<ISource>;
}
/**
 * @internal
 */
export interface IMoveYaml extends YamlStubTitle<IMove, "Category", "Trigger" | "Outcomes"> {
    Trigger: IMoveTriggerYaml;
    Outcomes?: IMoveOutcomesYaml | undefined;
}
/**
 * @internal
 */
export interface IMoveOutcomesYaml extends YamlStub<IMoveOutcomes, "", keyof typeof MoveOutcome> {
    "Strong Hit": IOutcomeInfoYaml;
    "Weak Hit": IOutcomeInfoYaml;
    "Miss": IOutcomeInfoYaml;
}
/**
 * @internal
 */
export interface IOutcomeInfoYaml extends YamlStub<IOutcomeInfo, "", "With a Match"> {
    "With a Match"?: IOutcomeInfoYaml;
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
export interface IMoveTriggerOptionActionYaml extends YamlStub<IMoveTriggerOptionAction, "Method" | "Using" | "Roll type", "Custom stat"> {
    "Custom stat"?: ICustomStatYaml | undefined;
}
/**
 * @internal
 */
export interface IMoveTriggerOptionProgressYaml extends YamlStub<IMoveTriggerOptionProgress, "Method" | "Using" | "Roll type"> {
}
/**
 * @internal
 */
export interface ICustomStatYaml extends YamlStub<ICustomStat, "", "Options"> {
    Options: YamlStub<ICustomStatOption>[];
}
//# sourceMappingURL=IMoveYaml.d.ts.map