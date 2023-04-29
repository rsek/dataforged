import type * as Types from '@base-types'

import { Abstract, Localize, Metadata } from '@class-schema'
import { type SuggestionsBase } from 'class-schema/metadata'
import { type YamlInput } from 'class-schema/utils'
import { IsBoolean, IsOptional } from 'class-validator'

export class Move extends Abstract.Node implements Types.Moves.Move {
	@Metadata.IsMoveID()
	id!: string

	source!: Metadata.Source
	suggestions?: SuggestionsBase
	@IsBoolean()
	progress_move?: boolean | undefined

	@Localize.IsMarkdownString()
	text: string

	outcomes: MoveOutcomes
	trigger: Trigger<MoveRollType>
	constructor(
		data: YamlInput<Types.Moves.Move>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		this.progress_move = data.progress_move
		this.text = data.text
		type MoveType = this['progress_move'] extends true
			? MoveRollType.ProgressRoll
			: MoveRollType.ActionRoll

		this.trigger = new Trigger<MoveType>(
			data.trigger as Types.Moves.Trigger<MoveType>
		)
		this.outcomes = new MoveOutcomes(data.outcomes)
	}
}

export enum MoveRollType {
	ActionRoll = 'action_roll',
	ProgressRoll = 'progress_roll'
}

export enum RollMethod {
	Any = 'any',
	Inherit = 'inherit',
	Highest = 'highest',
	Lowest = 'lowest',
	All = 'all'
}

export enum MoveOutcomeType {
	Miss = 'miss',
	WeakHit = 'weak_hit',
	StrongHit = 'strong_hit'
}

export class MoveOutcomes implements Types.Moves.MoveOutcomes {
	miss: Types.Moves.MoveOutcomeMatchable
	weak_hit: Types.Moves.MoveOutcome
	strong_hit: Types.Moves.MoveOutcomeMatchable
	constructor(data: Types.Moves.MoveOutcomes) {
		this.miss = new MoveOutcomeMatchable(data.miss)
		this.weak_hit = new MoveOutcome(data.weak_hit)
		this.strong_hit = new MoveOutcomeMatchable(data.strong_hit)
	}
}

export class MoveOutcome implements Types.Moves.MoveOutcome {
	text: string
	constructor(data: Types.Moves.MoveOutcome) {
		this.text = data.text
	}
}

export class MoveOutcomeMatchable
	extends MoveOutcome
	implements Types.Moves.MoveOutcomeMatchable
{
	match?: MoveOutcome | undefined
	text!: string
	constructor(data: Types.Moves.MoveOutcomeMatchable) {
		super(data)
		if (data.match != null) this.match = new MoveOutcome(data.match)
	}
}

export class Trigger<T extends MoveRollType> implements Types.Moves.Trigger<T> {
	@Localize.IsMarkdownString()
	text: string

	@IsOptional()
	roll_options?: Types.Moves.TriggerRollOptionChoice<T>[] | undefined

	constructor(data: Types.Moves.Trigger<T>) {
		this.text = data.text
		if (data.roll_options != null) {
			this.roll_options = data.roll_options.map(
				(option) => new TriggerRollOption<T>(option)
			) as Types.Moves.TriggerRollOptionChoice<T>[]
		}
	}
}

export class TriggerRollOption<T extends MoveRollType>
	implements Types.Moves.TriggerRollOptionChoice<T>
{
	@Localize.IsMarkdownString()
	@IsOptional()
	text?: string | undefined

	method: RollMethod | MoveOutcomeType
	roll_type: T
	using: Types.Moves.TriggerRollOptionChoice<T>[]
	constructor(data: Types.Moves.TriggerRollOptionChoice<T>) {
		this.text = data.text
		this.method = data.method as RollMethod | MoveOutcomeType
		this.roll_type = data.roll_type
		this.using = data.using
	}
}
