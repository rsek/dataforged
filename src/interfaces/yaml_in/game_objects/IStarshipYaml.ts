import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type StarshipInitialContact from "@dataforged/constants/attributes/StarshipInitialContact.js";
import type { PlaceType } from "@dataforged/constants/PlaceType";
import type { IPlaceYaml } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";

export default interface IStarshipYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, L, LT> {
  "Object type": PlaceType.Starship;
  "Initial Contact"?: StarshipInitialContact | undefined;
}