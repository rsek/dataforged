import type { Display, Move, MoveCategory } from "@schema_json";
import type { YamlMoveOutcomes, YamlMoveTrigger, YamlStubNode } from "@schema_yaml";
/**
 * @internal
 */
export interface YamlMoveCategory extends YamlStubNode<MoveCategory, "Optional", "Moves"> {
  Description: string;
  Moves: {[key: string]: YamlMove};
  Display?: Display | undefined;
}


/**
 * @internal
 */
export interface YamlMove extends YamlStubNode<Move, "Category"|"Optional", "Trigger"|"Outcomes"> {
  Trigger: YamlMoveTrigger;
  Outcomes?: YamlMoveOutcomes | undefined;
};

