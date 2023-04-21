import type { Atmosphere, Behavior, CreatureScale, DerelictType, Disposition, Dominion, Environment, FactionType, FringeGroup, Guild, Influence, Leadership, Life, Location, LocationTheme, PlanetaryClass, Population, Region, Role, SettlementInitialContact, StarshipInitialContact, Zone } from '@game_objects'
import type { Authority } from '@game_objects/enum/Authority.js'
import type { FleetType, StarshipType } from '@game_objects/enum/StarshipType.js'
import type { AttributeKey } from '@schema'
/**
 * @public
 */
export interface AttributeMaster {
  [AttributeKey.Atmosphere]: Atmosphere
  [AttributeKey.Authority]: Authority
  [AttributeKey.Behavior]: Behavior
  [AttributeKey.DerelictType]: DerelictType
  [AttributeKey.Disposition]: Disposition
  [AttributeKey.Dominion]: Dominion
  [AttributeKey.Environment]: Environment
  [AttributeKey.FactionType]: FactionType
  [AttributeKey.FringeGroup]: FringeGroup
  [AttributeKey.Guild]: Guild
  [AttributeKey.Influence]: Influence
  [AttributeKey.InitialContact]: StarshipInitialContact | SettlementInitialContact
  [AttributeKey.Leadership]: Leadership
  [AttributeKey.Life]: Life
  [AttributeKey.Location]: Location
  [AttributeKey.LocationTheme]: LocationTheme
  [AttributeKey.PlanetaryClass]: PlanetaryClass
  [AttributeKey.Population]: Population
  [AttributeKey.Region]: Region
  [AttributeKey.Role]: Role
  [AttributeKey.CreatureScale]: CreatureScale
  [AttributeKey.Zone]: Zone
  [AttributeKey.FleetType]: FleetType
  [AttributeKey.StarshipType]: StarshipType
}
