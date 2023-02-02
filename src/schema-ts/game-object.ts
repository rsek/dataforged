import { JSONSchema7 } from 'json-schema'

export const GameObject: JSONSchema7 = {
  description: 'Describes a game object, with optional required parameters (for example, a specific Location result).',
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      title: 'GameObjectType',
      enum: [
        'character',
        'creature',
        'derelict',
        'derelict_zone',
        'faction',
        'planet',
        'precursor_vault',
        'settlement',
        'starship'
      ]
    }
  }
}

const $defs: Record<string, JSONSchema7> = { GameObject }

export default $defs
