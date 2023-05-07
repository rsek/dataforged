import { Type, type Static } from '@sinclair/typebox'
import { Truths, ID } from 'schema/common'

export const WorldTruth = Type.Object(
	{ ...Truths.TruthBase.properties, id: Type.Ref(ID.WorldTruthID) },
	{
		$id: '#/$defs/WorldTruth',
		title: 'World truth',
		description: 'A world truth category in the format used by Ironsworn.'
	}
)
export type WorldTruth = Static<typeof WorldTruth>

export const WorldTruthOption = Type.Object(
	{ ...Truths.TruthOptionBase.properties, id: Type.Ref(ID.WorldTruthOptionID) },
	{ title: 'World truth option', $id: '#/$defs/WorldTruthOption' }
)

export type WorldTruthOption = Static<typeof WorldTruthOption>
