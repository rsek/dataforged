import t from 'ts-runtime/lib';

import MultipleRolls from "./MultipleRolls";
import IMultipleRolls from "../interfaces/IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import _ from "lodash";
import { GameObjectAny } from "../../gameobjects/GameObjectAny";
import IGameObjectData from "../../gameobjects/IGameObjectData";
import { ISuggestions, Suggestions } from "../../general/Suggestions";
import { UrlString } from "../../general/UrlString";
import { Attribute, isAttribute } from "../../gameobjects/GameObjectAttribute";
import TemplateString from "../TemplateString";
import IOracleTableRow from '../interfaces/IOracleTableRow';
import IRowData from '../interfaces/IRowData';

/**
 *
 * Represents a single row of an oracle table.
 *
 * @class Row
 * @property {number} Floor The low end of the dice range for this row.
 * @property {number} Ceiling The height end of the dice range for this row.
 * @property {string} Result The primary result text for the row.
 * @property {?string} Summary Secondary information that should be presented to the user, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc)
 * @property {?Table} Subtable A table to be rolled when this row is selected. If this row references an external oracle, use the `Oracles` property instead.
 * @property {?OracleRef[]} Oracles Any additional oracle tables that should be rolled when this row is selected.
 * @property {?GameObject[]} [Game Objects] Any game objects that are explicitly pointed to by the original text. It is *not* recommended to generate them automatically - see "Peeling the Onion", p. XX.
 * @property {?Suggestions} Suggestions Recommendations for oracles and game objects that are relevant to this oracle result; non-"canon" and may be safely ignored. The intent is that these may be presented to the user as optional shortcuts. For the best gameplay experience, it is *not* recommended to roll them automatically (see "Peeling the Onion", p. XX), or even to put them 'front and centre' in the UX (a collapsible element should be preferred).
 * @property {?string} Image The URL of an image for this row.
 */


export default class OracleTableRow implements IOracleTableRow {
  $id: OracleTableRowId;
  Floor: number;
  Ceiling: number;
  Result!: string;
  Summary?: string | undefined;
  Image?: UrlString | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: OracleTableRow[] | undefined;
  "Game objects"?: GameObjectAny[] | undefined;
  "Multiple rolls"?: MultipleRolls | undefined;
  Suggestions?: Suggestions | undefined;
  Attributes?: Attribute[] | undefined;
  Template?: TemplateString | undefined;
  constructor(parentId: string, floor: number, ceiling: number, ...rowContents: (string | object)[]) {
    if (rowContents.length == 0) { throw new Error("Row JSON has no contents. Ensure that it isn't missing a template."); }
    this.Floor = floor;
    this.Ceiling = ceiling;
    const rangeString = this.Floor == this.Ceiling ? this.Ceiling.toString() : `${this.Floor}-${this.Ceiling}`;
    this.$id = `${parentId} / ${rangeString}` as OracleTableRowId;

    this.assignString = this.assignString.bind(this);

    const gameObjects: GameObjectAny[] = [];
    rowContents = new Array(...rowContents);

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string":
          this.assignString(item);
          break;
        case "object":
          _.forEach(item, (value, key) => {
            switch (key as keyof OracleTableRow) {
              case "Subtable": {

                if (Array.isArray(value[0])) {
                  this.Subtable = (value as IRowData[]).map(rowData => new OracleTableRow(this.$id + " / Subtable", ...rowData));
                }
                else {
                  this.Subtable = (value as IOracleTableRow[]).map(rowData => new OracleTableRow(this.$id + " / Subtable", rowData.Floor, rowData.Ceiling, _.omit(rowData, "Floor", "Ceiling")));
                }
                break;
              }
              case "Oracle rolls": {
                this["Oracle rolls"] = value as OracleTableId[];
                break;
              }
              case "Multiple rolls": {
                this["Multiple rolls"] = new MultipleRolls(value as IMultipleRolls);
                break;
              }
              case "Game objects": {
                if (!this['Game objects']) {
                  this['Game objects'] = [];
                  // why isn't the stuff below popuating???
                }
                if (!Array.isArray(value)) {
                  throw new Error(`Game objects key is not an array ${JSON.stringify(value)}`);
                }
                const gameObjData = value as IGameObjectData[];
                gameObjData.forEach(item => this['Game objects']?.push(new GameObject(item)));
                break;
              }
              case "Suggestions": {
                this.Suggestions = new Suggestions(value as ISuggestions);
                break;
              }
              case "Result": {
                if (!this.Result || this.Result.length == 0) { this.Result = value as string; }
                break;
              }
              case "Summary": {
                if (!this.Summary || this.Summary.length == 0) { this.Summary = value as string; }
                break;
              }
              case "Attributes": {
                // console.info("Attributes key:", JSON.stringify(value));
                if ((value as Attribute[]).some(item => !isAttribute(item))) {
                  throw new Error(`Attributes array is invalid: ${JSON.stringify(value)}`);
                }
                this.Attributes = value as Attribute[];
                break;
              }
              case "Template": {
                this.Template = value as TemplateString;
                break;
              }
              default:
                break;
            }
          });

          break;
        default:
          throw new Error(`Row ${typeof item} not recognized: ${JSON.stringify(item)}`);
      }
    });
    if (this.Suggestions && Object.keys(this.Suggestions).length == 0) {
      // console.log("Suggestions:", this.Suggestions);
      delete this.Suggestions;
    }
    if (!this.Result || this.Result.length == 0) {
      throw new Error(`Row requires a result! data: ${JSON.stringify(arguments)}`);
    }
  }

  assignString(string: string) {
    if (string.startsWith("http")) {
      this.Image = string as UrlString;
    }
    else if (!this.Result || this.Result?.length == 0) {
      this.Result = string;
    }
    else if (!this.Summary || this.Summary?.length == 0) {
      this.Summary = string;
    }
    else { throw new Error(`Unassignable string: ${string}`); }
  }
}
