import type Zone from "./Zone.js";
import type DerelictType from "../derelict/DerelictType.js";
import type { PlaceType } from "../IPlaceYaml.js";
import type IPlaceData from "../IPlaceYaml.js";
import type LocationTheme from "../place/LocationTheme.js";

export default interface IDerelictZoneYaml<Z extends Zone | undefined, DT extends DerelictType | undefined> extends IPlaceData<undefined, undefined, LocationTheme | undefined> {
  "Object type": PlaceType.DerelictZone;
  "Derelict Type"?: DT;
  Zone?: Z;
}