import type { BuilderFromGlob, CollectionFileGlob } from '@builders'
import { CollectionBuilder } from '@builders'
import { REFS_PATH, TEMPLATES_PATH } from '@constants'
import type { Game, MixinSource, Source, YamlDataRoot } from '@schema'
import { badJsonError } from '@utils/logging/badJsonError.js'
import { buildLog } from '@utils/logging/buildLog.js'
import fg from 'fast-glob'
import fs from 'fs-extra'
import yaml from 'js-yaml'
import _ from 'lodash-es'

export abstract class RootCollectionBuilder<
  G extends Game,
  TMapItem extends MixinSource,
  TYamlItem,
  TYamlRoot extends YamlDataRoot | MixinSource
  > extends CollectionBuilder<G, TMapItem, TYamlItem> implements BuilderFromGlob {
  /**
   * Loads the `_refs` and `_templates` files, and returns them as a string
   * @returns A string that can be parsed as YAML.
   */
  public static loadYamlRefs () {
    const refFiles = fg.sync(RootCollectionBuilder.referencePath + '/*.(yml|yaml)', { onlyFiles: true })
    let refString = refFiles.map(file => fs.readFileSync(file, { encoding: 'utf-8' })).join('\n')
    refString = refString.replaceAll(/^/gim, '  ')
    refString = '_refs:\n' + refString
    const templateFiles = fs.readdirSync(RootCollectionBuilder.templatePath).filter(item => item.match(/\.ya?ml$/))
      .map(item => RootCollectionBuilder.templatePath + '/' + item)
    let templateString: string = templateFiles.map(file => fs.readFileSync(file, { encoding: 'utf-8' })).join('\n')
    templateString = templateString.replaceAll(/^/gim, '  ')
    templateString = '_templates:\n' + templateString
    return refString + '\n\n' + templateString
  }

  /**
   * The path to the directory containing the YAML files.
   */
  public static readonly referencePath = REFS_PATH
  public static readonly templatePath = TEMPLATES_PATH
  public get rawSourceFileData () {
    return fg.sync(this._sourceFileGlob, { onlyFiles: true })
  }

  private readonly _srcDataFiles: Array<Partial<TYamlRoot>>
  public get srcYamlFiles (): Array<Partial<TYamlRoot>> {
    return this._srcDataFiles
  }

  private readonly _sourceFileGlob: CollectionFileGlob<G>
  public get sourceFileGlob (): CollectionFileGlob<G> {
    return this._sourceFileGlob
  }

  public get mergedData (): Record<string, TYamlItem> {
    const collections = this.srcYamlFiles.map(item => {
      const processed = this.processSourceFile(item)
      return processed[this.collectionKey]
    })
    const mergedData = (collections.length === 1 ? collections[0] : _.merge({} as TYamlRoot[typeof this.collectionKey], ...collections)) as TYamlRoot[typeof this.collectionKey]
    return mergedData as TYamlRoot[typeof this.collectionKey] & Record<string, TYamlItem>
  }

  /**
   * Composes the yaml data for each file with references and template data.
   */
  public composeSourceData () {
    // TODO: this should attempt to validate the data individually, too
    if (this.rawSourceFileData.length === 0) {
      throw badJsonError(this.constructor, 'No files found!')
    }
    const yamlRefs = RootCollectionBuilder.loadYamlRefs()
    const parsed = this.rawSourceFileData.map(yamlStr => {
      const composedYaml = yamlRefs + '\n\n' + fs.readFileSync(yamlStr, { encoding: 'utf-8' })
      const parsedYaml = yaml.load(composedYaml) as Partial<TYamlRoot>
      // const cleanYaml = _.omitBy(parsedYaml,(v,key)=> key.startsWith("_")) as Partial<TYamlIn>;
      return parsedYaml
    })
    return parsed
  }

  processSourceFile (sourceDataItem: Partial<TYamlRoot>): TYamlRoot {
    return sourceDataItem as TYamlRoot
  }

  override get label () {
    return this.collectionKey.toString()
  }

  private readonly _collectionKey: keyof TYamlRoot
  public get collectionKey (): keyof TYamlRoot {
    return this._collectionKey
  }

  override collect () {
    buildLog(this.constructor, `Building ${this.label} from ${this.rawSourceFileData.length} files...`)
    _.forEach(
      this.mergedData,
      (value, key) => this.set(key, this.buildItem(value, key))
    )
    buildLog(this.constructor, `Finished building ${this.buildStatsMessage} from ${this.rawSourceFileData.length} files.`)
    return this
  }

  constructor (game: G, fragment: string, source: Source, sourceFileGlob: CollectionFileGlob<G>, collectionKey: keyof TYamlRoot) {
    super({} as Record<string, TYamlItem>, game, fragment, source)
    this._sourceFileGlob = sourceFileGlob
    this._collectionKey = collectionKey
    this._srcDataFiles = this.composeSourceData()
  }
}
