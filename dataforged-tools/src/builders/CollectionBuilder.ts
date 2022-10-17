import type { NodeLike } from '@builders/NodeBuilder.js'
import type { MASTER_DATA_PATH } from '@constants'
import type { Game, MixinId, MixinSource, Source, YamlDataRoot } from '@schema'
import { formatId } from '@utils'
import { buildLog } from '@utils/logging/buildLog.js'
import _ from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorOf<T> = new (...args: any[]) => T

export interface HashBuilderRoot<
  TMapItem,
  TYamlItem,
  TYamlRoot extends YamlDataRoot,
  > extends Map<string, TMapItem> {

  /**
   * Applies post-processing the parsed YAML contents of a single file, just before its contents are passed to the collection item constructor. Override if you need this to actually do something.
   * @param sourceDataItem - The partial root object to be processed.
   */
  processSourceFile: (sourceDataItem: Partial<TYamlRoot>) => TYamlRoot
  /**
   * Builds YAML collection item data into the final JSON.
   * @param yaml - The built item that will be added to the collection.
   */
  buildItem: (yaml: TYamlItem, itemKey: string) => TMapItem
  /**
   * The objects parsed from the YAML source data files.
   */
  srcYamlFiles: Partial<TYamlRoot>[]
}

export interface HashBuilderBase<TMapItem> {
  /**
   * Dumps the Map items as a simple keyed object.
   */
  toJson: () => Record<string, TMapItem>
  /**
   * Builds the YAML data into Map items.
   */
  collect: () => this
  /**
   * A string used to log stats of the built items.
   */
  buildStatsMessage: string
}

export interface HashBuilder<
  TMapItem,
  TYamlItem,
  > extends HashBuilderBase<TMapItem> {
  yaml: Record<string, TYamlItem>
}

export interface BuilderFromGlob {
  sourceFileGlob: string
  // schemaIn: Schema;
  // schemaOut: Schema;
  /**
   * The unparsed YAML strings loaded directly from the YAML files.
   */
  rawSourceFileData: string[]
}

export type CollectionFileGlob<G extends Game> = `${typeof MASTER_DATA_PATH}/${Lowercase<G>}/${Lowercase<string>}.(yml|yaml)`

/**
 * Base class for constructing collections of Dataforged JSON objects from YAML shorthand data. When serialized to JSON, it becomes a simple keyed JSON object.
 * @internal
 */
export abstract class CollectionBuilder<
  G extends Game,
  TMapItem extends MixinSource,
  TYamlItem,
  // SchemaIn extends Schema, SchemaOut extends Schema
  > extends Map<string, TMapItem> implements NodeLike< Record<string, TMapItem>>, HashBuilder<TMapItem, TYamlItem> {
  abstract buildItem (yaml: TYamlItem, key: string): TMapItem
  private readonly _fragment: string
  public get _fragments (): string[] {
    return [this._fragment]
  }

  get _parentId (): string {
    return this.game
  }

  get $id (): string {
    return formatId(this._parentId, ...this._fragments)
  }

  public get label (): string {
    return this._fragment
  }

  collect (): this {
    buildLog(this.constructor, `Building ${this.label}...`)
    _.forEach(
      this.yaml,
      (value, key) => this.set(key, this.buildItem(value, key))
    )
    buildLog(this.constructor, `Finished building ${this.buildStatsMessage}.`)
    return this
  }

  toJson (): Record<string, TMapItem> {
    return Object.fromEntries(this.entries())
  }

  get buildStatsMessage (): string {
    return `${this.size} ${this.label}`
  }

  private readonly _yaml: Record<string, TYamlItem>
  public get yaml (): Record<string, TYamlItem> {
    return this._yaml
  }

  private readonly _game: G
  public get game (): G {
    return this._game
  }

  private readonly _parent: MixinId | undefined
  public get parent (): MixinId | undefined {
    return this._parent
  }

  source: Source
  constructor (yaml: Record<string, TYamlItem>,
    game: G,
    fragment: string,
    source: Source,
    parent?: MixinId | undefined
  ) {
    super()
    this._yaml = yaml
    this._game = game
    this._fragment = fragment
    this._parent = parent
    this.source = source
  }
}
