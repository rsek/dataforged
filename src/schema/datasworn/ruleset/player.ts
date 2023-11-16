import { type Static, Type } from '@sinclair/typebox'
import { ID, Localize } from '../common/index.js'
import { Dictionary } from '../common/abstract.js'
import { MeterBase } from '../common/inputs.js'

export const Stat = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/Stat' }
)
export type Stat = Static<typeof Stat>

export const ConditionMeter = Type.Composite(
	[
		Type.Object({
			name: Type.Ref(Localize.Label),
			description: Type.Ref(Localize.MarkdownString)
		}),
		Type.Omit(MeterBase, ['value'])
	],
	{ $id: '#/$defs/ConditionMeter' }
)
export type ConditionMeter = Static<typeof ConditionMeter>

export const Impact = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString)
	},
	{ $id: '#/$defs/Impact' }
)
export type Impact = Static<typeof Impact>

export const ImpactCategory = Type.Object(
	{
		name: Type.Ref(Localize.Label),
		description: Type.Ref(Localize.MarkdownString),
		contents: Dictionary(Type.Ref(Impact))
	},

	{
		$id: '#/$defs/ImpactCategory'
	}
)
export type ImpactCategory = Static<typeof ImpactCategory>

export const PlayerCharacter = Type.Object(
	{
		stats: Dictionary(Type.Ref(Stat)),
		condition_meters: Dictionary(Type.Ref(ConditionMeter)),
		impacts: Dictionary(Type.Ref(ImpactCategory)) // hmm. may need a collection object to group them together
	},
	{ $id: '#/$defs/PlayerCharacter' }
)
export type PlayerCharacter = Static<typeof PlayerCharacter>

const classic: PlayerCharacter = {
	stats: {
		edge: {
			name: 'edge'
		},
		heart: {
			name: 'heart'
		},
		iron: {
			name: 'iron'
		},
		shadow: {
			name: 'shadow'
		},
		wits: {
			name: 'wits'
		}
	},
	condition_meters: {
		health: {
			name: 'health',
			min: 0,
			max: 5
		},
		spirit: {
			name: 'spirit',
			min: 0,
			max: 5
		},
		supply: {
			name: 'supply',
			min: 0,
			max: 5
		}
	},
	impacts: {
		conditions: {
      name: 'conditions',
			contents: {
				wounded: { name: 'wounded' },
				shaken: { name: 'shaken' },
				unprepared: { name: 'unprepared' },
				encumbered: { name: 'encumbered' }
			}
		},
		banes: {
      name: 'banes'
			contents: {
				maimed: { name: 'maimed' },
				corrupted: { name: 'corrupted' }
			}
		},
		burdens: {
      name: 'burdens',
			contents: {
				cursed: { name: 'cursed' },
				tormented: { name: 'tormented' }
			}
		}
	}
}
