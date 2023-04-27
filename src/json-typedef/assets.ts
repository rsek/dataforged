import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'
import {
	UnionCheckboxField,
	UnionAssetExtensionChoicesField,
	UnionClockField,
	UnionCounterField,
	UnionNumberChoicesField,
	UnionStatIDChoicesField,
	UnionTextField
} from 'json-typedef/inputs'

export const AssetExtensionChoice: JTDSchemaType<
	Types.Abstract.ChoiceBase<Types.Assets.AssetExtension>,
	{ ID: string; Label: string; AssetExtension: Types.Assets.AssetExtension }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { ref: 'AssetExtension' }
	}
}

export const Asset: JTDSchemaType<
	Types.Assets.Asset,
	{
		AssetAbility: Types.Assets.AssetAbility
		ID: string
		Label: string
		Source: Types.Metadata.Source
		MarkdownString: string
		AssetControlField: Types.Assets.AssetControlField
		AssetOptionField: Types.Assets.AssetOptionField
		AssetAttachment: Types.Assets.AssetAttachment
	}
> = {
	properties: {
		id: { ref: 'ID' },
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

export const AssetAbility: JTDSchemaType<
	Types.Assets.AssetAbility,
	{
		ID: string
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
		id: { ref: 'ID' },
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

export const AssetAbilityControlField: JTDSchemaType<
	Types.Assets.AssetAbilityControlField,
	{ ID: string; Label: string }
> = {
	discriminator: 'field_type',
	mapping: {
		checkbox: UnionCheckboxField,
		clock: UnionClockField,
		counter: UnionCounterField
	}
}

export const AssetOptionField: JTDSchemaType<
	Types.Assets.AssetOptionField,
	{
		ID: string
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
		text: UnionTextField,
		// @ts-expect-error
		choices_stat_id: UnionStatIDChoicesField,
		// @ts-expect-error
		choices_number: UnionNumberChoicesField,
		// @ts-expect-error
		choices_extend_asset: UnionAssetExtensionChoicesField
	}
}

export const AssetControlField: JTDSchemaType<
	Types.Assets.AssetControlField,
	{ ID: string; Label: string }
> = {
	discriminator: 'field_type',
	metadata: {
		description:
			"Asset controls are fields that are expected to change throughout the asset's lifespan. The most common example are the condition meters on certain assets. A more complex example is the distinct mechanical modes on Ironsworn's 'Armored'."
	},
	mapping: {
		condition_meter: UnionClockField,
		checkbox: UnionCheckboxField,
		// @ts-expect-error oh come ON. it can't be missing field_type, it's the discriminator!!!
		choices_extend_asset: UnionAssetExtensionChoicesField
	}
}

export const AssetExtensionForeign: JTDSchemaType<
	Types.Assets.AssetExtensionForeign,
	{ ID: string; RegularExpression: string }
> = {
	metadata: {
		description:
			'Describes changes applied to an asset, usually by another asset. Assume that unspecified/null properties are unchanged.'
	},
	properties: {
		_extends: { ref: 'ID' },
		id: { ref: 'ID' }
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
	{ ID: string; RegularExpression: string }
> = {
	metadata: {
		description:
			'Describes changes applied to an asset, usually by another asset. Assume that unspecified/null properties are unchanged.'
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
