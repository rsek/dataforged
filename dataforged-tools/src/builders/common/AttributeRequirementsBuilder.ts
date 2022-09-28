/* eslint-disable @typescript-eslint/naming-convention */
import type { AttributeChoices, AttributeKey, AttributeValue } from '@schema'
import type { AttributeHash } from '@utils/types/AttributeHash.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AttributeRequirementsBuilder extends Array<AttributeChoices> {
  constructor (yaml: AttributeHash) {
    super()
    _.forEach<AttributeHash<AttributeKey>>(yaml, (value, key) => {
      let values
      if (Array.isArray(value)) {
        values = value
      } else if (value !== null) {
        values = [value]
      }
      const Key = key as AttributeKey
      const Values = values as Array<AttributeValue<typeof Key>>
      this.push({ Key, Values })
    })
  }
}
