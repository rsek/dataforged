import type { GameObjectType, PlaceRecord, StarshipInitialContact } from '@game_objects'
import type { AttributeKey } from '@schema'
/**
 * @public
 */
export type StarshipRecord<K extends AttributeKey|never = never> = PlaceRecord<
GameObjectType.Starship,
K | AttributeKey.InitialContact
> & {
  [AttributeKey.InitialContact]?: StarshipInitialContact | undefined
}
