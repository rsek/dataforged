import type { DelveCard, DelveCardType , DelveDomain, DelveTheme, YamlStub, YamlStubNode } from "@schema";

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
export interface YamlDelveDomain extends YamlDelveCard {
  Type: DelveCardType.Domain;
  /**
   * {@inheritDoc DelveDomain.Features}
   */
  Features: StubTable<[
    DelveDomain["Features"][0],
    DelveDomain["Features"][1],
    DelveDomain["Features"][2],
    DelveDomain["Features"][3],
    DelveDomain["Features"][4],
    DelveDomain["Features"][5],
    DelveDomain["Features"][6],
    DelveDomain["Features"][7],
    DelveDomain["Features"][8],
  ]>
  Dangers: StubTable<DelveDomain["Dangers"]>
}

/**
 * @internal
 */
export interface YamlDelveTheme extends YamlDelveCard {
  Type: DelveCardType.Theme;
  Features: StubTable<DelveTheme["Features"]>
  Dangers: StubTable<DelveTheme["Dangers"]>
}