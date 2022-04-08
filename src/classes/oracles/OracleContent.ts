import type { IOracleContent } from "@dataforged/json_out/index.js";
import { badJsonError } from "@dataforged/utils/logging/badJsonError.js";
import { is } from "typescript-is";

/**
 * Metadata that describes an oracle's semantic or lexical content.
 */
export class OracleContent implements IOracleContent {
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
