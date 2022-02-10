import { IOracleRequirement, OracleRequirement } from "../oracles/OracleRequirement";


export interface IGameObject {
  // "Object type": string;
  "Object type": GameObjectType;
  Requires?: IOracleRequirement[];
}

export class GameObject implements IGameObject {
  "Object type": GameObjectType;
  Requires?: OracleRequirement[];
  /**
   * Creates an instance of GameObject.
   * @memberof GameObject
   */
  constructor(json: IGameObject) {
    this["Object type"] = json["Object type"];
    if (json.Requires) {
      this.Requires = json.Requires.map(reqData => new OracleRequirement(reqData));
    }
  }
}

export enum GameObjectType {
  PrecursorVault = "Precursor Vault",
  Derelict = "Derelict",
  Creature = "Creature",
  Settlement = "Settlement",
  Planet = "Planet",
  Starship = "Starship",
  DerelictZone = "Derelict Zone",
  PrecursorVaultSanctum = "Precursor Vault Sanctum",
  Character = "Character",
  Faction = "Faction"
}


