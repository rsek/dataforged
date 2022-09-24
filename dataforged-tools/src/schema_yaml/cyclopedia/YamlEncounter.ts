import type { YamlStubNode } from "@schema_yaml";
import type { Encounter } from "@schema_json";


/**
 * @internal
 */
export interface YamlEncounter extends YamlStubNode<Encounter, "Nature" | "Summary", ""> {
}
