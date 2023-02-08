import { type OracleCollection } from '@base-types/collections'
import { type OracleTableRow, type OracleTable } from '@base-types/oracles'
import {
  type DescriptorFocusRow,
  type ActionThemeRow,
  type RollTwiceRow,
  type OracleTable5
} from '@base-types/templates/common'

export interface DerelictZoneOracles extends OracleCollection {
  contents: {
    areas: DerelictZoneAreaOracle
    feature: DerelictZoneFeatureOracle
    peril: DerelictZonePerilOracle
    opportunity: DerelictZoneOpportunityOracle
  }
}

interface NewZoneRow<Low extends number = number, High extends number = number>
  extends OracleTableRow<Low, High> {
  result: 'New zone'
  // # game_objects: *obj:DerelictZone.Access
}

interface NewZoneViaAccessRow<
  Low extends number = number,
  High extends number = number
> extends OracleTableRow<Low, High> {
  result: 'New zone via [⏵Access](starforged/oracles/derelicts/access)'
  // # game_objects: *obj:DerelictZone
}

interface DerelictZoneAreaOracle extends OracleTable {
  summary: 'Roll on this table to help envision the spaces you encounter in that segment of your exploration. Each zone may consist of one or more areas as appropriate to what you envision for the overall complexity of the derelict. If you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), an area can serve as a waypoint in your survey of the derelict.'
  table: [
    OracleTableRow<1, 8>,
    OracleTableRow<9, 16>,
    OracleTableRow<17, 24>,
    OracleTableRow<25, 32>,
    OracleTableRow<33, 40>,
    OracleTableRow<41, 48>,
    OracleTableRow<49, 56>,
    OracleTableRow<57, 64>,
    OracleTableRow<65, 72>,
    OracleTableRow<73, 80>,
    NewZoneRow<81, 85>,
    NewZoneViaAccessRow<86, 100>
  ]
}

interface DerelictZoneFeatureOracle extends OracleTable {
  summary: 'Roll on this table when you want to reveal new aspects of your current surroundings. This is best used sparingly—a bit of occasional extra detail or ambiance—rather than rolling for every segment of your exploration.'
  table: [
    OracleTableRow<1, 8>,
    OracleTableRow<9, 16>,
    OracleTableRow<17, 24>,
    OracleTableRow<25, 32>,
    OracleTableRow<33, 40>,
    OracleTableRow<41, 48>,
    OracleTableRow<49, 56>,
    OracleTableRow<57, 64>,
    OracleTableRow<65, 72>,
    OracleTableRow<73, 80>,
    OracleTableRow<81, 88>,
    DescriptorFocusRow<89, 100>
  ]
}

interface DerelictZonePerilOracle extends OracleTable {
  summary: 'Roll on this table when you want help envisioning a complication or danger within a zone, such as when suffering a cost as an outcome of your exploration.'
  table: [
    OracleTableRow<1, 10>,
    OracleTableRow<11, 20>,
    OracleTableRow<21, 30>,
    OracleTableRow<31, 40>,
    OracleTableRow<41, 50>,
    OracleTableRow<51, 60>,
    OracleTableRow<61, 70>,
    OracleTableRow<71, 80>,
    OracleTableRow<81, 90>,
    ActionThemeRow<91, 98>,
    RollTwiceRow<99, 100>
  ]
}

interface DerelictZoneOpportunityOracle extends OracleTable5 {
  summary: 'Roll on this table when you want inspiration for a beneficial encounter or event within a derelict, such as when you roll a strong hit with a match as you [Undertake an Expedition](starforged/moves/exploration/undertake_an_expedition), or if you [Explore a Waypoint](starforged/moves/exploration/explore_a_waypoint) and find an opportunity.'
}
