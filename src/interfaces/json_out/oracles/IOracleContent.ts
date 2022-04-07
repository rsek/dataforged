
/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 *
 */
export default interface IOracleContent {
  /**
   * The part of speech of this oracle.
   */
  "Part of speech"?: string[] | undefined;
  /**
   * Any arbitrary string tags associated with this oracle.
   */
  "Tags"?: string[] | undefined;
}
