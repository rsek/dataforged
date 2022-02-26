import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import IPlaceData, { PlaceType } from "../IPlaceData";
import Region from "../place/Region";
import StarshipInitialContact from "./StarshipInitialContact";

export default interface Starship<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, L, LT> {
  "Object type": PlaceType.Starship;
  "Initial Contact"?: StarshipInitialContact | undefined;
}