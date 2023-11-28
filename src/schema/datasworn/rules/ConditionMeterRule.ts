import { type Static, Type } from '@sinclair/typebox'
import { Localize } from '../common/index.js'
import * as Inputs from '../common/Inputs.js'
import * as Utils from '../Utils.js'

export const ConditionMeterRule = Utils.Assign(
	[
		Type.Object({
			description: Type.Ref(Localize.MarkdownString, {
				description: 'A description of this condition meter.'
			}),
			shared: Type.Boolean({
				default: false,
				description: 'Is this condition meter shared by all players?'
			})
		}),
		Inputs.Meter(Type.Integer({ default: 0 }), Type.Integer({ default: 5 }))
	],
	{
		$id: '#/$defs/ConditionMeterRule',
		description: 'Describes a standard player character condition meter.'
	}
)

export type ConditionMeterRule = Static<typeof ConditionMeterRule>
