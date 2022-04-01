import type Disposition from "./character/Disposition.js";
import type ICharacterYaml from "./character/ICharacterYaml.js";
import type Role from "./character/Role.js";
import type Behavior from "./creature/Behavior.js";
import type Environment from "./creature/Environment.js";
import type ICreatureYaml from "./creature/ICreatureYaml.js";
import type Scale from "./creature/Scale.js";
import type DerelictType from "./derelict/DerelictType.js";
import type IDerelictYaml from "./derelict/IDerelictYaml.js";
import type IDerelictZoneYaml from "./derelictzone/IDerelictZoneYaml.js";
import type Zone from "./derelictzone/Zone.js";
import type { FactionOption } from "./faction/IFactionYaml.js";
import type IFactionYaml from "./faction/IFactionYaml.js";
import type Location from "./place/Location.js";
import type LocationTheme from "./place/LocationTheme.js";
import type Region from "./place/Region.js";
import type IPlanetData from "./planet/IPlanetYaml.js";
import type PlanetaryClass from "./planet/PlanetaryClass";
import type IPrecursorVaultYaml from "./precursorvault/IPrecursorVaultYaml.js";
import type ISettlementData from "./settlement/ISettlementYaml.js";
import type IStarshipData from "./starship/IStarshipYaml.js";

type GameObjectData =
  ICharacterYaml<Role, Disposition> |
  ICreatureYaml<Environment, Behavior, Scale> |
  IDerelictYaml<DerelictType, Region, Location, LocationTheme> |
  IDerelictZoneYaml<Zone, DerelictType> |
  IFactionYaml<FactionOption> |
  IPlanetData<Region, PlanetaryClass, LocationTheme> |
  IPrecursorVaultYaml<Location, LocationTheme> |
  ISettlementData<Region, Location, LocationTheme> |
  IStarshipData<Region, Location, LocationTheme>;

export default GameObjectData;

