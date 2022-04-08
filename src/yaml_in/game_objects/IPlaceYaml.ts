
import type { PlaceType } from "@dataforged/json_out/game_objects/PlaceType.js";
import type { IGameObjectBase, Location, LocationTheme, Region } from "@dataforged/json_out/index.js";

export interface IPlaceYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IGameObjectBase {
  "Object type": PlaceType;
  Location?: L;
  Region?: R;
  "Location Theme"?: LT;
}