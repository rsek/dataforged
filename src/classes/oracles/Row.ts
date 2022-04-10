import { AttributeSetter , GameObject , MultipleRolls , OracleContent , Suggestions } from "@classes/index.js";
import type { GameObjectRecord } from "@game_objects/GameObjectRecord.js";
import type { FragmentString, IHasSubtable, ImageUrl, IMultipleRolls, IRow, IRowDisplay, OracleTableId, OracleTableRowId, Raster, RollTemplate, SentenceString,SettingTruthOptionId, TermString, Vector } from "@json_out/index.js";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { AttributeHash } from "@utils/types/AttributeHash.js";
import type { RequireKey } from "@utils/types/RequireKey.js";
import { validateRollTemplate } from "@utils/validation/validateRollTemplate.js";
import type { ISuggestionsYaml } from "@yaml_in/common/ISuggestionsYaml.js";
import type { IRowYaml } from "@yaml_in/oracles/IRowYaml.js";
import _ from "lodash-es";
import { is } from "typescript-is";

/**
 * Class representing a single row of an oracle table.
 */
export class Row implements IRow, Partial<IHasSubtable<Row>> {
  /**
   */
  $id!: OracleTableRowId | SettingTruthOptionId | null;
  Floor: number|null;
  Ceiling: number|null;
  /**
   */
  Result!: TermString | FragmentString | SentenceString;
  /**
   */
  Summary?: SentenceString | FragmentString | undefined;
  /**
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   */
  "Game objects"?: GameObject[] | undefined;
  /**
   */
  "Multiple rolls"?: MultipleRolls | undefined;
  /**
   */
  Suggestions?: Suggestions | undefined;
  /**
   */
  Attributes?: AttributeSetter | undefined;
  /**
   */
  "Roll template"?: RollTemplate<"Result"|"Summary"|"Description"|never> | undefined;
  /**
   */
  Display?: IRowDisplay;
  /**
   */
  Content?: OracleContent;
  /**
   * Creates an instance of Row.
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
      this.$id = `${parentId}/${rangeString}` as OracleTableRowId;
    }

    const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, [ "Floor", "Ceiling" ])];

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string": {
          const str = item;
          if (str.match(/http.*\.webp/)) {
            if (!this.Display) {
              this.Display = { };
            }
            if (!this.Display.Images) {
              this.Display.Images = [];
            }
            this.Display.Images.push(str as ImageUrl<Raster>);
          } else if (str.match(/http.*\.png/)) {
            if (!this.Display) {
              this.Display = { };
            }
            if (this.Display.Icon) {
              throw badJsonError(this.constructor, str, "Row already has an icon!");
            }
            this.Display.Icon = str as ImageUrl<Vector>;
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
                  this.Subtable = (value as IRowYaml[]).map(rowData => new Row(this.$id + "/Subtable", rowData));
                } else if (Array.isArray(value) && typeof value[0] === "object") {
                  this.Subtable = (value as IRow[]).map(rowData => new Row(this.$id + "/Subtable", rowData));
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
                const gameObjData = value as GameObjectRecord[];
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
                this["Roll template"] = (item as {["Roll template"]: RollTemplate<"Result"|"Summary"|"Description">})["Roll template"] as NonNullable<typeof this["Roll template"]>;
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
      }
    });
    if (!this.Result || this.Result.length === 0) {
      throw badJsonError(this.constructor, this, "Row doesn't have a result string");
    }
  }
  [x: number]: string | undefined;
  Subtable?: Row[] | undefined;
  length?: number | undefined;
  // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
  // FIXME: alternately, i could write an abstract class or something, oof.
  validateRollTemplate() {
    if (this["Roll template"]){
      return validateRollTemplate(this as RequireKey<typeof this, "Roll template">,this["Roll template"]);
    } else {
      return true;
    };
  }
}
