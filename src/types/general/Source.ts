import _ from "lodash-es";
import enumHas from "./enumHas.js";
import type ISource from "./interfaces/ISource.js";
import SourceTitle from "./SourceTitle.js";
import badEnumError from "../../functions/logging/badEnumError.js";

export default class Source implements ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
  constructor(json: ISource, ...ancestorSourceJson: ISource[]) {
    const sourceStack = _.compact(
      ancestorSourceJson)
      .reverse();
    const newData = _.merge(json, ...sourceStack) as ISource;
    this.Title = newData.Title ?? json?.Title;
    if (!enumHas(SourceTitle, this.Title)) {
      throw badEnumError(this.constructor as () => unknown, this.Title, SourceTitle);
    }
    this.Date = newData.Date;
    this.Page = newData.Page;
  }
}

