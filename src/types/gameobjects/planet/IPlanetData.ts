import LocationTheme from "../place/LocationTheme";
import IPlaceData from "../IPlaceData";
import Region from "../place/Region";
import Atmosphere from "./Atmosphere";
import Biome from "./Biome";
import Diversity from "./Diversity";
import Life from "./Life";
import PlanetaryClass from "./PlanetaryClass";
import Tuple from "../Tuple";

export default interface IPlanetData<R extends Region | undefined, P extends PlanetaryClass | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, undefined, LT> {
  "Planetary Class"?: P;
  Life?: Life | undefined;
  Atmosphere?: Atmosphere | undefined;
  // Diversity: P extends PlanetaryClass.Vital ? ()Diversity : never;
  // Biomes: P extends PlanetaryClass.Vital ? Tuple<Biome, this["Diversity"]> : never;
}