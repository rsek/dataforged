import { LocalizableKey, MixinId, MixinLocalizable, YamlSimpleTableRow } from '@schema'
import { formatId, Nullable } from '@utils'
import _ from 'lodash'

export class NodeBuilder<TYamlIn extends Partial<Nullable<MixinLocalizable>> | YamlSimpleTableRow, TJsonOut, TParent extends MixinId & Partial<Nullable<MixinLocalizable>>> implements MixinId {
  get $id (): string {
    return formatId(this._fragment, this._parent.$id)
  }

  readonly _fragment: string
  readonly _parent: TParent
  readonly _rawData: TYamlIn
  toJson (): TJsonOut {
    return _.omitBy(this, (v, k) => k.startsWith('_')) as TJsonOut
  }

  /**
   * Constructs a Dataforged node with a string fragment.
   * @param yaml The raw YAML data to generate the object from.
   * @param fragmentOrIndex The string fragment or index used to generate this item's ID. Numeric indexes get 1 added to them to provide IDs with 1-based ordering.
   * @param parent The parent object.
   */
  constructor (yaml: TYamlIn, fragmentOrIndex: string, parent: TParent)
  constructor (yaml: TYamlIn, fragmentOrIndex: number, parent: TParent)
  constructor (yaml: TYamlIn, fragmentOrIndex: number | string, parent: TParent) {
    this._rawData = yaml
    this._fragment = typeof fragmentOrIndex === 'number' ? (fragmentOrIndex + 1).toString() : fragmentOrIndex
    this._parent = parent

    // dumps all localizable string keys, cuz those don't get any processing anyways.
    const extractedStrings = _.pickBy(this._rawData, (value, key) => (Object.values(LocalizableKey) as string[]).includes(key) && NodeBuilder.isStringOrStringArray(value))
    Object.assign(this, extractedStrings)
  }

  static isStringOrStringArray (value: unknown) {
    if (typeof value === 'string') { return true }
    if (Array.isArray(value) && value.every(maybeStr => typeof maybeStr === 'string')) { return true }
    return false
  }
}
