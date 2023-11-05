import { Type } from '@sinclair/typebox'
import { Abstract } from 'schema/common.js'
import {
	ActionThemeRow,
	RollTwiceRow,
	DescriptorFocusRow,
	OracleTableRows5
} from 'schema/templates/common.js'

export const LocationThemeTemplate = Type.Object({
	contents: Type.Object({
		feature: Type.Object({
			name: Type.String({ default: 'Feature' }),
			summary: Type.String({
				default: 'Use this table to reveal a new aspect of the location.'
			}),
			table: Type.Tuple([
				Abstract.StaticRowStub({ low: 1, high: 8 }),
				Abstract.StaticRowStub({ low: 9, high: 16 }),
				Abstract.StaticRowStub({ low: 17, high: 24 }),
				Abstract.StaticRowStub({ low: 25, high: 32 }),
				Abstract.StaticRowStub({ low: 33, high: 40 }),
				Abstract.StaticRowStub({ low: 41, high: 48 }),
				Abstract.StaticRowStub({ low: 49, high: 56 }),
				Abstract.StaticRowStub({ low: 57, high: 64 }),
				Abstract.StaticRowStub({ low: 65, high: 72 }),
				Abstract.StaticRowStub({ low: 73, high: 80 }),
				Abstract.StaticRowStub({ low: 81, high: 88 }),
				Abstract.StaticRowStub({ low: 89, high: 96 }),
				DescriptorFocusRow({ low: 97, high: 100 })
			])
		}),
		peril: Type.Object({
			name: Type.String({ default: 'Peril' }),
			summary: Type.String({ default: '' }),
			table: Type.Tuple([
				Abstract.StaticRowStub({ low: 1, high: 9 }),
				Abstract.StaticRowStub({ low: 10, high: 18 }),
				Abstract.StaticRowStub({ low: 19, high: 27 }),
				Abstract.StaticRowStub({ low: 28, high: 36 }),
				Abstract.StaticRowStub({ low: 37, high: 45 }),
				Abstract.StaticRowStub({ low: 46, high: 54 }),
				Abstract.StaticRowStub({ low: 55, high: 63 }),
				Abstract.StaticRowStub({ low: 64, high: 72 }),
				Abstract.StaticRowStub({ low: 73, high: 81 }),
				Abstract.StaticRowStub({ low: 82, high: 90 }),
				ActionThemeRow({ low: 91, high: 98 }),
				RollTwiceRow({ low: 99, high: 100 })
			])
		}),
		opportunity: Type.Object({
			name: Type.String({ default: 'Opportunity' }),
			summary: Type.String({ default: '' }),
			table: OracleTableRows5
		})
	})
})
