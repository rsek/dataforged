import LocationTheme from "../place/LocationTheme";
import IPlaceData from "../IPlaceYaml";
import Region from "../place/Region";
import Atmosphere from "./Atmosphere";
import Life from "./Life";
import PlanetaryClass from "./PlanetaryClass";

export default interface IPlanetData<R extends Region | undefined, P extends PlanetaryClass | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, undefined, LT> {
  "Planetary Class"?: P;
  Life?: Life | undefined;
  Atmosphere?: Atmosphere | undefined;
}