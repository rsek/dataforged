/* eslint-disable no-console */
import { AttributeSetterBuilder, GameObjectBuilder, MultipleRollsBuilder, OracleContentBuilder, RollTemplateBuilder, SuggestionsBuilder } from "@builders";
import type { GameObjectRecord } from "@game_objects/GameObjectRecord.js";
import type { Display, GameObject, ImageUrl, MultipleRolls , OracleContent, OracleTable, OracleTableRow, Raster, RollTemplate, RowNullStub, Suggestions, Vector, YamlSimpleTableRow, YamlStub, YamlSuggestions, YamlTruthOptionStarforged } from "@schema";
import { badJsonError } from "@utils/logging/badJsonError.js";
import type { AttributeHash } from "@utils/types/AttributeHash.js";
import _ from "lodash-es";

/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export class OracleTableRowBuilder implements OracleTableRow {
  $id!: string;
  Floor: number|null;
  Ceiling: number|null;
  Result!: string;
  Summary?: string | null | undefined;
  "Oracle rolls"?: OracleTable["$id"][] | undefined;
  "Game objects"?: GameObject[] | undefined;
  "Multiple rolls"?: MultipleRolls | undefined;
  Suggestions?: Suggestions | undefined;
  Attributes?: AttributeSetterBuilder | undefined;
  "Roll template"?: RollTemplate | undefined;
  Display?: Display | undefined;
  Content?: OracleContent;
  Subtable?: OracleTableRow[] | undefined;
  /**
   * Creates an instance of Row.
   */
  constructor(parentId: string, json: YamlSimpleTableRow | YamlStub<OracleTableRow> | YamlTruthOptionStarforged) {
    let rowData = _.clone(json);
    if (Array.isArray(rowData) && (rowData as Array<unknown>).some(item => Array.isArray(item))) {
      rowData = (rowData as Array<unknown|Array<unknown>>).flat(2) as YamlSimpleTableRow;
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
      this.$id = `${parentId}/${rangeString}`;
    }

    const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, [ "Floor", "Ceiling" ])];

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string": {
          const str = item;
          if (str.match(/.*\.webp/)) {
            if (!this.Display) {
              this.Display = { };
            }
            if (!this.Display.Images) {
              this.Display.Images = [];
            }
            this.Display.Images.push(str as ImageUrl<Raster>);
          } else if (str.match(/.*\.png/)) {
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
            switch (key as (keyof OracleTableRowBuilder|"Part of speech")) {
              case "Part of speech": {
                if (!this.Content) {
                  this.Content = new OracleContentBuilder({});
                }
                this.Content["Part of speech"] = value as typeof this.Content["Part of speech"];
                break;
              }
              case "Subtable": {
                if (this.$id === null) {
                  throw new Error("Row ID is null, but it has a Subtable.");
                }
                if (Array.isArray(value) && Array.isArray(value[0])) {
                  console.log("Subtable found, building...");
                  this.Subtable = (value as YamlSimpleTableRow[]).map(rowData => new OracleTableRowBuilder(`${this.$id }/Subtable`, rowData));
                } else if (Array.isArray(value) && typeof value[0] === "object") {
                  console.log("Prebuilt subtable found, generating IDs...");
                  this.Subtable = (value as OracleTableRow[]).map(rowData => new OracleTableRowBuilder(`${this.$id }/Subtable`, rowData));
                } else {
                  throw badJsonError(this.constructor, value, "expected Row[]");
                }
                break;
              }
              case "Oracle rolls": {
                // if (!is<OracleTableId[]>(value)) {
                //   throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                // }
                if (!Array.isArray(value)) {
                  throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                }
                this["Oracle rolls"] = value;
                break;
              }
              case "Multiple rolls": {
                this["Multiple rolls"] = new MultipleRollsBuilder(value as MultipleRolls);
                break;
              }
              case "Game objects": {
                if (!this["Game objects"]) {
                  this["Game objects"] = [];
                }
                const gameObjData = value as GameObjectRecord[];
                gameObjData.forEach(item => this["Game objects"]?.push(new GameObjectBuilder(item)));
                break;
              }
              case "Suggestions": {
                // console.log("row has suggestions:", JSON.stringify(rowContents));
                let newSuggestions;
                if (Array.isArray(value)) {
                  // console.log("Received a suggestion array, merging...", value);
                  const suggestData = _.cloneDeep(value) as YamlSuggestions[];
                  const suggestItems = suggestData.map(item => new SuggestionsBuilder(item));
                  newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b));
                  // console.log("merged multiple suggestions", newSuggestions);
                } else {
                  newSuggestions = new SuggestionsBuilder(value as YamlSuggestions);
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
                if (typeof value !== "string" && value !== null) {
                  throw badJsonError(this.constructor, value, "expected summary string or null");
                }
                if (this.Summary) {
                  throw badJsonError(this.constructor, value, "A summary string was provided, but one has already been assigned.");
                }
                this.Summary = value;
                break;
              }
              case "Attributes": {
                this.Attributes = new AttributeSetterBuilder(value as AttributeHash);
                break;
              }
              case "Roll template": {
                this["Roll template"] = new RollTemplateBuilder((item as {["Roll template"]: RollTemplate})["Roll template"] as NonNullable<typeof this["Roll template"]>, this);
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
  // [x: number]: string | undefined;
  // length?: number | undefined;
  // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
  // FIXME: alternately, i could write an abstract class or something, oof.
}


/**
 * @internal
 */
export class RowNullStubBuilder implements RowNullStub {
  Floor: null = null;
  Ceiling: null = null;
  Result: string;
  Summary?: string | undefined | null;
  constructor({ Result, Summary }: YamlStub<Omit<RowNullStubBuilder, "Floor"|"Ceiling">>) {
    this.Result = Result;
    this.Summary = Summary;
  }
}