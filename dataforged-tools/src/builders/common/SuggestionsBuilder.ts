import { GameObjectBuilder } from '@builders'
import type { Asset, EncounterStarforged, GameObject, Move, OracleTable, Suggestions, YamlSuggestions } from '@schema'

/**
 * @internal
 */
export class SuggestionsBuilder implements Suggestions {
  game_objects?: GameObject[] | undefined
  oracle_rolls?: Array<OracleTable['$id']> | undefined
  assets?: Array<Asset['$id']> | undefined
  moves?: Array<Move['$id']> | undefined
  encounters?: Array<EncounterStarforged['$id']> | undefined
  constructor(data: YamlSuggestions) {
    if (data['game_objects'] != null) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this.game_objects = data['game_objects'].map(gameObjData => new GameObjectBuilder(gameObjData))
    }
    if (data.oracle_rolls != null) {
      // TODO type check against string
      this.oracle_rolls = data.oracle_rolls
    }
    if (data.moves != null) {
      // TODO type check against string
      this.moves = data.moves
    }
    if (data.assets != null) {
      // TODO type check against string
      this.assets = data.assets
    }
  }
}
