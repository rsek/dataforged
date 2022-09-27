
import type { Source , YamlSource } from "@schema";
import { Game , License, SourceTitle } from "@schema";
import { badJsonError } from "@utils/logging/badJsonError.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class SourceBuilder implements Source {
  Title: Source["Title"];
  Authors: string[];
  Date?: string | undefined;
  Page?: number | undefined;
  Url?: string | undefined;
  License: License;
  static default(game: Game) {
    return new SourceBuilder({ Title: game === Game.Ironsworn ? SourceTitle.Ironsworn : SourceTitle.Starforged, Authors: ["Shawn Tomkin"] });
  }
  static getDefaultLicense(sourceTitle: SourceTitle|string) {
    switch (sourceTitle as SourceTitle) {
      case SourceTitle.Ironsworn:
      case SourceTitle.IronswornAssets:
        return License.CC_BY_NC_SA;
      case SourceTitle.IronswornDelve:
        return License.CC_BY_NC_SA;
      case SourceTitle.Starforged:
      case SourceTitle.StarforgedAssets:
        return License.CC_BY_SA;
      case SourceTitle.SunderedIslesPreview:
        return License.None;
    }
  }
  constructor(yaml: YamlSource, ...ancestorSourceJson: YamlSource[]) {
    const sourceStack = _.cloneDeep([ ..._.compact(
      ancestorSourceJson)
      .reverse()
    ,
      yaml as Source ]);
    const merged = _.merge(...sourceStack as [YamlSource,YamlSource]);
    if (!merged.Title) {
      throw badJsonError("Unable to find title in source or ancestor source objects.",[ yaml, ...ancestorSourceJson ]);
    }
    this.Title = merged.Title;
    this.Authors = merged.Authors ?? ["Shawn Tomkin"];
    this.Date = merged.Date;
    this.Page = merged.Page;
    this.Url = merged.Url;
    const license: undefined|License = merged.License ?? SourceBuilder.getDefaultLicense(merged.Title);
    if (!license) {
      throw new Error(`Could not infer a valid license!\n${JSON.stringify(merged)}`);
    }
    this.License = license;
  }
}


