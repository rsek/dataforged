import _ from "lodash-es";
import { is } from "typescript-is";
import type ISource from "./interfaces/ISource.js";
import type SourceTitle from "./SourceTitle.js";
import badJsonError from "../../functions/logging/badJsonError.js";

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
    if (!is<SourceTitle>(this.Title)) {
      throw badJsonError(this.constructor);
    }
    this.Date = newData.Date;
    this.Page = newData.Page;
  }
}

