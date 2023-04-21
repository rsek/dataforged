import type { DelveCard, DelveCardType, DelveSiteDomain, DelveSiteTheme, YamlStub, YamlStubNode } from '@schema'

/**
 * @internal
 */
export interface YamlDelveCard extends YamlStubNode<DelveCard, '', 'features' | 'dangers'> {
  features: StubTable<DelveCard['features']>
  dangers: StubTable<DelveCard['dangers']>
}

/**
 * @internal
 */
export type StubTable<T extends unknown[]> = {
  [I in keyof T]: YamlStub<T[I]>
}

/**
 * @internal
 */
export interface YamlDelveSiteDomain extends YamlDelveCard {
  card_type: DelveCardType.Domain
  /**
   * {@inheritDoc DelveSiteDomain.features}
   */
  features: StubTable<[
    DelveSiteDomain['features'][0],
    DelveSiteDomain['features'][1],
    DelveSiteDomain['features'][2],
    DelveSiteDomain['features'][3],
    DelveSiteDomain['features'][4],
    DelveSiteDomain['features'][5],
    DelveSiteDomain['features'][6],
    DelveSiteDomain['features'][7],
    DelveSiteDomain['features'][8],
  ]>
  dangers: StubTable<DelveSiteDomain['dangers']>
}

/**
 * @internal
 */
export interface YamlDelveSiteTheme extends YamlDelveCard {
  card_type: DelveCardType.Theme
  features: StubTable<DelveSiteTheme['features']>
  dangers: StubTable<DelveSiteTheme['dangers']>
}
