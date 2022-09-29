import { GameObjectType, Zone } from '@game_objects'
import { YamlFeatureMixin, YamlOpportunityMixin, YamlOracleSet, YamlOracleTable, YamlOracleTableRow, YamlPerilMixin, YamlRepeatableOracleMixin, YamlRowLike, YamlTableStubByEight, YamlTableStubByTen } from '@schema'

type DerelictZoneName = keyof typeof Zone

export interface DerelictZoneSet<TZone extends DerelictZoneName> extends YamlOracleSet {
  title: {
    canonical: TZone
  }
  display: {
    icon: `img/vector/Derelicts/${typeof Zone[TZone]}.svg`
  }
  usage:
  {
    requires:
    {
      attributes:
      { zone: (typeof Zone[TZone])[] }
    }
  }
  tables: Record<string, YamlOracleTable> & {
    area: YamlRepeatableOracleMixin & {
      title: { canonical: 'Area' }
      description: 'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), an area can serve as a waypoint in your survey of the derelict.'
      table: [
        ...YamlTableStubByEight,
        YamlRowLike<81, 85> & { result: 'New zone' }, // obj :Derelict zone
        YamlRowLike<86, 100> & { result: 'New zone via [⏵Access](starforged/oracles/derelicts/access)' }, // obj: derelict on access
      ]
    }
    feature: YamlFeatureMixin & {
      summary: 'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.'
      table: [
        ...YamlTableStubByEight,
        YamlRowLike<81, 88>,
        YamlRowLike<89, 100> // descriptor + focus
      ]
    }
    peril: YamlPerilMixin & {
      summary: 'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.',
      table: [
        ...YamlTableStubByTen,
        YamlRowLike<91, 98>, // action + theme
        YamlRowLike<99, 100> // roll twice
      ]
    }
    opportunity: YamlOpportunityMixin & {
      summary: 'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), or if you [Explore a Waypoint](starforged/moves/exploration/explore_a_waypoint) and find an opportunity.'
    }
  }
}

export interface NewZoneMixin extends YamlOracleTableRow {
  result: 'New zone'
  game_objects: [
    {
      object_type: GameObjectType.DerelictZone
    }
  ]
}
