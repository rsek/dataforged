
/**
 * Interface for metadata that describes an oracle's semantic or lexical content.
 * @date 4/4/2022 - 11:34:56 PM
 *
 * @export
 * @interface IOracleContent
 * @typedef {IOracleContent}
 */
export default interface IOracleContent {
  /**
   * The part of speech of this oracle.
   * @date 4/4/2022 - 11:34:56 PM
   *
   * @type {?(string[] | undefined)}
   */
  "Part of speech"?: string[] | undefined;
  /**
   * Any arbitrary string tags associated with this oracle.
   * @date 4/4/2022 - 11:34:56 PM
   *
   * @type {?(string[] | undefined)}
   */
  "Tags"?: string[] | undefined;
}
