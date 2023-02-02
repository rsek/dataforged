/* eslint-disable no-restricted-imports */
import type { MixinId, MixinLocalizable } from '@schema'
import { LocalizableKey } from '@schema'
import yaml from 'js-yaml'
import { JSONPath } from 'jsonpath-plus'
import _ from 'lodash'
import fs from 'fs'

import datasworn from '../json/ironsworn/datasworn.json' assert {type: 'json'}
import dataforged from '../json/starforged/dataforged.json' assert {type: 'json'}

/**
 * Crawls a json object for localizable strings an
 * @param json - The json object to be crawled.
 */
export function extractLocalizableStrings<T extends Record<string, unknown>> (json: T): Record<string, string> {
  const stringHash: Record<string, string> = {}
  JSONPath<Partial<MixinLocalizable>>({
    json,
    path: `$..*[${Object.values(LocalizableKey).join(',')}]`,
    resultType: 'all',
    flatten: true,
    callback: (payload: { parentProperty: string, value: string | string[], parent: MixinId }) => {
      const baseId = `${payload.parent.$id}#${payload.parentProperty}`
      if (Array.isArray(payload.value)) {
        if (typeof payload.value[0] === 'string') {
          payload.value.forEach((item, index) => {
            stringHash[`${baseId}.${index}`] = item
          })
        }
      } else if (typeof payload.value === 'string') {
        stringHash[baseId] = payload.value
      }
    }
  })
  return stringHash
}

const dataswornItems = _.map(datasworn, (value, key) => ({ data: value, filename: 'datasworn-i18n-' + _.kebabCase(key) }))
const dataforgedItems = _.map(dataforged, (value, key) => ({ data: value, filename: 'dataforged-i18n-' + _.kebabCase(key) }))

const tableRowPattern = /^(.*?)\/([0-9]{1,3})(-[0-9]{1,3})?#[A-z_-]+$/
const parentPattern = /^(.*?)#.*$/;

[...dataswornItems, ...dataforgedItems].forEach(item => {
  const yamlData = yaml.dump(extractLocalizableStrings(item.data as unknown as Record<string, unknown>), {
    lineWidth: -1,
    quotingType: '"',
    noRefs: false,
    sortKeys: (a: string, b: string) => {
      if (!a.includes('/Oracles/')) {
        return a.localeCompare(b)
      }
      const patternA = a.match(tableRowPattern)
      const patternB = b.match(tableRowPattern)
      const parentA = a.match(parentPattern)
      const parentB = b.match(parentPattern)
      const numbersA = _.compact(patternA?.map(item => Math.abs(parseInt(item)))) as [number, number]
      const numbersB = _.compact(patternB?.map(item => Math.abs(parseInt(item)))) as [number, number]
      if ((patternA != null) && (patternB != null) && patternA[1] === patternB[1]) {
        // slice out
        // simplest way to grab the optional second number without shit getting weird with the hyphen is to pretend its a negative then get absolute value

        // 1: b, a
        // -1: a, b
        // 0: no change.
        return numbersA[0] - numbersB[0]
      } else if (typeof numbersB[0] === 'number') {
        if ((parentB != null) && parentA?.[1].startsWith(parentB?.[1] as string)) { return -1 }
        return 1
      } else if (typeof numbersA[0] === 'number') {
        if ((parentA != null) && parentB?.[1].startsWith(parentA?.[1] as string)) { return 1 }
        return -1
      } else if
      (typeof parentA?.[1] === 'string' && typeof parentB?.[1] === 'string' && parentA[1].startsWith(parentB[1])) {
        return 1
      } else if (typeof parentA?.[1] === 'string' && typeof parentB?.[1] === 'string' && parentB[1].startsWith(parentA[1])) {
        return -1
      } else {
        return a.localeCompare(b)
      }
    }
  })
  fs.writeFileSync('../i18n/' + item.filename + '.yaml', yamlData)
})
