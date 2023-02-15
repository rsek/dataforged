import { LocationOraclePartial } from 'schema-json/templates/generic-oracles'
import { LocationThemeOraclesPartial } from 'schema-json/templates/location-theme-oracles'
import { PlanetOraclesPartial } from 'schema-json/templates/planet-oracles'

export const OracleCollectionTemplate = {
	type: 'object',
	oneOf: [LocationThemeOraclesPartial, PlanetOraclesPartial]
}

export const OracleTableTemplate = {
	type: 'object',
	oneOf: [LocationOraclePartial]
}
