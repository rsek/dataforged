import { Type, type Static } from '@sinclair/typebox'
import { SNAKE_CASE } from 'schema/common/regex'
import { JsonEnumFromRecord } from 'typebox'

export const ChallengeRank = JsonEnumFromRecord(
	{
		1: 'Troublesome',
		2: 'Dangerous',
		3: 'Formidable',
		4: 'Extreme',
		5: 'Epic'
	},
	{
		$id: '#/$defs/ChallengeRank',
		description: 'Challenge rank, represented as an integer:'
	}
)
export type ChallengeRank = Static<typeof ChallengeRank>

export const SpecialTrackType = Type.String({
	$id: '#/$defs/SpecialTrackType',
	pattern: SNAKE_CASE.source,
	examples: [
		'bonds_track',
		'failure_track',
		'quests_legacy',
		'bonds_legacy',
		'discoveries_legacy'
	],
	description: `Special, ruleset-specific progress tracks. Usually, one exists per player character, and they persist through the life of the player character.
'Canonical' examples:
  * \`bonds_track\`, described in the Ironsworn Rulebook. For the Starforged legacy track, use \`bonds_legacy\` instead.
  * \`failure_track\`, described in Ironsworn: Delve
  * \`quests_legacy\`, \`bonds_legacy\`, and \`discoveries_legacy\`, described Ironsworn: Starforged

`
})

export type SpecialTrackType = Static<typeof SpecialTrackType>
