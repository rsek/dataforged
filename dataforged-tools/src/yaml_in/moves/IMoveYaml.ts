import type { ICustomStat, ICustomStatOption, IDisplay, IMove, IMoveCategory, IMoveOutcomes, IMoveTrigger, IMoveTriggerOptionAction, IMoveTriggerOptionProgress, IOutcomeInfo, ISource, MoveOutcome } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";
/**
 * @internal
 */
export interface IMoveCategoryYaml extends YamlStub<IMoveCategory, "Display"|"Source", "Moves"> {
  Name: string;
  Description: string;
  Moves: IMoveYaml[];
  Display?: IDisplay | undefined;
  Source: Partial<ISource>;
}


/**
 * @internal
 */
export interface IMoveYaml extends YamlStub<IMove, "Category", "Trigger"|"Outcomes"> {
  Trigger: IMoveTriggerYaml;
  Outcomes?: IMoveOutcomesYaml | undefined;
};

/**
 * @internal
 */
export interface IMoveOutcomesYaml extends YamlStub<IMoveOutcomes, "", MoveOutcome.Strong_Hit|MoveOutcome.Weak_Hit|MoveOutcome.Miss> {
  [MoveOutcome.Strong_Hit]: IOutcomeInfoYaml;
  [MoveOutcome.Weak_Hit]: IOutcomeInfoYaml;
  [MoveOutcome.Miss]: IOutcomeInfoYaml;
}

/**
 * @internal
 */
export interface IOutcomeInfoYaml extends YamlStub<IOutcomeInfo,"", "With a Match"> {
  "With a Match"?: IOutcomeInfoYaml;
 }

/**
 * @internal
 */
export interface IMoveTriggerYaml extends YamlStub<IMoveTrigger, "", "Options">{
  Options?: (IMoveTriggerOptionActionYaml|IMoveTriggerOptionProgressYaml)[] | undefined;
}


/**
 * @internal
 */
export interface IMoveTriggerOptionActionYaml extends YamlStub<IMoveTriggerOptionAction, "Method"|"Using"|"Roll type", "Custom stat"> {
  "Custom stat"?: ICustomStatYaml | undefined;
}

/**
 * @internal
 */
export interface IMoveTriggerOptionProgressYaml extends YamlStub<IMoveTriggerOptionProgress, "Method"|"Using"|"Roll type">{}

/**
 * @internal
 */
export interface ICustomStatYaml extends YamlStub<ICustomStat, "", "Options"> {
  Options: YamlStub<ICustomStatOption>[];
}