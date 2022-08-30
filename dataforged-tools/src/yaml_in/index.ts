import type { PartialDeepBy } from "@utils/index.js";
import type { ITitleYaml } from "@yaml_in/index.js";

/**
 * @internal
 */
export type YamlStub<T, PartialKey extends string="", OmitKey extends string=""> = Omit<PartialDeepBy<T, "$id"|"Source"|"Display"|"Optional"|PartialKey>, OmitKey> & {_idFragment?: string|undefined };


/**
 * A stub where keys `$id`, `Display`, `Source`, `Optional`, `Title`, and PartialKey (*and* their properties) are nullable, and OmitKey is omitted.
 * @internal
 */
export type YamlStubTitle<T, PartialKey extends string="", OmitKey extends string=""> = YamlStub<T,PartialKey|"Title"|"Source",OmitKey> & { Title: ITitleYaml};



export * from "@yaml_in/assets/index.js";
export * from "@yaml_in/common/index.js";
export * from "@yaml_in/moves/index.js";
export * from "@yaml_in/oracles/index.js";
export * from "@yaml_in/truths/index.js";
export * from "@yaml_in/templates/index.js";
export * from "@yaml_in/cyclopedia/index.js";
export * from "@yaml_in/delve_site/index.js";
export * from "@yaml_in/rarities/index.js";