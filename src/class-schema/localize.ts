import { type Localize as Types } from '@base-types'
import { IsString } from 'class-validator'
import { JSONSchema } from 'class-validator-jsonschema'

export default abstract class Localize {
	@IsString()
	@JSONSchema({
		description: 'A localized plain text name or label.'
	})
	static Label: Types.Label

	@IsString()
	@JSONSchema({
		description: 'Localized markdown text, usually a phrase or single sentence.'
	})
	static MarkdownPhrase: Types.MarkdownPhrase

	@IsString()
	@JSONSchema({
		description: 'Localized markdown text, usually a few sentences at most.'
	})
	static MarkdownSentences: Types.MarkdownSentences

	@IsString()
	@JSONSchema({
		description:
			'Localized markdown text, usually one paragraph. This may included ordered or unordered lists.'
	})
	static MarkdownParagraph: Types.MarkdownParagraph

	@IsString()
	@JSONSchema({
		description:
			'Localized markdown text, usually multiple paragraphs. This may include ordered or unordered lists.'
	})
	static MarkdownParagraphs: Types.MarkdownParagraphs
}
