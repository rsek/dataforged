import { JSONSchema7Definition } from 'json-schema'
import { DF_KEY } from 'src/schema-ts/id.js'

export function dfRecordSchema (itemSchema: string, title: string = itemSchema + 's'): JSONSchema7Definition {
  return {
    title,
    additionalProperties: false,
    patternProperties: {
      [DF_KEY]: {
        $ref: `#/definitions/${itemSchema}`
      }
    }
  }
}
