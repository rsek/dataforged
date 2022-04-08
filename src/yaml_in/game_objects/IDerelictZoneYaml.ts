import type { DerelictType, LocationTheme, PlaceType, Zone } from "@dataforged/json_out/index.js";
import type { IPlaceYaml } from "@dataforged/yaml_in/index.js";


export interface IDerelictZoneYaml<Z extends Zone | undefined, DT extends DerelictType | undefined> extends IPlaceYaml<undefined, undefined, LocationTheme | undefined> {
  "Object type": PlaceType.DerelictZone;
  "Derelict Type"?: DT;
  Zone?: Z;
}