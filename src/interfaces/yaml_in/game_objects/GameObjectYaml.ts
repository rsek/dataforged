import type Behavior from "@dataforged/constants/attributes/Behavior.js";
import type DerelictType from "@dataforged/constants/attributes/DerelictType.js";
import type Disposition from "@dataforged/constants/attributes/Disposition.js";
import type Environment from "@dataforged/constants/attributes/Environment.js";
import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type PlanetaryClass from "@dataforged/constants/attributes/PlanetaryClass.js";
import type Region from "@dataforged/constants/attributes/Region.js";
import type Role from "@dataforged/constants/attributes/Role.js";
import type Scale from "@dataforged/constants/attributes/Scale.js";
import type Zone from "@dataforged/constants/attributes/Zone.js";
import type { GameObjectType } from "@dataforged/interfaces/json_out/oracles/IGameObjectBase.js";
import type ICharacterYaml from "@dataforged/interfaces/yaml_in/game_objects/ICharacterYaml.js";
import type ICreatureYaml from "@dataforged/interfaces/yaml_in/game_objects/ICreatureYaml.js";
import type IDerelictYaml from "@dataforged/interfaces/yaml_in/game_objects/IDerelictYaml.js";
import type IDerelictZoneYaml from "@dataforged/interfaces/yaml_in/game_objects/IDerelictZoneYaml.js";
import type { FactionOption } from "@dataforged/interfaces/yaml_in/game_objects/IFactionYaml.js";
import type IFactionYaml from "@dataforged/interfaces/yaml_in/game_objects/IFactionYaml.js";
import type IPlanetYaml from "@dataforged/interfaces/yaml_in/game_objects/IPlanetYaml.js";
import type IPrecursorVaultYaml from "@dataforged/interfaces/yaml_in/game_objects/IPrecursorVaultYaml.js";
import type ISettlementYaml from "@dataforged/interfaces/yaml_in/game_objects/ISettlementYaml.js";
import type IStarshipYaml from "@dataforged/interfaces/yaml_in/game_objects/IStarshipYaml.js";

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

export default GameObjectYaml;

