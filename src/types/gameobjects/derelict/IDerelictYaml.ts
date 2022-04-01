import type DerelictType from "./DerelictType.js";
import type { PlaceType } from "../IPlaceYaml.js";
import type IPlaceData from "../IPlaceYaml.js";
import type Location from "../place/Location.js";
import type LocationTheme from "../place/LocationTheme.js";
import type Region from "../place/Region.js";
import type SettlementInitialContact from "../settlement/SettlementInitialContact.js";
import type StarshipInitialContact from "../starship/StarshipInitialContact.js";

export default interface IDerelictYaml<DT extends DerelictType | undefined, R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, L, LT> {
  "Object type": PlaceType.Derelict;
  "Derelict Type"?: DT;
  "Initial Contact": DT extends DerelictType.Starship ? StarshipInitialContact.Derelict : DT extends DerelictType.Settlement ? SettlementInitialContact.Derelict : "Derelict";
}