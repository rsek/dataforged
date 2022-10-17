import { SourceBuilder } from '@builders'
import type { MixinSource, Source } from '@schema'

/**
 * @internal
 */
export abstract class SourceInheritorBuilder implements MixinSource {
  source: Source
  constructor (yaml: Partial<Source>, ...sourceAncestors: Partial<Source>[]) {
    this.source = new SourceBuilder(yaml, ...sourceAncestors)
  }
}
