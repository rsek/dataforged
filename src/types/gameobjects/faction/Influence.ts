
import t from 'ts-runtime/lib';
import { IAttributeBase, AttributeKey, IRequireBase } from "../GameObjectAttribute";

enum Influence {
  Forsaken = "Forsaken",
  Isolated = "Isolated",
  Localized = "Localized",
  Established = "Established",
  Notable = "Notable",
  Dominant = "Dominant",
  Inescapable = "Inescapable",
}
export default Influence;

export interface IAttributeInfluence extends IAttributeBase<Influence> {
  Key: AttributeKey.Influence;
}

export interface IRequireInfluence extends IRequireBase<IAttributeInfluence> { }