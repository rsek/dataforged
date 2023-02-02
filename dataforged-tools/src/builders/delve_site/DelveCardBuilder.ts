import { OracleTableRowBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { DelveCardType, Game } from '@schema'
import type { DelveCard, DelveSiteDomain, DelveSiteTheme, OracleTableRow, Source, Title, YamlDelveCard, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlRowLike } from '@schema'
import type { PartialBy } from '@utils'
import { formatId } from '@utils'
import _ from 'lodash'

const domainFeaturesStatic: PartialBy<OracleTableRow, '$id'>[] = [
  {
    floor: 89,
    ceiling: 98,
    result: 'Something unusual or unexpected',
    suggestions: {
      oracle_tables: [
        'ironsworn/oracles/feature/aspect',
        'ironsworn/oracles/feature/focus'
      ]
    }
  },
  {
    floor: 99,
    ceiling: 99,
    result: 'You transition into a new theme',
    suggestions: {
      oracle_tables: [
        'ironsworn/oracles/site_nature/theme'
      ]
    }
  },
  {
    floor: 100,
    ceiling: 100,
    result: 'You transition into a new domain',
    suggestions: {
      oracle_tables: [
        'ironsworn/oracles/site_nature/domain'
      ]
    }
  }
]

/**
 * @internal
 */
export abstract class DelveCardBuilder implements DelveCard {
  $id: string
  card_type: DelveCardType
  title: Title
  source: Source
  summary: string
  description: string
  features: OracleTableRow[]
  dangers: OracleTableRow[]
  constructor (type: DelveCardType, yaml: YamlDelveCard, fragment: string, parentSource?: Source | undefined, domainFeaturesStaticRows: PartialBy<OracleTableRow, '$id'>[] = domainFeaturesStatic) {
    this.$id = formatId(fragment, Game.Ironsworn, type)
    this.card_type = type
    this.title = new TitleBuilder(yaml.title, this)
    this.source = new SourceBuilder(yaml.source ?? SourceBuilder.defaultByGame(Game.Ironsworn), parentSource ?? {})
    this.summary = yaml.summary
    this.description = yaml.description
    // @ts-expect-error
    this.features = yaml.features.map((row, index) => new OracleTableRowBuilder(row as YamlRowLike, index, this))
    let newDangers = yaml.dangers as PartialBy<OracleTableRow, '$id'>[]
    if (this.card_type === DelveCardType.Domain) {
      newDangers = _.cloneDeep(yaml.dangers)
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows))
    }
    // @ts-expect-error
    this.dangers = newDangers.map((row, index) => new OracleTableRowBuilder(row as YamlRowLike, index, this))
  }
}

/**
 * @internal
 */
export class DelveSiteThemeBuilder extends DelveCardBuilder implements DelveSiteTheme {
  card_type!: DelveCardType.Theme
  features!: DelveSiteTheme['features'] & OracleTableRow[]
  dangers!: DelveSiteTheme['dangers'] & OracleTableRow[]
  constructor (yaml: YamlDelveSiteTheme, fragment: string, parentSource: Source) {
    super(DelveCardType.Theme, yaml, fragment, parentSource)
  }
}

/**
 * @internal
 */
export class DelveSiteDomainBuilder extends DelveCardBuilder implements DelveSiteDomain {
  card_type!: DelveCardType.Domain
  features!: DelveSiteDomain['features'] & OracleTableRow[]
  dangers!: DelveSiteDomain['dangers'] & OracleTableRow[]
  constructor (yaml: YamlDelveSiteDomain, fragment: string, parentSource: Source) {
    super(DelveCardType.Domain, yaml, fragment, parentSource)
  }
}
