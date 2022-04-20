
import { SourceTitle } from "@json_out/index.js";
import type { ISource } from "@json_out/index.js";
import { badEnumError } from "@utils/logging/badEnumError.js";
import { enumHas } from "@utils/validation/enumHas.js";
import _ from "lodash-es";

/**
 * @internal
 */
export class Source implements ISource {
  Title: SourceTitle;
  Date?: string | undefined;
  Page?: number | undefined;
  constructor(json: Partial<ISource>, ...ancestorSourceJson: ISource[]) {
    // console.log(arguments);
    const sourceStack = _.cloneDeep([ ..._.compact(
      ancestorSourceJson)
      .reverse()
    ,
      json as ISource ]);
    const merged = sourceStack.reduce((a,b) => _.merge(a,b));
    // console.log("newData", newData);
    this.Title = merged.Title;
    this.Date = merged.Date;
    this.Page = merged.Page;
    if (!enumHas(SourceTitle, this.Title)) {
      throw badEnumError(this.constructor as () => unknown, merged.Title, SourceTitle);
    }
  }
}

