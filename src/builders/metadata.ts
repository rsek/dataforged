import { type JSONSchema7 } from 'json-schema'
import { cloneDeep } from 'lodash'
import type * as Schema from 'schema'

// a class/function would need to compose the following:
// * the input schema
// * the output schema
// * the incoming sparse YAML data
// * the default values from the output schema
// * optional: the parent object (to compose the source and ID from)
// * a function for formatting the ID, based on the input data, the parent object, and the key/index of the item
// * a function for transforming the object into the completed data -- or a keyed object corresponding to each key? hmm. then undefined ones can be left as is
// ajv *does* modify the original data when assigning defaults

export class DataBuilder<
	TInput extends JSONSchema7,
	TOutput extends JSONSchema7
> {
	#inputSchema
	#outputSchema

	constructor(inputSchema: TInput, outputSchema: TOutput, formatID) {
		this.#inputSchema = inputSchema
		this.#outputSchema = outputSchema
		// extract default values from
	}
}

interface Author {
	email?: string | undefined
	name: string
}

export class Source implements Schema.Source {
	page?: number | undefined
	title!: string
	authors!: [Author, ...Author[]]

	date!: string
	url!: string
	license!: string

	/**
	 * @param sources - Source metadata objects and partials, ordered from oldest to newest.
	 */
	constructor(...sources: [Schema.Source, ...Array<Partial<Schema.Source>>]) {
		const merged = cloneDeep(sources).reduce((prev, cur) =>
			Object.assign(prev, cur)
		) as Schema.Source
		Object.assign(this, merged)
	}
}

// function DataBuilder<
// 	TOut extends TObject,
// 	U extends Static<TObject>,
// 	TIn extends object,
// 	TDefaults extends Partial<U>
// >(
// 	schemaOut: TOut,
// 	defaults: TDefaults,
// 	transform: (data: TIn, defaults: TDefaults) => Static<TOut>
// ) {
// 	class DataBuilder {
// 		static readonly #schemaOut = schemaOut
// 		static readonly #defaults = defaults
// 		constructor() {}
// 	}

// 	return DataBuilder
// }
