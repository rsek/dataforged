

import _ from "lodash";
import ISource from './interfaces/ISource';
import SourceTitle from './SourceTitle';

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
    this.Date = newData.Date;
    this.Page = newData.Page;
  }
}

