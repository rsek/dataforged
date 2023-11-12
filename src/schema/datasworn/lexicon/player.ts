import { type Static, Type } from '@sinclair/typebox'
import { ID, Localize } from '../common/index.js'
import { Dictionary } from '../common/abstract.js'

export const Stat = Type.Object(
	{
		label: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/Stat' }
)
export type Stat = Static<typeof Stat>

export const ConditionMeter = Type.Object(
	{
		label: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/ConditionMeter' }
)
export type ConditionMeter = Static<typeof ConditionMeter>

export const Impact = Type.Object(
	{
		label: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/Impact' }
)
export type Impact = Static<typeof Impact>

export const PlayerCharacter = Type.Object(
	{
		stats: Dictionary(Stat),
		condition_meters: Dictionary(ConditionMeter),
		impacts: Dictionary(Impact)
	},
	{ $id: '#/$defs/PlayerCharacter' }
)
export type PlayerCharacter = Static<typeof PlayerCharacter>
