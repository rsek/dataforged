import type Atmosphere from "@dataforged/constants/attributes/Atmosphere.js";
import type Life from "@dataforged/constants/attributes/Life.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type PlanetaryClass from "@dataforged/constants/attributes/PlanetaryClass.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type { IPlaceYaml } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";

export default interface IPlanetYaml<R extends Region | undefined, P extends PlanetaryClass | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, undefined, LT> {
  "Planetary Class"?: P;
  Life?: Life | undefined;
  Atmosphere?: Atmosphere | undefined;
}