import _ from "lodash";
import IOracleData from "../oracles/IOracle";

/**
* @class Source
*/
export interface ISource {
  Title: SourceTitle;
  Date?: string;
  Page?: number;
}
export class Source implements ISource {
  Title: SourceTitle;
  Date?: string;
  Page?: number;
  constructor(data: ISource, ...ancestorsJson: IOracleData[]) {
    const sourceStack = _.compact(
      ancestorsJson.map(item => item.Source))
      .reverse();
    const newData = _.merge(data, ...sourceStack) as ISource;
    this.Title = newData.Title;
    this.Date = newData.Date;
    this.Page = newData.Page ?? undefined;
  }
}
export enum SourceTitle {
  StarforgedBackerPreview = "Starforged Backer Preview",
  Starforged = "Starforged",
  Ironsworn = "Ironsworn rulebook",
  IronswornDelve = "Ironsworn: Delve"
}
