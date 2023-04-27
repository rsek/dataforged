import { JTDSchemaType } from 'ajv/dist/core'

export const RegularExpression: JTDSchemaType<string> = {
	type: 'string'
}

export const StatID: JTDSchemaType<string> = {
	type: 'string',
	metadata: {
		description:
			'A player stat (e.g. `player/stats/edge`), a player condition meter (e.g. `player/meters/health`), or an ID pointing to an asset option or asset control whose value is to be used.'
	}
}
