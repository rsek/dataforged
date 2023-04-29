import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'

/** field_type: 'condition_meter' */
export const ConditionMeterFieldStub: JTDSchemaType<
	Omit<Types.Inputs.ConditionMeterField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { type: 'int8' },
		min: { type: 'int8' },
		max: { type: 'int8' }
	}
} as const

/** field_type: 'checkbox' */
export const UnionCheckboxField: JTDSchemaType<
	Omit<Types.Inputs.CheckboxField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { type: 'boolean', nullable: true }
	}
}

/** field_type: 'clock' */
export const UnionClockField: JTDSchemaType<
	Omit<Types.Inputs.ClockField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { type: 'int8' },
		min: { type: 'int8' },
		max: { type: 'int8' }
	}
} as const

/** field_type: 'counter' */
export const UnionCounterField: JTDSchemaType<
	Omit<Types.Inputs.CounterField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { type: 'int8' },
		min: { type: 'int8' },
		max: { type: 'int8', nullable: true }
	}
} as const

/** field_type: 'text' */
export const UnionTextField: JTDSchemaType<
	Omit<Types.Inputs.TextField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' }
	},
	optionalProperties: {
		value: { type: 'string' }
	}
} as const

/** field_type: 'select_stat */
export const UnionSelectFieldStat: JTDSchemaType<
	Omit<Types.Inputs.SelectFieldStat, 'field_type'>,
	{
		ID: string
		Label: string
		PlayerStat: Types.Players.PlayerStat
	}
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					label: { ref: 'Label' },
					value: { ref: 'PlayerStat' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	},
	optionalProperties: {
		value: { ref: 'PlayerStat' }
	}
}

/** field_type: 'select_number' */
export const UnionChoicesFieldNumber: JTDSchemaType<
	Omit<Types.Inputs.SelectFieldNumber, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					label: { ref: 'Label' },
					value: { type: 'int8' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	},
	optionalProperties: {
		value: { type: 'int8' }
	}
}

/** field_type: 'select_asset_extension' */
export const UnionChoicesFieldAssetExtension: JTDSchemaType<
	Omit<Types.Inputs.SelectFieldExtendAsset, 'field_type'>,
	{ ID: string; Label: string; AssetExtension: Types.Assets.AssetExtension }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					label: { ref: 'Label' },
					value: { ref: 'AssetExtension' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	},
	optionalProperties: {
		value: { ref: 'AssetExtension' }
	}
}