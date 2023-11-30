import { Type, type Static } from '@sinclair/typebox'
import {
	Trigger,
	TriggerCondition,
	TriggerConditionEnhancement,
	TriggerEnhancement
} from './Trigger.js'
import { ActionRollMethod, type MoveOutcomes } from './common.js'
import { Move, MoveEnhancement } from './utils.js'
import * as Utils from '../Utils.js'
import { RollableValue } from '../common/RollableValues.js'

export const TriggerActionRollCondition = TriggerCondition(
	Type.Ref(ActionRollMethod),
	Type.Array(Type.Ref(RollableValue)),
	{ $id: 'TriggerActionRollCondition', title: 'TriggerActionRollCondition' }
)
export type TriggerActionRollCondition = Static<
	typeof TriggerActionRollCondition
>

export const TriggerActionRoll = Trigger(
	Type.Array(Type.Ref(TriggerActionRollCondition)),
	{
		$id: 'TriggerActionRoll',
		title: 'TriggerActionRoll',
		description:
			'Describes trigger conditions for a move that makes an action roll.'
	}
)
export type TriggerActionRoll = Static<typeof TriggerActionRoll>

export const MoveActionRoll = Move(
	'action_roll',
	Type.Ref(TriggerActionRoll),
	Type.Ref<typeof MoveOutcomes>('MoveOutcomes'),
	{
		title: 'Move (action roll)',
		description: 'A move that makes an action roll.',
		$id: 'MoveActionRoll'
	}
)

export type MoveActionRoll = Move<
	'action_roll',
	TriggerActionRoll,
	MoveOutcomes
>

export const TriggerActionRollConditionEnhancement =
	TriggerConditionEnhancement(TriggerActionRollCondition, {
		$id: 'TriggerActionRollConditionEnhancement',
		title: 'TriggerActionRollConditionEnhancement'
	})

export type TriggerActionRollConditionEnhancement = Static<
	typeof TriggerActionRollConditionEnhancement
>

export const TriggerActionRollEnhancement = TriggerEnhancement(
	Type.Array(Type.Ref(TriggerActionRollConditionEnhancement)),
	{
		$id: 'TriggerActionRollEnhancement',
		title: 'TriggerActionRollEnhancement'
	}
)
export type TriggerActionRollEnhancement = Static<
	typeof TriggerActionRollEnhancement
>

// TRIGGER: NO ROLL

export const TriggerNoRollCondition = TriggerCondition(
	Type.Null({ default: null }),
	Type.Null({ default: null }),
	{ $id: 'TriggerNoRollCondition', title: 'TriggerNoRollCondition' }
)

export type TriggerNoRollCondition = Static<typeof TriggerNoRollCondition>

export const TriggerNoRoll = Trigger(
	Utils.Nullable(Type.Array(Type.Ref(TriggerNoRollCondition))),
	{
		$id: 'TriggerNoRoll',
		title: 'TriggerNoRoll',
		description: 'Describes trigger conditions for a move that makes no rolls.'
	}
)

export type TriggerNoRoll = Static<typeof TriggerNoRoll>

export const MoveNoRoll = Move(
	'no_roll',
	Type.Ref(TriggerNoRoll),
	Type.Null({ default: null }),
	{
		$id: 'MoveNoRoll',
		description: 'A move that makes no progress rolls or action rolls.'
	}
)

export type MoveNoRoll = Static<typeof MoveNoRoll>

export const TriggerNoRollEnhancement = TriggerEnhancement(
	// triggers without rolls don't need their own condition enhancement type
	Type.Array(Type.Ref(TriggerNoRollCondition)),
	{
		$id: 'TriggerNoRollEnhancement',
		title: 'TriggerNoRollEnhancement'
	}
)
export type TriggerNoRollEnhancement = Static<typeof TriggerNoRollEnhancement>

export const MoveNoRollEnhancement = MoveEnhancement(
	'no_roll',
	Type.Ref(TriggerNoRollEnhancement),
	{
		$id: 'MoveNoRollEnhancement'
	}
)
export type MoveNoRollEnhancement = MoveEnhancement<
	'no_roll',
	TriggerNoRollEnhancement
>

export const MoveActionRollEnhancement = MoveEnhancement(
	'action_roll',
	Type.Ref(TriggerActionRollEnhancement),
	{
		$id: 'MoveActionRollEnhancement'
	}
)
export type MoveActionRollEnhancement = MoveEnhancement<
	'action_roll',
	TriggerActionRollEnhancement
>
