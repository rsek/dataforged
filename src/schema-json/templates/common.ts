import type * as Types from '@base-types'
import { type JSONSchemaType as Schema } from 'ajv'
import _ from 'lodash'
import { type OracleTableRoll } from 'class-schema/oracles'

export function staticRow<
	TLow extends number | null,
	THigh extends number | null
>(
	low: TLow,
	high: THigh,
	result: string | undefined = undefined,
	rolls: OracleTableRoll[] | undefined = undefined
): Schema<Types.Oracles.OracleTableRow<TLow, THigh>> {
	const data: Schema<Types.Oracles.OracleTableRow<TLow, THigh>> = {
		type: 'object' as any,
		required: [],
		properties: {
			low: {
				const: low
			},
			high: {
				const: high
			}
		}
	}

	if (!_.isUndefined(result)) data.properties.result = { const: result }
	if (!_.isUndefined(rolls))
		data.properties.rolls = {
			type: 'array',
			minItems: rolls.length,
			maxItems: rolls.length,
			items: rolls.map((oracleRoll) => ({
				type: 'object',
				properties: {
					oracle: { const: oracleRoll.oracle }
				}
			}))
		}

	Object.keys(data.properties).forEach((key) => data.required.push(key))
	return data
}
export function descriptorFocusRow<
	TLow extends number | null,
	THigh extends number | null
>(low: TLow, high: THigh) {
	return staticRow<TLow, THigh>(
		low,
		high,
		'[⏵Descriptor](starforged/oracles/core/descriptor) + [Focus](starforged/oracles/core/focus)',
		[
			{ oracle: 'starforged/oracles/core/descriptor' },
			{ oracle: 'starforged/oracles/core/focus' }
		]
	)
}
export function actionThemeRow<
	TLow extends number | null,
	THigh extends number | null
>(low: TLow, high: THigh) {
	return staticRow<TLow, THigh>(
		low,
		high,
		'[⏵Action](starforged/oracles/core/action) + [Theme](starforged/oracles/core/theme)',
		[
			{ oracle: 'starforged/oracles/core/action' },
			{ oracle: 'starforged/oracles/core/theme' }
		]
	)
}

export function rollTwiceRow<
	TLow extends number | null,
	THigh extends number | null
>(low: TLow, high: THigh) {
	return staticRow<TLow, THigh>(low, high, 'Roll twice', [
		{ times: 2, oracle: null }
	])
}
