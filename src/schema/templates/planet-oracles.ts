import { Type } from '@sinclair/typebox'
import * as Abstract from 'schema/common/abstract.js'
import {
	PrecursorVaultRow,
	DescriptorFocusRow
} from 'schema/templates/common.js'

const Settlement = <T extends 'Terminus' | 'Outlands' | 'Expanse'>(region: T) =>
	Type.Object({
		name: Type.String({ default: region }),
		table: Type.Tuple([
			Abstract.StaticRowStub({ result: 'None' }),
			Abstract.StaticRowStub({ result: 'Orbital settlement' }),
			Abstract.StaticRowStub({ result: 'Planetside settlement' }),
			Abstract.StaticRowStub({ result: 'Multiple settlements' }),
			Abstract.StaticRowStub({ result: 'Settlements in conflict' })
		])
	})

export const PlanetTemplate = Type.Object({
	sample_names: Type.Array(Type.String()),
	collections: Type.Object(
		{
			settlements: Type.Object({
				name: Type.String({ default: 'Settlements' }),
				contents: Type.Object({
					terminus: Settlement('Terminus'),
					outlands: Settlement('Outlands'),
					expanse: Settlement('Expanse')
				})
			})
		},
		{ additionalProperties: true }
	),
	contents: Type.Object(
		{
			atmosphere: Type.Object({
				name: Type.String({ default: 'Atmosphere' }),
				table: Type.Tuple([
					Abstract.StaticRowStub({ result: 'None/thin' }),
					Abstract.StaticRowStub({ result: 'Toxic' }),
					Abstract.StaticRowStub({ result: 'Corrosive' }),
					Abstract.StaticRowStub({ result: 'Marginal' }),
					Abstract.StaticRowStub({ result: 'Breathable' }),
					Abstract.StaticRowStub({ result: 'Ideal' })
				])
			}),
			observed_from_space: Type.Object({
				name: Type.String({ default: 'Observed from space' }),
				table: Type.Tuple([
					Abstract.StaticRowStub({ low: 1, high: 11 }),
					Abstract.StaticRowStub({ low: 12, high: 22 }),
					Abstract.StaticRowStub({ low: 23, high: 33 }),
					Abstract.StaticRowStub({ low: 34, high: 44 }),
					Abstract.StaticRowStub({ low: 45, high: 55 }),
					Abstract.StaticRowStub({ low: 56, high: 66 }),
					Abstract.StaticRowStub({ low: 67, high: 77 }),
					Abstract.StaticRowStub({ low: 78, high: 88 }),
					DescriptorFocusRow({ low: 89, high: 98 }),
					PrecursorVaultRow({ low: 99, high: 100 }, 'Orbital')
				])
			}),
			feature: Type.Object({
				name: Type.String({ default: 'Planetside Feature' }),
				table: Type.Tuple([
					Abstract.StaticRowStub({ low: 1, high: 7 }),
					Abstract.StaticRowStub({ low: 8, high: 14 }),
					Abstract.StaticRowStub({ low: 15, high: 21 }),
					Abstract.StaticRowStub({ low: 22, high: 28 }),
					Abstract.StaticRowStub({ low: 29, high: 35 }),
					Abstract.StaticRowStub({ low: 36, high: 42 }),
					Abstract.StaticRowStub({ low: 43, high: 49 }),
					Abstract.StaticRowStub({ low: 50, high: 56 }),
					Abstract.StaticRowStub({ low: 57, high: 63 }),
					Abstract.StaticRowStub({ low: 64, high: 70 }),
					Abstract.StaticRowStub({ low: 71, high: 77 }),
					Abstract.StaticRowStub({ low: 78, high: 84 }),
					Abstract.StaticRowStub({ low: 85, high: 91 }),
					DescriptorFocusRow({ low: 92, high: 98 }),
					PrecursorVaultRow({ low: 99, high: 100 }, 'Planetside')
				])
			}),
			life: Type.Object({
				name: Type.String({ default: 'Life' }),
				table: Type.Tuple([
					Abstract.StaticRowStub({ result: 'None' }),
					Abstract.StaticRowStub({ result: 'Extinct' }),
					Abstract.StaticRowStub({ result: 'Scarce' }),
					Abstract.StaticRowStub({ result: 'Diverse' }),
					Abstract.StaticRowStub({ result: 'Bountiful' }),
					Abstract.StaticRowStub({ result: 'Overrun' })
				])
			})
		},
		{ additionalProperties: true }
	)
})
