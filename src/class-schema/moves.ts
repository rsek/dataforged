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

	@Localize.IsMarkdownParagraphs()
	text: string

	outcomes: MoveOutcomes
	trigger: Trigger<RollType>
	constructor(
		data: YamlInput<Types.Moves.Move>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		this.progress_move = data.progress_move
		this.text = data.text
		type MoveType = this['progress_move'] extends true
			? RollType.ProgressRoll
			: RollType.ActionRoll

		this.trigger = new Trigger<MoveType>(
			data.trigger as Types.Moves.Trigger<MoveType>
		)
		this.outcomes = new MoveOutcomes(data.outcomes)
	}
}

export enum RollType {
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

export class Trigger<T extends RollType> implements Types.Moves.Trigger<T> {
	@Localize.IsMarkdownPhrase()
	text: string

	@IsOptional()
	options?: Types.Moves.TriggerChoice<T>[] | undefined

	constructor(data: Types.Moves.Trigger<T>) {
		this.text = data.text
		if (data.options != null) {
			this.options = data.options.map(
				(option) => new TriggerOption<T>(option)
			) as Types.Moves.TriggerChoice<T>[]
		}
	}
}

export class TriggerOption<T extends RollType>
	implements Types.Moves.TriggerChoice<T>
{
	@Localize.IsMarkdownPhrase()
	@IsOptional()
	text?: string | undefined

	method: RollMethod | MoveOutcomeType
	roll_type: T
	using: Types.Moves.TriggerChoice<T>[]
	constructor(data: Types.Moves.TriggerChoice<T>) {
		this.text = data.text
		this.method = data.method as RollMethod | MoveOutcomeType
		this.roll_type = data.roll_type
		this.using = data.using
	}
}
