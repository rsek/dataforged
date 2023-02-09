import { type JSONSchema7 } from 'json-schema'

const CategoryMetadata: JSONSchema7 = {
	type: 'object',
	required: ['title', 'source'],
	properties: {
		_id: {
			$ref: '#/$defs/ID'
		},
		title: {
			$ref: '#/$defs/Title'
		},
		source: {
			$ref: '#/$defs/Source'
		},
		summary: {
			$ref: '#/$defs/MarkdownSentences'
		},
		description: {
			$ref: '#/$defs/MarkdownParagraphs'
		},
		tags: {
			$ref: '#/$defs/Tags'
		}
	}
}

const $defs: Record<string, JSONSchema7> = {
	CategoryMetadata,
	Game: {
		enum: ['starforged', 'classic']
	},
	NamespaceKey: {
		description:
			"The name of the dataset, used as a key in the root data object and to compose Dataforged's string ID. This *must* be unique; if you need override behaviour, you can use properties like _extends.",
		type: 'string',
		pattern: '^[a-z0-9][a-z0-9_+]*[a-z0-9]$',
		examples: ['starforged', 'ironsworn', 'ironsworn_delve', 'sundered_isles']
	},
	Color: {
		description:
			'A hexadecimal color associated with this item, for use as e.g. an accent color when rendering it.',
		type: 'string',
		pattern: '^#([\\dA-f]{2}){3}$',
		format: 'color'
	},
	License: {
		description:
			"The URI pointing to the license which this item's *text* content falls under. If this is null, no license is specified -- use with caution.",
		type: ['string', 'null'],
		format: 'uri',
		default: 'https://creativecommons.org/licenses/by-nc-sa/4.0',
		examples: [
			'https://creativecommons.org/licenses/by-nc-sa/4.0',
			'https://creativecommons.org/licenses/by/4.0'
		]
	},
	Title: {
		required: ['canonical'],
		additionalProperties: false,
		properties: {
			_id: {
				$ref: '#/$defs/ID'
			},
			canonical: {
				description:
					"The title of this item, which here is defined as the associated header text *exactly* as it appears on the page (though it should be rendered in title case appropriate to the language, not all-caps).\n\nFor items that represent a single table column, this is the label that appears at the top of the column.\n\nUse this title if you want high fidelity to the book. For most interactive UX, it's recommended to use {@link Title.standard} instead.",
				$ref: '#/$defs/Label'
			},
			short: {
				description:
					"The shortest title for this item that remains distinct amongst its siblings.\n\n Unless you're very pressed for space, most UX should use {@link Title.standard} instead.",
				$ref: '#/$defs/Label'
			},
			standard: {
				description:
					'The recommended title for most implementations.\n\nThis is usually the same as the canonical title, but editorializes a bit by trimming out things like "Oracle 15" in some classic Ironsworn oracles (because *nobody* remembers it as "Oracle 15").',
				$ref: '#/$defs/Label'
			}
		}
	},
	Icon: {
		description: 'The URI of an SVG vector icon.',
		type: 'string',
		format: 'uri-reference',

		pattern: '.svg$' // eslint-disable-line
	},
	Image: {
		description: 'The URI of a WEBP image.',
		type: 'string',
		format: 'uri-reference',
		pattern: '.webp$' // eslint-disable-line
	},
	Source: {
		description:
			"Information on this item's source. For 'canonical' content, this is usually a book with a page number, but it might also be a link to a web site.",
		type: 'object',
		required: ['authors', 'license', 'title', 'date', 'uri'],
		additionalProperties: false,
		examples: [
			{
				title: 'Ironsworn Assets Master Set',
				authors: ['Shawn Tomkin'],
				license: 'https://creativecommons.org/licenses/by/4.0',
				date: '2023-01-15',
				uri: 'https://ironswornrpg.com'
			}
		],
		properties: {
			title: {
				description:
					'The title of the source.\n\nFor \'canonical\' content, use one of the enumerated `SourceTitle` strings.\n\nFor 3rd-party content (including homebrew) that\'s been released as part of a titled document, use the title of that document (e.g. "Steelforged", "Ironsmith").\n\nIf the source has no particular title (for instance, it\'s a single custom element in a VTT implementation), use "Custom".',
				type: 'string',
				examples: [
					'Ironsworn: Starforged Rulebook',
					'Ironsworn Rulebook',
					'Ironsworn: Delve',
					'Ironsworn: Starforged Assets',
					'Ironsworn Assets Master Set'
				]
			},
			authors: {
				description:
					"The author(s) of this item. For 'canonical' content, this one's usually pretty obvious 😉 However, it's included so that homebrew content can use the same interface/schema.",
				default: ['Shawn Tomkin'],
				type: 'array',
				items: {
					type: 'string'
				}
			},
			page: {
				description:
					"The page on which the item appears most prominently in the source material (if it's in a format that uses page numbers).",
				type: 'integer',
				minimum: 1
			},
			uri: {
				description: 'The URI where the source material is available.',
				type: 'string',
				format: 'uri',
				examples: ['https://ironswornrpg.com']
			},
			date: {
				description:
					"The date when the source document's content was last updated.",
				format: 'date',
				type: 'string'
			},
			license: {
				$ref: '#/$defs/License'
			}
		}
	},
	Tags: {
		type: 'array',
		items: {
			type: 'string',
			pattern: '^[a-z][a-z_0-9]*[a-z0-9]$'
		}
	},
	Suggestions: {
		type: 'object',
		description:
			'"Non-canonical" suggestions of related items. They might be convenient to present to the user, but in most implementations rolling them automatically is not recommended.',
		additionalProperties: false,
		properties: {
			rolls: {
				type: 'array',
				items: {
					$ref: '#/$defs/OracleTableID'
				}
			},
			regions: {
				type: 'array',
				items: {
					$ref: '#/$defs/IronlandsRegionID'
				}
			},
			assets: {
				type: 'array',
				items: {
					$ref: '#/$defs/AssetID'
				}
			},
			site_themes: {
				type: 'array',
				items: {
					$ref: '#/$defs/DelveSiteThemeID'
				}
			},
			site_domains: {
				type: 'array',
				items: {
					$ref: '#/$defs/DelveSiteDomainID'
				}
			}
		}
	},
	RenderMetadata: {
		description: 'Contains data relevant to rendering the item.',
		properties: {
			icon: {
				$ref: '#/$defs/Icon'
			},
			images: {
				type: 'array',
				items: {
					$ref: '#/$defs/Image'
				}
			},
			color: {
				$ref: '#/$defs/Color'
			}
		}
	}
}

export default $defs
