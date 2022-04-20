import type { ICharacterRecord, ICreatureRecord, IDerelictRecord, IDerelictSettlementRecord, IDerelictStarshipRecord, IDerelictZoneRecord, IFactionDominionRecord, IFactionFringeGroupRecord, IFactionGuildRecord, IFactionRecord, IPlanetRecord, IPrecursorVaultRecord, ISettlementRecord, IStarshipRecord } from "@game_objects/index.js";

/**
 * @public
 */
export type GameObjectRecord =
  ICharacterRecord |
  ICreatureRecord |
  IDerelictRecord |
  IDerelictStarshipRecord |
  IDerelictSettlementRecord |
  IDerelictZoneRecord |
  IFactionRecord |
  IFactionGuildRecord |
  IFactionFringeGroupRecord |
  IFactionDominionRecord |
  IPlanetRecord |
  IPrecursorVaultRecord |
  ISettlementRecord |
  IStarshipRecord;
