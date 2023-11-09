import JsonPointer, { type JsonObject } from 'json-pointer'
import { type JSONSchema, type Draft, type Draft07 } from 'json-schema-library'

export function walkObjectWithSchema(
	data: JsonObject,
	dataSchema: Draft07,
	iterator: ({
		value,
		pointer,
		schema
	}: // parentValue,
	// parentSchema
	{
		value: unknown
		pointer: string
		schema: JSONSchema
		// parentValue?: unknown
		// parentSchema?: JSONSchema
	}) => void
) {
	const sep = '/'
	const flatData = JsonPointer.dict(data)

	for (const [pointer, value] of Object.entries(flatData)) {
		// const pointerParts = pointer.split(sep)
		// pointerParts.pop()
		// const parentPointer = pointerParts.join(sep)
		const schema = dataSchema.getSchema('#' + pointer, data)
		// const parentValue = JsonPointer.get(data, parentPointer)
		// const parentSchema = dataSchema.getSchema('#' + parentPointer, data)

		iterator({
			value,
			pointer,
			schema
			// parentValue, parentSchema
		})
	}

	return data
}
