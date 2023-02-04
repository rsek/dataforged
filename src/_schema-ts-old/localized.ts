import { type JSONSchema7 } from 'json-schema'

const $defs: Record<string, JSONSchema7> = {
  LocalizedLabel: {
    description: 'A localizable string of plain text used to provide a player-facing label for this element.'
  },
  LocalizedTemplateString: {
    description: 'A localizable markdown string template where variables are provided by rolling an oracle table.',
  },
  QuestStarter: {
    description: 'A localizable markdown string describing the quest starter associated with this item.',
  },
  MarkdownSentences: {
    description: "A player-facing markdown summary of the item. Summary is shorter than {@link HasDescription| Description}, when they're both present.",
  },
  MarkdownParagraphs: {
    $ref: '#/$defs/LocalizedMarkdown',
    description: 'A player-facing markdown description of the item, consisting of one or more paragraphs.'
  }

}

export default $defs
