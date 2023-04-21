/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PartialBy } from '@utils/types'
import type { PartialExcept } from '@utils/types'

/**
 * Make a stub of T where ReqK is required, OmitK is omitted, and all other keys are optional.
 * @public
 */
export type StubExcept<T, ReqKey extends string='', OmitKey extends string=''> = Omit<PartialExcept<T, ReqKey>, OmitKey>

/**
 * Make a stub of T where PartialKey is nullable, OmitK is omitted, and all other keys are required.
 *
 * @public
 */
export type StubBy<T, PartialKey extends string='', OmitKey extends string=''> = Omit<PartialBy<T, PartialKey>, OmitKey>
