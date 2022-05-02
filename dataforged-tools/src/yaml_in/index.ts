import type { PartialBy } from "@utils/index.js";

/**
 * A stub where keys `$id` and PartialKey are nullable, and OmitKey is omitted.
 * @internal
 */
export type YamlStub<T, PartialKey extends string="", OmitKey extends string=""> = Omit<PartialBy<T, "$id"|PartialKey>, OmitKey>;

export * from "@yaml_in/assets/index.js";
export * from "@yaml_in/common/index.js";
export * from "@yaml_in/encounters/index.js";
export * from "@yaml_in/moves/index.js";
export * from "@yaml_in/oracles/index.js";
export * from "@yaml_in/truths/index.js";
export * from "@yaml_in/templates/index.js";