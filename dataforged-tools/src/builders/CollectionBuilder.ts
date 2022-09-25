import type { MASTER_DATA_PATH } from "@constants";
import { REFS_PATH , TEMPLATES_PATH } from "@constants";
import type { Game, HasSource, Source, YamlDataRoot } from "@schema";
import { buildLog } from "@utils/logging/buildLog.js";
import fg from "fast-glob";
import fs from "fs-extra";
import yaml from "js-yaml";
import _ from "lodash-es";

export interface HashBuilder<TMapItem, TYamlItem, TYamlRoot extends YamlDataRoot, TBuilder extends new (...args: any) => TMapItem > extends Map<string, TMapItem> {
  /**
   * Dumps the Map items as a simple hash object.
   */
  toJson: () => Record<string, TMapItem>;
  /**
   * Processes the data into a format that can be passed to the builder.
   * @param sourceDataItem The data to process.
   */
  processSourceFile(sourceDataItem: Partial<TYamlRoot>): TYamlRoot;
  buildItem(item: TYamlItem): TMapItem;
  /**
   * The object parsed from the source data files
   */
  srcDataFiles: Partial<TYamlRoot>[];
  /**
   * The builder class that builds the source data into the final JSON.
   */
  ItemBuilder: TBuilder;
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
  rawSourceFilesData: string[];
}

type CollectionFileGlob<G extends Game> = `${typeof MASTER_DATA_PATH}/${G}/${string}.(yml|yaml)`;

/**
 * @internal
 */
export abstract class CollectionBuilder<G extends Game, TYamlRoot extends YamlDataRoot, TYamlItem, TMapItem extends HasSource,
TBuilder extends new (...args: any) => TMapItem
// SchemaIn extends Schema, SchemaOut extends Schema
> extends Map<string, TMapItem> implements HashBuilder<TMapItem,TYamlItem,TYamlRoot,TBuilder>, BuilderFromGlob {
  /**
   * The path to the directory containing the YAML files.
   */
  public static readonly referencePath = REFS_PATH;
  public static readonly templatePath = TEMPLATES_PATH;
  private _collectionKey: keyof TYamlRoot;
  private _builder: TBuilder;
  public get ItemBuilder(): TBuilder {
    return this._builder;
  }
  abstract buildItem(item: TYamlItem): TMapItem;
  public get collectionKey(): keyof TYamlRoot {
    return this._collectionKey;
  }
  collect() {
    buildLog(this.constructor, `Building ${this.collectionKey.toString()} from ${this.rawSourceFilesData.length} files...`);
    _.forEach(
      this.mergedData as Record<string,TYamlItem>,
      (value,key) => {
        buildLog(this.ItemBuilder.constructor, `Building ${key}...`);
        const item = this.buildItem(value);
        this.set(key, item);
      }
    );
    buildLog(this.constructor, `Finished building ${this.buildStatsMessage} from ${this.rawSourceFilesData.length} files.`);
    return this;
  }
  toJson() {
    return Object.fromEntries(this.entries());
  }
  abstract get buildStatsMessage(): string;
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
    const templateFiles = fs.readdirSync(CollectionBuilder.templatePath).filter(item => item.match(".yaml"))
      .map(item => CollectionBuilder.templatePath.toString() + item);
    let templateString: string = templateFiles.map(file => fs.readFileSync(file, { encoding: "utf-8" })).join("\n");
    templateString = templateString.replaceAll(/^/gim, "  ");
    templateString = "_templates:\n" + templateString;
    return refString + "\n\n" + templateString;
  }

  public get rawSourceFilesData() {
    return fg.sync(this._sourceFileGlob, { onlyFiles: true });
  }
  private _srcDataFiles: Partial<TYamlRoot>[];
  public get srcDataFiles(): Partial<TYamlRoot>[] {
    return this._srcDataFiles;
  }
  /**
   * Composes the yaml data for each file with references and template data.
   */
  public composeSourceData() {
    // TODO: this should attempt to validate the data individually, too
    const yamlRefs = CollectionBuilder.loadYamlRefs();
    const parsed = this.rawSourceFilesData.map(yamlStr =>{
      const composedYaml = yamlRefs + "\n\n"+ yamlStr;
      const parsedYaml = yaml.load(composedYaml) as Partial<TYamlRoot>;
      // const cleanYaml = _.omitBy(parsedYaml,(v,key)=> key.startsWith("_")) as Partial<TYamlIn>;
      return parsedYaml;
    });
    return parsed;
  }
  abstract processSourceFile(sourceDataItem: Partial<TYamlRoot>): TYamlRoot;

  private _sourceFileGlob: CollectionFileGlob<G>;
  public get sourceFileGlob(): CollectionFileGlob<G> {
    return this._sourceFileGlob;
  }
  public get mergedData(): TYamlRoot[typeof this.collectionKey] & Record<string,TYamlItem> {
    const collections = this.srcDataFiles.map(item => {
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
    collectionKey: keyof TYamlRoot,
    source: Source,
    builder: TBuilder
    // schemaIn: SchemaIn, schemaOut: SchemaOut
  ) {
    super();
    this._game = game;
    this._sourceFileGlob = sourceFileGlob;
    this._collectionKey = collectionKey;
    // this._schemaIn = schemaIn;
    // this._schemaOut = schemaOut;
    this._srcDataFiles = this.composeSourceData();
    this.Source = source;
    this._builder = builder;
  }
}
