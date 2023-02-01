import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
    ProgressTrackType: {
      $ref: '#/definitions/SnakeCase',
      enum: [
        'discoveries_legacy',
        'combat',
        'expedition',
        'journey',
        'bond',
        'connection',
        'delve'
      ]
    }
  }
}

export default schema
