import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import IPlaceData, { PlaceType } from "../IPlaceYaml";
import Region from "../place/Region";
import SettlementInitialContact from "./SettlementInitialContact";

export default interface ISettlementYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, L, LT> {
  "Object type": PlaceType.Settlement;
  "Initial Contact"?: SettlementInitialContact | undefined
}