//License: MIT
import { Source } from "@classes/common/index.js";
import type { IHasSource, ISource } from "@json_out/index.js";

/**
 * @internal
 */
export abstract class SourceInheritor implements IHasSource {
  Source: Source;
  constructor(json: Partial<ISource>, ...sourceAncestors: Partial<ISource>[]) {
    this.Source = new Source(json, ...sourceAncestors);
  }
}