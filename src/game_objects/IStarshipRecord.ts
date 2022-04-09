import type { IPlaceRecord, PlaceType, StarshipInitialContact } from "@game_objects/index.js";
import type { AttributeKey } from "@json_out/index.js";

export type IStarshipRecord<K extends AttributeKey|never = never> = IPlaceRecord<
PlaceType.Starship,
K | AttributeKey.InitialContact
> & {
    [AttributeKey.InitialContact]?: StarshipInitialContact | undefined
};