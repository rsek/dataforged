import { Type, type Static } from '@sinclair/typebox'
import { JsonTypeDef } from '../../../scripts/json-typedef/symbol.js'
import { Localize, Id } from '../common/index.js'
import * as Generic from '../Generic.js'
import { UnionEnumFromRecord } from '../utils/UnionEnumFromRecord.js'

export const ChallengeRank = UnionEnumFromRecord(
	{
		1: 'Troublesome',
		2: 'Dangerous',
		3: 'Formidable',
		4: 'Extreme',
		5: 'Epic'
	},
	{
		$id: 'ChallengeRank',
		description:
			'Challenge rank, represented as an integer from 1 (troublesome) to 5 (epic).'
	}
)
export type ChallengeRank = Static<typeof ChallengeRank>

export const SpecialTrackType = Type.Ref(Id.DictKey, {
	$id: 'SpecialTrackType',
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
export const ProgressTrackTypeInfo = Type.Object(
	{
		category: Type.Ref(Localize.Label, {
			description: 'A category label for progress tracks of this type.',
			examples: [
				'Vow',
				'Journey',
				'Combat',
				'Scene Challenge',
				'Expedition',
				'Connection',
				'Delve'
			]
		}),
		// TODO
		controls: Type.Optional(Generic.Dictionary(Type.Object({})))
	},
	{
		$id: 'ProgressTrackTypeInfo',
		description: 'Describes the features of a type of progress track.'
	}
)
export type ProgressTrackTypeInfo = Static<typeof ProgressTrackTypeInfo>
