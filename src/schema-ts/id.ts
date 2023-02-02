import { JSONSchema7 } from 'json-schema'

type RegExpParams = ConstructorParameters<typeof RegExp>

/**
   * Pattern used for Dataforged keys and ID fragments.
   */
const dfKey = /[a-z][a-z_]*[a-z]/

export const DF_KEY = `^[a-z][a-z_]*[a-z]$`

export class IdPattern extends String {
  static separator = '/'
  /**
 * Pattern used for Dataforged root/namespace fragments, which is slightly more permissive (to account for e.g. a
 */
  static namespaceFragment = /[a-z0-9][a-z0-9_]*[a-z0-9]/
  static fragmentChars = /[a-z0-9][a-z0-9_]*[a-z0-9]/

  fragments: Array<RegExpParams[0]> = [IdPattern.namespaceFragment]

  constructor (...patterns: Array<RegExpParams[0]>) {
    super()
    this.fragments.push(...patterns)
  }

  override valueOf (): string {
    return this.toString()
  }

  override toString (): string {
    let idPattern = ''
    let fragmentsToMerge: Array<RegExpParams[0]> = []
    for (let i = 0; i < this.length; i++) {
      const current = this.fragments[i].toString()
      const next = this.fragments[i + 1].toString()
      if (current === next) {
        fragmentsToMerge.push(current)
      } else {
        if (fragmentsToMerge.length > 0) {
          // add repeat pattern to string and then reset
          idPattern += `(${IdPattern.separator}${current}){${fragmentsToMerge.length}}`
          fragmentsToMerge = []
        } else {
          idPattern += `${IdPattern.separator}${current}`
        }
      }
    }
    return `^${idPattern}$`
  }
}

const $defs: Record<string, JSONSchema7> = {

  'Impact.ID': {
    $comment: '{namespace}/impacts/{impactType}/{impact}',
    type: 'string',
    pattern: new IdPattern('impacts', dfKey, dfKey).toString()
  },
  'PlayerConditionMeter.ID': {
    description: 'A standard player character condition meter.',
    enum: [
      'player/condition_meters/health',
      'player/condition_meters/spirit',
      'player/condition_meters/supply'
    ]
  },
  'PlayerStat.ID': {
    description: 'A standard player character stat.',
    enum: [
      'player/stats/edge',
      'player/stats/heart',
      'player/stats/iron',
      'player/stats/shadow',
      'player/stats/wits'
    ]
  },
  'AssetAbility.ID': {
    type: 'string',
    pattern: new IdPattern('assets', dfKey, dfKey, 'abilities', /[0-2]/).toString()
  },
  'Move.ID': {
    anyOf: [
      {
        $ref: '#/definitions/CoreMove.ID'
      },
      {
        $ref: '#/definitions/AssetMove.ID'
      }
    ]
  },
  DataforgedNamespace: {
    type: 'string',
    pattern: new IdPattern().toString()
  },
  ID: {
    type: 'string',
    pattern: `^${IdPattern.namespaceFragment}(/${IdPattern.fragmentChars.source})+$`,
    description: 'A unique, human-readable ID.'
  },

  'MoveCategory.ID': {
    $ref: '#/definitions/ID',
    pattern: new IdPattern('moves', dfKey).toString()
  },
  'CoreMove.ID': {
    $ref: '#/definitions/ID',
    pattern: new IdPattern('moves', dfKey, dfKey).toString()
  },
  'AssetType.ID': {
    $comment: '{namespace}/assets/{assetType}',
    $ref: '#/definitions/ID',
    pattern: new IdPattern('assets', dfKey).toString()
  },
  'Asset.ID': {
    $ref: '#/definitions/ID',
    $comment: '{namespace}/assets/{assetType}/{asset}',
    pattern: new IdPattern('assets', dfKey, dfKey).toString()
  },
  'AssetMove.ID': {
    $ref: '#/definitions/ID',
    $comment: '{namespace}/assets/{assetType}/{asset}/moves/{assetMove}',
    pattern: new IdPattern('assets', dfKey, dfKey, 'moves', dfKey).toString()
  },
  'DelveSiteTheme.ID': {
    $comment: '{namespace}/site_themes/{siteTheme}',
    pattern: new IdPattern('site_themes', dfKey).toString()
    // pattern: '/site_themes/[a-z_]+'
  },
  'DelveSiteDomain.ID': {
    $comment: '{namespace}/site_domains/{siteDomain}',
    $ref: '#/definitions/ID',
    pattern: new IdPattern('site_domains', dfKey).toString()
  },

  'IronlandsRegion.ID': {
    $ref: '#/definitions/ID',
    $comment: '{namespace}/regions/{region}',
    pattern: new IdPattern('regions', dfKey).toString()
  },
  'OracleSet.ID': {
    $ref: '#/definitions/ID',
    $comment: '{namespace}/oracles/{oracleSet}'
  },

  'OracleTable.ID': {
    $ref: '#/definitions/ID',
    $comment: '{namespace}/oracles/{oracleSet}/{oracle}',
    pattern: `^${IdPattern.namespaceFragment}/oracles(/${dfKey}){2,}$`
  },
  'EncounterNatureClassic.ID': { $comment: '{namespace}/encounters/{nature}' },
  'EncounterClassic.ID': {
    $comment: '{namespace}/encounters/{nature}/{encounter}',
    $ref: '#/definitions/ID',
    pattern: new IdPattern('encounters', dfKey, dfKey).toString()
  },
  'EncounterVariantStarforged.ID': {
    $comment: '{namespace}/encounters/{encounter}/variants/{variant}',

    $ref: '#/definitions/ID',
    pattern: new IdPattern('encounters', dfKey, 'variants', 'dfKey').toString()
  },
  'EncounterStarforged.ID': {
    $comment: '{namespace}/encounters/{encounter}',
    $ref: '#/definitions/ID',
    pattern: new IdPattern('encounters', dfKey).toString()
  },
  'Rarity.ID': {
    $comment: '{namespace}/rarities/{rarity}',
    $ref: '#/definitions/ID',
    pattern: new IdPattern('rarities', dfKey).toString()
  },
  'Attribute.ID': {
    $ref: '#/definitions/ID',
    $comment:
        `
      {namespace}/assets/{key}/{key}/attributes/{key}
        *or*
      {namespace}/assets/{key}/{key}/moves/{key}/attributes/{key}
        *or*
      {namespace}/moves/{key}/{key}/attributes/{key}
      `,
    pattern: '/(assets/[a-z_]+/[a-z_]+(/moves/[a-z_]+)?|moves/[a-z_]+/[a-z_]+)/attributes/[a-z_]+$',
    anyOf: [{
      pattern: new IdPattern(
        'assets', dfKey, dfKey, 'attributes', dfKey).toString()
    }, {
      pattern: new IdPattern(
        'assets', dfKey, dfKey, 'moves', dfKey, 'attributes', dfKey).toString()
    }, {
      pattern: new IdPattern(
        'moves', dfKey, dfKey, 'attributes', 'key'
      ).toString()
    }]
  }

}

export default $defs
