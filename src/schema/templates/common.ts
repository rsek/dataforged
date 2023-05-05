import { Type } from '@sinclair/typebox'
import { type Oracles } from 'schema'
import * as Abstract from 'schema/common/abstract'

export function RollTwiceRow(
	{ low, high }: { low: number; high: number },
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
	{ low, high }: { low: number; high: number },
	location?: 'Deep Space' | 'Planetside' | 'Orbital'
) {
	let resultText = 'Precursor Vault'
	if (location != null) resultText += ` (${location.toLowerCase()})`
	const result = `[${resultText}](starforged/collections/oracles/vault)`
	return Abstract.StaticRowStub({ low, high, result })
}

export function DescriptorFocusRow({
	low,
	high
}: {
	low: number
	high: number
}) {
	return Abstract.StaticRowStub(
		{
			low,
			high,
			result:
				'[Descriptor](starforged/oracles/core/descriptor) + [Focus](starforged/oracles/core/focus)'
		},
		{
			rolls: [
				{ oracle: 'starforged/oracles/core/descriptor' },
				{ oracle: 'starforged/oracles/core/focus' }
			]
		}
	)
}

export function ActionThemeRow({ low, high }: { low: number; high: number }) {
	return Abstract.StaticRowStub(
		{
			low,
			high,
			result:
				'[Action](starforged/oracles/core/action) + [Theme](starforged/oracles/core/theme)'
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
	Abstract.StaticRowStub({ low: 1, high: 20 }),
	Abstract.StaticRowStub({ low: 21, high: 40 }),
	Abstract.StaticRowStub({ low: 41, high: 60 }),
	Abstract.StaticRowStub({ low: 61, high: 80 }),
	Abstract.StaticRowStub({ low: 81, high: 100 })
])

export const OracleTableRows10 = Type.Tuple([
	Abstract.StaticRowStub({ low: 1, high: 10 }),
	Abstract.StaticRowStub({ low: 11, high: 20 }),
	Abstract.StaticRowStub({ low: 21, high: 30 }),
	Abstract.StaticRowStub({ low: 31, high: 40 }),
	Abstract.StaticRowStub({ low: 41, high: 50 }),
	Abstract.StaticRowStub({ low: 51, high: 60 }),
	Abstract.StaticRowStub({ low: 61, high: 70 }),
	Abstract.StaticRowStub({ low: 71, high: 80 }),
	Abstract.StaticRowStub({ low: 81, high: 90 }),
	Abstract.StaticRowStub({ low: 91, high: 100 })
])

export const OracleTableRows20 = Type.Tuple([
	Abstract.StaticRowStub({ low: 1, high: 5 }),
	Abstract.StaticRowStub({ low: 6, high: 10 }),
	Abstract.StaticRowStub({ low: 11, high: 15 }),
	Abstract.StaticRowStub({ low: 16, high: 20 }),
	Abstract.StaticRowStub({ low: 21, high: 25 }),
	Abstract.StaticRowStub({ low: 26, high: 30 }),
	Abstract.StaticRowStub({ low: 31, high: 35 }),
	Abstract.StaticRowStub({ low: 36, high: 40 }),
	Abstract.StaticRowStub({ low: 41, high: 45 }),
	Abstract.StaticRowStub({ low: 46, high: 50 }),
	Abstract.StaticRowStub({ low: 51, high: 55 }),
	Abstract.StaticRowStub({ low: 56, high: 60 }),
	Abstract.StaticRowStub({ low: 61, high: 65 }),
	Abstract.StaticRowStub({ low: 66, high: 70 }),
	Abstract.StaticRowStub({ low: 71, high: 75 }),
	Abstract.StaticRowStub({ low: 76, high: 80 }),
	Abstract.StaticRowStub({ low: 81, high: 85 }),
	Abstract.StaticRowStub({ low: 86, high: 90 }),
	Abstract.StaticRowStub({ low: 91, high: 95 }),
	Abstract.StaticRowStub({ low: 96, high: 100 })
])
