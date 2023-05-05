import { Type, type Static } from '@sinclair/typebox'
import { Truths, ID } from 'schema/common'
import { Squash } from 'schema/common/utils'

export const WorldTruth = Squash(
	[Truths.TruthBase, Type.Object({ id: Type.Ref(ID.WorldTruthID) })],
	{
		$id: '#/$defs/WorldTruth',
		description: 'A world truth category in the format used by Ironsworn.'
	}
)
export type WorldTruth = Static<typeof WorldTruth>

export const WorldTruthOption = Squash(
	[
		Truths.TruthOptionBase,
		Type.Object({ id: Type.Ref(ID.WorldTruthOptionID) })
	],
	{ $id: '#/$defs/WorldTruthOption' }
)

export type WorldTruthOption = Static<typeof WorldTruthOption>
