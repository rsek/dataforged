import Disposition from "./character/Disposition";
import ICharacterYaml from "./character/ICharacterYaml";
import Role from "./character/Role";
import Behavior from "./creature/Behavior";
import Environment from "./creature/Environment";
import ICreatureYaml from "./creature/ICreatureYaml";
import Scale from "./creature/Scale";
import DerelictType from "./derelict/DerelictType";
import IDerelictYaml from "./derelict/IDerelictYaml";
import IDerelictZoneYaml from "./derelictzone/IDerelictZoneYaml";
import Zone from "./derelictzone/Zone";
import IFactionYaml, { FactionOption } from "./faction/IFactionYaml";
import Location from "./place/Location";
import LocationTheme from "./place/LocationTheme";
import Region from "./place/Region";
import IPlanetData from "./planet/IPlanetYaml";
import PlanetaryClass from "./planet/PlanetaryClass";
import IPrecursorVaultYaml from "./precursorvault/IPrecursorVaultYaml";
import ISettlementData from "./settlement/ISettlementYaml";
import IStarshipData from "./starship/IStarshipYaml";

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

