import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type { PlaceType } from "@dataforged/constants/PlaceType.js";
import type { IGameObjectBase } from "@dataforged/interfaces/json_out/common/IGameObjectBase.js";

export interface IPlaceYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IGameObjectBase {
  "Object type": PlaceType;
  Location?: L;
  Region?: R;
  "Location Theme"?: LT;
}