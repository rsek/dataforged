import type IGameObjectBase from "./IGameObjectBase.js";
import type Location from "./place/Location.js";
import type LocationTheme from "./place/LocationTheme.js";
import type Region from "./place/Region.js";

export enum PlaceType {
  Derelict = "Derelict",
  DerelictZone = "Derelict Zone",
  Starship = "Starship",
  Settlement = "Settlement",
  Planet = "Planet",
  PrecursorVault = "Precursor Vault"
}

export default interface IPlaceData<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IGameObjectBase {
  "Object type": PlaceType;
  Location?: L;
  Region?: R;
  "Location Theme"?: LT;
}