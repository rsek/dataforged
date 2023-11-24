import {
	Type,
	type ObjectOptions,
	type Static,
	type TNull,
	type TRef,
	type TObject,
	type ObjectProperties,
	type TLiteral
} from '@sinclair/typebox'
import { ExtractLiteralFromEnum } from '../../../typebox/enum.js'
import { Generic, Id, Localize } from '../common/index.js'
import {
	type TTrigger,
	type TTriggerEnhancement,
	type Trigger
} from './Trigger.js'
import {
	MoveRollType,
	type MoveOutcomes,
	type TMoveOutcomes
} from './common.js'

const MoveBase = Type.Object({
	replaces: Type.Optional(
		Type.Ref(Id.MoveID, {
			description:
				'Indicates that this move replaces the identified move. References to the replaced move can be considered equivalent to this move.'
		})
	),
	text: Type.Ref(Localize.MarkdownString, {
		description: 'The complete rules text of the move.'
	}),
	oracles: Type.Optional(
		Type.Array(Type.Ref(Id.OracleTableID), {
			description:
				"Oracles associated with this move. It's not recommended to roll these automatically, as almost all moves present them as an option, not a requirement."
		})
	)
})

export function Move<
	RollType extends MoveRollType,
	Trigger extends TRef<TTrigger>,
	Outcomes extends TRef<TMoveOutcomes> | TNull
>(rollType: RollType, trigger: Trigger, outcomes: Outcomes, options = {}) {
	const base = Generic.Flatten([
		MoveBase,
		Type.Object({
			roll_type: ExtractLiteralFromEnum(MoveRollType, rollType),
			trigger,
			outcomes
		})
	]) as TObject<
		ObjectProperties<typeof MoveBase> & {
			roll_type: TLiteral<RollType>
			trigger: Trigger
			outcomes: Outcomes
		}
	>
	return Generic.Collectable(Type.Ref(Id.MoveID), base, options)
}
export type TMove<
	RollType extends MoveRollType,
	MoveTrigger extends TRef<TTrigger>,
	Outcomes extends TRef<TMoveOutcomes> | TNull
> = ReturnType<typeof Move<RollType, MoveTrigger, Outcomes>>

export type Move<
	RollType extends MoveRollType,
	MoveTrigger extends Trigger,
	Outcomes extends MoveOutcomes | null
> = Generic.Collectable<
	Static<typeof MoveBase> & {
		roll_type: RollType
		trigger: MoveTrigger
		outcomes: Outcomes
	}
>

export function MoveEnhancement<
	RollType extends MoveRollType,
	Trigger extends TRef<TTriggerEnhancement>
>(rollType: RollType, trigger: Trigger, options: ObjectOptions = {}) {
	const base = Type.Object({
		roll_type: ExtractLiteralFromEnum(MoveRollType, rollType),
		trigger: Type.Optional(trigger)
	})

	return Generic.EnhanceMany(base, Type.Ref(Id.MoveIDWildcard), options)
}
export type MoveEnhancement<T extends MoveRollType, E> = Generic.EnhanceMany<{
	roll_type: T
	trigger?: E
}>