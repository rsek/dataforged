import Disposition from "./character/Disposition";
import ICharacterData from "./character/ICharacterData";
import Role from "./character/Role";
import Behavior from "./creature/Behavior";
import Environment from "./creature/Environment";
import ICreatureData from "./creature/ICreatureData";
import Scale from "./creature/Scale";
import DerelictType from "./derelict/DerelictType";
import IDerelictData from "./derelict/IDerelictData";
import IDerelictZoneData from "./derelictzone/IDerelictZoneData";
import Zone from "./derelictzone/Zone";
import IFactionData, { FactionOption } from "./faction/IFactionData";
import Location from "./place/Location";
import LocationTheme from "./place/LocationTheme";
import Region from "./place/Region";
import IPlanetData from "./planet/IPlanetData";
import PlanetaryClass from "./planet/PlanetaryClass";
import IPrecursorVaultData from "./precursorvault/IPrecursorVaultData";
import ISettlementData from "./settlement/ISettlementData";
import IStarshipData from "./starship/IStarshipData";

type GameObjectData =
  ICharacterData<Role, Disposition> |
  ICreatureData<Environment, Behavior, Scale> |
  IDerelictData<DerelictType, Region, Location, LocationTheme> |
  IDerelictZoneData<Zone, DerelictType> |
  IFactionData<FactionOption> |
  IPlanetData<Region, PlanetaryClass, LocationTheme> |
  IPrecursorVaultData<Location, LocationTheme> |
  ISettlementData<Region, Location, LocationTheme> |
  IStarshipData<Region, Location, LocationTheme>;

export default GameObjectData;

