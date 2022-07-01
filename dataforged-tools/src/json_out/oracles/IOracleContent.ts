//License: MIT
import type { PartOfSpeechTag } from "@json_out/index.js";

/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 * @public
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
