import type { Location, LocationTheme, PlaceType, Region, StarshipInitialContact } from "@dataforged/json_out/index.js";
import type { IPlaceYaml } from "@dataforged/yaml_in/index.js";

export interface IStarshipYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, L, LT> {
  "Object type": PlaceType.Starship;
  "Initial Contact"?: StarshipInitialContact | undefined;
}