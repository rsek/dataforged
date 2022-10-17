
import type { Game, Source, YamlSource } from '@schema'
import { License, SourceTitle } from '@schema'
import { badJsonError } from '@utils/logging/badJsonError.js'
import _ from 'lodash-es'

/**
 * @internal
 */
export class SourceBuilder implements Source {
  title: Source['title']
  authors: string[]
  date?: string | undefined
  page?: number | undefined
  uri?: string | undefined
  license: License
  static defaultByTitle (sourceTitle: SourceTitle): SourceBuilder {
    return new SourceBuilder({ title: sourceTitle, authors: ['Shawn Tomkin'] })
  }

  static defaultByGame (game: Game): SourceBuilder {
    return new SourceBuilder({ title: SourceTitle[game], authors: ['Shawn Tomkin'] })
  }

  static getDefaultLicense (sourceTitle: SourceTitle | string): License {
    switch (sourceTitle as SourceTitle) {
      case SourceTitle.Ironsworn:
      case SourceTitle.IronswornAssets:
        return License.CC_BY_NC_SA
      case SourceTitle.IronswornDelve:
        return License.CC_BY_NC_SA
      case SourceTitle.Starforged:
      case SourceTitle.StarforgedAssets:
        return License.CC_BY_SA
      case SourceTitle.SunderedIslesPreview:
        return License.None
      default:
        return License.None
    }
  }

  constructor (yaml: YamlSource, ...ancestorSourceJson: YamlSource[]) {
    const sourceStack = _.cloneDeep([..._.compact(
      ancestorSourceJson)
      .reverse(),
    yaml as Source])
    const merged = _.merge(...sourceStack as [YamlSource, YamlSource])
    if (merged.title == null) {
      throw badJsonError('Unable to find title in source or ancestor source objects.', [yaml, ...ancestorSourceJson])
    }
    this.title = merged.title
    this.authors = merged.authors ?? ['Shawn Tomkin']
    this.date = merged.date
    this.page = merged.page
    this.uri = merged.uri
    const license: undefined | License = merged.license ?? SourceBuilder.getDefaultLicense(merged.title)
    if (!license) {
      throw new Error(`Could not infer a valid license!\n${JSON.stringify(merged)}`)
    }
    this.license = license
  }
}
