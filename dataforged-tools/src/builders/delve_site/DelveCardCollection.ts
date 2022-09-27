import { CollectionBuilder, DelveSiteDomainBuilder , DelveSiteThemeBuilder } from "@builders";
import type { DelveCard, DelveSiteDomain, DelveSiteTheme, Source, YamlDelveCard, YamlDelveSiteDomain, YamlDelveSiteDomainRoot , YamlDelveSiteTheme, YamlDelveSiteThemeRoot } from "@schema";
import { DelveCardType , Game } from "@schema";

export abstract class DelveCardsCollection<
    TMapItem extends DelveCard,
    TYamlItem extends YamlDelveCard,
    TYamlRoot extends YamlDelveSiteDomainRoot|YamlDelveSiteThemeRoot
  > extends CollectionBuilder<
    Game.Ironsworn,
    TMapItem,
    TYamlItem,
    TYamlRoot
  > {
  constructor(type: DelveCardType, fragment: string, source: Source) {
    super(
      Game.Ironsworn,
      `../_master-data/Ironsworn/delve-site-${type}s.(yml|yaml)`,
      fragment,
      `Delve site ${type}s` as keyof TYamlRoot,
      source);
  }
}
export class DelveSiteThemesCollection extends DelveCardsCollection<
  DelveSiteTheme,
  YamlDelveSiteTheme,
  YamlDelveSiteThemeRoot
  > {
  override buildItem(yaml: YamlDelveSiteTheme, key: string): DelveSiteTheme {
    return new DelveSiteThemeBuilder(yaml, key, this.Source);
  }
  constructor(source: Source) {
    super(DelveCardType.Theme, "Themes", source);
  }
}

export class DelveSiteDomainsCollection extends DelveCardsCollection<
  DelveSiteDomain,
  YamlDelveSiteDomain,
  YamlDelveSiteDomainRoot
  > {
  override buildItem(yaml: YamlDelveSiteDomain, key: string): DelveSiteDomain {
    return new DelveSiteDomainBuilder(yaml, key, this.Source);
  }
  constructor(source: Source) {
    super(DelveCardType.Domain, "Domains", source);
  }
}