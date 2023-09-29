import { Type, type Static } from '@sinclair/typebox'
import { SNAKE_CASE } from 'schema/common/regex'
import { JsonEnum } from 'typebox'

export const ChallengeRank = JsonEnum([1, 2, 3, 4, 5], {
	$id: '#/$defs/ChallengeRank',
	description:
		'Challenge rank, represented as a number: 1 = Troublesome, 2 = Dangerous, 3 = Formidable, 4 = Extreme, 5 = Epic'
})
export type ChallengeRank = Static<typeof ChallengeRank>

export const ProgressType = Type.String({
	$id: '#/$defs/ProgressType',
	pattern: SNAKE_CASE.source,
	default: 'progress_track',
	examples: [
		'progress_track',
		'bonds_track',
		'failure_track',
		'quests_legacy',
		'bonds_legacy',
		'discoveries_legacy'
	],
	description: `'Canonical' content uses some standardized values.

Most progress rolls use the \`progress_track\` type, which describes any standard, temporary progress track that's created and resolved by moves.

Other values used for special, permanent progress tracks:

  * \`bonds_track\`, described in the Ironsworn Rulebook
  * \`failure_track\`, described in Ironsworn: Delve
  * \`quests_legacy\`, \`bonds_legacy\`, and \`discoveries_legacy\`, described Ironsworn: Starforged

Custom values should only be used describe new kinds of permanent progress track.
`
})

export type ProgressType = Static<typeof ProgressType>
