import type { GameObjectRecord } from '@game_objects'
import type { Asset, DelveSiteDomain, DelveSiteTheme, EncounterStarforged, GameObject, IronlandsRegion, Move, OracleSet, OracleTable, Suggestions, YamlSuggestions } from '@schema'

/**
 * @internal
 */
export class SuggestionsBuilder implements Suggestions {
  game_objects?: GameObjectRecord[] | undefined
  oracle_tables?: OracleTable['$id'][] | undefined
  oracle_sets?: OracleSet['$id'][] | undefined
  assets?: Asset['$id'][] | undefined
  moves?: Move['$id'][] | undefined
  encounters?: EncounterStarforged['$id'][] | undefined
  themes?: DelveSiteTheme['$id'][] | undefined
  domains?: DelveSiteDomain['$id'][] | undefined
  regions?: IronlandsRegion['$id'][] | undefined

  constructor (data: YamlSuggestions) {
    if (data.game_objects != null) {
      // console.info("[Suggestions] Game objects", JSON.stringify(data["Game objects"]));
      this.game_objects = data.game_objects
    }
    if (data.oracle_tables != null) {
      // TODO type check against string
      this.oracle_tables = data.oracle_tables
    }
    if (data.oracle_sets != null) {
      // TODO type check against string
      this.oracle_sets = data.oracle_sets
    }
    if (data.moves != null) {
      // TODO type check against string
      this.moves = data.moves
    }
    if (data.assets != null) {
      // TODO type check against string
      this.assets = data.assets
    }
    if (data.themes != null) {
      // TODO type check against string
      this.themes = data.themes
    }
    if (data.domains != null) {
      // TODO type check against string
      this.domains = data.domains
    }
    if (data.encounters != null) {
      // TODO type check against string
      this.encounters = data.encounters
    }
    if (data.regions != null) {
      // TODO type check against string
      this.regions = data.regions
    }
  }
}
