import { type JSONSchema7 } from 'json-schema'
import { DF_KEY } from './id'

export function dfRecordSchema (itemSchema: string, title: string = itemSchema + 's'): JSONSchema7 {
  return {
    title,
    additionalProperties: false,
    patternProperties: {
      [DF_KEY]: {
        $ref: `#/$defs/${itemSchema}`
      }
    }
  }
}
