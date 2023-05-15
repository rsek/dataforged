import * as Fn from '../typebox/index'

import '@sinclair/typebox'

declare module '@sinclair/typebox' {
	export namespace ExtendedTypeBuilder {
		export const JsonEnum: typeof Fn.JsonEnum
		export const UnionOneOf: typeof Fn.UnionOneOf
	}
	export interface SchemaOptions {
		/**
		 * Indicates the release status of this schema. Non-release schema may be stripped from the output.
		 * @default 'release'
		 */
		releaseStage?: 'unstable' | 'experimental' | 'release'
		/**
		 * Indicates that this schema is used for processing input, but is not included in the final data output.
		 * @default false
		 */
		macro?: boolean
	}
	export interface StringOptions extends SchemaOptions {
		/**
		 * Indicates that a string value is localizable, and should be included with internationalization (A.K.A. i18n) data.
		 * @default false
		 */
		i18n?: boolean
	}
}
