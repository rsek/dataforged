import type { GameObjectType, PlaceRecord } from '@game_objects'
import type { AttributeKey, SettlementInitialContact } from '@schema'

/**
 * @public
 */
export type SettlementRecord<K extends AttributeKey | never = never> = PlaceRecord<
GameObjectType.Settlement,
AttributeKey.Authority |
AttributeKey.Population |
AttributeKey.InitialContact | K
> &
{
  [AttributeKey.InitialContact]?: SettlementInitialContact | undefined
}
