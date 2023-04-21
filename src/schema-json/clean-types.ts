type StrictNullChecksWrapper<Name extends string, Type> = undefined extends null
	? `strictNullChecks must be true in tsconfig to use ${Name}`
	: Type

type UnionToIntersection<U> = (U extends any ? (_: U) => void : never) extends (
	_: infer I
) => void
	? I
	: never

export type SomeJSONSchema = UncheckedJSONSchemaType<Known, true>

type UncheckedPartialSchema<T> = Partial<UncheckedJSONSchemaType<T, true>>

export type PartialSchema<T> = StrictNullChecksWrapper<
	'PartialSchema',
	UncheckedPartialSchema<T>
>

type JSONType<
	T extends string,
	IsPartial extends boolean
> = IsPartial extends true ? T | undefined : T

interface NumberKeywords {
	minimum?: number
	maximum?: number
	exclusiveMinimum?: number
	exclusiveMaximum?: number
	multipleOf?: number
	format?: string
}

interface StringKeywords {
	minLength?: number
	maxLength?: number
	pattern?: string
	format?: string
}

type DefinitionPicker<T, IsPartial extends boolean> = {
	type: ReadonlyArray<
		T extends number
			? JSONType<'number' | 'integer', IsPartial>
			: T extends string
			? JSONType<'string', IsPartial>
			: T extends boolean
			? JSONType<'boolean', IsPartial>
			: never
	>
} & UnionToIntersection<
	T extends number
		? NumberKeywords
		: T extends string
		? StringKeywords
		: T extends boolean
		? Record<string, unknown>
		: never
>

export type SchemaPicker<T, IsPartial extends boolean = false> = Exclude<
	(T extends number
		? NumberSchema<IsPartial>
		: T extends string
		? StringSchema<IsPartial>
		: T extends boolean
		? BooleanSchema<IsPartial>
		: T extends readonly [any, ...any[]]
		? TupleSchema<IsPartial, T>
		: T extends readonly any[]
		? ArraySchema<IsPartial, T>
		: T extends Record<string, any>
		? ObjectSchema<IsPartial, T>
		: T extends null
		? NullSchema<IsPartial>
		: never) &
		ConditionalKeywords<T>,
	undefined
>

type NumberSchema<IsPartial extends boolean> = {
	type: JSONType<'number' | 'integer', IsPartial>
} & NumberKeywords

type StringSchema<IsPartial extends boolean> = {
	type: JSONType<'string', IsPartial>
} & StringKeywords

interface BooleanSchema<IsPartial extends boolean> {
	type: JSONType<'boolean', IsPartial>
}

type TupleSchema<
	IsPartial extends boolean,
	T extends readonly [any, ...any[]]
> = {
	type: JSONType<'array', IsPartial>
	items: {
		readonly [K in keyof T]-?: UncheckedJSONSchemaType<T[K], false> &
			Nullable<T[K]>
	} & {
		length: T['length']
	}
	minItems: T['length']
} & (
	| {
			maxItems: T['length']
	  }
	| {
			additionalItems: false
	  }
)

interface ArraySchema<IsPartial extends boolean, T extends readonly any[]> {
	type: JSONType<'array', IsPartial>
	items: UncheckedJSONSchemaType<T[0], false>
	contains?: UncheckedPartialSchema<T[0]>
	minItems?: number
	maxItems?: number
	minContains?: number
	maxContains?: number
	uniqueItems?: true
	additionalItems?: never
}

type ObjectSchema<IsPartial extends boolean, T extends Record<string, any>> = {
	type: JSONType<'object', IsPartial>
	additionalProperties?: boolean | UncheckedJSONSchemaType<T[string], false>
	unevaluatedProperties?: boolean | UncheckedJSONSchemaType<T[string], false>
	properties?: IsPartial extends true
		? Partial<UncheckedPropertiesSchema<T>>
		: UncheckedPropertiesSchema<T>
	patternProperties?: Record<string, UncheckedJSONSchemaType<T[string], false>>
	propertyNames?: Omit<UncheckedJSONSchemaType<string, false>, 'type'> & {
		type?: 'string'
	}
	dependencies?: {
		[K in keyof T]?: Readonly<Array<keyof T>> | UncheckedPartialSchema<T>
	}
	dependentRequired?: {
		[K in keyof T]?: Readonly<Array<keyof T>>
	}
	dependentSchemas?: {
		[K in keyof T]?: UncheckedPartialSchema<T>
	}
	minProperties?: number
	maxProperties?: number
} & (IsPartial extends true
	? {
			required: Readonly<Array<keyof T>>
	  }
	: [UncheckedRequiredMembers<T>] extends [never]
	? {
			required?: Readonly<Array<UncheckedRequiredMembers<T>>>
	  }
	: {
			required: Readonly<Array<UncheckedRequiredMembers<T>>>
	  })

interface NullSchema<IsPartial extends boolean> {
	type: JSONType<'null', IsPartial>
	nullable: true
}

interface ConditionalKeywords<T> {
	allOf?: Readonly<Array<UncheckedPartialSchema<T>>>
	anyOf?: Readonly<Array<UncheckedPartialSchema<T>>>
	oneOf?: Readonly<Array<UncheckedPartialSchema<T>>>
	if?: UncheckedPartialSchema<T>
	then?: UncheckedPartialSchema<T>
	else?: UncheckedPartialSchema<T>
	not?: UncheckedPartialSchema<T>
}

interface AnyOf<T, IsPartial extends boolean> {
	anyOf: ReadonlyArray<UncheckedJSONSchemaType<T, IsPartial>>
}

interface OneOf<T, IsPartial extends boolean> {
	oneOf: ReadonlyArray<UncheckedJSONSchemaType<T, IsPartial>>
}

interface NonConditionalKeywords {
	[keyword: string]: any
	$id?: string
	$ref?: string
	definitions?: Record<string, UncheckedJSONSchemaType<Known, true>>
	definitions?: Record<string, UncheckedJSONSchemaType<Known, true>>
}

type UncheckedJSONSchemaType<
	T,
	IsPartial extends boolean
> = // these two unions allow arbitrary unions of types
(| AnyOf<T, IsPartial>
	| OneOf<T, IsPartial>
	| DefinitionPicker<T, IsPartial>
	| SchemaPicker<T, IsPartial>
) &
	NonConditionalKeywords

export type JSONSchemaType<T> = StrictNullChecksWrapper<
	'JSONSchemaType',
	UncheckedJSONSchemaType<T, false>
>

type Known =
	| {
			[key: string]: Known
	  }
	| [Known, ...Known[]]
	| Known[]
	| number
	| string
	| boolean
	| null

type UncheckedPropertiesSchema<T> = {
	[K in keyof T]-?:
		| (UncheckedJSONSchemaType<T[K], false> & Nullable<T[K]>)
		| {
				$ref: string
		  }
}

export type PropertiesSchema<T> = StrictNullChecksWrapper<
	'PropertiesSchema',
	UncheckedPropertiesSchema<T>
>

type UncheckedRequiredMembers<T> = {
	[K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T]

export type RequiredMembers<T> = StrictNullChecksWrapper<
	'RequiredMembers',
	UncheckedRequiredMembers<T>
>

type Nullable<T> = undefined extends T
	? {
			nullable: true
			const?: null
			enum?: Readonly<Array<T | null>>
			default?: T | null
	  }
	: {
			nullable?: false
			const?: T
			enum?: Readonly<T[]>
			default?: T
	  }
export {}
