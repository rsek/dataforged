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
		label: { ref: 'Label' },
		value: { type: 'string', nullable: true }
	}
} as const

/** field_type: 'choices_stat_id */
export const UnionStatIDChoicesField: JTDSchemaType<
	Omit<Types.Inputs.StatIDChoicesField, 'field_type'>,
	{ ID: string; Label: string; StatID: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					id: { ref: 'ID' },
					label: { ref: 'Label' },
					value: { ref: 'StatID' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	}
}

/** field_type: 'choices_number' */
export const UnionNumberChoicesField: JTDSchemaType<
	Omit<Types.Inputs.NumberChoicesField, 'field_type'>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					id: { ref: 'ID' },
					label: { ref: 'Label' },
					value: { type: 'int8' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	}
}

/** field_type: 'choices_extend_asset' */
export const UnionAssetExtensionChoicesField: JTDSchemaType<
	Omit<Types.Inputs.AssetExtensionChoicesField, 'field_type'>,
	{ ID: string; Label: string; AssetExtension: Types.Assets.AssetExtension }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		choices: {
			values: {
				properties: {
					id: { ref: 'ID' },
					label: { ref: 'Label' },
					value: { ref: 'AssetExtension' }
				},
				optionalProperties: {
					selected: { type: 'boolean' }
				}
			}
		}
	}
}
