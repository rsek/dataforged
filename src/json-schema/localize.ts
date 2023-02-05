import { type JSONSchemaType as Schema } from 'ajv'
import { type Localize as Types } from 'src/types'

export const Label: Schema<Types.Label> = {
  type: 'string',
  description: 'A localized plain text name or label.'
}

export const MarkdownPhrase: Schema<Types.MarkdownPhrase> = {
  type: 'string',
  description: 'Localized markdown text, usually a phrase or single sentence.'
}

export const MarkdownSentences: Schema<Types.MarkdownSentences> = {
  type: 'string',
  description: 'Localized markdown text, usually a few sentences at most.'
}

export const MarkdownParagraph: Schema<Types.MarkdownParagraph> = {
  type: 'string',
  description:
    'Localized markdown text, usually one paragraph. This may included ordered or unordered lists.'
}

export const MarkdownParagraphs: Schema<Types.MarkdownParagraphs> = {
  type: 'string',
  description:
    'Localized markdown text, usually multiple paragraphs. This may include ordered or unordered lists.'
}
