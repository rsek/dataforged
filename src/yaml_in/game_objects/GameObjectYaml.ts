import type { Behavior } from "@dataforged/json_out/game_objects/attributes/Behavior.js";
import type { DerelictType } from "@dataforged/json_out/game_objects/attributes/DerelictType.js";
import type { Disposition } from "@dataforged/json_out/game_objects/attributes/Disposition.js";
import type { Environment } from "@dataforged/json_out/game_objects/attributes/Environment.js";
import type { Location } from "@dataforged/json_out/game_objects/attributes/Location.js";
import type { LocationTheme } from "@dataforged/json_out/game_objects/attributes/LocationTheme.js";
import type { PlanetaryClass } from "@dataforged/json_out/game_objects/attributes/PlanetaryClass.js";
import type { Role } from "@dataforged/json_out/game_objects/attributes/Role.js";
import type { Scale } from "@dataforged/json_out/game_objects/attributes/Scale.js";
import type { Zone } from "@dataforged/json_out/game_objects/attributes/Zone.js";
import type { GameObjectType, Region } from "@dataforged/json_out/index.js";
import type { ICharacterYaml } from "@dataforged/yaml_in/game_objects/ICharacterYaml.js";
import type { ICreatureYaml } from "@dataforged/yaml_in/game_objects/ICreatureYaml.js";
import type { IDerelictYaml } from "@dataforged/yaml_in/game_objects/IDerelictYaml.js";
import type { IDerelictZoneYaml } from "@dataforged/yaml_in/game_objects/IDerelictZoneYaml.js";
import type { FactionOption , IFactionYaml } from "@dataforged/yaml_in/game_objects/IFactionYaml.js";
import type { IPlanetYaml } from "@dataforged/yaml_in/game_objects/IPlanetYaml.js";
import type { IPrecursorVaultYaml } from "@dataforged/yaml_in/game_objects/IPrecursorVaultYaml.js";
import type { ISettlementYaml } from "@dataforged/yaml_in/game_objects/ISettlementYaml.js";
import type { IStarshipYaml } from "@dataforged/yaml_in/game_objects/IStarshipYaml.js";

type GameObjectYaml =
  {["Object type"]: GameObjectType} & (ICharacterYaml<Role, Disposition> |
  ICreatureYaml<Environment, Behavior, Scale> |
  IDerelictYaml<DerelictType, Region, Location, LocationTheme> |
  IDerelictZoneYaml<Zone, DerelictType> |
  IFactionYaml<FactionOption> |
  IPlanetYaml<Region, PlanetaryClass, LocationTheme> |
  IPrecursorVaultYaml<Location, LocationTheme> |
  ISettlementYaml<Region, Location, LocationTheme> |
  IStarshipYaml<Region, Location, LocationTheme>);

export { GameObjectYaml };

