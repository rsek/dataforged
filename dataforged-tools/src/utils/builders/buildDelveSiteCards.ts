import { DelveSiteDomainBuilder, DelveSiteThemeBuilder } from '@builders/delve_site/DelveCardBuilder.js'
import { MASTER_DATA_PATH } from '@constants'
import { DelveCardType, Game, YamlDelveSiteDomainRoot, YamlDelveSiteThemeRoot } from '@schema'
import { buildLog } from '@utils/logging/buildLog.js'
import fs from 'fs'
import yaml from 'js-yaml'
import _ from 'lodash'

export function buildDelveSiteCards<T extends DelveCardType> (
  type: T
) {
  buildLog(buildDelveSiteCards, `Building delve site ${type.toLowerCase()}s...`)
  const assetPath = `${MASTER_DATA_PATH as string}/${Game.Ironsworn}/Delve-Site-${type === DelveCardType.Domain ? 'Domains' : 'Themes'}.yaml`
  const data = fs.readFileSync(assetPath, { encoding: 'utf-8' })
  const json = yaml.load(data) as YamlDelveSiteDomainRoot|YamlDelveSiteThemeRoot
  switch (type) {
    case DelveCardType.Domain: {
      const cards = (json as YamlDelveSiteDomainRoot)['Delve site domains']
      return _.mapValues(cards, (card, key) => new DelveSiteDomainBuilder(card, key, json.Source))
    }
    case DelveCardType.Theme: {
      const cards = (json as YamlDelveSiteThemeRoot)['Delve site themes']
      return _.mapValues(cards, (card, key) => new DelveSiteThemeBuilder(card, key, json.Source))
    }
    default:
      throw Error()
  }
}
