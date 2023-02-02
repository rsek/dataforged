import { fill, inRange, isInteger, sum } from 'lodash-es'

export function distributeOracleRows (numberOfRows: number): Array<{ floor: number, ceiling: number }> {
  if (!isInteger(numberOfRows)) throw new Error('Expected an integer value')
  if (!inRange(numberOfRows, 1, 101)) throw new Error('Expected a value between 1 and 100 (inclusive)')

  const dieFaces = 100
  const remainderIncrement = 1

  const baseWeightPerRow = Math.floor(dieFaces / numberOfRows)
  const weights = fill(new Array(numberOfRows), baseWeightPerRow)
  const remainder = dieFaces % numberOfRows
  const remainderPerRow = remainder / numberOfRows

  const rows: Array<{ floor: number, ceiling: number }> = []

  for (let i = 0, remainderPool = 0, lastCeiling = 0; i < weights.length; i++) {
    remainderPool += remainderPerRow
    if (remainderPool >= remainderIncrement) {
      weights[i] += remainderIncrement
      remainderPool -= remainderIncrement
    }
    rows.push({ floor: lastCeiling + 1, ceiling: lastCeiling + weights[i] })
    lastCeiling += weights[i]
  }

  if (sum(weights) > dieFaces) throw Error('Row weights sum to more than 100?')

  return rows
}
