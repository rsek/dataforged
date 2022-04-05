import { is } from "typescript-is";
import badJsonError from "../../../functions/logging/badJsonError.js";
import type IOracleContent from "../interfaces/IOracleContent.js";


/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @date 4/4/2022 - 11:39:40 PM
 *
 * @export
 * @class OracleContent
 * @typedef {OracleContent}
 * @implements {IOracleContent}
 */
export default class OracleContent implements IOracleContent {
  "Part of speech"?: string[] | undefined;
  "Tags"?: string[] | undefined;
  constructor(json: IOracleContent) {
    if (!is<IOracleContent>(json)) {
      throw badJsonError(this.constructor, json, "Expected IOracleContent");
    }
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
