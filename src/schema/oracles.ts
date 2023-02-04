import { type JSONSchemaType as Schema } from 'ajv'

export const ID: Schema<Types.ID> = {
  type: 'string'
  // TODO
}

export const Oracle: Schema<Table> = {
  properties: {
    _id: {}
  }
}
