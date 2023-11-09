import { Type } from '@sinclair/typebox'
import { Abstract } from '../schema/common.js'
import {
	ActionThemeRow,
	RollTwiceRow,
	DescriptorFocusRow,
	OracleTableRows5
} from '../schema/templates/common.js'

export const LocationThemeTemplate = Type.Object({
	contents: Type.Object({
		feature: Type.Object({
			name: Type.String({ default: 'Feature' }),
			summary: Type.String({
				default: 'Use this table to reveal a new aspect of the location.'
			}),
			table: Type.Tuple([
				Abstract.StaticRowStub({ min: 1, max: 8 }),
				Abstract.StaticRowStub({ min: 9, max: 16 }),
				Abstract.StaticRowStub({ min: 17, max: 24 }),
				Abstract.StaticRowStub({ min: 25, max: 32 }),
				Abstract.StaticRowStub({ min: 33, max: 40 }),
				Abstract.StaticRowStub({ min: 41, max: 48 }),
				Abstract.StaticRowStub({ min: 49, max: 56 }),
				Abstract.StaticRowStub({ min: 57, max: 64 }),
				Abstract.StaticRowStub({ min: 65, max: 72 }),
				Abstract.StaticRowStub({ min: 73, max: 80 }),
				Abstract.StaticRowStub({ min: 81, max: 88 }),
				Abstract.StaticRowStub({ min: 89, max: 96 }),
				DescriptorFocusRow({ min: 97, max: 100 })
			])
		}),
		peril: Type.Object({
			name: Type.String({ default: 'Peril' }),
			summary: Type.String({ default: '' }),
			table: Type.Tuple([
				Abstract.StaticRowStub({ min: 1, max: 9 }),
				Abstract.StaticRowStub({ min: 10, max: 18 }),
				Abstract.StaticRowStub({ min: 19, max: 27 }),
				Abstract.StaticRowStub({ min: 28, max: 36 }),
				Abstract.StaticRowStub({ min: 37, max: 45 }),
				Abstract.StaticRowStub({ min: 46, max: 54 }),
				Abstract.StaticRowStub({ min: 55, max: 63 }),
				Abstract.StaticRowStub({ min: 64, max: 72 }),
				Abstract.StaticRowStub({ min: 73, max: 81 }),
				Abstract.StaticRowStub({ min: 82, max: 90 }),
				ActionThemeRow({ min: 91, max: 98 }),
				RollTwiceRow({ min: 99, max: 100 })
			])
		}),
		opportunity: Type.Object({
			name: Type.String({ default: 'Opportunity' }),
			summary: Type.String({ default: '' }),
			table: OracleTableRows5
		})
	})
})
