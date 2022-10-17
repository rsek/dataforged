import type { PlaceRecord } from '@game_objects'
import type { AttributeKey, GameObjectType } from '@schema'

/**
 * @public
 */
export type PlanetRecord = PlaceRecord<
GameObjectType.Planet,
AttributeKey.Atmosphere |
AttributeKey.Life |
AttributeKey.PlanetaryClass
>
