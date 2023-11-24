import { type Static, Type } from '@sinclair/typebox'
import * as Id from '../common/Id.js'
import { Nullable } from '../utils/typebox.js'

export const SvgImageUrl = Type.RegExp(/\.svg$/i, {
	$id: '#/$defs/SvgImageUrl',
	format: 'uri-reference',
	description: 'A relative URL pointing to a vector image in the SVG format.'
})
export type SvgImageUrl = Static<typeof SvgImageUrl>
export const WebpImageUrl = Type.RegExp(/\.webp$/i, {
	$id: '#/$defs/WebpImageUrl',
	format: 'uri-reference',
	description: 'A relative URL pointing to a raster image in the WEBP format.'
})
export type WebpImageUrl = Static<typeof WebpImageUrl>
export const CssColor = Type.String({
	$id: '#/$defs/CssColor',
	description:
		'A CSS color value. See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value'
})
export type CssColor = Static<typeof CssColor>

export const Source = Type.Object(
	{
		title: Type.String({
			title: 'Title',
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
		page: Type.Optional(
			Type.Integer({
				minimum: 1,
				description: 'The page number where this item is described in full.'
			})
		),
		authors: Type.Array(
			Type.Object(
				{
					name: Type.String({ examples: ['Shawn Tomkin'] }),
					email: Type.Optional(
						Type.String({
							title: 'Email',
							format: 'email',
							description: 'An optional email contact for the author'
						})
					),
					url: Type.Optional(
						Type.String({
							format: 'uri',
							description: "An optional URL for the author's website."
						})
					)
				},
				{ examples: [{ name: 'Shawn Tomkin' }] }
			),
			{ minItems: 1 }
		),
		date: Type.String({
			format: 'date',
			$comment: 'You may prefer to deserialize this as a Date object.',
			description:
				"The date of the source documents's last update, formatted YYYY-MM-DD. Required because it's used to determine whether the data needs updating."
		}),
		url: Type.String({
			format: 'uri',
			description: 'An absolute URL where the source document is available.',
			examples: ['https://ironswornrpg.com']
		}),
		license: Nullable(
			Type.String({
				format: 'uri'
			}),
			{
				title: 'License',
				default: undefined,
				description:
					"An absolute URL pointing to the location where this element's license can be found.\n\nA `null` here indicates that the content provides **no** license, and is not intended for redistribution.  Datasworn's build process skips unlicensed content by default.",
				examples: [
					'https://creativecommons.org/licenses/by/4.0',
					'https://creativecommons.org/licenses/by-nc-sa/4.0'
				]
			}
		)
	},
	{
		description: 'Metadata describing the original source of this item',
		$id: '#/$defs/Source'
	}
)

export type Source = Static<typeof Source>

export const Suggestions = Type.Partial(
	Type.Object({
		oracles: Type.Array(Type.Ref(Id.OracleTableId)),
		assets: Type.Array(Type.Ref(Id.AssetId)),
		moves: Type.Array(Type.Ref(Id.MoveId)),
		site_domains: Type.Array(Type.Ref(Id.DelveSiteDomainId)),
		site_themes: Type.Array(Type.Ref(Id.DelveSiteThemeId)),
		npcs: Type.Array(Type.Ref(Id.NpcId)),
		atlas: Type.Array(Type.Ref(Id.AtlasEntryId)),
		rarities: Type.Array(Type.Ref(Id.RarityId))
	}),
	{ $id: '#/$defs/Suggestions' }
)

export type Suggestions = Static<typeof Suggestions>
