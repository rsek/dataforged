import { type Oracles, type Localize } from '@base-types'

export type OracleRowAttribute = 'location' | 'region'

export interface ObjectTemplate {
	name: Localize.Label
	attributes: Record<string, ObjectTemplateAttribute>

	// ability to extend another game object
}

export interface ObjectTemplateAttribute {
	label: Localize.Label
	min: number
	max: number
	dependents?: ObjectTemplateAttribute[]
	// requirement -- by attribute? by regex?
}
export interface ObjectTemplateRoll extends Oracles.OracleTableRoll {
	// way to express "depends on"...
	// way to make specific results point to? by ID perhaps?
	// option for regex of an ID?
	// schema for table results? then some can be provided as empty results.
}

export const creature: ObjectTemplate = {
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
