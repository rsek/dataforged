import { OracleContentBuilder, RollTemplateBuilder, SuggestionsBuilder, NodeBuilder, DisplayBuilder } from '@builders'
import type { OracleTableBuilder } from '@builders'
import type { NodeLike } from '@builders/NodeBuilder.js'
import type { Display, GameObject, ImageUrl, MultipleRolls, OracleContent, OracleTable, OracleTableRow, Raster, RollTemplate, Suggestions, Vector, YamlOracleTableRow, YamlRowLike, YamlSimpleTableRow } from '@schema'
import { badJsonError } from '@utils/logging/badJsonError.js'
import _ from 'lodash'

type RangeString = `${number}` | `${number}-${number}` | `null${number}`

/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export class OracleTableRowBuilder<
  TJson extends OracleTableRow = OracleTableRow,
  TParent extends NodeLike<any> = OracleTableBuilder
  > extends NodeBuilder<
  YamlOracleTableRow,
  TJson,
  TParent
  > implements OracleTableRow {
  floor: number | null
  ceiling: number | null
  result!: string
  summary?: string | null | undefined
  roll_oracles?: OracleTable['$id'][] | undefined
  game_objects?: GameObject[] | undefined
  multiple_rolls?: MultipleRolls | undefined
  suggestions?: Suggestions | undefined
  // sets_attributes?: AttributeSetterBuilder | undefined
  template?: RollTemplate | undefined
  display?: Display | undefined
  content?: OracleContent
  static rowDataFromArray (rowArray: YamlSimpleTableRow): YamlOracleTableRow {
    let oracleTableRow: YamlOracleTableRow = {
      floor: rowArray[0],
      ceiling: rowArray[1],
      result: ''
    }
    const itemsToMerge: Partial<YamlOracleTableRow>[] = []
    rowArray.slice(2).forEach((item) => {
      switch (typeof item) {
        case 'string': {
          const str = item
          if (str.match(/.*\.webp/) != null) {
            if (oracleTableRow.display == null) {
              oracleTableRow.display = {}
            }
            if (oracleTableRow.display.images == null) {
              oracleTableRow.display.images = []
            }
            oracleTableRow.display.images.push(str as ImageUrl<Raster>)
          } else if (str.match(/.*\.png/) != null) {
            if (oracleTableRow.display == null) {
              oracleTableRow.display = {}
            }
            if (oracleTableRow.display.icon != null) {
              throw badJsonError(oracleTableRow.constructor, str, 'Row already has an icon!')
            }
            oracleTableRow.display.icon = str as ImageUrl<Vector>
          } else if ((oracleTableRow.result.length === 0) || oracleTableRow.result?.length === 0) {
            oracleTableRow.result = str
          } else if ((oracleTableRow.summary == null) || oracleTableRow.summary?.length === 0) {
            oracleTableRow.summary = str
          } else {
            throw badJsonError(oracleTableRow.constructor, str, 'Unable to infer string assignment')
          }
          break
        }
        case 'object': {
          if (oracleTableRow.floor === null && oracleTableRow.ceiling === null) {
          // null rows only exist to provide display text, so they only get strings assigned to them;
            break
          }
          itemsToMerge.push(item as Partial<YamlOracleTableRow>)
          break
        }
        default:
          throw badJsonError(OracleTableRowBuilder.rowDataFromArray.name, item, 'Unable to infer key for object')
      }
    })
    oracleTableRow = _.merge(oracleTableRow, ...itemsToMerge)
    return oracleTableRow
  }

  static toRangeString ({ floor, ceiling }: YamlOracleTableRow, index: number): string {
    if ((typeof floor) !== (typeof ceiling)) {
      throw badJsonError(OracleTableRowBuilder.toRangeString.name, ...arguments, 'Floor and Ceiling must have the same type (either number or null)')
    }
    let rangeString: RangeString
    if (floor === null && ceiling === null) {
      rangeString = `null${index + 1}` as RangeString
    } else {
      if (floor === null || ceiling === null) {
        throw new Error()
      }
      rangeString = floor === ceiling ? `${ceiling}` : `${floor}-${ceiling}`
    }
    return rangeString
  }

  /**
   * Creates an instance of Row.
   */
  constructor (
    yaml: YamlRowLike,
    index: number,
    parent: TParent,
    extraFragments: (string | number)[] = []
  ) {
    const data: YamlOracleTableRow = (Array.isArray(yaml) ? OracleTableRowBuilder.rowDataFromArray(yaml) : yaml)
    super(data, parent, OracleTableRowBuilder.toRangeString(data, index))
    // compute floor and ceiling to derive the ID fragment for this row's ID.

    this.floor = this._rawData.floor
    this.ceiling = this._rawData.ceiling
    this.result = this._rawData.result
    if (this.result.length === 0) {
      throw badJsonError(this.constructor, this, "Row doesn't have a result string")
    }
    this.multiple_rolls = this._rawData.multiple_rolls
    this.roll_oracles = this._rawData.roll_oracles
    this.summary = this._rawData.summary
    if (this._rawData.suggestions != null) { this.suggestions = new SuggestionsBuilder(this._rawData.suggestions) }
    if (this._rawData.content != null) {
      this.content = new OracleContentBuilder(this._rawData.content)
    }
    if (this._rawData.display != null) {
      this.display = new DisplayBuilder({ ...this._rawData.display })
    }
    if (this._rawData.game_objects != null) { this.game_objects = this._rawData.game_objects }
    if (this._rawData.template != null) {
      this.template = new RollTemplateBuilder(this._rawData.template, this)
    }
  }
}
