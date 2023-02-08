import { DF_KEY } from '@df-json-schema/attributes'
import { type JSONSchema7 } from 'json-schema'

export function dfRecordSchema(
  itemSchema: string,
  title: string = itemSchema + 's'
): JSONSchema7 {
  return {
    title,
    // additionalProperties: false,
    patternProperties: {
      [DF_KEY]: {
        $ref: `#/$defs/${itemSchema}`
      }
    }
  }
}
