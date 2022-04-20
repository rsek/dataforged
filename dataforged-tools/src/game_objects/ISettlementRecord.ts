import type { IPlaceRecord, PlaceType } from "@game_objects/index.js";
import type { AttributeKey, SettlementInitialContact } from "@json_out/index.js";

/**
 * @public
 */
export type ISettlementRecord<K extends AttributeKey|never = never> = IPlaceRecord<
  PlaceType.Settlement,
  AttributeKey.Authority|
  AttributeKey.Population|
  AttributeKey.InitialContact | K
> &
{
    [AttributeKey.InitialContact]?: SettlementInitialContact | undefined
};