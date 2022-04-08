import type DerelictType from "@dataforged/constants/attributes/DerelictType.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Zone from "@dataforged/constants/attributes/Zone.js";
import type { PlaceType } from "@dataforged/constants/PlaceType";
import type { IPlaceYaml } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";

export default interface IDerelictZoneYaml<Z extends Zone | undefined, DT extends DerelictType | undefined> extends IPlaceYaml<undefined, undefined, LocationTheme | undefined> {
  "Object type": PlaceType.DerelictZone;
  "Derelict Type"?: DT;
  Zone?: Z;
}