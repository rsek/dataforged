import { SourceBuilder } from "@builders";
import type { HasSource, Source } from "@schema_json";

/**
 * @internal
 */
export abstract class SourceInheritorBuilder implements HasSource {
  Source: SourceBuilder;
  constructor(json: Partial<Source>, ...sourceAncestors: Partial<Source>[]) {
    this.Source = new SourceBuilder(json, ...sourceAncestors);
  }
}