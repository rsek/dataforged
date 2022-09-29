/* eslint-disable @typescript-eslint/naming-convention */
import type { AttributeChoices, AttributeKey, AttributeValue } from '@schema'
import type { AttributeMap } from '@utils/types/AttributeHash.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AttributeRequirementsBuilder extends Array<AttributeChoices> {
  constructor (yaml: AttributeMap) {
    super()
    _.forEach<AttributeMap<AttributeKey>>(yaml, (value, key) => {
      let values
      if (Array.isArray(value)) {
        values = value
      } else if (value !== null) {
        values = [value]
      }
      const Key = key as AttributeKey
      const Values = values as Array<AttributeValue<typeof Key>>
      this.push({ key: Key, value: Values })
    })
  }
}
