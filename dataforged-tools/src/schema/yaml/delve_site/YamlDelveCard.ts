import type { DelveCard, DelveCardType , DelveSiteDomain, DelveSiteTheme, YamlStub, YamlStubNode } from "@schema";

/**
 * @internal
 */
export interface YamlDelveCard extends YamlStubNode<DelveCard,"", "Features"|"Dangers"> {
  Features: StubTable<DelveCard["Features"]>
  Dangers: StubTable<DelveCard["Dangers"]>
}

/**
 * @internal
 */
export type StubTable<T extends unknown[]> = {
  [I in keyof T]: YamlStub<T[I]>
};

/**
 * @internal
 */
export interface YamlDelveSiteDomain extends YamlDelveCard {
  Type: DelveCardType.Domain;
  /**
   * {@inheritDoc DelveSiteDomain.Features}
   */
  Features: StubTable<[
    DelveSiteDomain["Features"][0],
    DelveSiteDomain["Features"][1],
    DelveSiteDomain["Features"][2],
    DelveSiteDomain["Features"][3],
    DelveSiteDomain["Features"][4],
    DelveSiteDomain["Features"][5],
    DelveSiteDomain["Features"][6],
    DelveSiteDomain["Features"][7],
    DelveSiteDomain["Features"][8],
  ]>
  Dangers: StubTable<DelveSiteDomain["Dangers"]>
}

/**
 * @internal
 */
export interface YamlDelveSiteTheme extends YamlDelveCard {
  Type: DelveCardType.Theme;
  Features: StubTable<DelveSiteTheme["Features"]>
  Dangers: StubTable<DelveSiteTheme["Dangers"]>
}