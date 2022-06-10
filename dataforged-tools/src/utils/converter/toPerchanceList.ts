import type { IOracle, IOracleBase, IOracleCategory, IRow } from "@json_out/index.js";
import { map, repeat, snakeCase } from "lodash-es";


interface OracleGeneric extends IOracleBase {
  Table?: IRow[] | undefined;
  Oracles?: IOracle[] | undefined;
  Categories?: IOracleCategory[] | undefined;
}

interface PerchanceListItem {
  odds: number;
  text: string;
  props?: Record<string, string> | undefined;
}

function deCap(str: string) {
  return str.slice(0,1).toLowerCase() + str.slice(1);
}

/**
 *
 * @param row
 */
function toPerchanceListItem(row: IRow & {Ceiling: number, Floor: number}, posTags: string[] = []) {
  const result: PerchanceListItem = {
    odds: (row.Ceiling - row.Floor) + 1,
    text: row.Result
  };

  if (!posTags.includes("proper noun")) {
    result.text = deCap(result.text);
  }


  if (row.Summary) {
    result.props = {
      summary: row.Summary
    };
  }
  return result;
}

/**
 *
 * @param data
 * @param depth
 */
function toListItemString(data: ReturnType<typeof toPerchanceListItem>, depth: number = 1) {
  const indent = "  ";
  let result = repeat(indent, depth) + data.text;
  if (data.odds !== 1) {
    result += ("^"+data.odds.toString());
  }
  if (data.props) {
    const propsStrings = map(data.props, (value, key) => {
      return repeat(indent, depth+1) + `${key} = ${value}`;
    });
    result += "\n" + propsStrings.join("\n");
  }
  return result;
}

/**
 *
 * @param data
 * @param depth
 */
export function toPerchanceList(data: IOracle & {Table: IRow[]}, depth: number = 0) {
  const indent = "  ";
  const posTags = data.Content?.["Part of speech"] ?? [];
  let result = repeat(indent, depth) + snakeCase(data.Name);
  const filtered = data.Table.filter(row => row.Floor && row.Ceiling) as (IRow & {Ceiling: number, Floor: number})[];
  const objects = filtered.map(row => toPerchanceListItem(row, row.Content?.["Part of speech"] ?? posTags ?? []) );
  const strings = objects.map(row => toListItemString(row, depth+1));
  result += "\n" + strings.join("\n");
  return result;
}


// eslint-disable-next-line no-restricted-imports
import data from "../../json/starforged/oracles.json" assert {type: "json"};

import { findById } from "@utils/md/findById.js";

const oracles = findById<IOracleCategory>(data, "Starforged/Oracles/Core").Oracles;

/**
 *
 * @param oracleCat
 * @param depth
 */
function perchanceCategory(oracleCat: IOracleCategory, depth: number = 0) {
  console.log(repeat("  ", depth) + snakeCase(oracleCat.Name));
  if (oracleCat.Oracles) {
    oracleCat.Oracles.forEach(oracle=>perchanceOracle(oracle, depth+1));
  }
  if (oracleCat.Categories) {
    oracleCat.Categories.forEach(subCat => perchanceCategory(subCat, depth+1));
  }
}

/**
 *
 * @param oracle
 * @param depth
 */
function perchanceOracle(oracle: IOracle, depth: number = 1) {
  if (oracle.Oracles) {
    console.log(repeat("  ", depth)+snakeCase(oracle.Name));
    oracle.Oracles.forEach(subOracle => perchanceOracle(subOracle, depth+1));
  }
  if (oracle.Table) {
    toPerchanceList(oracle as IOracle & {Table: IRow[]});
  }
}

oracles?.forEach(oracleCat => {
  console.log(snakeCase(oracleCat.Display.Title));
  oracleCat.Oracles?.forEach(oracle => {
    if (oracle.Oracles) {
      console.log("  " + snakeCase(oracle.Display.Title));
      oracle.Oracles.forEach(subOracle => {
        if (subOracle.Table) {
          console.log(
            toPerchanceList(subOracle as IOracle & { Table: IRow[]},2)
          );
        }
      }
      );
    }
    if (oracle.Table) {
      console.log(
        toPerchanceList(oracle as IOracle & { Table: IRow[]},1)
      );
    }
  });
});