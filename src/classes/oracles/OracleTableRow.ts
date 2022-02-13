

import IMultipleRolls, { MultipleRolls } from "./MultipleRolls";
import { OracleTableId } from "./OracleId";
import _ from "lodash";
import { GameObject, IGameObject } from "../general/GameObject";
import { ISuggestions, Suggestions } from "../general/Suggestions";
import { UrlString } from "../general/UrlString";

export type IRowData = [number, number, ...(object | string)[]];
export type IRowRollData = [number, number];
export type IRowResultData = (object | string)[];

export interface IOracleTableRow {
  $id?: string | undefined,
  Floor: number;
  Ceiling: number;
  Result: string;
  Summary?: string | undefined;
  Image?: UrlString | undefined;
  "Oracle rolls"?: OracleTableId[] | undefined;
  Subtable?: IOracleTableRow[] | undefined;
  "Game objects"?: IGameObject[] | undefined;
  "Multiple rolls"?: IMultipleRolls | undefined;
  Suggestions?: ISuggestions | undefined;
}

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


export class OracleTableRow implements IOracleTableRow {
  $id: string;
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

  constructor(parentId: string, floor: number, ceiling: number, ...rowContents: (string | object)[]) {
    if (rowContents.length == 0) { throw new Error("Row JSON has no contents. Ensure that it isn't missing a template."); }
    this.Floor = floor;
    this.Ceiling = ceiling;
    const rangeString = this.Floor == this.Ceiling ? this.Ceiling.toString() : `${this.Floor}-${this.Ceiling}`;
    this.$id = `${parentId} / ${rangeString}`;

    this.assignString = this.assignString.bind(this);

    const gameObjects: GameObject[] = [];
    rowContents = new Array(...rowContents);

    rowContents.forEach(item => {
      switch (typeof item) {
        case "string":
          this.assignString(item);
          break;
        case "object":
          _.forEach(item, (value, key) => {
            switch (key) {
              case "Subtable":

                this.Subtable = (value as IRowData[]).map(rowData => new OracleTableRow(this.$id+" / Subtable", ...rowData));
                break;
              case "Oracle rolls":
                // TODO
                break;
              case "Multiple rolls":
                this["Multiple rolls"] = new MultipleRolls(value as IMultipleRolls);
                break;
              case "Game objects": {
                const gameObjData = value as IGameObject[];
                const newGameObjects = gameObjData.map(obj => new GameObject(obj));
                // console.log("concat objects", newGameObjects)
                gameObjects.concat(...newGameObjects);
                break;
              }
              case "Suggestions":
                this.Suggestions = new Suggestions(value as ISuggestions);
                break;
              case "Result":
                if (!this.Result || this.Result.length == 0) { this.Result = value as string; }
                break;
              case "Summary":
                if (!this.Summary || this.Summary.length == 0) { this.Summary = value as string; }
                break;
              default:
                break;
            }
          });

          break;
        default:
          throw new Error(`Row ${typeof item} not recognized: ${JSON.stringify(item)}`);
      }
    });
    if (gameObjects.length > 0) {
      this["Game objects"] = gameObjects;
    }
    if (this.Suggestions && Object.keys(this.Suggestions).length == 0) {
      // console.log("Suggestions:", this.Suggestions);
      delete this.Suggestions;
    }
    if (!this.Result || this.Result.length == 0) {
      throw new Error("Row requires a result!");
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
