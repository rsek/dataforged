import type { PartialBy } from "./";
import type { PartialExcept } from "./";
/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends string = "", OmitKey extends string = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;
/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export declare type StubBy<T, PartialKey extends string = "", OmitKey extends string = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;
//# sourceMappingURL=Stub.d.ts.map