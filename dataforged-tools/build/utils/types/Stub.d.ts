import type { PartialBy } from "./PartialBy.js";
import type { PartialExcept } from "./PartialExcept.js";
/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export declare type StubExcept<T, ReqKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;
/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export declare type StubBy<T, PartialKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;
//# sourceMappingURL=Stub.d.ts.map