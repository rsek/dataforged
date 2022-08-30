import type { DelveCardType, IDelveCard, IDelveDomain, IDelveTheme, IDisplay, IRow, ISource } from "@json_out/index.js";
import { formatIdFragment } from "@utils/toIdFragment.js";
import type { IDelveCardYaml, IDelveDomainYaml, IDelveThemeYaml } from "@yaml_in/index.js";
import _ from "lodash-es";
import type { PartialBy } from "src/index.js";
import { DisplayWithTitle, Row, Source } from "src/index.js";

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
  Name: string;
  Type: DelveCardType;
  Source: Source;
  Display: DisplayWithTitle;
  Summary: string;
  Description: string;
  Features: Row[];
  Dangers: Row[];
  constructor(json: IDelveCardYaml, parentSource: ISource, domainFeaturesStaticRows: PartialBy<IRow, "$id">[] = domainFeaturesStatic) {
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
    let newDangers = json.Dangers as PartialBy<IRow, "$id">[];
    if (this.Type === "Domain") {
      newDangers = _.cloneDeep(json.Dangers);
      newDangers.push(..._.cloneDeep(domainFeaturesStaticRows));
    }
    this.Dangers = newDangers.map(row => new Row(this.$id+"/Dangers", row));
  }
}


export class DelveTheme extends DelveCard implements IDelveTheme {
  Type: "Theme" = "Theme";
  Features!: IDelveTheme["Features"] & Row[];
  Dangers!: IDelveTheme["Dangers"] & Row[];
  constructor(json: IDelveThemeYaml, parentSource: ISource) {
    super(json, parentSource);
  }
}

export class DelveDomain extends DelveCard implements IDelveDomain {
  Type: "Domain" = "Domain";
  Features!: IDelveDomain["Features"] & Row[];
  Dangers!: IDelveDomain["Dangers"] & Row[];
  constructor(json: IDelveDomainYaml, parentSource: ISource) {
    super(json, parentSource);
  }
}
