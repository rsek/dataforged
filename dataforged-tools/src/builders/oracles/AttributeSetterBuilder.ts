import type { Attribute } from '@schema'
import type { AttributeHash } from '@utils/types/AttributeHash.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class AttributeSetterBuilder extends Array<Attribute> {
  constructor (yaml: AttributeHash) {
    if (Object.values(yaml).some(item => Array.isArray(item) && item.length > 1)) {
      throw new Error("[AttributeSetter] attribute hash can't be converted to attribute setter if it contains arrays longer than 1")
    }
    const attributes: Attribute[] = _.map(yaml, (value, key) => {
      let newValue
      if (Array.isArray(value)) {
        newValue = value[0]
      } else { newValue = value }
      return { Key: key, Value: newValue }
    }) as Attribute[]
    super(...attributes)
  }
}
