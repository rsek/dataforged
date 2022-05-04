import type { PartialDeepBy } from "@utils/index.js";

/**
 * A stub where keys `$id`, `Display`, `Source`, `Optional`, and PartialKey (*and* their properties) are nullable, and OmitKey is omitted.
 * @internal
 */
export type YamlStub<T, PartialKey extends string="", OmitKey extends string=""> = Omit<PartialDeepBy<T, "$id"|"Source"|"Display"|"Optional"|PartialKey>, OmitKey> & {_idFragment?: string | undefined};

export * from "@yaml_in/assets/index.js";
export * from "@yaml_in/common/index.js";
export * from "@yaml_in/moves/index.js";
export * from "@yaml_in/oracles/index.js";
export * from "@yaml_in/truths/index.js";
export * from "@yaml_in/templates/index.js";
export * from "@yaml_in/cyclopedia/index.js";