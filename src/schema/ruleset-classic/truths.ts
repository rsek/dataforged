import { Type, type Static } from '@sinclair/typebox'
import { Truths, ID } from 'schema/common'

export const WorldTruth = Type.Composite(
	[Truths.TruthBase, Type.Object({ id: Type.Ref(ID.WorldTruthID) })],
	{
		$id: '#/$defs/WorldTruth',
		description: 'A world truth category in the format used by Ironsworn.'
	}
)
export type WorldTruth = Static<typeof WorldTruth>

export const WorldTruthOption = Type.Composite(
	[
		Truths.TruthOptionBase,
		Type.Object({ id: Type.Ref(ID.WorldTruthOptionID) })
	],
	{ $id: '#/$defs/WorldTruthOption' }
)

export type WorldTruthOption = Static<typeof WorldTruthOption>
