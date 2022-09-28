import type { MASTER_DATA_PATH } from '@constants'
import type { Game, HasId, HasSource, Source, YamlDataRoot } from '@schema'
import { buildLog } from '@utils/logging/buildLog.js'
import _ from 'lodash-es'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConstructorOf<T> = new(...args: any[]) => T

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
  srcYamlFiles: Array<Partial<TYamlRoot>>
}

export interface HashBuilderBase<TMapItem> {

  /**
   * The string used to represent this branch of the JSON tree when generating a human-readable string ID.
   */
  fragment: string
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

export type CollectionFileGlob<G extends Game> = `${typeof MASTER_DATA_PATH}/${G}/${string}.(yml|yaml)`

/**
 * Base class for constructing collections of Dataforged JSON objects from YAML shorthand data. When serialized to JSON, it becomes a simple keyed JSON object.
 * @internal
 */
export abstract class CollectionBuilder<
  G extends Game,
  TMapItem extends HasSource,
  TYamlItem,
// SchemaIn extends Schema, SchemaOut extends Schema
> extends Map<string, TMapItem> implements HashBuilder<TMapItem, TYamlItem> {
  abstract buildItem (yaml: TYamlItem, key: string): TMapItem
  private readonly _fragment: string
  public get fragment (): string {
    return this._fragment
  }

  public get label (): string {
    return this._fragment
  }

  collect () {
    buildLog(this.constructor, `Building ${this.label}...`)
    _.forEach(
      this.yaml,
      (value, key) => this.set(key, this.buildItem(value, key))
    )
    buildLog(this.constructor, `Finished building ${this.buildStatsMessage}.`)
    return this
  }

  toJson () {
    return Object.fromEntries(this.entries())
  }

  get buildStatsMessage (): string {
    return `${this.size} ${this.label}`
  }

  private readonly _yaml: Record<string, TYamlItem>
  public get yaml () {
    return this._yaml
  }

  private readonly _game: G
  public get game (): G {
    return this._game
  }

  private readonly _parent: HasId|undefined
  public get parent (): HasId|undefined {
    return this._parent
  }

  Source: Source
  constructor (yaml: Record<string, TYamlItem>,
    game: G,
    fragment: string,
    source: Source,
    parent?: HasId | undefined
  ) {
    super()
    this._yaml = yaml
    this._game = game
    this._fragment = fragment
    this._parent = parent
    this.Source = source
  }
}
