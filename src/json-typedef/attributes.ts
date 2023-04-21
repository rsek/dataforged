import { type SomeJTDSchemaType, type JTDSchemaType } from 'ajv/dist/core'
import type * as Types from '@base-types'

export const InputPosition: JTDSchemaType<Types.Attributes.InputPosition> = {
	enum: [
		'card_top',
		'card_bottom',
		'ability_0_bottom',
		'ability_0_right',
		'ability_1_bottom',
		'ability_1_right',
		'ability_2_bottom',
		'ability_2_right'
	]
}

export const Attribute: JTDSchemaType<
	Types.Attributes.Attribute,
	{ InputPosition: Types.Attributes.InputPosition }
> = {
	discriminator: 'attribute_type',
	mapping: {
		clock: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				min: { type: 'int16' },
				max: { type: 'int16' },
				value: { type: 'int16' } as never,
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		condition_meter: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				min: { type: 'int16' },
				max: { type: 'int16' },
				value: { type: 'int16' } as never,
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		counter: {
			properties: {
				_id: { type: 'string' as any },
				label: { type: 'string' },
				min: { type: 'int16' },
				max: { type: 'int16', nullable: true },
				value: { type: 'int16' } as never,
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		text: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				value: { type: 'string', nullable: true },
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		number_select: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				value: { nullable: true },
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		reference_select: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				value: { nullable: true },
				position: { ref: 'InputPosition', nullable: true }
			}
		},
		asset_extension_select: {
			properties: {
				_id: { type: 'string' },
				label: { type: 'string' },
				value: { nullable: true },
				position: { ref: 'InputPosition', nullable: true }
			}
		}
	}
}

export const AssetExtension: JTDSchemaType<>
