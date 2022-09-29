// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Oracle, OracleSetDisplay, OracleTable } from '@schema'
import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * Represents an oracle set: a grouping that can contain both {@link OracleTable}s and other instances of {@link OracleSet}, but doesn't have its own `Table` key.
 *
 * @see {@link Oracle} if you need to type both {@link OracleTable} and {@link OracleSet} to crawl the oracle hierarchy in search of a specific `$id`.
 *
 * @public
 */
export interface OracleSet extends Omit<Oracle, 'table'> {
  /**
   * @pattern ^(ironsworn|starforged)/oracles/[a-z_]+(/[a-z_]+)?$
   */
  $id: string
  /**
   * A list of sample names for this category. Only used by Planet {@link OracleSet}s.
   */
  sample_names?: string[] | undefined
  sets?: { [key: SnakeCaseString]: OracleSet } | undefined
  tables?: { [key: SnakeCaseString]: OracleTable } | undefined
  display: OracleSetDisplay
}
