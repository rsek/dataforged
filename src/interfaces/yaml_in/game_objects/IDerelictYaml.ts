import type DerelictType from "@dataforged/constants/attributes/DerelictType.js";
import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type SettlementInitialContact from "@dataforged/constants/attributes/SettlementInitialContact.js";
import type StarshipInitialContact from "@dataforged/constants/attributes/StarshipInitialContact.js";
import type { PlaceType } from "@dataforged/constants/PlaceType";
import type { IPlaceYaml } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";

export default interface IDerelictYaml<DT extends DerelictType | undefined, R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, L, LT> {
  "Object type": PlaceType.Derelict;
  "Derelict Type"?: DT;
  "Initial Contact": DT extends DerelictType.Starship ? StarshipInitialContact.Derelict : DT extends DerelictType.Settlement ? SettlementInitialContact.Derelict : "Derelict";
}