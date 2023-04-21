import type { OracleContent, PartOfSpeechTag } from '@schema'
// import { badJsonError } from "@utils/logging/badJsonError.js";

/**
 * Metadata that describes an oracle's semantic or lexical content.
 * @internal
 */
export class OracleContentBuilder implements OracleContent {
  part_of_speech?: PartOfSpeechTag[] | undefined
  tags?: string[] | undefined
  constructor (yaml: OracleContent) {
    // if (!(json["Part of speech"]||json["Tags"])) {
    //   throw badJsonError(this.constructor, json, "Expected OracleContent");
    // }
    this.part_of_speech = yaml.part_of_speech ?? undefined
    this.tags = yaml.tags ?? undefined
  }
}
