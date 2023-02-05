import { type JSONSchema7 } from 'json-schema'

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

  constructor(...patterns: Array<RegExpParams[0]>) {
    super()
    this.fragments.push(...patterns)
  }

  override valueOf(): string {
    return this.toString()
  }

  override toString(): string {
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
  ImpactID: {
    $comment: '{namespace}/impacts/{impactType}/{impact}',
    type: 'string',
    pattern: new IdPattern('impacts', dfKey, dfKey).toString()
  },
  PlayerConditionMeterID: {
    description: 'A standard player character condition meter.',
    enum: [
      'player/condition_meters/health',
      'player/condition_meters/spirit',
      'player/condition_meters/supply'
    ]
  },
  PlayerStatID: {
    description: 'A standard player character stat.',
    enum: [
      'player/stats/edge',
      'player/stats/heart',
      'player/stats/iron',
      'player/stats/shadow',
      'player/stats/wits'
    ]
  },
  AssetAbilityID: {
    type: 'string',
    pattern: new IdPattern(
      'assets',
      dfKey,
      dfKey,
      'abilities',
      /[0-2]/
    ).toString()
  },
  MoveID: {
    anyOf: [
      {
        $ref: '#/$defs/CoreMoveID'
      },
      {
        $ref: '#/$defs/AssetMoveID'
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

  MoveCollectionID: {
    $ref: '#/$defs/ID',
    pattern: new IdPattern('moves', dfKey).toString()
  },
  CoreMoveID: {
    $ref: '#/$defs/ID',
    pattern: new IdPattern('moves', dfKey, dfKey).toString()
  },
  AssetCollectionID: {
    $comment: '{namespace}/assets/{assetType}',
    $ref: '#/$defs/ID',
    pattern: new IdPattern('assets', dfKey).toString()
  },
  AssetID: {
    $ref: '#/$defs/ID',
    $comment: '{namespace}/assets/{assetType}/{asset}',
    pattern: new IdPattern('assets', dfKey, dfKey).toString()
  },
  AssetMoveID: {
    $ref: '#/$defs/ID',
    $comment: '{namespace}/assets/{assetType}/{asset}/moves/{assetMove}',
    pattern: new IdPattern('assets', dfKey, dfKey, 'moves', dfKey).toString()
  },
  DelveSiteThemeID: {
    $comment: '{namespace}/site_themes/{siteTheme}',
    pattern: new IdPattern('site_themes', dfKey).toString()
    // pattern: '/site_themes/[a-z_]+'
  },
  DelveSiteDomainID: {
    $comment: '{namespace}/site_domains/{siteDomain}',
    $ref: '#/$defs/ID',
    pattern: new IdPattern('site_domains', dfKey).toString()
  },

  IronlandsRegionID: {
    $ref: '#/$defs/ID',
    $comment: '{namespace}/regions/{region}',
    pattern: new IdPattern('regions', dfKey).toString()
  },
  OracleCollectionID: {
    $ref: '#/$defs/ID',
    $comment: '{namespace}/oracles/{oracleSet}'
  },

  OracleTableID: {
    $ref: '#/$defs/ID',
    $comment: '{namespace}/oracles/{oracleSet}/{oracle}',
    pattern: `^${IdPattern.namespaceFragment}/oracles(/${dfKey}){2,}$`
  },
  EncounterNatureClassicID: { $comment: '{namespace}/encounters/{nature}' },
  EncounterClassicID: {
    $comment: '{namespace}/encounters/{nature}/{encounter}',
    $ref: '#/$defs/ID',
    pattern: new IdPattern('encounters', dfKey, dfKey).toString()
  },
  EncounterVariantStarforgedID: {
    $comment: '{namespace}/encounters/{encounter}/variants/{variant}',

    $ref: '#/$defs/ID',
    pattern: new IdPattern('encounters', dfKey, 'variants', 'dfKey').toString()
  },
  EncounterStarforgedID: {
    $comment: '{namespace}/encounters/{encounter}',
    $ref: '#/$defs/ID',
    pattern: new IdPattern('encounters', dfKey).toString()
  },
  RarityID: {
    $comment: '{namespace}/rarities/{rarity}',
    $ref: '#/$defs/ID',
    pattern: new IdPattern('rarities', dfKey).toString()
  },
  AttributeID: {
    $ref: '#/$defs/ID',
    $comment: `
      {namespace}/assets/{key}/{key}/attributes/{key}
        *or*
      {namespace}/assets/{key}/{key}/moves/{key}/attributes/{key}
        *or*
      {namespace}/moves/{key}/{key}/attributes/{key}
      `,
    pattern:
      '/(assets/[a-z_]+/[a-z_]+(/moves/[a-z_]+)?|moves/[a-z_]+/[a-z_]+)/attributes/[a-z_]+$',
    anyOf: [
      {
        pattern: new IdPattern(
          'assets',
          dfKey,
          dfKey,
          'attributes',
          dfKey
        ).toString()
      },
      {
        pattern: new IdPattern(
          'assets',
          dfKey,
          dfKey,
          'moves',
          dfKey,
          'attributes',
          dfKey
        ).toString()
      },
      {
        pattern: new IdPattern(
          'moves',
          dfKey,
          dfKey,
          'attributes',
          'key'
        ).toString()
      }
    ]
  }
}

export default $defs
