import { OracleTableRowBuilder, SourceBuilder, TitleBuilder } from "@builders";
import { DelveCardType, Gamespace } from "@schema_json";
import type { DelveCard, DelveDomain , DelveTheme, OracleTableRow, Source } from "@schema_json";

import type { YamlDelveCard, YamlDelveDomain, YamlDelveTheme } from "@schema_yaml";
import type { PartialBy } from "@utils";
import { formatId } from "@utils";
import _ from "lodash-es";


const domainFeaturesStatic: PartialBy<OracleTableRow, "$id">[] = [
  {
    Floor: 89,
    Ceiling: 98,
    Result: "Something unusual or unexpected",
    Suggestions: {
      "Oracle rolls": [
        "Ironsworn/Oracles/Feature/Aspect",
        "Ironsworn/Oracles/Feature/Focus"
      ]
    }
  },
  {
    Floor: 99,
    Ceiling: 99,
    Result: "You transition into a new theme",
    Suggestions: {
      "Oracle rolls": [
        "Ironsworn/Oracles/Site_Nature/Theme"
      ]
    }
  },
  {
    Floor: 100,
    Ceiling: 100,
    Result: "You transition into a new domain",
    Suggestions: {
      "Oracle rolls": [
        "Ironsworn/Oracles/Site_Nature/Domain"
      ]
    }
  }
];

/**
 * @internal
 */
abstract class DelveCardBuilder implements DelveCard {
  $id: string;
  Type: DelveCardType;
  Title: TitleBuilder;
  Source: SourceBuilder;
  Summary: string;
  Description: string;
  Features: OracleTableRowBuilder[];
  Dangers: OracleTableRowBuilder[];
  constructor(type:DelveCardType, json: YamlDelveCard, parentSource?: Source | undefined, domainFeaturesStaticRows: PartialBy<OracleTableRow, "$id">[] = domainFeaturesStatic) {
    const fragment = json._idFragment??json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment, Gamespace.Ironsworn, type);
    this.Type = type;
    this.Title = new TitleBuilder(json.Title, this);
    this.Source = new SourceBuilder(json.Source ?? {}, parentSource ?? {});
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Features = json.Features.map(row => new OracleTableRowBuilder(this.$id+"/Features", row));
    let newDangers = json.Dangers as PartialBy<OracleTableRow, "$id">[];
    if (this.Type === DelveCardType.Domain) {
      newDangers = _.cloneDeep(json.Dangers);
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows));
    }
    this.Dangers = newDangers.map(row => new OracleTableRowBuilder(this.$id+"/Dangers", row));
  }
}


export class DelveThemeBuilder extends DelveCardBuilder implements DelveTheme {
  Type!: DelveCardType.Theme;
  Features!: DelveTheme["Features"] & OracleTableRowBuilder[];
  Dangers!: DelveTheme["Dangers"] & OracleTableRowBuilder[];
  constructor(json: YamlDelveTheme, parentSource?: Source|undefined) {
    super(DelveCardType.Theme,json, parentSource);
  }
}

export class DelveDomainBuilder extends DelveCardBuilder implements DelveDomain {
  Type!: DelveCardType.Domain;
  Features!: DelveDomain["Features"] & OracleTableRowBuilder[];
  Dangers!: DelveDomain["Dangers"] & OracleTableRowBuilder[];
  constructor(json: YamlDelveDomain, parentSource?: Source|undefined) {
    super(DelveCardType.Domain,json, parentSource);
  }
}
