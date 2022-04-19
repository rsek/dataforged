import type { AttributeKey, IAttribute } from "../index.js";
/**
 * @public
 */
export interface IAttributeChoices<T extends AttributeKey = AttributeKey> {
    Key: T;
    Values?: NonNullable<IAttribute<T>["Value"]>[] | undefined;
}
//# sourceMappingURL=IAttributeChoices.d.ts.map