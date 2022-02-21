import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import Place, { PlaceType } from "../Place";
import Region from "../place/Region";
import StarshipInitialContact from "./StarshipInitialContact";

export default interface Starship<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends Place<R, L, LT> {
  "Object type": PlaceType.Starship;
  "Initial Contact"?: StarshipInitialContact | undefined;
}