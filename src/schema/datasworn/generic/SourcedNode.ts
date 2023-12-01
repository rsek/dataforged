import { Type, type ObjectOptions, type TObject } from '@sinclair/typebox'
import { IdentifiedNode, type TIdentifiedNode } from './IdentifiedNode.js'
import * as Utils from '../Utils.js'
import { type Id, Metadata, Localize } from '../common/index.js'

/** Interface shared by objects with source attribute. */

export const SourcedNodeBase = Type.Object(
	{
		id: Type.String(),
		name: Type.Ref(Localize.Label, {
			description: 'The primary name/label for this item.'
		}),
		canonical_name: Type.Optional(
			Type.Ref(Localize.Label, {
				description:
					"The name of this item as it appears on the page in the book, if it's different from `name`."
			})
		),
		source: Type.Ref(Metadata.Source, {
			description:
				'Attribution for the original source (such as a book or website) of this item, including the author and licensing information.'
		}),
		suggestions: Type.Optional(Type.Ref(Metadata.Suggestions))
		// _sort: Type.Optional(SourceOnly(Type.Number()))
	},
	// overridden when it's used as a mixin, left in for use in validation
	{ additionalProperties: true }
)
export function SourcedNode<T extends TObject = TObject>(
	id: Id.TAnyId,
	schema: T,
	options: ObjectOptions = {}
) {
	const result = IdentifiedNode(
		id,
		Utils.Assign([SourcedNodeBase, schema]),
		options
	) satisfies TSourcedNode<T>

	return result
}
export type TSourcedNode<T extends TObject = TObject> = TIdentifiedNode<
	TObject<Utils.Assign<(typeof SourcedNodeBase)['properties'], T['properties']>>
>
export type SourcedNode<T extends object = object> = IdentifiedNode<T> & {
	name: string
	canonical_name?: string
	source: Metadata.Source
	suggestions?: Metadata.Suggestions
}
