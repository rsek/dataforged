type LegacyType = 'quests' | 'bonds' | 'discoveries'

type ProgressTypeCommon = 'combat' | 'vow' | 'scene_challenge'

export type ProgressTypeStarforged = ProgressTypeCommon | 'expedition' | 'connection' | `${LegacyType}_legacy`

export type ProgressTypeClassic = ProgressTypeCommon | 'journey' | 'delve' | 'bonds_classic'

export type ChallengeRank = 1 | 2 | 3 | 4 | 5;
