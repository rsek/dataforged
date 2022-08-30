
import type { ISource } from "@json_out/index.js";
import { License, SourceTitle } from "@json_out/index.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class Source implements ISource {
  Title: ISource["Title"];
  Authors: string[];
  Date?: string | undefined;
  Page?: number | undefined;
  Url?: string | undefined;
  License: License;
  constructor(json: Partial<ISource>, ...ancestorSourceJson: Partial<ISource>[]) {
    const sourceStack = _.cloneDeep([ ..._.compact(
      ancestorSourceJson)
      .reverse()
    ,
      json as ISource ]);
    const merged = sourceStack.reduce((a,b) => _.merge(a,b));
    if (!merged.Title) {
      throw Error("Unable to find title in source or ancestor source objects.");
    }
    this.Title = merged.Title;
    this.Authors = merged.Authors ?? ["Shawn Tomkin"];
    this.Date = merged.Date;
    this.Page = merged.Page;
    this.Url = merged.Url;
    if (json.License) {
      this.License = json.License;
    } else{
      let newLicense: License;
      switch (this.Title as SourceTitle) {
        case SourceTitle.Ironsworn || SourceTitle.IronswornAssets:
          newLicense = License.CC_BY_SA;
          break;
        case SourceTitle.IronswornDelve:
          newLicense = License.CC_BY_NC_SA;
          break;
        case SourceTitle.Starforged || SourceTitle.StarforgedAssets:
          newLicense = License.CC_BY_SA;
          break;
        case SourceTitle.SunderedIslesPreview:
          newLicense = License.None;
          break;
        default:
          throw new Error("Could not infer a valid license!");
      }
      this.License = newLicense;
    }
  }
}

