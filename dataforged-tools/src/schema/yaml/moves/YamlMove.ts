import type { Display, Move, MoveCategory , YamlMoveTrigger, YamlOutcomes, YamlStubNode } from "@schema";
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
  Outcomes?: YamlOutcomes | undefined;
};

