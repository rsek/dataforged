/**
 * A generic string that should be parsed as Markdown.
 *
 */
type MdString = string; export default MdString;
/**
 * A Markdown string for a single term - most often a single word, but a handful might be multiple words, e.g. noun phrases.
 *
 */
export type TermString = MdString;
/**
 * A Markdown string of multiple words that isn't a full sentence
 *
 */
export type FragmentString = MdString;
/**
 * A Markdown string of one sentence (occasionally two sentences), with no line breaks.
 *
 */
export type SentenceString = `${MdString}${"!" | "."}`;
/**
 * A Markdown string of one or more paragraphs. Unlike the other string types, it may contain line breaks, lists, headings, tables, etc.
 *
 */
export type ParagraphsString = SentenceString;