import type { PartialBy } from "../utils/index.js";
/**
 * A stub where keys `$id` and PartialKey are nullable, and OmitKey is omitted.
 * @internal
 */
export declare type YamlStub<T, PartialKey extends string = "", OmitKey extends string = ""> = Omit<PartialBy<T, "$id" | PartialKey>, OmitKey>;
export * from "./assets/index.js";
export * from "./common/index.js";
export * from "./encounters/index.js";
export * from "./moves/index.js";
export * from "./oracles/index.js";
export * from "./truths/index.js";
export * from "./templates/index.js";
//# sourceMappingURL=index.d.ts.map