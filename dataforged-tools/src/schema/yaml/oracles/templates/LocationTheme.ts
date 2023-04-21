import type { LocationTheme, YamlFeatureMixin, YamlOpportunityMixin, YamlOracleSet, YamlPerilMixin, YamlRowLike, YamlTableByTwenty, YamlTableStubByEight, YamlTableStubByNine } from '@schema'

export type LocationThemeName = keyof typeof LocationTheme
// @ts-expect-error

export interface YamlOracleSetLocationTheme<TTheme extends LocationThemeName> extends YamlOracleSet {
  title: {
    canonical: TTheme
  }
  display:
  { icon: `img/vector/Location_Theme/${typeof LocationTheme[TTheme]}.svg` }
  usage: {
    requires: {
      attributes: {
        location_theme: typeof LocationTheme[TTheme][]
      }
    }
  }
  tables: {
    feature: YamlFeatureMixin & {
      summary: 'Use this table to reveal a new aspect of the location.'
      table: [
        ...YamlTableStubByEight,
        YamlRowLike<81, 88>,
        YamlRowLike<89, 96>,
        YamlRowLike<97, 100>, // descriptor/focus
      ]
    }
    peril: YamlPerilMixin & {
      summary: 'Use this table to help envision a complication or hazard.'
      table: [
        ...YamlTableStubByNine,
        YamlRowLike<82, 90>,
        YamlRowLike<91, 98>, // * result: Action + Theme
        YamlRowLike<99, 100>, // * result: RollTwice
      ]
    }
    opportunity: YamlOpportunityMixin & {
      table: YamlTableByTwenty
      summary: 'Use this table to help envision a beneficial encounter or event, such as when rolling a strong hit with a match in a location.'
    }
  }
}
