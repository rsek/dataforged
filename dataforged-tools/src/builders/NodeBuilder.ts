import type { MixinLocalizable, MixinSource, Source } from '@schema'
import { LocalizableKey } from '@schema'
import { formatId } from '@utils'
import _ from 'lodash'

export interface NodeLike<TJsonOut> extends MixinSource, Partial <MixinLocalizable > {
  $id: string
  source: Source
  _parentId: string
  toJson: () => TJsonOut
}

export abstract class NodeBuilder<TYamlIn extends Record<string, any>, TJsonOut, TParent extends NodeLike<any>> implements NodeLike<TJsonOut> {
  get $id (): string {
    return formatId(this._parentId, ...this._fragments)
  }

  get source (): Source {
    let src = this._parent.source
    if (!Array.isArray(this._rawData) && ((this._rawData)?.source) != null) {
      src = _.merge(src, this._rawData.source)
    }
    return src
  }

  get _parentId (): string { return this._parent.$id }
  readonly _fragments: string[]
  readonly _parent: TParent
  readonly _rawData: TYamlIn
  toJson (): TJsonOut {
    return _.omitBy(this, (v, k) => k.startsWith('_')) as TJsonOut
  }

  /**
   * Constructs a Dataforged node with a string fragment.
   * @param yaml - The raw YAML data to generate the object from.
   * @param parent - The parent object.
   * @param fragments - The string fragments/indices used to generate this item's ID. Numeric values get 1 added to them to provide IDs with 1-based ordering.
   */
  constructor (yaml: TYamlIn, parent: TParent, ...fragments: (string | number)[]) {
    this._rawData = yaml
    this._fragments = fragments.map(item => {
      if (typeof item === 'number') {
        return (item + 1).toString()
      }
      return item
    })
    this._parent = parent

    // dumps all localizable string keys, cuz those don't get any processing anyways.
    const extractedStrings = _.pickBy(this._rawData, (value, key) => (Object.values(LocalizableKey) as string[]).includes(key) && NodeBuilder.isStringOrStringArray(value))
    Object.assign(this, extractedStrings)
  }

  static isStringOrStringArray (value: unknown): boolean {
    if (typeof value === 'string') { return true }
    if (Array.isArray(value) && value.every(maybeStr => typeof maybeStr === 'string')) { return true }
    return false
  }
}
