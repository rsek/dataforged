import type { GameObjectRecord } from '@game_objects'
import type { Suggestions, YamlStub } from '@schema'

/**
 * @internal
 */
export interface YamlSuggestions extends YamlStub<Suggestions, 'game_objects'> {
  game_objects?: GameObjectRecord[] | undefined
}
