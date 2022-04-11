import type { PartOfSpeechTag } from "@json_out/meta/PartOfSpeechTag.js";

/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 */
export interface IOracleContent {
  /**
   * The part of speech of this oracle.
   */
  "Part of speech"?: PartOfSpeechTag[] | undefined;
  /**
   * Any arbitrary string tags associated with this oracle.
   */
  "Tags"?: string[] | undefined;
}
