import { SourceBuilder } from '@builders'
import type { HasSource, Source } from '@schema'

/**
 * @internal
 */
export abstract class SourceInheritorBuilder implements HasSource {
  Source: Source
  constructor (yaml: Partial<Source>, ...sourceAncestors: Array<Partial<Source>>) {
    this.Source = new SourceBuilder(yaml, ...sourceAncestors)
  }
}
