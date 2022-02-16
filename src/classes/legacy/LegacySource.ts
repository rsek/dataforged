import { ISource, SourceTitle } from "../general/Source";

export interface ILegacySource extends Omit<ISource, "Title"> {
  Name: ISource["Title"];
}

export default class LegacySource implements ILegacySource {
  Name: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
  constructor(json: ISource) {
    this.Name = json.Title;
    this.Date = json.Date;
    this.Page = json.Page;
  }
}