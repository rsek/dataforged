import { type ObjectOptions, type TObject } from '@sinclair/typebox'
import { SourcedNode, type TSourcedNode } from './SourcedNode.js'
import { type TAnyId } from '../common/Id.js'

export const CollectableBrand = Symbol('Collectable')
export const RecursiveCollectableBrand = Symbol('RecursiveCollectable')
type CollectableID = TAnyId

export function Collectable<T extends TObject>(
	id: CollectableID,
	schema: T,
	options: ObjectOptions = {}
) {
	return SourcedNode(id, schema, {
		...options,
		[CollectableBrand]: 'Collectable'
	}) as TCollectable<T> satisfies TSourcedNode<T>
}

export type Collectable<T extends object> = SourcedNode<T>

export type TCollectable<T extends TObject> = ReturnType<
	typeof SourcedNode<T>
> & {
	[CollectableBrand]: 'Collectable'
}
type RecursiveCollectableID = TAnyId

export function RecursiveCollectable<T extends TObject>(
	id: RecursiveCollectableID,
	schema: T,
	options: ObjectOptions = {}
) {
	return Collectable(id, schema, {
		...options,
		[CollectableBrand]: 'Collectable',
		[RecursiveCollectableBrand]: 'RecursiveCollectable'
	}) as TRecursiveCollectable<T> satisfies TCollectable<T>
}

export type TRecursiveCollectable<T extends TObject> = ReturnType<
	typeof SourcedNode<T>
> &
	TCollectable<T> & {
		[RecursiveCollectableBrand]: 'RecursiveCollectable'
	}
