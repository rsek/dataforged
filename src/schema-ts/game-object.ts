import { JSONSchema7Definition } from 'json-schema'

export const GameObject: JSONSchema7Definition = {
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

const definitions: Record<string, JSONSchema7Definition> = { GameObject }

export default definitions
