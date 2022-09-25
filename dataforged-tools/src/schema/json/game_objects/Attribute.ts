/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Atmosphere,
  Authority,
  Behavior,
  CreatureScale,
  DerelictType,
  Disposition,
  Dominion,
  Environment,
  FactionType,
  FringeGroup,
  Guild,
  Influence,
  Leadership,
  Life ,
  Location,
  LocationTheme,
  PlanetaryClass,
  Population,
  Region,
  Role,
  SettlementInitialContact,
  StarshipInitialContact,
  Zone } from "@game_objects";
import type { AttributeKey } from "@schema";
/**
 * Describes an attribute key/value pair, set by an oracle row. The key-value pair should be set on any game object for which that row is generated.
 *
 * Attributes exist to describe prerequisites that might be fulfilled by more than one table, that don't exist on tables at all, or that a generated game object might want to 'force' as one of it's roll results.
 *
 * See documentation for a list of available values.
 * @public
 * @see {@link AttributeKey}, {@link Atmosphere}, {@link Authority}, {@link Behavior}, {@link CreatureScale}, {@link DerelictType}, {@link Disposition}, {@link Dominion}, {@link Environment}, {@link FactionType}, {@link FringeGroup}, {@link Guild}, {@link Influence}, {@link Leadership}, {@link Life}, {@link Location}, {@link LocationTheme}, {@link PlanetaryClass}, {@link Population}, {@link Region}, {@link Role}, {@link SettlementInitialContact}, {@link StarshipInitialContact}, {@link Zone}

 */
export interface Attribute {
  Key: AttributeKey;
  Value?: string | undefined;
}

