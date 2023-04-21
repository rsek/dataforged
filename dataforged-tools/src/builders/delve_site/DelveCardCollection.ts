import { DelveSiteDomainBuilder, DelveSiteThemeBuilder, RootCollectionBuilder } from '@builders'
import type { DelveCard, DelveSiteDomain, DelveSiteTheme, Source, YamlDelveCard, YamlDelveSiteDomain, YamlDelveSiteDomainRoot, YamlDelveSiteTheme, YamlDelveSiteThemeRoot } from '@schema'
import { DelveCardType, Game } from '@schema'

export abstract class DelveCardsCollection<
  TMapItem extends DelveCard,
  TYamlItem extends YamlDelveCard,
  TYamlRoot extends YamlDelveSiteDomainRoot | YamlDelveSiteThemeRoot
  > extends RootCollectionBuilder<
  Game.Ironsworn,
  TMapItem,
  TYamlItem,
  TYamlRoot
  > {
  constructor (type: DelveCardType, fragment: string, source: Source) {
    super(
      Game.Ironsworn,
      fragment,
      source,
      `../_master-data/ironsworn/delve_site_${type}s.(yml|yaml)`,
      `Delve site ${type}s` as keyof TYamlRoot
    )
  }
}
export class DelveSiteThemesCollection extends DelveCardsCollection<
DelveSiteTheme,
YamlDelveSiteTheme,
YamlDelveSiteThemeRoot
> {
  override buildItem (yaml: YamlDelveSiteTheme, key: string): DelveSiteTheme {
    return new DelveSiteThemeBuilder(yaml, key, this.source)
  }

  constructor (source: Source) {
    super(DelveCardType.Theme, 'themes', source)
  }
}

export class DelveSiteDomainsCollection extends DelveCardsCollection<
DelveSiteDomain,
YamlDelveSiteDomain,
YamlDelveSiteDomainRoot
> {
  override buildItem (yaml: YamlDelveSiteDomain, key: string): DelveSiteDomain {
    return new DelveSiteDomainBuilder(yaml, key, this.source)
  }

  constructor (source: Source) {
    super(DelveCardType.Domain, 'domains', source)
  }
}
