import { LocationThemeOraclesPartial } from 'schema-json/templates/location-theme-oracles'

export const OracleCollectionTemplate = {
	type: 'object',
	oneOf: [LocationThemeOraclesPartial]
}
