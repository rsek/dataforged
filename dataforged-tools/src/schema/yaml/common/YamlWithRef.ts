import { SnakeCaseString } from '@schema/json/common/String.js'

/**
 * @internal
 */
export interface YamlWithRef {
  _refs?: { [key: SnakeCaseString]: object } | undefined
  _templates?: { [key: SnakeCaseString]: object } | undefined
}
