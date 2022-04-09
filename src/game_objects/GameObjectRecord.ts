import type { ICharacterRecord, ICreatureRecord, IDerelictRecord, IDerelictSettlementRecord, IDerelictStarshipRecord, IDerelictZoneRecord, IFactionDominionRecord, IFactionFringeGroupRecord, IFactionGuildRecord, IFactionRecord, IPlanetRecord, IPrecursorVaultRecord, ISettlementRecord, IStarshipRecord } from "@dataforged/game_objects/index.js";


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
