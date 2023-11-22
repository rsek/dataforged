import {
	Type,
	type ObjectOptions,
	type Static,
	type TLiteral,
	type TObject,
	type TSchema
} from '@sinclair/typebox'
import { type Simplify } from 'type-fest'
import { MoveIDWildcard } from '../common/Id.js'
import { Generic, ID } from '../common/index.js'
import { MarkdownString } from '../common/Localize.js'
import { type EnhanceMany } from '../utils/generic.js'
import { Merge } from '../utils/typebox.js'
import { type MoveOutcomes, type MoveRollType } from './common.js'

const MoveBase = Type.Object({
	roll_type: Type.Ref<typeof MoveRollType>('#/$defs/MoveRollType'),
	replaces: Type.Optional(
		Type.Ref(ID.MoveID, {
			description:
				'Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.'
		})
	),
	trigger: Type.Object({
		text: Type.Ref(MarkdownString, {
			description:
				'A markdown string containing the primary trigger text for this move.\n\nSecondary trigger text (for specific stats or uses of an asset ability) may be described described in Trigger#conditions.',
			type: 'string'
		})
	}),
	text: Type.Ref(MarkdownString, {
		description: 'The complete rules text of the move.'
	}),
	outcomes: Type.Optional(
		Type.Ref<typeof MoveOutcomes>('#/$defs/MoveOutcomes')
	),
	oracles: Type.Optional(
		Type.Array(Type.Ref(ID.OracleTableID), {
			description:
				"Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement."
		})
	)
})
export type MoveBase = Static<typeof MoveBase>

export function Move<
	RollType extends TSchema,
	Trigger extends TSchema,
	Outcomes extends TSchema
>(roll_type: RollType, trigger: Trigger, outcomes: Outcomes, options = {}) {
	return Generic.Collectable(
		Type.Ref(ID.MoveID),
		Merge(
			Type.Object({ roll_type, trigger, outcomes }),
			Type.Omit(MoveBase, ['roll_type', 'outcomes', 'trigger']),
			options
		)
	)
}

export function MoveEnhancement<
	T extends TObject<{ roll_type: TLiteral<string> }>,
	TriggerEnhancement extends TObject
>(
	moveSchema: T,
	triggerEnhanceSchema: TriggerEnhancement,
	options: ObjectOptions = {}
) {
	const result = Generic.EnhanceMany(
		Type.Object({
			roll_type: moveSchema.properties.roll_type,
			trigger: Type.Optional(triggerEnhanceSchema)
		}),
		Type.Ref(MoveIDWildcard),
		options
	)

	return result
}
export type MoveEnhancement<T extends { roll_type: string }, E> = Simplify<
	EnhanceMany<Pick<T, 'roll_type'> & { trigger?: E }>
>
