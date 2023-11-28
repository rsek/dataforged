import { type Static, Type } from '@sinclair/typebox'
import * as Generic from './Generic.js'
import { StatRule } from './rules/StatRule.js'
import { ConditionMeterRule } from './rules/ConditionMeterRule.js'
import { ImpactCategory } from './rules/ImpactRule.js'
import { SpecialTrackRule } from './rules/SpecialTrackRule.js'

export * from './rules/StatRule.js'
export * from './rules/ConditionMeterRule.js'
export * from './rules/ImpactRule.js'
export * from './rules/SpecialTrackRule.js'

export const Rules = Type.Object(
	{
		stats: Generic.Dictionary(Type.Ref(StatRule, { default: undefined }), {
			description:
				'Describes the standard stats used by player characters in this ruleset.'
		}),
		condition_meters: Generic.Dictionary(
			Type.Ref(ConditionMeterRule, { default: undefined }),
			{
				description:
					'Describes the standard condition meters used by player characters in this ruleset.'
			}
		),
		impacts: Generic.Dictionary(
			Type.Ref(ImpactCategory, { default: undefined }),
			{
				description:
					'Describes the standard impacts/debilities used by player characters in this ruleset.'
			}
		),
		special_tracks: Generic.Dictionary(
			Type.Ref(SpecialTrackRule, { default: undefined }),
			{
				description:
					'Describes the special tracks used by player characters in this ruleset, like Bonds (classic Ironsworn), Failure (Delve), or Legacies (Starforged).'
			}
		)
	},
	{
		$id: '#/$defs/Rules',
		description:
			'Describes rules for player characters in this ruleset, such as stats and condition meters.'
	}
)
export type Rules = Static<typeof Rules>
export type TRules = typeof Rules

export const RulesExpansion = Type.Partial(Rules, {
	$id: '#/$defs/RulesExpansion'
})

export type RulesExpansion = Static<typeof RulesExpansion>
export type TRulesExpansion = typeof RulesExpansion
