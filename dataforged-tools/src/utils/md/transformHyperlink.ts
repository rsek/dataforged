import type { Oracle , OracleCategory } from "@classes/index.js";
import type { IOracleCategory } from "@json_out/index.js";
import { findById } from "@utils/md/findById.js";
import _ from "lodash-es";

/**
 * It replaces all the links to the moves.md file with the correct link.
 * @param md - The markdown string to be transformed.
 * @param localLinks - If true, the links will be relative to the current file.
 * @returns The original string with the links replaced.
 */
export function transformMoveLinks(md: string, localLinks: boolean = false, pathPrefix: string = "") {
  md = md.replaceAll(/\(Moves\/([^ ]+?)\/([^ ]+?)\)/g, (match: string, p1: string, p2: string) => {
    let result = match;
    if (localLinks) {
      result = `(#${p2})`;
    } else {
      result = `(${pathPrefix}moves.md#${p2})`;
    }
    return result.replaceAll("_", "-");
  });
  return md;
}

/**
 * It replaces all the links in the markdown with the replacement string.
 * @param md - The markdown string to be transformed.
 * @returns The original string with the links transformed.
 */
export function transformOracleLinks(data: IOracleCategory[], md: string, currentFile: `${string}.md`) {
  md = md.replaceAll(/\(Oracles\/([^ ]+?)\/([^ ]+?)\)/g, (match:string, p1:string, p2: string) => {
    // console.log("matched:", match);
    const oracleId = match
      .replaceAll("(", "")
      .replaceAll(")", "");
    const linkedOracle = findById<OracleCategory | Oracle>(data, oracleId);
    if (!linkedOracle) {
      throw new Error(`Unable to find linked oracle: ${oracleId}`);
    }
    let targetFile = `${_.kebabCase(p1)}.md`;
    if (currentFile === targetFile || currentFile === "oracles.md") {
      targetFile = "";
    }
    const result = `(${targetFile}#${linkedOracle.Title.Canonical.replaceAll(" ", "-")})`;

    return result.replaceAll("_", "-");
  });
  md = md.replaceAll(/\(Oracles\/([^ ]+?)\)/g, (match:string, p1:string) => {
    // console.log("matched:", match);
    const oracleId = match.replaceAll("/", "/").replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("_", " ");
    const linkedOracle = findById<OracleCategory | Oracle>(data, oracleId);
    if (!linkedOracle) {
      throw new Error(`Unable to find linked oracle: ${oracleId}`);
    }
    let targetFile: string = "";
    if (currentFile === "oracles.md") {
      targetFile = `#${linkedOracle.Title.Canonical}`.replaceAll(" ", "-");
    } else {
      targetFile = `${_.kebabCase(p1)}.md`;
    }
    const result = `(${targetFile})`.replaceAll("_", "-");
    return result;
  });

  return md;
}

