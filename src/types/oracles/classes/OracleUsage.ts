import t from 'ts-runtime/lib';
import Suggestions from "../../general/Suggestions";
import Requirements from "../../general/Requirements";
import IOracleUsage from '../interfaces/IOracleUsage';
import IOracleUsageData from '../interfaces/IOracleUsageData';
import { is } from 'typescript-is';
import { AttributeKey } from '../../gameobjects/IAttribute';
import IAttributeChoices from '../../gameobjects/IAttributeChoices';

export default class OracleUsage implements IOracleUsage {
  Initial?: boolean | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  Suggestions?: Suggestions | undefined;
  Requires?: Requirements | undefined;
  "Sets attributes"?: IAttributeChoices[] | undefined;
  constructor(json: IOracleUsageData) {
    // if (!is<IOracleUsageData>(json)) {
    //   throw new Error();
    // }
    this.Initial = json.Initial;
    this["Max rolls"] = json["Max rolls"];
    this["Min rolls"] = json["Min rolls"];
    this.Repeatable = json.Repeatable;
    if (json.Suggestions) {
      this.Suggestions = new Suggestions(json.Suggestions);
    }
    if (json.Requires) {
      this.Requires = new Requirements(json.Requires);
    }
    // this["Sets attributes"] = json["Sets attributes"];
  }
}
