import type * as Types from '@base-types'
import { JTDSchemaType } from 'ajv/dist/core'
import { ChoiceBase } from 'base-types/abstract'
import { type RecursivePartial } from 'utils'

export const NumberChoice: JTDSchemaType<
	ChoiceBase<number>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { type: 'int8' }
	}
}

export const StatChoice: JTDSchemaType<
	ChoiceBase<string>,
	{ ID: string; Label: string }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { ref: 'ID' }
	}
}

export const AssetExtensionChoice: JTDSchemaType<
	ChoiceBase<Types.Assets.AssetExtension>,
	{ ID: string; Label: string; AssetExtension: Types.Assets.AssetExtension }
> = {
	properties: {
		id: { ref: 'ID' },
		label: { ref: 'Label' },
		value: { ref: 'AssetExtension' }
	}
}
