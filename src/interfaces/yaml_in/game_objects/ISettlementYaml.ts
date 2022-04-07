import type { PlaceType } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";
import type IPlaceYaml from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";
import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type SettlementInitialContact from "@dataforged/constants/attributes/SettlementInitialContact.js";

export default interface ISettlementYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, L, LT> {
  "Object type": PlaceType.Settlement;
  "Initial Contact"?: SettlementInitialContact | undefined
}