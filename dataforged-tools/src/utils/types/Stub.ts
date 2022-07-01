//License: MIT
import type { PartialBy } from "@utils/types/PartialBy.js";
import type { PartialExcept } from "@utils/types/PartialExcept.js";

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export type StubExcept<T, ReqKey extends keyof any="", OmitKey extends keyof any=""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;

/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export type StubBy<T, PartialKey extends keyof any="", OmitKey extends keyof any=""> = Omit<PartialBy<T, PartialKey>, OmitKey>;