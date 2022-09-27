import type { OracleContent, PartOfSpeechTag } from "@schema";
// import { badJsonError } from "@utils/logging/badJsonError.js";

/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export class OracleContentBuilder implements OracleContent {
  "Part of speech"?: PartOfSpeechTag[] | undefined;
  "Tags"?: string[] | undefined;
  constructor(yaml: OracleContent) {
    // if (!(json["Part of speech"]||json["Tags"])) {
    //   throw badJsonError(this.constructor, json, "Expected OracleContent");
    // }
    this["Part of speech"] = yaml["Part of speech"] ?? undefined;
    this["Tags"] = yaml["Tags"] ?? undefined;
  }
}
