import { Type } from '@sinclair/typebox'
import * as Abstract from '../schema/common/abstract.js'
import {
	ActionThemeRow,
	DescriptorFocusRow,
	OracleTableRows5,
	RollTwiceRow
} from '../schema/templates/common.js'

export const DerelictZoneTemplate = Type.Object({
	contents: Type.Object({
		areas: Type.Object({
			name: Type.String({ default: 'Area' }),
			summary: Type.String({
				default:
					'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](id:starforged/moves/exploration/undertake_an_expedition), an area can serve as a waypoint in your survey of the derelict.'
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
				Abstract.StaticRowStub({ min: 81, max: 85 }, { result: 'New zone' }),
				Abstract.StaticRowStub(
					{
						min: 86,
						max: 100
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
				DescriptorFocusRow({ min: 89, max: 100 })
			])
		}),
		peril: Type.Object({
			name: Type.String({ default: 'Peril' }),
			summary: Type.String({
				default:
					'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.'
			}),
			table: Type.Tuple([
				Abstract.StaticRowStub({ min: 1, max: 10 }),
				Abstract.StaticRowStub({ min: 11, max: 20 }),
				Abstract.StaticRowStub({ min: 21, max: 30 }),
				Abstract.StaticRowStub({ min: 31, max: 40 }),
				Abstract.StaticRowStub({ min: 41, max: 50 }),
				Abstract.StaticRowStub({ min: 51, max: 60 }),
				Abstract.StaticRowStub({ min: 61, max: 70 }),
				Abstract.StaticRowStub({ min: 71, max: 80 }),
				Abstract.StaticRowStub({ min: 81, max: 90 }),
				ActionThemeRow({ min: 91, max: 98 }),
				RollTwiceRow({ min: 99, max: 100 })
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
