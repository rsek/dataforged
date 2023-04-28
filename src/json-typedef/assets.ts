import type * as Types from '@base-types'
import * as JSONSchema from '@schema-json'
import { JTDSchemaType } from 'ajv/dist/core'
import {
	UnionCheckboxField,
	UnionChoicesFieldAssetExtension,
	UnionClockField,
	UnionCounterField,
	UnionChoicesFieldNumber,
	UnionSelectFieldStat,
	UnionTextField
} from 'json-typedef/inputs'
import { toJtdId, setIdRef } from 'json-typedef/utils'
import { set } from 'lodash'

export const AssetExtensionChoice: JTDSchemaType<
	Types.Abstract.ChoiceBase<Types.Assets.AssetExtension>,
	{ ID: string; Label: string; AssetExtension: Types.Assets.AssetExtension }
> = {
	properties: {
		label: { ref: 'Label' },
		value: { ref: 'AssetExtension' }
	}
}

export const AssetID = toJtdId(JSONSchema.Assets.AssetID)

export const Asset: JTDSchemaType<
	Types.Assets.Asset,
	{
		AssetAbility: Types.Assets.AssetAbility
		AssetID: string
		Label: string
		Source: Types.Metadata.Source
		MarkdownString: string
		AssetControlField: Types.Assets.AssetControlField
		AssetOptionField: Types.Assets.AssetOptionField
		AssetAttachment: Types.Assets.AssetAttachment
	}
> = {
	properties: {
		id: { ref: 'AssetID' },
		name: { ref: 'Label' },
		source: { ref: 'Source' },
		abilities: { elements: { ref: 'AssetAbility' } }
	},
	optionalProperties: {
		requirement: { ref: 'MarkdownString' },
		count_as_impact: {
			type: 'boolean',
			metadata: {
				description:
					'If `true`, this asset counts as an impact (Starforged) or a debility (classic Ironsworn).'
			}
		},
		controls: { values: { ref: 'AssetControlField' } },
		attachments: { ref: 'AssetAttachment' },
		options: { values: { ref: 'AssetOptionField' } },
		shared: {
			type: 'boolean',
			metadata: {
				description:
					"Most assets only benefit to their owner, but certain assets (like Starforged's module and command vehicle assets) are shared amongst the player's allies, too."
			}
		}
	}
}

export const AssetAttachment: JTDSchemaType<
	Types.Assets.AssetAttachment,
	{ RegularExpression: string }
> = {
	metadata: {
		description:
			'Describes which assets can be attached to this asset. The "canonical" example for this are Starforged\'s Module assets, which can be equipped by Command Vehicle assets. See p. 55 of Starforged for more info.'
	},
	properties: {
		patterns: {
			metadata: {
				description:
					'Regular expressions matching the IDs of assets that can be attached to this asset.'
			},
			elements: { ref: 'RegularExpression' }
		}
	},
	optionalProperties: {
		max: {
			type: 'uint8',
			metadata: {
				description:
					"The maximum number of attached assets. Omitted if there's no upper limit to the number of attached assets."
			}
		}
	}
}

export const AssetAbilityID = toJtdId(JSONSchema.Assets.AssetAbilityID)

export const AssetAbility: JTDSchemaType<
	Types.Assets.AssetAbility,
	{
		AssetAbilityID: string
		MarkdownString: string
		Label: string
		AssetAbilityControlField: Types.Assets.AssetAbilityControlField
		AssetOptionField: Types.Assets.AssetOptionField
		Move: Types.Moves.Move
		MoveExtension: Types.Moves.MoveExtension
		AssetExtension: Types.Assets.AssetExtension
	}
> = {
	properties: {
		id: { ref: 'AssetAbilityID' },
		text: { ref: 'MarkdownString' },
		enabled: { type: 'boolean' }
	},
	optionalProperties: {
		name: { ref: 'Label' },
		controls: { values: { ref: 'AssetAbilityControlField' } },
		options: { values: { ref: 'AssetOptionField' } },
		moves: { values: { ref: 'Move' } },
		extend_asset: { ref: 'AssetExtension' },
		extend_moves: { elements: { ref: 'MoveExtension' } }
	}
}

export const AssetAbilityControlFieldID = toJtdId(
	JSONSchema.Assets.AssetAbilityControlFieldID
)

export const AssetAbilityControlField: JTDSchemaType<
	Types.Assets.AssetAbilityControlField,
	{ AssetAbilityControlFieldID: string; Label: string }
