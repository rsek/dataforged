import LocationTheme from "./place/LocationTheme";
import Location from "./place/Location";
import Region from "./place/Region";
import IGameObjectData from "./IGameObjectData";

export enum PlaceType {
  Derelict = "Derelict",
  DerelictZone = "Derelict Zone",
  Starship = "Starship",
  Settlement = "Settlement",
  Planet = "Planet",
  PrecursorVault = "Precursor Vault"
}

export default interface Place<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IGameObjectData {
  "Object type": PlaceType;
  Location?: L;
  Region?: R;
  "Location Theme"?: LT;
}