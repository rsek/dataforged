import Source from "@dataforged/classes/common/Source.js";
import type { IHasSource } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { ISource } from "@dataforged/interfaces/json_out/common/ISource.js";

export default abstract class SourceInheritor implements IHasSource {
  Source: Source;
  constructor(json: Partial<ISource>, ...sourceAncestors: ISource[]) {
    this.Source = new Source(json, ...sourceAncestors);
  }
}