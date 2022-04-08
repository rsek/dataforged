import { Source } from "@dataforged/classes/common/Source.js";
import type { IHasSource, ISource } from "@dataforged/json_out/index.js";

export abstract class SourceInheritor implements IHasSource {
  Source: Source;
  constructor(json: Partial<ISource>, ...sourceAncestors: ISource[]) {
    this.Source = new Source(json, ...sourceAncestors);
  }
}