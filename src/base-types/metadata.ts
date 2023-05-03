import { type Static, Type } from '@sinclair/typebox'
import { AssetID, MoveID, OracleTableID } from 'base-types/id'
import { StringEnum } from 'base-types/utils'

export const Ruleset = StringEnum(['classic', 'starforged'])
export type Ruleset = Static<typeof Ruleset>
export const SvgImageURL = Type.String({ format: 'uri' })
export type SvgImageURL = Static<typeof SvgImageURL>
export const WebpImageURL = Type.String({ format: 'uri' })
export type WebpImageURL = Static<typeof WebpImageURL>
export const CSSColor = Type.String()
export type CSSColor = Static<typeof CSSColor>

export const Source = Type.Object(
	{
		title: Type.String({
			description: 'The title of the source document.',
			examples: [
				'Ironsworn Rulebook',
				'Ironsworn Assets Master Set',
				'Ironsworn: Delve',
				'Ironsworn: Starforged Rulebook',
				'Ironsworn: Starforged Assets',
				'Sundered Isles'
			]
		}),
		page: Type.Optional(Type.Integer({ minimum: 1 })),
		authors: Type.Array(
			Type.Object(
				{
					name: Type.String({ examples: ['Shawn Tomkin'] }),
					email: Type.Optional(Type.String({ format: 'email' }))
				},
				{ $id: 'Author', examples: [{ name: 'Shawn Tomkin' }] }
			),
			{ minItems: 1 }
		),
		date: Type.String({
			format: 'date',
			description:
				"The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
		}),
		url: Type.String({
			format: 'uri',
			description: 'The URL where the source document is available.',
			examples: ['https://ironswornrpg.com']
		}),
		license: Type.String({
			format: 'uri',
			description:
				"An absolute URL pointing to the location where this element's license can be found.",
			examples: [
				'https://creativecommons.org/licenses/by/4.0',
				'https://creativecommons.org/licenses/by-nc-sa/4.0'
			]
		})
	},
	{
		description: 'Metadata describing the original source of this item',
		$id: 'Source'
	}
)

export type Source = Static<typeof Source>

export const SuggestionsBase = Type.Object({
	oracles: Type.Optional(Type.Array(OracleTableID)),
	assets: Type.Optional(Type.Array(AssetID)),
	moves: Type.Optional(Type.Array(MoveID))
})
export type SuggestionsBase = Static<typeof SuggestionsBase>
