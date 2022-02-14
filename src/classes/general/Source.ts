

import _ from "lodash";
import IOracleData from "../oracles/IOracle";

/**
* @class Source
*/
export interface ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
}
export class Source implements ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
  constructor(json: ISource, ...ancestorSourceJson: ISource[]) {
    const sourceStack = _.compact(
      ancestorSourceJson)
      .reverse();
    const newData = _.merge(json, ...sourceStack) as ISource;
    this.Title = newData.Title ?? json?.Title;
    this.Date = newData.Date;
    this.Page = newData.Page;
  }
}
export enum SourceTitle {
  StarforgedBackerPreview = "Starforged Backer Preview",
  Starforged = "Starforged",
  Ironsworn = "Ironsworn rulebook",
  IronswornDelve = "Ironsworn: Delve"
}
