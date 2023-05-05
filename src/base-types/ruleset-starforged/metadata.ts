import { Type, type Static } from '@sinclair/typebox'
import { Metadata, ID } from 'base-types/common'

export const Suggestions = Type.Partial(
	Type.Composite([
		Metadata.SuggestionsBase,
		Type.Object({
			encounters: Type.Array(Type.Ref(ID.EncounterStarforgedID))
		})
	]),
	{ $id: '#/$defs/Suggestions' }
)
export type Suggestions = Static<typeof Suggestions>
