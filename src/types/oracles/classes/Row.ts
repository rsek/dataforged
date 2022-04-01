

import _ from "lodash-es";
import { is } from "typescript-is";
import MultipleRolls from "./MultipleRolls.js";
import badJsonError from "../../../functions/logging/badJsonError.js";
import type AttributeHash from "../../gameObjects/AttributeHash.js";
import AttributeSetter from "../../gameObjects/AttributeSetter.js";
import GameObject from "../../gameObjects/GameObject.js";
import type GameObjectData from "../../gameObjects/GameObjectYaml.js";
import type ISuggestionsYaml from "../../general/interfaces/ISuggestionsYaml.js";
import Suggestions from "../../general/Suggestions.js";
import type UrlString from "../../general/UrlString.js";
import type IMultipleRolls from "../interfaces/IMultipleRolls.js";
import type IRow from "../interfaces/IRow.js";
import type { PartOfSpeechTag } from "../interfaces/PartOfSpeechTag.js";
import type IRowYaml from "../interfaces/yaml/IRowYaml.js";
import type { IRowRollYaml } from "../interfaces/yaml/IRowYaml.js";
import type OracleTableId from "../OracleTableId.js";
import type OracleTableRowId from "../OracleTableRowId.js";
import type TemplateString from "../TemplateString.js";

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

export default class Row implements IRow {
  $id!: OracleTableRowId | null;
  Floor: IRowRollYaml[0];
  Ceiling: IRowRollYaml[1];
  Result!: string;
  Summary?: string | undefined;
  Images?: UrlString[] | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: Row[] | undefined;
  "Game objects"?: GameObject[] | undefined;
  "Multiple rolls"?: MultipleRolls | undefined;
  Suggestions?: Suggestions | undefined;
  Attributes?: AttributeSetter | undefined;
  Template?: TemplateString | undefined;
  "Part of speech"?: PartOfSpeechTag[] | undefined;
  constructor(parentId: string, json: IRowYaml | IRow) {
    let rowData = _.clone(json);
    if (Array.isArray(rowData) &&(rowData as Array<unknown>).some(item => Array.isArray(item))) {
      rowData = (rowData as Array<unknown|Array<unknown>>).flat(2) as IRowYaml;
    }
    this.Floor = Array.isArray(rowData) ? rowData[0] : rowData.Floor;
    this.Ceiling = Array.isArray(rowData) ? rowData[1] : rowData.Ceiling;
    if ((typeof this.Floor) !== (typeof this.Ceiling)) {
      throw badJsonError(this.constructor, rowData, "Floor and Ceiling must have the same type (either number or null)");
    }
    let rangeString: string;

    if (this.Floor === null && this.Ceiling === null) {
      rangeString = "--";
    } else {
      if (this.Floor === null || this.Ceiling === null) {
        throw new Error();
      }
      rangeString = this.Floor === this.Ceiling ? `${this.Ceiling}` : `${this.Floor}-${this.Ceiling}`;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.$id = `${parentId} / ${rangeString}` as OracleTableRowId;
    }

    const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, [ "Floor", "Ceiling" ])];

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string": {
          const string = item;
          if (is<UrlString>(string)) {
            if (!this.Images) {
              this.Images = [];
            }
            this.Images.push(string);
          } else if (!this.Result || this.Result?.length === 0) {
            this.Result = string;
          } else if (!this.Summary || this.Summary?.length === 0) {
            this.Summary = string;
          } else {
            throw badJsonError(this.constructor, string, "Unable to infer string assignment");
          }
          break;
        }
        case "object": {
          if (this.Floor === null && this.Ceiling === null) {
            // null rows only exist to provide display text, so they only get strings assigned to them;
            break;
          }
          _.forEach(item, (value, key) => {
            switch (key as keyof Row) {
              case "Part of speech": {
                this["Part of speech"] = value as typeof this["Part of speech"];
                break;
              }
              case "Subtable": {
                if (is<IRowYaml[]>(value)) {
                  this.Subtable = (value as IRowYaml[]).map(rowData => new Row(this.$id + " / Subtable", rowData));
                } else if (is<IRow[]>(value)) {
                  this.Subtable = (value as IRow[]).map(rowData => new Row(this.$id + " / Subtable", rowData));
                } else {
                  throw badJsonError(this.constructor, value, "expected IOracleTableRow[]");
                }
                break;
              }
              case "Oracle rolls": {
                if (!is<OracleTableId[]>(value)) {
                  throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                }
                this["Oracle rolls"] = value as OracleTableId[];
                break;
              }
              case "Multiple rolls": {
                this["Multiple rolls"] = new MultipleRolls(value as IMultipleRolls);
                break;
              }
              case "Game objects": {
                if (!this["Game objects"]) {
                  this["Game objects"] = [];
                }
                const gameObjData = value as GameObjectData[];
                gameObjData.forEach(item => this["Game objects"]?.push(new GameObject(item)));
                break;
              }
              case "Suggestions": {
                // console.log("row has suggestions:", JSON.stringify(rowContents));
                let newSuggestions;
                if (Array.isArray(value)) {
                  // console.log("Received a suggestion array, merging...", value);
                  const suggestData = _.cloneDeep(value) as ISuggestionsYaml[];
                  const suggestItems = suggestData.map(item => new Suggestions(item));
                  newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b));
                  // console.log("merged multiple suggestions", newSuggestions);
                } else {
                  newSuggestions = new Suggestions(value);
                  // console.log("single suggestion", newSuggestions);
                }
                if (!this.Suggestions) {
                  this.Suggestions = newSuggestions;
                } else {
                  this.Suggestions = _.merge({ ...this.Suggestions }, { ...newSuggestions });
                }
                // console.log("final suggestions object", this.Suggestions);
                break;
              }
              case "Result": {
                if (typeof value !== "string") {
                  throw badJsonError(this.constructor, value, "expected result string");
                }
                if (!this.Result || this.Result.length === 0) { this.Result = value as string; }
                break;
              }
              case "Summary": {
                if (typeof value !== "string") {
                  throw badJsonError(this.constructor, value, "expected summary string");
                }
                if (!this.Summary || this.Summary.length === 0) { this.Summary = value as string; }
                break;
              }
              case "Attributes": {
                this.Attributes = new AttributeSetter(value as AttributeHash);
                break;
              }
              case "Template": {
                if (!is<TemplateString>(value)) {
                  throw badJsonError(this.constructor, value, "expected TemplateString");
                }
                this.Template = value as TemplateString;
                break;
              }
              default:
                break;
            }
          });
          break;
        }
        default:
          throw badJsonError(this.constructor, item, "Unable to infer key for object");
          break;
      }
    });
    if (!this.Result || this.Result.length === 0) {
      throw badJsonError(this.constructor, this, "Row doesn't have a result string");
    }
  }
}
