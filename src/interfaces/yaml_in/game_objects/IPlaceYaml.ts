import type IGameObjectBase from "@dataforged/interfaces/json_out/common/IGameObjectBase.js";
import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Region from "@dataforged/constants/attributes/Region.js";

export enum PlaceType {
  Derelict = "Derelict",
  DerelictZone = "Derelict Zone",
  Starship = "Starship",
  Settlement = "Settlement",
  Planet = "Planet",
  PrecursorVault = "Precursor Vault"
}

export default interface IPlaceYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IGameObjectBase {
  "Object type": PlaceType;
  Location?: L;
  Region?: R;
  "Location Theme"?: LT;
}