import type { Atmosphere, Life, LocationTheme, PlanetaryClass, Region } from "@dataforged/json_out/index.js";
import type { IPlaceYaml } from "@dataforged/yaml_in/index.js";


export interface IPlanetYaml<R extends Region | undefined, P extends PlanetaryClass | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, undefined, LT> {
  "Planetary Class"?: P;
  Life?: Life | undefined;
  Atmosphere?: Atmosphere | undefined;
}