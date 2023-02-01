import { JSONSchema7 } from 'json-schema'

type RegExpParams = ConstructorParameters<typeof RegExp>

/**
   * Pattern used for Dataforged keys and ID fragments.
   */
const dfKey = /[a-z][a-z_]*[a-z]/

export const DF_KEY = `^${dfKey.source}$`

export class IdPattern extends String {
  static separator = '/'
  /**
 * Pattern used for Dataforged root/namespace fragments, which is slightly more permissive (to account for e.g. a
 */
  static namespaceFragment = /[a-z0-9][a-z0-9_]*[a-z0-9]/
  static fragmentChars = /[a-z0-9][a-z_-0-9]*[a-z0-9]/

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
      const current = this.fragments[i]
      const next = this.fragments[i + 1]
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

const schema: JSONSchema7 = {
  definitions: {
    IDImpact: {
      $comment: '{namespace}/impacts/{type}/{name}',
      type: 'string',
      pattern: new IdPattern('impacts', dfKey, dfKey).toString()
    },
    IDPlayerConditionMeter: {
      description: 'A standard player character condition meter.',
      enum: [
        'player/condition_meters/health',
        'player/condition_meters/spirit',
        'player/condition_meters/supply'
      ]
    },
    IDPlayerStat: {
      description: 'A standard player character stat.',
      enum: [
        'player/stats/edge',
        'player/stats/heart',
        'player/stats/iron',
        'player/stats/shadow',
        'player/stats/wits'
      ]
    },
    IDAssetAbility: {
      type: 'string',
      pattern: new IdPattern('assets', dfKey, dfKey, 'abilities', /[0-2]/).toString()
    },
    IDMove: {
      anyOf: [
        {
          $ref: '#/definitions/IDCoreMove'
        },
        {
          $ref: '#/definitions/IDAssetMove'
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

    IDMoveCategory: {
      $ref: '#/definitions/ID',
      pattern: new IdPattern('moves', dfKey).toString()
    },
    IDCoreMove: {
      $ref: '#/definitions/ID',
      pattern: new IdPattern('moves', dfKey, dfKey).toString()
    },
    IDAssetType: {
      $ref: '#/definitions/ID',
      pattern: new IdPattern('assets', dfKey).toString()
    },
    IDAsset: {
      $ref: '#/definitions/ID',
      pattern: new IdPattern('assets', dfKey, dfKey).toString()
    },
    IDAssetMove: {
      $ref: '#/definitions/ID',
      pattern: new IdPattern('assets', dfKey, dfKey, 'moves', dfKey).toString()
    },
    IDDelveSiteTheme: {
      $comment: '{namespace}/site_themes/{key}',
      pattern: new IdPattern('site_themes', dfKey).toString()
      // pattern: '/site_themes/[a-z_]+'
    },
    IDDelveSiteDomain: {
      $comment: '{namespace}/site_domains/{key}',
      $ref: '#/definitions/ID',
      pattern: new IdPattern('site_domains', dfKey).toString()
    },

    IDIronlandsRegion: {
      $ref: '#/definitions/ID',
      $comment: '{namespace}/regions/{key}',
      pattern: new IdPattern('regions', dfKey).toString()
    },

    IDOracleTable: {
      $ref: '#/definitions/ID',
      pattern: `^${IdPattern.namespaceFragment}/oracles(/${dfKey}){2,}$`
    },

    IDEncounterClassic: {
      $comment: '{namespace}/encounter_natures/{nature}/{encounter}',
      $ref: '#/definitions/ID',
      pattern: new IdPattern('encounter_natures', dfKey, dfKey).toString()
    },
    IDEncounterStarforged: {
      $comment: '{namespace}/encounters/{encounter} *or* {namespace}/encounters/{encounter}/variants/{variant}',
      $ref: '#/definitions/ID',
      anyOf: [{ pattern: new IdPattern('encounters', dfKey).toString() },
        { pattern: new IdPattern('encounters', dfKey, 'variants', 'dfKey').toString() }]

    },
    IDRarity: {
      $comment: '{namespace}/rarities/{name}',
      $ref: '#/definitions/ID',
      pattern: new IdPattern('rarities', dfKey).toString()
    },
    IDAttribute: {
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

}

export default schema
