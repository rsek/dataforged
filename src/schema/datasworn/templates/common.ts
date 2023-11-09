import { Type } from '@sinclair/typebox'
import { type Oracles } from '../schema'
import * as Abstract from '../schema/common/abstract.js'

export function RollTwiceRow(
	{ low, high }: { min: number; max: number },
	method: Oracles.OracleTableRollMethod = 'no_duplicates'
) {
	return Abstract.StaticRowStub(
		{ low, high, result: 'Roll twice' },
		{
			rolls: [{ method, times: 2 } as any]
		}
	)
}

export function PrecursorVaultRow(
	{ low, high }: { min: number; max: number },
	location?: 'Deep Space' | 'Planetside' | 'Orbital'
) {
	let resultText = 'Precursor Vault'
	if (location != null) resultText += ` (${location.toLowerCase()})`
	const result = `[${resultText}](id:starforged/collections/oracles/vault)`
	return Abstract.StaticRowStub({ low, high, result })
}

export function DescriptorFocusRow({
	low,
	high
}: {
	min: number
	max: number
}) {
	return Abstract.StaticRowStub(
		{
			low,
			high,
			result:
				'[Descriptor](id:starforged/oracles/core/descriptor) + [Focus](id:starforged/oracles/core/focus)'
		},
		{
			rolls: [
				{ oracle: 'starforged/oracles/core/descriptor' },
				{ oracle: 'starforged/oracles/core/focus' }
			]
		}
	)
}

export function ActionThemeRow({ low, high }: { min: number; max: number }) {
	return Abstract.StaticRowStub(
		{
			low,
			high,
			result:
				'[Action](id:starforged/oracles/core/action) + [Theme](id:starforged/oracles/core/theme)'
		},
		{
			rolls: [
				{ oracle: 'starforged/oracles/core/action' },
				{ oracle: 'starforged/oracles/core/theme' }
			]
		}
	)
}

export const OracleTableRows5 = Type.Tuple([
	Abstract.StaticRowStub({ min: 1, max: 20 }),
	Abstract.StaticRowStub({ min: 21, max: 40 }),
	Abstract.StaticRowStub({ min: 41, max: 60 }),
	Abstract.StaticRowStub({ min: 61, max: 80 }),
	Abstract.StaticRowStub({ min: 81, max: 100 })
])

export const OracleTableRows10 = Type.Tuple([
	Abstract.StaticRowStub({ min: 1, max: 10 }),
	Abstract.StaticRowStub({ min: 11, max: 20 }),
	Abstract.StaticRowStub({ min: 21, max: 30 }),
	Abstract.StaticRowStub({ min: 31, max: 40 }),
	Abstract.StaticRowStub({ min: 41, max: 50 }),
	Abstract.StaticRowStub({ min: 51, max: 60 }),
	Abstract.StaticRowStub({ min: 61, max: 70 }),
	Abstract.StaticRowStub({ min: 71, max: 80 }),
	Abstract.StaticRowStub({ min: 81, max: 90 }),
	Abstract.StaticRowStub({ min: 91, max: 100 })
])

export const OracleTableRows20 = Type.Tuple([
	Abstract.StaticRowStub({ min: 1, max: 5 }),
	Abstract.StaticRowStub({ min: 6, max: 10 }),
	Abstract.StaticRowStub({ min: 11, max: 15 }),
	Abstract.StaticRowStub({ min: 16, max: 20 }),
	Abstract.StaticRowStub({ min: 21, max: 25 }),
	Abstract.StaticRowStub({ min: 26, max: 30 }),
	Abstract.StaticRowStub({ min: 31, max: 35 }),
	Abstract.StaticRowStub({ min: 36, max: 40 }),
	Abstract.StaticRowStub({ min: 41, max: 45 }),
	Abstract.StaticRowStub({ min: 46, max: 50 }),
	Abstract.StaticRowStub({ min: 51, max: 55 }),
	Abstract.StaticRowStub({ min: 56, max: 60 }),
	Abstract.StaticRowStub({ min: 61, max: 65 }),
	Abstract.StaticRowStub({ min: 66, max: 70 }),
	Abstract.StaticRowStub({ min: 71, max: 75 }),
	Abstract.StaticRowStub({ min: 76, max: 80 }),
	Abstract.StaticRowStub({ min: 81, max: 85 }),
	Abstract.StaticRowStub({ min: 86, max: 90 }),
	Abstract.StaticRowStub({ min: 91, max: 95 }),
	Abstract.StaticRowStub({ min: 96, max: 100 })
])
