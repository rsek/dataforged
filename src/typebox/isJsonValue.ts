import { isBoolean, isNull, isString } from 'lodash'
import {
	type JsonObject,
	type JsonArray,
	type JsonPrimitive,
	type JsonValue
} from 'type-fest'

export function isJsonValue(value: unknown): value is JsonValue {
	return [isJsonPrimitive, isJsonObject, isJsonArray].some((fn) => fn(value))
}
function isJsonNumber(value: unknown): value is number {
	// excludes stuff like NaN
	return typeof value === 'number' && Number.isFinite(value)
}
function isJsonPrimitive(value: unknown): value is JsonPrimitive {
	return [isJsonNumber, isString, isBoolean, isNull].some((fn) => fn(value))
}
function isJsonArray(value: unknown): value is JsonArray {
	if (!Array.isArray(value)) return false
	return value.every(isJsonValue)
}
function isJsonObject(value: unknown): value is JsonObject {
	if (typeof value !== 'object') return false
	if (Array.isArray(value)) return false
	if (value === null) return false

	return Object.values(value).every(isJsonValue)
}
