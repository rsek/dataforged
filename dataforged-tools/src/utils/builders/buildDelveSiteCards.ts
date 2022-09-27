import { DelveDomainBuilder, DelveThemeBuilder } from "@builders/delve_site/DelveCardBuilder.js";
import { MASTER_DATA_PATH } from "@constants";
import { DelveCardType, Game } from "@schema";
import { YamlDelveSiteDomainRoot,YamlDelveSiteThemeRoot } from "@schema";
import fs from "fs";
import yaml from "js-yaml";
import _ from "lodash";

export function buildDelveSiteCards<T extends DelveCardType>(
  type: T
) {
    const assetPath = `${MASTER_DATA_PATH as string}/${Game.Ironsworn}/Delve-Site-${type === DelveCardType.Domain ? "Domains" : "Themes"}.yaml`;
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as YamlDelveSiteDomainRoot|YamlDelveSiteThemeRoot;
  switch (type) {
    case DelveCardType.Domain: {
      const cards = (json as YamlDelveSiteDomainRoot).Domains
      return _.mapValues(cards,card => new DelveDomainBuilder(card))
    }
    case DelveCardType.Theme: {
      const cards = (json as YamlDelveSiteThemeRoot).Themes
      return _.mapValues(cards,card => new DelveThemeBuilder(card))
}
    default:
      throw Error()
  }
}