import type { MASTER_DATA_PATH } from "@constants";
import { REFS_PATH , TEMPLATES_PATH } from "@constants";
import type { Game, HasSource, Source, YamlDataRoot } from "@schema";
import { buildLog } from "@utils/logging/buildLog.js";
import fg from "fast-glob";
import fs from "fs-extra";
import yaml from "js-yaml";
import _ from "lodash-es";

export interface ConstructorOf<T> {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): T
}

export interface HashBuilder<
  TMapItem,
  TYamlItem,
  TYamlRoot extends YamlDataRoot,
  > extends Map<string, TMapItem> {
  /**
   * The string used to represent this branch of the JSON tree when generating a human-readable string ID.
   */
  fragment: string;
  /**
   * Dumps the Map items as a simple keyed object.
   */
  toJson(): Record<string, TMapItem>;
  /**
   * Applies post-processing the parsed YAML contents of a single file, just before its contents are passed to the collection item constructor. Override if you need this to actually do something.
   * @param sourceDataItem - The partial root object to be processed.
   */
  processSourceFile(sourceDataItem: Partial<TYamlRoot>): TYamlRoot;
  /**
   * Builds YAML collection item data into the final JSON.
   * @param yaml - The built item that will be added to the collection.
   */
  buildItem(yaml: TYamlItem, itemKey: string): TMapItem;
  /**
   * The objects parsed from the YAML source data files.
   */
  srcYamlFiles: Partial<TYamlRoot>[];
  /**
   * Builds the YAML data into Map items.
   */
  collect(): this
  /**
   * A string used to log stats of the built items.
   */
  buildStatsMessage: string;
}

export interface BuilderFromGlob {
  sourceFileGlob: string;
  // schemaIn: Schema;
  // schemaOut: Schema;
  /**
   * The unparsed YAML strings loaded directly from the YAML files.
   */
  rawSourceFileData: string[];
}

type CollectionFileGlob<G extends Game> = `${typeof MASTER_DATA_PATH}/${G}/${string}.(yml|yaml)`;

/**
 * Base class for constructing collections of Dataforged JSON objects from YAML shorthand data. When serialized to JSON, it becomes a simple keyed JSON object.
 * @internal
 */
export abstract class CollectionBuilder<
  G extends Game,
  TMapItem extends HasSource,
  TYamlItem,
  TYamlRoot extends YamlDataRoot|HasSource,
// SchemaIn extends Schema, SchemaOut extends Schema
> extends Map<string, TMapItem> implements HashBuilder<TMapItem,TYamlItem,TYamlRoot>, BuilderFromGlob {
  /**
   * The path to the directory containing the YAML files.
   */
  public static readonly referencePath = REFS_PATH;
  public static readonly templatePath = TEMPLATES_PATH;
  abstract buildItem(yaml: TYamlItem, key: string): TMapItem;
  private _fragment: string;
  public get fragment(): string {
    return this._fragment;
  }
  private _collectionKey: keyof TYamlRoot;
  public get collectionKey(): keyof TYamlRoot {
    return this._collectionKey;
  }
  collect() {
    buildLog(this.constructor, `Building ${this.collectionKey.toString()} from ${this.rawSourceFileData.length} files...`);
    _.forEach(
      this.mergedData as Record<string,TYamlItem>,
      (value,key) => this.set(key, this.buildItem(value,key))
    );
    buildLog(this.constructor, `Finished building ${this.buildStatsMessage} from ${this.rawSourceFileData.length} files.`);
    return this;
  }
  toJson() {
    return Object.fromEntries(this.entries());
  }
  get buildStatsMessage(): string {
    return `${this.size} ${this._collectionKey.toString()}`;
  }
  private _game: Game;
  public get game(): Game {
    return this._game;
  }
  /**
   * Loads the `_refs` and `_templates` files, and returns them as a string
   * @returns A string that can be parsed as YAML.
   */
  public static loadYamlRefs() {
    const refFiles = fg.sync(CollectionBuilder.referencePath+"/*.(yml|yaml)", { onlyFiles: true });
    let refString = refFiles.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    refString = refString.replaceAll(/^/gim, "  ");
    refString = "_refs:\n" + refString;
    const templateFiles = fs.readdirSync(CollectionBuilder.templatePath).filter(item => item.match(/\.ya?ml$/))
      .map(item => CollectionBuilder.templatePath + "/" + item);
    let templateString: string = templateFiles.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    templateString = templateString.replaceAll(/^/gim, "  ");
    templateString = "_templates:\n" + templateString;
    return refString + "\n\n" + templateString;
  }

  public get rawSourceFileData() {
    return fg.sync(this._sourceFileGlob, { onlyFiles: true });
  }
  private _srcDataFiles: Partial<TYamlRoot>[];
  public get srcYamlFiles(): Partial<TYamlRoot>[] {
    return this._srcDataFiles;
  }
  /**
   * Composes the yaml data for each file with references and template data.
   */
  public composeSourceData() {
    // TODO: this should attempt to validate the data individually, too
    const yamlRefs = CollectionBuilder.loadYamlRefs();
    const parsed = this.rawSourceFileData.map(yamlStr =>{
      const composedYaml = yamlRefs + "\n\n"+ yamlStr;
      const parsedYaml = yaml.load(composedYaml) as Partial<TYamlRoot>;
      // const cleanYaml = _.omitBy(parsedYaml,(v,key)=> key.startsWith("_")) as Partial<TYamlIn>;
      return parsedYaml;
    });
    return parsed;
  }
  processSourceFile(sourceDataItem: Partial<TYamlRoot>): TYamlRoot {
    return sourceDataItem as TYamlRoot;
  }

  private _sourceFileGlob: CollectionFileGlob<G>;
  public get sourceFileGlob(): CollectionFileGlob<G> {
    return this._sourceFileGlob;
  }
  public get mergedData(): TYamlRoot[typeof this.collectionKey] & Record<string,TYamlItem> {
    const collections = this.srcYamlFiles.map(item => {
      const processed = this.processSourceFile(item);
      return processed[this.collectionKey];
    });
    const mergedData = (collections.length === 1  ? collections[0]  : _.merge({} as TYamlRoot[typeof this.collectionKey], ...collections) ) as TYamlRoot[typeof this.collectionKey];
    return mergedData as TYamlRoot[typeof this.collectionKey] & Record<string,TYamlItem>;
  }
  Source: Source;
  /**
   * @param game - The game to build for.
   * @param sourceFileGlob - The glob of the source YAML files to be built from.
   * @param collectionKey - The key in the YAML data to collect and build as objects.
   */
  constructor(game: Game, sourceFileGlob: CollectionFileGlob<G>,
    fragment: string, collectionKey: keyof TYamlRoot,
    source: Source,
    // schemaIn: SchemaIn, schemaOut: SchemaOut
  ) {
    super();
    this._game = game;
    this._sourceFileGlob = sourceFileGlob;
    this._collectionKey = collectionKey;
    this._srcDataFiles = this.composeSourceData();
    this._fragment = fragment;
    // this._schemaIn = schemaIn;
    // this._schemaOut = schemaOut;
    this.Source = source;
  }
}
