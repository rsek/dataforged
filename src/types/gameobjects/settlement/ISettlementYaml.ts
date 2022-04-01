import type SettlementInitialContact from "./SettlementInitialContact.js";
import type { PlaceType } from "../IPlaceYaml.js";
import type IPlaceData from "../IPlaceYaml.js";
import type Location from "../place/Location.js";
import type LocationTheme from "../place/LocationTheme.js";
import type Region from "../place/Region.js";

export default interface ISettlementYaml<R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<R, L, LT> {
  "Object type": PlaceType.Settlement;
  "Initial Contact"?: SettlementInitialContact | undefined
}