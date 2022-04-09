import { Source } from "@classes/common/index.js";
import type { IHasSource, ISource } from "@json_out/meta/index.js";

export abstract class SourceInheritor implements IHasSource {
  Source: Source;
  constructor(json: Partial<ISource>, ...sourceAncestors: ISource[]) {
    this.Source = new Source(json, ...sourceAncestors);
  }
}