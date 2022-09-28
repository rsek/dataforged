import { OracleTableRowBuilder, SourceBuilder, TitleBuilder } from '@builders'
import { DelveCardType, Game } from '@schema'
import type { DelveCard, DelveSiteDomain, DelveSiteTheme, OracleTableRow, Source, Title, YamlDelveCard, YamlDelveSiteDomain, YamlDelveSiteTheme } from '@schema'
import type { PartialBy } from '@utils'
import { formatId } from '@utils'
import _ from 'lodash-es'

const domainFeaturesStatic: Array<PartialBy<OracleTableRow, '$id'>> = [
  {
    Floor: 89,
    Ceiling: 98,
    Result: 'Something unusual or unexpected',
    Suggestions: {
      'Oracle rolls': [
        'Ironsworn/Oracles/Feature/Aspect',
        'Ironsworn/Oracles/Feature/Focus'
      ]
    }
  },
  {
    Floor: 99,
    Ceiling: 99,
    Result: 'You transition into a new theme',
    Suggestions: {
      'Oracle rolls': [
        'Ironsworn/Oracles/Site_nature/Theme'
      ]
    }
  },
  {
    Floor: 100,
    Ceiling: 100,
    Result: 'You transition into a new domain',
    Suggestions: {
      'Oracle rolls': [
        'Ironsworn/Oracles/Site_nature/Domain'
      ]
    }
  }
]

/**
 * @internal
 */
export abstract class DelveCardBuilder implements DelveCard {
  $id: string
  'Card type': DelveCardType
  Title: Title
  Source: Source
  Summary: string
  Description: string
  Features: OracleTableRow[]
  Dangers: OracleTableRow[]
  constructor(type: DelveCardType, yaml: YamlDelveCard, fragment: string, parentSource?: Source | undefined, domainFeaturesStaticRows: Array<PartialBy<OracleTableRow, '$id'>> = domainFeaturesStatic) {
    this.$id = formatId(fragment, Game.Ironsworn, type)
    this.'Card type' = type
    this.Title = new TitleBuilder(yaml.Title, this)
    this.Source = new SourceBuilder(yaml.Source ?? SourceBuilder.default(Game.Ironsworn), parentSource ?? {})
    this.Summary = yaml.Summary
    this.Description = yaml.Description
    this.Features = yaml.Features.map(row => new OracleTableRowBuilder(this.$id + '/Features', row))
    let newDangers = yaml.Dangers as Array<PartialBy<OracleTableRow, '$id'>>
    if (this.'Card type' === DelveCardType.Domain) {
      newDangers = _.cloneDeep(yaml.Dangers)
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows))
    }
    this.Dangers = newDangers.map(row => new OracleTableRowBuilder(this.$id + '/Dangers', row))
  }
}

/**
 * @internal
 */
export class DelveSiteThemeBuilder extends DelveCardBuilder implements DelveSiteTheme {
  'Card type'!: DelveCardType.Theme
  Features!: DelveSiteTheme['Features'] & OracleTableRow[]
  Dangers!: DelveSiteTheme['Dangers'] & OracleTableRow[]
  constructor(yaml: YamlDelveSiteTheme, fragment: string, parentSource: Source) {
    super(DelveCardType.Theme, yaml, fragment, parentSource)
  }
}

/**
 * @internal
 */
export class DelveSiteDomainBuilder extends DelveCardBuilder implements DelveSiteDomain {
  'Card type'!: DelveCardType.Domain
  Features!: DelveSiteDomain['Features'] & OracleTableRow[]
  Dangers!: DelveSiteDomain['Dangers'] & OracleTableRow[]
  constructor(yaml: YamlDelveSiteDomain, fragment: string, parentSource: Source) {
    super(DelveCardType.Domain, yaml, fragment, parentSource)
  }
}
