import type Atmosphere from "./Atmosphere.js";
import type Life from "./Life.js";
import type PlanetaryClass from "./PlanetaryClass.js";
import type IPlaceData from "../IPlaceYaml.js";
import type LocationTheme from "../place/LocationTheme.js";
import type Region from "../place/Region.js";

export default interface IPlanetData<R extends Region | undefined, P extends PlanetaryClass | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, undefined, LT> {
  "Planetary Class"?: P;
  Life?: Life | undefined;
  Atmosphere?: Atmosphere | undefined;
}