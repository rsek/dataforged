import type { DelveCardType, IDelveCard, IDelveDomain, IDelveTheme, IDisplay, IRow, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IDelveCardYaml, IDelveDomainYaml, IDelveThemeYaml } from "@yaml_in/index.js";
import { DisplayWithTitle, Row, Source } from "index.js";
import _ from "lodash-es";

const domainFeaturesStatic: IRow[] = [
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
    Result: "You transition into a new theme"
  },
  {
    Floor: 100,
    Ceiling: 100,
    Result: "You transition into a new domain"
  }
];

/**
 * @internal
 */
abstract class DelveCard implements IDelveCard {
  $id: string;
  Name: string;
  Type: DelveCardType;
  Source: Source;
  Display: DisplayWithTitle;
  Summary: string;
  Description: string;
  Features: Row[];
  Dangers: Row[];
  constructor(json: IDelveCardYaml, parentSource: ISource, domainFeaturesStaticRows: IRow[] = domainFeaturesStatic) {
    this.$id = `Ironsworn/${json.Type}s/${formatIdFragment(json.Name)}`;
    this.Name = json.Name;
    this.Type = json.Type;
    this.Source = new Source(json.Source ?? {}, parentSource);
    this.Display = new DisplayWithTitle({
      Title: json.Display?.Title ?? this.Name
    });
    this.Summary = json.Summary;
    this.Description = json.Description;
    this.Features = json.Features.map(row => new Row(this.$id+"/Features", row));
    let newDangers = json.Dangers;
    if (this.Type === "Domain") {
      newDangers = _.cloneDeep(json.Dangers);
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows));
    }
    this.Dangers = newDangers.map(row => new Row(this.$id+"/Dangers", row));
  }
}


export class DelveTheme extends DelveCard implements IDelveTheme {
  Type: "Theme" = "Theme";
  declare Features: IDelveTheme["Features"] & Row[];
  declare Dangers: IDelveTheme["Dangers"] & Row[];
  constructor(json: IDelveThemeYaml, parentSource: ISource) {
    super(json, parentSource);
  }
}

export class DelveDomain extends DelveCard implements IDelveDomain {
  Type: "Domain" = "Domain";
  declare Features: IDelveDomain["Features"] & Row[];
  declare Dangers: IDelveDomain["Dangers"] & Row[];
  constructor(json: IDelveDomainYaml, parentSource: ISource) {
    super(json, parentSource);
  }
}
