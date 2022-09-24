import type { YamlStub } from "@schema_yaml";
import type { Meter } from "@schema_json";

/**
 * @internal
 */
export interface YamlMeter extends YamlStub<Meter, "Min"|"Value"> {}