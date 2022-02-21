import { ISuggestions } from "../../general/Suggestions";
import IRequirements from "../../general/IRequirements";
import { AttributeKey } from "../../gameobjects/GameObjectAttribute";


export default interface IOracleUsage {
  Initial?: boolean | undefined;
  Suggestions?: ISuggestions | undefined;
  Requires?: IRequirements | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  "Sets attributes"?: AttributeKey[] | undefined;
}
