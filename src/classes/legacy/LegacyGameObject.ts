import { IGameObject, GameObjectType } from "../general/GameObject";
import LegacyRequires, { ILegacyRequires } from "./LegacyRequires";


export interface ILegacyGameObject extends Omit<IGameObject, "Requires"> {
  "Object type": GameObjectType;
  Requires?: ILegacyRequires[] | undefined;
}

export default class LegacyGameObject implements ILegacyGameObject {
  "Object type": GameObjectType;
  Requires?: LegacyRequires[] | undefined;
  constructor(json: IGameObject) {
    this.Requires = json.Requires ? json.Requires.map(item => new LegacyRequires(item)) : undefined;
  }
}