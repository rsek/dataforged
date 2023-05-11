import { Type } from '@sinclair/typebox'
import { JsonEnum } from 'typebox'

export const GameObject = Type.Object(
	{
		type: JsonEnum(
			[
				'character',
				'creature',
				'derelict',
				'derelict_zone',
				'faction',
				'planet',
				'precursor_vault',
				'settlement',
				'starship'
			],
			{ title: 'GameObjectType' }
		)
	},
	{
		description:
			'Describes a game object, with optional required parameters (for example, a specific Location result).'
	}
)
