import type { GameObjectType, IPlaceRecord, StarshipInitialContact } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";
/**
 * @public
 */
export type IStarshipRecord<K extends AttributeKey|never = never> = IPlaceRecord<
GameObjectType.Starship,
K | AttributeKey.InitialContact
> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined
};