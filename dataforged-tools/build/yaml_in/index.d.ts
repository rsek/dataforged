import type { PartialDeepBy } from "../utils/index.js";
/**
 * A stub where keys `$id`, `Display`, `Source` and PartialKey (*and* their properties) are nullable, and OmitKey is omitted.
 * @internal
 */
export declare type YamlStub<T, PartialKey extends string = "", OmitKey extends string = ""> = Omit<PartialDeepBy<T, "$id" | "Source" | "Display" | PartialKey>, OmitKey>;
export * from "./assets/index.js";
export * from "./common/index.js";
export * from "./moves/index.js";
export * from "./oracles/index.js";
export * from "./truths/index.js";
export * from "./templates/index.js";
export * from "./cyclopedia/index.js";
//# sourceMappingURL=index.d.ts.map