import { Type } from '@sinclair/typebox'
import * as Abstract from '../schema/common/abstract.js'
import {
	PrecursorVaultRow,
	DescriptorFocusRow
} from '../schema/templates/common.js'

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
					Abstract.StaticRowStub({ min: 1, max: 11 }),
					Abstract.StaticRowStub({ min: 12, max: 22 }),
					Abstract.StaticRowStub({ min: 23, max: 33 }),
					Abstract.StaticRowStub({ min: 34, max: 44 }),
					Abstract.StaticRowStub({ min: 45, max: 55 }),
					Abstract.StaticRowStub({ min: 56, max: 66 }),
					Abstract.StaticRowStub({ min: 67, max: 77 }),
					Abstract.StaticRowStub({ min: 78, max: 88 }),
					DescriptorFocusRow({ min: 89, max: 98 }),
					PrecursorVaultRow({ min: 99, max: 100 }, 'Orbital')
				])
			}),
			feature: Type.Object({
				name: Type.String({ default: 'Planetside Feature' }),
				table: Type.Tuple([
					Abstract.StaticRowStub({ min: 1, max: 7 }),
					Abstract.StaticRowStub({ min: 8, max: 14 }),
					Abstract.StaticRowStub({ min: 15, max: 21 }),
					Abstract.StaticRowStub({ min: 22, max: 28 }),
					Abstract.StaticRowStub({ min: 29, max: 35 }),
					Abstract.StaticRowStub({ min: 36, max: 42 }),
					Abstract.StaticRowStub({ min: 43, max: 49 }),
					Abstract.StaticRowStub({ min: 50, max: 56 }),
					Abstract.StaticRowStub({ min: 57, max: 63 }),
					Abstract.StaticRowStub({ min: 64, max: 70 }),
					Abstract.StaticRowStub({ min: 71, max: 77 }),
					Abstract.StaticRowStub({ min: 78, max: 84 }),
					Abstract.StaticRowStub({ min: 85, max: 91 }),
					DescriptorFocusRow({ min: 92, max: 98 }),
					PrecursorVaultRow({ min: 99, max: 100 }, 'Planetside')
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
