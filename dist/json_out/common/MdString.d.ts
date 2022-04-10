/**
 * A generic string that should be parsed as Markdown.
 *
 */
declare type MdString = string;
export { MdString };
/**
 * A Markdown string for a single term - most often a single word, but a handful might be multiple words, e.g. noun phrases.
 *
 */
export declare type TermString = MdString;
/**
 * A Markdown string of multiple words that isn't a full sentence
 *
 */
export declare type FragmentString = MdString;
/**
 * A Markdown string of one sentence (occasionally two sentences), with no line breaks.
 *
 */
export declare type SentenceString = `${MdString}${"!" | "."}`;
/**
 * A Markdown string of one or more paragraphs. Unlike the other string types, it may contain line breaks, lists, headings, tables, etc.
 *
 */
export declare type ParagraphsString = SentenceString;
//# sourceMappingURL=MdString.d.ts.map