import { Type } from '@sinclair/typebox'
import * as Abstract from 'schema/common/abstract.js'
import {
	ActionThemeRow,
	DescriptorFocusRow,
	OracleTableRows5,
	RollTwiceRow
} from 'schema/templates/common.js'

export const DerelictZoneTemplate = Type.Object({
	contents: Type.Object({
		areas: Type.Object({
			name: Type.String({ default: 'Area' }),
			summary: Type.String({
				default:
					'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](id:starforged/moves/exploration/undertake_an_expedition), an area can serve as a waypoint in your survey of the derelict.'
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
				Abstract.StaticRowStub({ low: 81, high: 85 }, { result: 'New zone' }),
				Abstract.StaticRowStub(
					{
						low: 86,
						high: 100
					},
					{
						result:
							'New zone via [Access](id:starforged/collections/oracles/derelicts/access)'
					}
				)
			])
		}),
		feature: Type.Object({
			name: Type.String({ default: 'Feature' }),
			summary: Type.String({
				default:
					'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.'
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
				DescriptorFocusRow({ low: 89, high: 100 })
			])
		}),
		peril: Type.Object({
			name: Type.String({ default: 'Peril' }),
			summary: Type.String({
				default:
					'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.'
			}),
			table: Type.Tuple([
				Abstract.StaticRowStub({ low: 1, high: 10 }),
				Abstract.StaticRowStub({ low: 11, high: 20 }),
				Abstract.StaticRowStub({ low: 21, high: 30 }),
				Abstract.StaticRowStub({ low: 31, high: 40 }),
				Abstract.StaticRowStub({ low: 41, high: 50 }),
				Abstract.StaticRowStub({ low: 51, high: 60 }),
				Abstract.StaticRowStub({ low: 61, high: 70 }),
				Abstract.StaticRowStub({ low: 71, high: 80 }),
				Abstract.StaticRowStub({ low: 81, high: 90 }),
				ActionThemeRow({ low: 91, high: 98 }),
				RollTwiceRow({ low: 99, high: 100 })
			])
		}),
		opportunity: Type.Object({
			name: Type.String({ default: 'Opportunity' }),
			summary: Type.String({
				default:
					'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](id:starforged/moves/exploration/undertake_an_expedition), or if you [Explore a Waypoint](id:starforged/moves/exploration/explore_a_waypoint) and find an opportunity.'
			}),
			table: OracleTableRows5
		})
	})
})
