import { JSONSchema7 } from 'json-schema'

const schema: JSONSchema7 = {
  definitions: {
    ProgressTrackStarforgedType: {
      enum: [
        'discoveries_legacy',
        'bonds_legacy',
        'quests_legacy',
        'vow',
        'combat',
        'expedition',
        'connection',
        'scene_challenge'
      ]
    },
    ProgressTrackClassicType: {
      enum: [
        'vow',
        'combat',
        'journey',
        'bonds',
        'delve',
        'scene_challenge'
      ]
    },
    ProgressTrackType: {
      anyOf: [
        { $ref: '#/definitions/ProgressTrackStarforgedType' },
        { $ref: '#/definitions/ProgressTrackClassicType' }
      ]
    }
  }
}

export default schema
