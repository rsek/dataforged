import type { Encounter, YamlStubNode } from '@schema'

/**
 * @internal
 */
export interface YamlEncounter extends YamlStubNode<Encounter, 'nature' | 'summary', ''> {
}
