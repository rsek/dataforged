import type * as Types from '@base-types'

import { type Schema } from 'type-fest'

export const Asset: Partial<Schema<Types.Assets.Asset, string>> = {
	shared:
		"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too.",
	count_as_impact:
		'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).',
	controls: '',
	options: '',
	requirement: ''
}

export const AssetAttachment: Partial<
	Schema<Types.Assets.AssetAttachment, string>
> & { _description: string } = {
	_description:
		'Describes which assets can be attached to this asset. The "canonical" example for this are Starforged\'s Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.',
	max: "Omitted if there's no upper limit to the number of attached assets.",
	patterns:
		'Regular expressions matching the IDs of assets that can be attached to this asset.'
}
