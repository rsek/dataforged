import { MASTER_DATA_PATH } from "@constants/index.js";
import { DelveCardType, Gamespace } from "@json_out/index.js";
import fs from "fs";
import yaml from "js-yaml";
import { IDelveDomainYaml, IDelveSiteRootYaml, IDelveThemeYaml } from "@yaml_in/index.js";
import { DelveDomain, DelveTheme } from "@classes/delve_site/DelveCard.js";

export function buildDelveSiteCards<T extends DelveCardType>(
  type: T
) {
    const assetPath = `${MASTER_DATA_PATH as string}/${Gamespace.Ironsworn}/Delve-Site-${type === DelveCardType.Domain ? "Domains" : "Themes"}.yaml`;
  const data = fs.readFileSync(assetPath, { encoding: "utf-8" });
  const json = yaml.load(data) as IDelveSiteRootYaml;
  switch (type) {
    case DelveCardType.Domain: {
      const cards = json.Domains as IDelveDomainYaml[]
      return cards.map(card => new DelveDomain(card))
    }
    case DelveCardType.Theme: {
      const cards = json.Themes as IDelveThemeYaml[]
      return cards.map(card => new DelveTheme(card))
}
    default:
      throw Error()
  }
}