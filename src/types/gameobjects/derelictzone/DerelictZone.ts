import DerelictType from "../derelict/DerelictType";
import LocationTheme from "../place/LocationTheme";
import Place, { PlaceType } from "../Place";
import Zone from "./Zone";

export default interface DerelictZone<Z extends Zone | undefined, DT extends DerelictType | undefined> extends Place<undefined, undefined, LocationTheme | undefined> {
  "Object type": PlaceType.DerelictZone;
  "Derelict Type"?: DT;
  Zone?: Z;
}