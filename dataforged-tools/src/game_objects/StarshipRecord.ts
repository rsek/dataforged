import type { GameObjectType, PlaceRecord, StarshipInitialContact } from '@game_objects'
import type { AttributeKey } from '@schema'
/**
 * @public
 */
export type StarshipRecord<K extends AttributeKey | never = never> = PlaceRecord<
GameObjectType.Starship,
K | AttributeKey.InitialContact | AttributeKey.StarshipType
> & {
  [AttributeKey.InitialContact]?: StarshipInitialContact | undefined
}

/**
 * @public
 */
export type FleetRecord<K extends AttributeKey | never = never> = PlaceRecord<
GameObjectType.Starship,
K | AttributeKey.InitialContact | AttributeKey.FleetType
> & {
  [AttributeKey.InitialContact]?: StarshipInitialContact | undefined
}
