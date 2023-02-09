type LegacyType = 'quests' | 'bonds' | 'discoveries'

type ProgressTypeCommon =
	| 'combat_progress'
	| 'vow_progress'
	| 'scene_challenge_progress'

export type ProgressTypeStarforged =
	| ProgressTypeCommon
	| 'expedition_progress'
	| 'connection_progress'
	| `${LegacyType}_legacy`

export type ProgressTypeClassic =
	| ProgressTypeCommon
	| 'journey_progress'
	| 'delve_progress'
	| 'bonds_progress'

export type ChallengeRank = 1 | 2 | 3 | 4 | 5
