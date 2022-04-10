/**
 * A generic string that should be parsed as Markdown.
 */
type MdString = string; export { MdString };
/**
 * A Markdown string for a single term - most often a single word, but a handful might be multiple words as noun phrase or compound.
 *
 */
export type TermString = MdString;
/**
 * A Markdown string of multiple words that form a sentence fragment, but not a complete sentence.
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
 */
export type ParagraphsString = SentenceString;