import { JSONSchema7Definition } from 'json-schema'

const definitions: Record<string, JSONSchema7Definition> = {

  ChallengeRank: {
    type: 'integer',
    description: 'A numeric challenge rank: 1 = troublesome; 2 = dangerous; 3 = formidable; 4 = extreme; 5 = epic.',
    enum: [
      1,
      2,
      3,
      4,
      5
    ]
  },
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

export default definitions
