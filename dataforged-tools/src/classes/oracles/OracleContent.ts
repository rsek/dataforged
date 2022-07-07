import type { IOracleContent, PartOfSpeechTag } from "@json_out/index.js";
// import { badJsonError } from "@utils/logging/badJsonError.js";

/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export class OracleContent implements IOracleContent {
  "Part of speech"?: PartOfSpeechTag[] | undefined;
  "Tags"?: string[] | undefined;
  constructor(json: IOracleContent) {
    // if (!(json["Part of speech"]||json["Tags"])) {
    //   throw badJsonError(this.constructor, json, "Expected IOracleContent");
    // }
    this["Part of speech"] = json["Part of speech"] ?? undefined;
    this["Tags"] = json["Tags"] ?? undefined;
  }
}
