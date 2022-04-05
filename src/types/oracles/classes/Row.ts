import _ from "lodash-es";
import { is } from "typescript-is";
import MultipleRolls from "./MultipleRolls.js";
import OracleContent from "./OracleContent.js";
import badJsonError from "../../../functions/logging/badJsonError.js";
import type { WithRequired } from "../../assets/WithRequired.js";
import type AttributeHash from "../../gameObjects/AttributeHash.js";
import AttributeSetter from "../../gameObjects/AttributeSetter.js";
import GameObject from "../../gameObjects/GameObject.js";
import type GameObjectData from "../../gameObjects/GameObjectYaml.js";
import type ISuggestionsYaml from "../../general/interfaces/ISuggestionsYaml.js";
import type { FragmentString, SentenceString, TermString } from "../../general/StringTypes.js";
import Suggestions from "../../general/Suggestions.js";
import type { ImageUrl, Raster, Vector } from "../../general/Url.js";
import type { SettingTruthOptionId } from "../../truths/ISettingTruthOption.js";
import validateRollTemplate from "../../truths/validateRollTemplate.js";
import type IMultipleRolls from "../interfaces/IMultipleRolls.js";
import type RollTemplate from "../interfaces/IRollTemplate.js";
import type IRow from "../interfaces/IRow.js";
import type { IRowDisplay } from "../interfaces/IRow.js";
import type IRowYaml from "../interfaces/yaml/IRowYaml.js";
import type { IRowRollYaml } from "../interfaces/yaml/IRowYaml.js";
import type OracleTableId from "../OracleTableId.js";
import type OracleTableRowId from "../OracleTableRowId.js";

/**
 * Class representing a single row of an oracle table.
 * @date 4/5/2022 - 1:01:40 AM
 *
 * @export
 * @class Row
 * @typedef {Row}
 * @implements {IRow}
 */
export default class Row implements IRow {
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {!(OracleTableRowId | SettingTruthOptionId | null)}
   */
  $id!: OracleTableRowId | SettingTruthOptionId | null;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {IRowRollYaml[0]}
   */
  Floor: IRowRollYaml[0];
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {IRowRollYaml[1]}
   */
  Ceiling: IRowRollYaml[1];
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {!(TermString | FragmentString | SentenceString)}
   */
  Result!: TermString | FragmentString | SentenceString;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(SentenceString | FragmentString | undefined)}
   */
  Summary?: SentenceString | FragmentString | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(OracleTableId[] | undefined)}
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(Row[] | undefined)}
   */
  Subtable?: Row[] | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(GameObject[] | undefined)}
   */
  "Game objects"?: GameObject[] | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(MultipleRolls | undefined)}
   */
  "Multiple rolls"?: MultipleRolls | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(Suggestions | undefined)}
   */
  Suggestions?: Suggestions | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(AttributeSetter | undefined)}
   */
  Attributes?: AttributeSetter | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?(RollTemplate<"Result"|"Summary"|"Description"|never> | undefined)}
   */
  "Roll template"?: RollTemplate<"Result"|"Summary"|"Description"|never> | undefined;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?IRowDisplay}
   */
  Display?: IRowDisplay;
  /**
   *
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @type {?OracleContent}
   */
  Content?: OracleContent;
  /**
   * Creates an instance of Row.
   * @date 4/5/2022 - 1:01:40 AM
   *
   * @constructor
   * @param {string} parentId
   * @param {(IRowYaml | IRow)} json
   */
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
          const str = item;
          if (is<ImageUrl<Raster>>(str)) {
            if (!this.Display) {
              this.Display = { };
            }
            if (!this.Display.Images) {
              this.Display.Images = [];
            }
            this.Display.Images.push(str);
          } else if (is<ImageUrl<Vector>>(str)) {
            if (!this.Display) {
              this.Display = { };
            }
            if (this.Display.Icon) {
              throw badJsonError(this.constructor, str, "Row already has an icon!");
            }
            this.Display.Icon = str;
          } else if (!this.Result || this.Result?.length === 0) {
            this.Result = str;
          } else if (!this.Summary || this.Summary?.length === 0) {
            this.Summary = str;
          } else {
            throw badJsonError(this.constructor, str, "Unable to infer string assignment");
          }
          break;
        }
        case "object": {
          if (this.Floor === null && this.Ceiling === null) {
            // null rows only exist to provide display text, so they only get strings assigned to them;
            break;
          }
          _.forEach((item as Record<string,unknown>), (value, key) => {
            switch (key as (keyof Row|"Part of speech")) {
              case "Part of speech": {
                if (!this.Content) {
                  this.Content = new OracleContent({});
                }
                this.Content["Part of speech"] = value as typeof this.Content["Part of speech"];
                break;
              }
              case "Subtable": {
                if (Array.isArray(value) && Array.isArray(value[0])) {
                  this.Subtable = (value as IRowYaml[]).map(rowData => new Row(this.$id + " / Subtable", rowData));
                } else if (Array.isArray(value) && typeof value[0] === "object") {
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
                this["Oracle rolls"] = value;
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
                  newSuggestions = new Suggestions(value as ISuggestionsYaml);
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
                if (!this.Result || this.Result.length === 0) { this.Result = value; }
                break;
              }
              case "Summary": {
                if (typeof value !== "string") {
                  throw badJsonError(this.constructor, value, "expected summary string");
                }
                if (!this.Summary || this.Summary.length === 0) { this.Summary = value; }
                break;
              }
              case "Attributes": {
                this.Attributes = new AttributeSetter(value as AttributeHash);
                break;
              }
              case "Roll template": {
                this["Roll template"] = item as NonNullable<typeof this["Roll template"]>;
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
  // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
  // FIXME: alternately, i could write an abstract class or something, oof.
  validateRollTemplate() {
    if (this["Roll template"]){
      return validateRollTemplate(this as WithRequired<typeof this, "Roll template">,this["Roll template"]);
    } else {
      return true;
    };
  }
}
