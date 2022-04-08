import type { DerelictType, Location, LocationTheme, PlaceType, Region, SettlementInitialContact,StarshipInitialContact } from "@dataforged/json_out/index.js";
import type { IPlaceYaml } from "@dataforged/yaml_in/index.js";

export interface IDerelictYaml<DT extends DerelictType | undefined, R extends Region | undefined, L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<R, L, LT> {
  "Object type": PlaceType.Derelict;
  "Derelict Type"?: DT;
  "Initial Contact": DT extends DerelictType.Starship ? StarshipInitialContact.Derelict : DT extends DerelictType.Settlement ? SettlementInitialContact.Derelict : "Derelict";
}