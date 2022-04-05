/**
 * A generic string that should be parsed as Markdown.
 * @date 4/4/2022 - 9:47:37 PM
 *
 * @typedef {MdString}
 * @TJS-type string
 */
type MdString = string; export default MdString;
/**
 * A Markdown string for a single term - most often a single word, but a handful might be multiple words, e.g. noun phrases.
 * @date 4/4/2022 - 9:47:37 PM
 *
 * @export
 * @typedef {TermString}
 * @TJS-type string
 */
export type TermString = MdString;
/**
 * A Markdown string of multiple words that isn't a full sentence
 * @date 4/4/2022 - 9:47:37 PM
 *
 * @export
 * @typedef {FragmentString}
 * @TJS-type string
 */
export type FragmentString = MdString;
/**
 * A Markdown string of one sentence (occasionally two sentences), with no line breaks.
 * @date 4/4/2022 - 9:47:37 PM
 *
 * @export
 * @typedef {SentenceString}
 * @TJS-type string
 */
export type SentenceString = `${MdString}${"!" | "."}`;
/**
 * A Markdown string of one or more paragraphs. Unlike the other string types, it may contain line breaks, lists, headings, tables, etc.
 * @date 4/4/2022 - 9:47:37 PM
 *
 * @export
 * @typedef {ParagraphsString}
 * @TJS-type string
 */
export type ParagraphsString = SentenceString;