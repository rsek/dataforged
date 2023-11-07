import { type Static, Type } from '@sinclair/typebox'
import { ID } from '../index.js'

export const SVGImageURL = Type.String({
	$id: '#/$defs/SVGImageURL',
	format: 'uri-reference',
	description: 'A relative URL pointing to a vector image in the SVG format.'
})
export type SVGImageURL = Static<typeof SVGImageURL>
export const WEBPImageURL = Type.String({
	$id: '#/$defs/WEBPImageURL',
	format: 'uri-reference',
	description: 'A relative URL pointing to a raster image in the WEBP format.'
})
export type WEBPImageURL = Static<typeof WEBPImageURL>
export const CSSColor = Type.String({
	title: 'CSS Color',
	$id: '#/$defs/CSSColor',
	description:
		'A CSS color value. See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value'
})
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
		page: Type.Optional(Type.Integer({ minimum: 1, title: 'Page number' })),
		authors: Type.Array(
			Type.Object(
				{
					name: Type.String({ examples: ['Shawn Tomkin'] }),
					email: Type.Optional(
						Type.String({
							format: 'email',
							description: 'An optional email contact for the author'
						})
					)
				},
				{ examples: [{ name: 'Shawn Tomkin' }] }
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
			description: 'An absolute URL where the source document is available.',
			examples: ['https://ironswornrpg.com']
		}),
		license: Type.Union(
			[
				Type.String({
					format: 'uri'
				}),
				Type.Null()
			],
			{
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

export const SourceStub = Type.Partial(Source, {
	description:
		'A source data stub that inherits data from ancestor elements during post-processing. To prevent inheritance, use the regular `source` property instead.',
	$id: '#/$defs/SourceStub',
	macro: true
})

export type SourceStub = Static<typeof SourceStub>

export const Suggestions = Type.Object(
	{
		oracles: Type.Optional(Type.Array(Type.Ref(ID.OracleTableID))),
		assets: Type.Optional(Type.Array(Type.Ref(ID.AssetID))),
		moves: Type.Optional(Type.Array(Type.Ref(ID.MoveID))),
		site_domains: Type.Optional(Type.Array(Type.Ref(ID.DelveSiteDomainID))),
		site_themes: Type.Optional(Type.Array(Type.Ref(ID.DelveSiteThemeID))),
		npcs: Type.Optional(Type.Array(Type.Ref(ID.NpcID))),
		atlas: Type.Optional(Type.Array(Type.Ref(ID.AtlasEntryID)))
	},
	{ $id: '#/$defs/Suggestions' }
)

export type Suggestions = Static<typeof Suggestions>