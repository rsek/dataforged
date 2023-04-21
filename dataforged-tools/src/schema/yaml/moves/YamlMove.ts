import type { Display, Move, MoveCategory, YamlMoveTrigger, YamlOutcomes, YamlStubNode, YamlTitleCaseTitle } from '@schema'
import type { SnakeCaseString } from '@schema/json/common/String.js'
/**
 * @internal
 */
export interface YamlMoveCategory extends YamlStubNode<MoveCategory, 'optional', 'moves'> {
  description: string
  moves: { [key: SnakeCaseString]: YamlMove }
  display?: Display | undefined
}

/**
 * @internal
 */
export interface YamlMove extends YamlStubNode<Move, 'category' | 'optional', 'trigger' | 'outcomes'> {
  title: YamlTitleCaseTitle
  trigger: YamlMoveTrigger
  outcomes?: YamlOutcomes | undefined
};
