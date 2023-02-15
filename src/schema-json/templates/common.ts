import { type JSONSchemaType as Schema, type PartialSchema } from 'ajv'
import { type OracleTableRow } from 'base-types/oracles'
import {
	type RollTwiceRow,
	type ActionThemeRow,
	type DescriptorFocusRow
} from 'base-types/templates/common'
import _ from 'lodash'

export function toTemplateSchema<
	T,
	S extends string,
	D extends Record<string, unknown>
>(value: T, title?: S, defaults?: D) {
	switch (true) {
		case typeof value === 'string':
		case typeof value === 'number':
		case typeof value === 'boolean': {
			// primitive value -- return as const
			const schema = {
				title,
				type: typeof value,
				const: value
			} as any as PartialSchema<T>
			return schema
		}

		case value === null: {
			return { const: null } as any as PartialSchema<T>
		}
		case Array.isArray(value): {
			return {
				title,
				type: 'array' as any,
				minItems: (value as any).length,
				maxItems: (value as any).length,
				// @ts-expect-error IDFK how to make the static check happy here
				items: (value as any).map((item) => toTemplateSchema(item))
			} as any as PartialSchema<T>
		}
		case _.isObject(value): {
			const schema = {
				title,
				type: 'object',
				required: [],
				properties: {
					_template: { type: 'string', const: title }
				}
			} as any as PartialSchema<T>
			_.forEach(value as Record<string, unknown>, (current, key) => {
				schema.required.push(key)
				schema.properties[key] = toTemplateSchema(current as any)
			})
			_.forEach(
				defaults as Record<string, unknown>,
				(defaultValue, defaultKey) => {
					if (!_.isUndefined(schema.properties[defaultKey]))
						throw new Error('Default provided for a constant value')
					schema.properties.defaultKey = {
						type: typeof defaultValue,
						default: defaultValue
					}
				}
			)
			return schema
		}
		default:
			throw new Error(
				`Couldn't parse ${JSON.stringify(
					value
				)} into a primitive, array, or plain object`
			)
	}
}

export const descriptorFocusRow: Partial<DescriptorFocusRow> = {
	result:
		'[⏵Descriptor](starforged/oracles/core/descriptor) + [Focus](starforged/oracles/core/focus)',
	rolls: [
		{ oracle: 'starforged/oracles/core/descriptor' },
		{ oracle: 'starforged/oracles/core/focus' }
	]
}

export const actionThemeRow: Partial<ActionThemeRow> = {
	result:
		'[⏵Action](starforged/oracles/core/action) + [Theme](starforged/oracles/core/theme)',
	rolls: [
		{ oracle: 'starforged/oracles/core/action' },
		{ oracle: 'starforged/oracles/core/theme' }
	]
}

export const rollTwiceRow: Partial<RollTwiceRow> = {
	result: 'Roll twice',
	rolls: [{ times: 2 }]
}
