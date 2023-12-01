// @alpha
// @beta
// @category
// @defaultValue
// @deprecated
// @enum
// @event
// @eventProperty
// @example
// @experimental
// @group
// @hidden
// @ignore
// {@inheritDoc}
// @interface
// @internal
// {@label}
// {@link}
// @module
// @namespace
// @overload
// @override
// @packageDocumentation
// @param
// @private
// @privateRemarks
// @property
// @protected
// @public
// @readonly
// @remarks
// @returns
// @satisfies
// @sealed
// @see
// @template
// @throws
// @typeParam

import { Type } from '@sinclair/typebox'
import { KeywordDefinition } from 'ajv'

// @virtual
const tags: Record<string, Omit<KeywordDefinition, 'keyword'>> = {
	alpha: { metaSchema: Type.Boolean() },
	beta: { metaSchema: Type.Boolean() },
	category: { metaSchema: Type.String() },
	// defaultValue: { metaSchema: Type.Any() },
	deprecated: { metaSchema: Type.Boolean() },
	// enum: { metaSchema: Type.String() },
	event: { metaSchema: Type.Boolean() },
	eventProperty: { metaSchema: Type.Boolean() },
	example: { metaSchema: Type.Boolean() },
	experimental: { metaSchema: Type.Boolean() },
	group: { metaSchema: Type.Array(Type.String()) },
	hidden: { metaSchema: Type.Boolean() },
	ignore: { metaSchema: Type.Boolean() },
	// {@inheritDoc}
	interface: { metaSchema: Type.Boolean() },
	internal: { metaSchema: Type.Boolean() },
	// {@label}
	// {@link}
	// module: { metaSchema: Type.Boolean() },
	namespace: { metaSchema: Type.Array(Type.String()) },
	overload: { metaSchema: Type.Boolean() },
	override: { metaSchema: Type.Boolean() },
	packageDocumentation: { metaSchema: Type.Boolean() },
	param: { metaSchema: Type.Boolean() },
	private: { metaSchema: Type.Boolean() },
	privateRemarks: { metaSchema: Type.Boolean() },
	property: { metaSchema: Type.Boolean() },
	// protected: { metaSchema: Type.Boolean() },
	// public: { metaSchema: Type.Boolean() },
	// readonly: { metaSchema: Type.Boolean() },

	// use JSON Schema $comment
	// remarks: { metaSchema: Type.Boolean() },
	returns: { metaSchema: Type.Boolean() },
	satisfies: { metaSchema: Type.Boolean() },
	sealed: { metaSchema: Type.Boolean() },
	see: { metaSchema: Type.Array(Type.String()) },
	template: { metaSchema: Type.Boolean() },
	throws: { metaSchema: Type.Boolean() },
	typeParam: { metaSchema: Type.Boolean() },
	virtual: { metaSchema: Type.Boolean() }
}
