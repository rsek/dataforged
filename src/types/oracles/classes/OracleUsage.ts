import t from 'ts-runtime/lib';
import { Suggestions } from "../../general/Suggestions";
import { Requirements } from "../../general/Requirements";
import { AttributeKey } from "../../gameobjects/GameObjectAttribute";
import IOracleUsage from '../interfaces/IOracleUsage';

export default class OracleUsage implements IOracleUsage {
  Initial?: boolean | undefined;
  // "Select table by"?: string | undefined;
  "Min rolls"?: number | undefined;
  "Max rolls"?: number | undefined;
  Repeatable?: boolean | undefined;
  Suggestions?: Suggestions | undefined;
  Requires?: Requirements | undefined;
  "Sets attributes"?: AttributeKey[] | undefined;
  constructor(json: IOracleUsage) {
    this.Initial = json.Initial;
    // this["Select table by"] = json["Select table by"];
    this["Max rolls"] = json["Max rolls"];
    this["Min rolls"] = json["Min rolls"];
    this.Repeatable = json.Repeatable;
    this.Suggestions = json.Suggestions ? new Suggestions(json.Suggestions) : undefined;
    this.Requires = json.Requires ? new Requirements(json.Requires) : undefined;
    this["Sets attributes"] = json["Sets attributes"];
  }
}
