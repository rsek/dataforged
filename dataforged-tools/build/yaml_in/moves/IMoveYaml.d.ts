import type { ICustomStat, ICustomStatOption, IDisplay, IMove, IMoveCategory, IMoveOutcomes, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionProgress, IOutcomeInfoBase, IOutcomeMiss, IOutcomeMissMatch, IOutcomeStrongHit, IOutcomeStrongHitMatch, IOutcomeWeakHit, ISource, MeterAlias, MoveOutcome, PlayerConditionMeter, Replacement, Stat } from "../../json_out/index.js";
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
    "Strong Hit": IOutcomeStrongHitYaml;
    "Weak Hit": IOutcomeWeakHitYaml;
    "Miss": IOutcomeMissYaml;
}
/**
 * @internal
 */
export interface IOutcomeInfoBaseYaml<O extends MoveOutcome> extends YamlStub<IOutcomeInfoBase<O>, "", "With a Match"> {
    "With a Match"?: IOutcomeInfoBaseYaml<O> | undefined;
}
/**
 * @internal
 */
export interface IOutcomeMissYaml extends IOutcomeInfoBaseYaml<0>, YamlStub<IOutcomeMiss, "", "With a Match"> {
    "With a Match"?: IOutcomeMissMatchYaml | undefined;
}
/**
 * @internal
 */
export interface IOutcomeMissMatchYaml extends IOutcomeInfoBaseYaml<0>, YamlStub<IOutcomeMissMatch> {
}
/**
 * @internal
 */
export interface IOutcomeStrongHitYaml extends IOutcomeInfoBaseYaml<2>, YamlStub<IOutcomeStrongHit, "", "With a Match"> {
    "With a Match"?: IOutcomeStrongHitMatchYaml | undefined;
}
/**
 * @internal
 */
export interface IOutcomeStrongHitMatchYaml extends IOutcomeInfoBaseYaml<2>, YamlStub<IOutcomeStrongHitMatch> {
}
/**
 * @internal
 */
export interface IOutcomeWeakHitYaml extends IOutcomeInfoBaseYaml<1>, YamlStub<IOutcomeWeakHit, "", "With a Match"> {
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
export interface IMoveTriggerOptionActionYaml extends YamlStub<IMoveTriggerOptionAction, "Method" | "Roll type", "Custom stat"> {
    "Custom stat"?: ICustomStatYaml | undefined;
    Using: (Stat | Replacement | PlayerConditionMeter | MeterAlias)[];
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