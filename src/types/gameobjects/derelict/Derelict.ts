import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import Place, { PlaceType } from "../Place";
import Region from "../place/Region";
import SettlementInitialContact from "../settlement/SettlementInitialContact";
import StarshipInitialContact from "../starship/StarshipInitialContact";
import DerelictType from "./DerelictType";

export default interface Derelict<DT extends DerelictType | undefined, R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends Place<R, L, LT> {
  "Object type": PlaceType.Derelict;
  "Derelict Type"?: DT;
  "Initial Contact": DT extends DerelictType.Starship ? StarshipInitialContact.Derelict : DT extends DerelictType.Settlement ? SettlementInitialContact.Derelict : "Derelict";
}