// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OracleBase, OracleSetDisplay, OracleTable } from '@schema'

/**
 * Represents an oracle set: a grouping that can contain both {@link OracleTable}s and other instances of {@link OracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link OracleBase} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface OracleSet extends Omit<OracleBase, 'Table'> {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_-]+(/[a-z_-]+)?$
   */
  $id: string
  /**
   * A list of sample names for this category. Only used by Planetary Class {@link OracleSet}s.
   */
  'Sample names'?: string[] | undefined
  Sets?: {[key: string]: OracleSet} | undefined
  Tables?: {[key: string]: OracleTable} | undefined
  Display: OracleSetDisplay
}
