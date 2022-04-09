import type { PartialBy } from "../../../dist/utils/types/PartialBy.js";
import type { PartialExcept } from "../../../dist/utils/types/PartialExcept.js";
export declare type StubExcept<T, ReqKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialExcept<T, ReqKey>, OmitKey>;
export declare type StubBy<T, PartialKey extends keyof T, OmitKey extends keyof any = ""> = Omit<PartialBy<T, PartialKey>, OmitKey>;
//# sourceMappingURL=Stub.d.ts.map