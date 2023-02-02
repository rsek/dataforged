import { JSONSchema7 } from 'json-schema'

const $defs: Record<string, JSONSchema7> = {

  Localizable: {
    description: 'A localizable string of plain text.',
    type: 'string'
  },
  LocalizedLabel: {
    $ref: '#/definitions/Localizable',
    description: 'A localizable string of plain text used to provide a player-facing label for this element.'
  },
  LocalizedMarkdown: {
    $ref: '#/definitions/Localizable',
    description: 'A localizable string formatted in markdown. This usually represents a direct excerpt from the source material.'
  },
  LocalizedTemplateString: {
    description: 'A localizable markdown string template where variables are provided by rolling an oracle table.',
    $ref: '#/definitions/LocalizedMarkdown'
  },
  QuestStarter: {
    description: 'A localizable markdown string describing the quest starter associated with this item.',
    $ref: '#/definitions/LocalizedMarkdown'
  },
  Summary: {
    description: "A player-facing markdown summary of the item. Summary is shorter than {@link HasDescription| Description}, when they're both present.",
    $ref: '#/definitions/LocalizedMarkdown'
  },
  Description: {
    $ref: '#/definitions/LocalizedMarkdown',
    description: 'A player-facing markdown description of the item, consisting of one or more paragraphs.'
  }

}

export default $defs
