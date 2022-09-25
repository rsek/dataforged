import type { Meter , YamlStub } from "@schema";

/**
 * @internal
 */
export interface YamlMeter extends YamlStub<Meter, "Min"|"Value"> {}