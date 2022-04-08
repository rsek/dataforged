import type { ISource } from "@dataforged/json_out/index.js";
import { SourceTitle } from "@dataforged/json_out/index.js";
import { badEnumError } from "@dataforged/utils/logging/badEnumError.js";
import { enumHas } from "@dataforged/utils/validation/enumHas.js";
import _ from "lodash-es";

export class Source implements ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
  constructor(json: Partial<ISource>, ...ancestorSourceJson: ISource[]) {
    const sourceStack = _.compact(
      ancestorSourceJson)
      .reverse();
    const newData = _.merge(json, ...sourceStack) as ISource;
    this.Title =  json.Title ?? newData.Title;
    if (!enumHas(SourceTitle, this.Title)) {
      throw badEnumError(this.constructor as () => unknown, this.Title, SourceTitle);
    }
    this.Date = newData.Date;
    this.Page = newData.Page;
  }
}

