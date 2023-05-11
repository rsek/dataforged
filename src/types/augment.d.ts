import * as Fn from '../typebox/index'

import '@sinclair/typebox'

declare module '@sinclair/typebox' {
	export namespace ExtendedTypeBuilder {
		export const JsonEnum: typeof Fn.JsonEnum
		export const UnionOneOf: typeof Fn.UnionOneOf
	}
}
