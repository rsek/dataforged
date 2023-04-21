import type { CharacterRecord, CreatureRecord, DerelictRecord, DerelictSettlementRecord, DerelictStarshipRecord, DerelictZoneRecord, FactionDominionRecord, FactionFringeGroupRecord, FactionGuildRecord, FactionRecord, FleetRecord, PlanetRecord, PrecursorVaultRecord, SettlementRecord, StarshipRecord } from '@game_objects'

/**
 * @public
 */
export type GameObjectRecord =
  CharacterRecord |
  CreatureRecord |
  DerelictRecord |
  DerelictStarshipRecord |
  DerelictSettlementRecord |
  DerelictZoneRecord |
  FactionRecord |
  FactionGuildRecord |
  FactionFringeGroupRecord |
  FactionDominionRecord |
  PlanetRecord |
  PrecursorVaultRecord |
  SettlementRecord |
  StarshipRecord |
  FleetRecord
