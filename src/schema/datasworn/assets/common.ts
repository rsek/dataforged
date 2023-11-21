import { type TSchema, Type } from '@sinclair/typebox'
import { Dictionary } from '../utils/generic.js'
import { Suggestions } from '../common/metadata.js'
import { type TAssetAttachment } from './enhancement.js'

export function AssetPropertiesEnhanceable<Control extends TSchema>(
	controlSchema: Control
) {
	return Type.Object({
		controls: Type.Optional(
			Dictionary(controlSchema, {
				description:
					'Controls are condition meters, clocks, counters, and other asset input fields whose values are expected to change throughout the life of the asset.'
			})
		),
		suggestions: Type.Optional(Type.Ref(Suggestions)),
		count_as_impact: Type.Boolean({
			default: false,
			description:
				'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).'
		}),
		attachments: Type.Optional(
			Type.Ref<TAssetAttachment>('#/$defs/AssetAttachment')
		),
		shared: Type.Boolean({
			default: false,
			description:
				"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too."
		})
	})
}
