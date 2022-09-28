import type { Display, Move, MoveCategory, YamlMoveTrigger, YamlOutcomes, YamlStubNode, YamlTitleCaseTitle } from '@schema'
/**
 * @internal
 */
export interface YamlMoveCategory extends YamlStubNode<MoveCategory, 'Optional', 'Moves'> {
  Description: string
  Moves: {[key: string]: YamlMove}
  Display?: Display | undefined
}

/**
 * @internal
 */
export interface YamlMove extends YamlStubNode<Move, 'Category'|'Optional', 'Trigger'|'Outcomes'> {
  Title: YamlTitleCaseTitle
  Trigger: YamlMoveTrigger
  Outcomes?: YamlOutcomes | undefined
};
