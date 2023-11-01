import {
	type Static,
	type TObject,
	type TUnion,
	Type,
	type ObjectOptions,
	StringOptions
} from '@sinclair/typebox'

// ----------------------------------------------------------------------------
// TDiscriminatedUnion
// ----------------------------------------------------------------------------
export interface TDiscriminatedUnion<T extends TObject[] = []> extends TObject {
	static: Static<TUnion<T>>
	allOf: Array<{ if: TObject; then: TObject }>
}
// ----------------------------------------------------------------------------
// DiscriminatedUnion
// ----------------------------------------------------------------------------
/**
 * @example
 * ```typescript
 * const T = DiscriminatedUnion(
 *   [
 *     Type.Object({
 *       type: Type.Literal('Vector2'),
 *       x: Type.Number(),
 *       y: Type.Number()
 *     }),
 *     Type.Object({
 *       type: Type.Literal('Vector3'),
 *       x: Type.Number(),
 *       y: Type.Number(),
 *       z: Type.Number()
 *     }),
 *     Type.Object({
 *       type: Type.Literal('Vector4'),
 *       x: Type.Number(),
 *       y: Type.Number(),
 *       z: Type.Number(),
 *       w: Type.Number()
 *     })
 *   ],
 *   'type'
 * )

 * ```
 */
export function DiscriminatedUnion<
	T extends TObject[],
	TDiscriminator extends keyof Static<T[number]>
>(
	schemas: [...T],
	discriminator: TDiscriminator,
	options: ObjectOptions = {},
	discriminatorDefault?: Static<T[number]>[TDiscriminator]
): TDiscriminatedUnion<T> {
	const allOf = schemas.map((schema) => ({
		if: Type.Pick(schema, [discriminator]),
		then: Type.Omit(schema, [discriminator], {
			// optional: prevent additional properties on then type (expect only discriminator)
			additionalProperties: Type.Index(schema, [discriminator])
		})
	}))
	// select first discriminator type as narrowed (literal), then derive to broad type.
	const narrowType = schemas[0].properties[discriminator]
	const broadType = Type.Extends(
		narrowType,
		Type.String(),
		Type.String(),
		Type.Extends(
			narrowType,
			Type.Number(),
			Type.Number(),
			Type.Extends(narrowType, Type.Boolean(), Type.Boolean(), Type.Never())
		),
		{ default: discriminatorDefault }
	)
	// object descriminator must be broad, narrowed literals embedded in allOf array
	const properties = { [discriminator]: broadType }
	return Type.Object({ ...properties }, { ...options, allOf }) as any
}
// ----------------------------------------------------------------------------
// Usage
// ----------------------------------------------------------------------------
