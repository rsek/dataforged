import t from 'ts-runtime/lib';

import MultipleRolls from "./MultipleRolls";
import IMultipleRolls from "../interfaces/IMultipleRolls";
import OracleTableId from "../OracleTableId";
import OracleTableRowId from "../OracleTableRowId";
import _ from "lodash";
import Suggestions from "../../general/Suggestions";
import UrlString from "../../general/UrlString";
import TemplateString from "../TemplateString";
import IOracleTableRow from '../interfaces/IOracleTableRow';
import IRowData from '../interfaces/IRowData';
import GameObject from '../../gameobjects/GameObject';
import GameObjectData from '../../gameobjects/GameObjectData';
import AttributeRequirements from '../../general/Attributes';
import ISuggestionsData from '../../general/interfaces/ISuggestionsData';
import { is } from 'typescript-is';
import badJsonError from '../../../utilities/buildError';
import AttributeHash from '../../gameobjects/AttributeHash';
import AttributeSetter from '../../gameobjects/AttributeSetter';

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
  "Game objects"?: GameObject[] | undefined;
  "Multiple rolls"?: MultipleRolls | undefined;
  Suggestions?: Suggestions | undefined;
  Attributes?: AttributeSetter | undefined;
  Template?: TemplateString | undefined;
  constructor(parentId: string, rowData: IRowData | IOracleTableRow) {
    // if (!is<IRowData | IOracleTableRow>(rowData)) {
    //   badJsonError(this.constructor, rowData);
    // }
    this.Floor = Array.isArray(rowData) ? rowData[0] : rowData.Floor;
    this.Ceiling = Array.isArray(rowData) ? rowData[1] : rowData.Ceiling;
    const rangeString = this.Floor == this.Ceiling ? this.Ceiling.toString() : `${this.Floor}-${this.Ceiling}`;
    this.$id = `${parentId} / ${rangeString}` as OracleTableRowId;

    let rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, ["Floor", "Ceiling"])];

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string":
          let string = item as string;
          if (is<UrlString>(string)) {
            this.Image = string as UrlString;
          }
          else if (!this.Result || this.Result?.length == 0) {
            this.Result = string;
          }
          else if (!this.Summary || this.Summary?.length == 0) {
            this.Summary = string;
          }
          else { throw new Error(`Unassignable string: ${string}`); }
          break;
        case "object":
          _.forEach(item, (value, key) => {
            switch (key as keyof OracleTableRow) {
              case "Subtable": {
                if (is<IRowData[]>(value)) {
                  this.Subtable = (value as IRowData[]).map(rowData => new OracleTableRow(this.$id + " / Subtable", rowData));
                }
                else if (is<IOracleTableRow[]>(value)) {
                  this.Subtable = (value as IOracleTableRow[]).map(rowData => new OracleTableRow(this.$id + " / Subtable", rowData));
                } else {
                  badJsonError(this, value);
                }
                break;
              }
              case "Oracle rolls": {
                if (!is<OracleTableId[]>(value)) {
                  badJsonError(this, value);
                }
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
                }
                const gameObjData = value as GameObjectData[];
                gameObjData.forEach(item => this['Game objects']?.push(new GameObject(item)));
                break;
              }
              case "Suggestions": {
                console.log("row has suggestions:", JSON.stringify(rowContents));
                let newSuggestions;
                if (Array.isArray(value)) {
                  let suggestData = _.cloneDeep(value) as ISuggestionsData[];
                  let suggestItems = suggestData.map(item => new Suggestions(item));
                  newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b));
                  console.log("merged multiple suggestions", newSuggestions);
                } else {

                  newSuggestions = new Suggestions(value);
                  console.log("single suggestion", newSuggestions);
                }
                if (!this.Suggestions) {
                  this.Suggestions = newSuggestions;
                }
                else {
                  this.Suggestions = _.merge({ ...this.Suggestions }, { ...newSuggestions });
                }
                console.log("final suggestions object", this.Suggestions);
                break;
              }
              case "Result": {
                if (typeof value != "string") {
                  badJsonError(this, value)
                }
                if (!this.Result || this.Result.length == 0) { this.Result = value as string; }
                break;
              }
              case "Summary": {
                if (typeof value != "string") {
                  badJsonError(this, value)
                }
                if (!this.Summary || this.Summary.length == 0) { this.Summary = value as string; }
                break;
              }
              case "Attributes": {
                this.Attributes = new AttributeSetter(value as AttributeHash);
                break;
              }
              case "Template": {
                if (!is<TemplateString>(value)) {
                  badJsonError(this, value);
                }
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
          break;
      }
    });
    if (this.Suggestions && Object.keys(this.Suggestions).length == 0) {
      delete this.Suggestions;
    }
    if (!this.Result || this.Result.length == 0) {
      throw new Error(`Row requires a result! data: ${JSON.stringify(arguments)}`);
    }
  }
}
