import { Row, Source, Title } from "@classes/index.js";
import { DelveCardType } from "@json_out/index.js";
import type { IDelveCard, IDelveDomain , IDelveTheme, IRow, ISource } from "@json_out/index.js";
import type { PartialBy } from "@utils/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IDelveCardYaml, IDelveDomainYaml, IDelveThemeYaml } from "@yaml_in/index.js";
import _ from "lodash-es";


const domainFeaturesStatic: PartialBy<IRow, "$id">[] = [
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
abstract class DelveCard implements IDelveCard {
  $id: string;
  Type: DelveCardType;
  Title: Title;
  Source: Source;
  Summary: string;
  Description: string;
  Features: Row[];
  Dangers: Row[];
  constructor(type:DelveCardType, json: IDelveCardYaml, parentSource?: ISource | undefined, domainFeaturesStaticRows: PartialBy<IRow, "$id">[] = domainFeaturesStatic) {
    this.$id = `Ironsworn/${type}s/${formatIdFragment(json._idFragment??json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical)}`;
    this.Type = type;
    this.Title = new Title(json.Title, this);
    this.Source = new Source(json.Source ?? {}, parentSource ?? {});
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Features = json.Features.map(row => new Row(this.$id+"/Features", row));
    let newDangers = json.Dangers as PartialBy<IRow, "$id">[];
    if (this.Type === DelveCardType.Domain) {
      newDangers = _.cloneDeep(json.Dangers);
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows));
    }
    this.Dangers = newDangers.map(row => new Row(this.$id+"/Dangers", row));
  }
}


export class DelveTheme extends DelveCard implements IDelveTheme {
  Type!: DelveCardType.Theme;
  Features!: IDelveTheme["Features"] & Row[];
  Dangers!: IDelveTheme["Dangers"] & Row[];
  constructor(json: IDelveThemeYaml, parentSource?: ISource|undefined) {
    super(DelveCardType.Theme,json, parentSource);
  }
}

export class DelveDomain extends DelveCard implements IDelveDomain {
  Type!: DelveCardType.Domain;
  Features!: IDelveDomain["Features"] & Row[];
  Dangers!: IDelveDomain["Dangers"] & Row[];
  constructor(json: IDelveDomainYaml, parentSource?: ISource|undefined) {
    super(DelveCardType.Domain,json, parentSource);
  }
}
