import { SourceBuilder } from "@builders";
import type { HasSource, Source } from "@schema";

/**
 * @internal
 */
export abstract class SourceInheritorBuilder implements HasSource {
  Source: Source;
  constructor(json: Partial<Source>, ...sourceAncestors: Partial<Source>[]) {
    this.Source = new SourceBuilder(json, ...sourceAncestors);
  }
}