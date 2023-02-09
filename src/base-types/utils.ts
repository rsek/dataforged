export type ExtractKeysOfValueType<ObjectType, ValueType> = {
	[P in keyof ObjectType]: ObjectType[P] extends ValueType ? P : never
}[keyof ObjectType]

export type PickByType<ObjectType, ValueType> = {
	[P in keyof ObjectType as ExtractKeysOfValueType<
		ObjectType,
		ValueType
	>]: ObjectType[P]
}