> = {
	discriminator: 'field_type',
	mapping: {
		checkbox: setIdRef(UnionCheckboxField, 'AssetAbilityControlFieldID'),
		clock: setIdRef(UnionClockField, 'AssetAbilityControlFieldID'),
		counter: setIdRef(UnionCounterField, 'AssetAbilityControlFieldID')
	}
}

export const AssetAbilityOptionFieldID = toJtdId(
	JSONSchema.Assets.AssetAbilityOptionFieldID
)

export const AssetOptionField: JTDSchemaType<
	Types.Assets.AssetOptionField,
	{
		AssetAbilityOptionFieldID: string
		Label: string
		AssetExtension: Types.Assets.AssetExtension
		StatID: string
	}
> = {
	metadata: {
		description:
			'Asset options are fields that are usually only set once, typically when the player purchases the asset. The most common examples are the "Name" fields on companion assets. A more complex example is the choice of stats on the Devotant asset.'
	},
	discriminator: 'field_type',
	mapping: {
		// @ts-expect-error computers were a mistake
		text: setIdRef(UnionTextField, 'AssetAbilityOptionFieldID'),
		// @ts-expect-error
		select_stat: setIdRef(UnionSelectFieldStat, 'AssetAbilityOptionFieldID'),
		// @ts-expect-error
		select_number: setIdRef(
			UnionChoicesFieldNumber,
			'AssetAbilityOptionFieldID'
		),
		// @ts-expect-error
		select_asset_extension: setIdRef(
			UnionChoicesFieldAssetExtension,
			'AssetAbilityOptionFieldID'
		)
	}
}

export const AssetControlField: JTDSchemaType<
	Types.Assets.AssetControlField,
	{ AssetAbilityControlFieldID: string; Label: string }
> = {
	discriminator: 'field_type',
	metadata: {
		description:
			"Asset controls are fields that are expected to change throughout the asset's lifespan. The most common example are the condition meters on certain assets. A more complex example is the distinct mechanical modes on Ironsworn's 'Armored'."
	},
	mapping: {
		condition_meter: set(
			UnionClockField,
			'properties.id.ref',
			'AssetAbilityControlFieldID'
		),
		checkbox: set(
			UnionCheckboxField,
			'properties.id.ref',
			'AssetAbilityControlFieldID'
		),
		// @ts-expect-error oh come ON. it can't be missing field_type, it's the discriminator!!!
		select_asset_extension: set(
			UnionChoicesFieldAssetExtension,
			'properties.id.ref',
			'AssetAbilityControlFieldID'
		)
	}
}

export const AssetExtensionForeign: JTDSchemaType<
	Types.Assets.AssetExtensionForeign,
	{
		AssetID: string
		AssetAbilityControlFieldID: string
		RegularExpression: string
	}
> = {
	metadata: {
		description:
			'Describes changes applied to an asset, usually by another asset. Unchanged properties are omitted.'
	},
	properties: {
		extends: { ref: 'AssetID' },
		id: { ref: 'AssetAbilityControlFieldID' }
	},
	optionalProperties: {
		count_as_impact: { type: 'boolean' },
		attachments: {
			optionalProperties: {
				max: { type: 'uint8' },
				patterns: {
					elements: { ref: 'RegularExpression' }
				}
			}
		},
		controls: {
			metadata: {
				description:
					'Use the same key as the original control. Currently, only condition meters may be extended in this way.'
			},
			values: {
				optionalProperties: {
					max: { type: 'int8' },
					min: { type: 'int8' }
				}
			}
		}
	}
}

export const AssetExtension: JTDSchemaType<
	Types.Assets.AssetExtension,
	{ RegularExpression: string }
> = {
	metadata: {
		description:
			'Describes changes applied to an asset by its own abilities or controls. Unchanged properties are omitted.'
	},

	optionalProperties: {
		count_as_impact: { type: 'boolean' },
		attachments: {
			optionalProperties: {
				max: { type: 'uint8' },
				patterns: {
					elements: { ref: 'RegularExpression' }
				}
			}
		},
		controls: {
			metadata: {
				description:
					'Use the same key as the original control. Currently, only condition meters may be extended in this way.'
			},
			values: {
				optionalProperties: {
					max: { type: 'int8' },
					min: { type: 'int8' }
				}
			}
		}
	}
}
