import { Localize } from '@df-types'
import { OracleTableRoll } from '@df-types/oracles'

export interface ObjectTemplate {
  name: Localize.Label
  attributes: Record<string, ObjectTemplateAttribute>
}

export interface ObjectTemplateAttribute {
  label: Localize.Label
  min: number
  max: number
}
export interface ObjectTemplateRoll extends OracleTableRoll {
  // way to express "depends on"...
  // way to make specific results point to? by ID perhaps?
  // option for regex of an ID?
  // ability to extend another game object
  // schema for table results? then some can be provided as empty results.
}

const creature: ObjectTemplate = {
  name: 'Creature',
  attributes: {
    environment: {
      label: 'Environment', // figure out a way to point this at the name of the table? maybe that's the default if this is a null value?
      min: 1,
      max: 1
      // express dependencies?
    }
  }
}
