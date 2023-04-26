import type * as Types from '@base-types'
import {
	Abstract,
	Collections,
	Localize,
	Moves,
	Metadata,
	type Utils
} from '@class-schema'
import { IsInstance, IsOptional, MaxLength, MinLength } from 'class-validator'
import _ from 'lodash'

export class AssetAbility implements Types.Assets.AssetAbility {
	@Metadata.IsAssetAbilityID()
	id: string

	@Localize.IsLabel()
	@IsOptional()
	name?: string | undefined

	@Localize.IsMarkdownSentences()
	text: string

	@Collections.IsRecord(Moves.Move)
	moves?: Record<string, Moves.Move>

	constructor(
		data: Types.Assets.AssetAbility,
		id: string,
		source: Types.Metadata.Source
	) {
		this.id = id
		this.name = data.name
		this.text = data.text
		if (data.moves != null)
			this.moves = _.mapValues(
				data.moves,
				(move, moveKey) =>
					new Moves.Move(move, `${this.id}/moves/${moveKey}`, source)
			)
	}
}

export class Asset extends Abstract.Node implements Types.Assets.Asset {
	@Metadata.IsAssetID()
	id!: string

	@Localize.IsLabel()
	name: string

	@Localize.IsMarkdownPhrase()
	requirement?: string | undefined

	@MinLength(3)
	@MaxLength(3)
	@IsInstance(AssetAbility, { each: true })
	abilities: [AssetAbility, AssetAbility, AssetAbility]

	constructor(
		data: Utils.YamlInput<Types.Assets.Asset>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(data, id, parentSource)
		this.name = data.name
		this.requirement = data.requirement
		this.abilities = data.abilities.map(
			(ability, index) =>
				new AssetAbility(ability, `${this.id}/abilities/${index}`, this.source)
		) as [AssetAbility, AssetAbility, AssetAbility]
	}
}

export class AssetType
	extends Collections.Collection<Asset>
	implements Types.Abstract.AssetType
{
	@Collections.IsRecord(Asset)
	contents: Record<string, Asset>

	constructor(
		data: Utils.YamlInput<Types.Abstract.AssetType>,
		id: string,
		parentSource: Types.Metadata.Source
	) {
		super(
			data as Utils.YamlInput<Types.Abstract.Collection<Asset>>,
			id,
			parentSource
		)
		this.contents = _.mapValues(
			data.contents,
			(asset, assetKey) =>
				new Asset(
					asset,
					`${this.id.replace('/collections/', '/')}/${assetKey}`,
					this.source
				)
		)
	}
}
