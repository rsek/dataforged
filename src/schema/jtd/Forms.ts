import { Type } from '@sinclair/typebox'
import { JsonEnum } from '../datasworn/Utils.js'

const Metadata = Type.Partial(
	Type.Object(
		{
			description: Type.String(),
			typescriptType: Type.String(),
			goType: Type.String(),
			javaJacksonType: Type.String(),
			csharpSystemTextType: Type.String(),
			csharpSystemTextContainer: Type.String(),
			pythonType: Type.String(),
			rubyType: Type.String(),
			rustType: Type.String()
		},
		{
			additionalProperties: true,
			$id: 'Metadata'
		}
	)
)

const EnumMetadata = Type.Composite(
	[
		Metadata,
		Type.Partial(
			Type.Object({
				enumDescription: Type.Record(Type.String(), Type.String())
			})
		)
	],
	{
		additionalProperties: true,
		$id: 'EnumMetadata'
	}
)

// nullable?: boolean;
// metadata?: Record<string, unknown>;
// definitions?: Record<string, SomeJTDSchemaType>;
function JtdCommon(metadata = Metadata) {
	return Type.Object({
		nullable: Type.Optional(Type.Boolean()),
		metadata: Type.Optional(Type.Ref(metadata))
	})
}

const Root = Type.Composite([
	JtdCommon(Metadata),
	Type.Object({
		definitions: Type.Optional(
			Type.Record(Type.String(), Type.Ref<typeof Form>('Form'))
		)
	})
])

const PropertiesFormA = Type.Object({
	properties: Type.Record(Type.String(), Type.Ref<typeof Form>('Form')),
	optionalProperties: Type.Optional(
		Type.Record(Type.String(), Type.Ref<typeof Form>('Form'))
	),
	additionalProperties: Type.Optional(Type.Boolean())
})

const PropertiesFormB = Type.Object({
	properties: Type.Optional(
		Type.Record(Type.String(), Type.Ref<typeof Form>('Form'))
	),
	optionalProperties: Type.Record(Type.String(), Type.Ref<typeof Form>('Form')),
	additionalProperties: Type.Optional(Type.Boolean())
})

const PropertiesForm = Type.Union(
	[PropertiesFormA, PropertiesFormB].map((schema) =>
		Type.Composite([schema, JtdCommon(Metadata)])
	),
	{
		$id: 'Properties'
	}
)

const RefForm = Type.Composite(
	[Type.Object({ ref: Type.String() }), JtdCommon(Metadata)],
	{ $id: 'Ref' }
)

const DiscriminatorForm = Type.Composite(
	[
		Type.Object({
			discriminator: Type.String(),
			mapping: Type.Record(Type.String(), Type.Ref(PropertiesForm))
		}),
		JtdCommon(Metadata)
	],
	{ $id: 'Discriminator' }
)

const NumberType = [
	'float32',
	'float64',
	'int8',
	'uint8',
	'int16',
	'uint16',
	'int32',
	'uint32'
] as const
const StringType = ['string', 'timestamp'] as const

const TypeForm = Type.Composite(
	[
		Type.Object({
			enum: JsonEnum([...NumberType, ...StringType, 'boolean'])
		}),
		JtdCommon(Metadata)
	],
	{
		$id: 'Type'
	}
)

const EnumForm = Type.Composite(
	[Type.Object({ enum: Type.Array(Type.String()) }), JtdCommon(EnumMetadata)],
	{ $id: 'Enum' }
)

const ElementsForm = Type.Composite(
	[
		Type.Object({ elements: Type.Ref<typeof Form>('Form') }),
		JtdCommon(Metadata)
	],
	{ $id: 'Elements' }
)

const ValuesForm = Type.Composite(
	[Type.Object({ values: Type.Ref<typeof Form>('Form') }), JtdCommon(Metadata)],
	{ $id: 'Values' }
)

const EmptyForm = Type.Unsafe<any>({ $id: 'Empty' })

const Form = Type.Union(
	[
		RefForm,
		TypeForm,
		EnumForm,
		ElementsForm,
		ValuesForm,
		PropertiesForm,
		DiscriminatorForm,
		EmptyForm
	].map((schema) => Type.Ref(schema)),
	{
		$id: 'Form'
	}
)
