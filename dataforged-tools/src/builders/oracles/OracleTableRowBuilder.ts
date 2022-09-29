/* eslint-disable no-console */
import { GameObjectBuilder, MultipleRollsBuilder, OracleContentBuilder, RollTemplateBuilder, SuggestionsBuilder } from '@builders'
import { NodeBuilder } from '@builders/NodeBuilder.js'
import type { GameObjectRecord } from '@game_objects/GameObjectRecord.js'
import type { Display, GameObject, ImageUrl, MixinId, MultipleRolls, OracleContent, OracleTable, OracleTableRow, Raster, RollTemplate, RowNullStub, Suggestions, TruthOptionStarforged, TruthOptionSubtableRowStarforged, TruthStarforged, Vector, YamlRowLike, YamlSimpleTableRow, YamlStub, YamlSuggestions, YamlTruthOptionStarforged } from '@schema'
import { formatId } from '@utils'
import { badJsonError } from '@utils/logging/badJsonError.js'
import type { AttributeMap } from '@utils/types/AttributeHash.js'
import _ from 'lodash-es'

type RangeString = `${number}` | `${number}-${number}` | `null${number}`

/**
 * Class representing a single row of an oracle table.
 * @internal
 */
export class OracleTableRowBuilder<
  TYaml extends YamlRowLike = YamlRowLike,
  TJson extends OracleTableRow = OracleTableRow,
  TParent extends MixinId = OracleTable
  > extends NodeBuilder<
  TYaml,
  TJson,
  TParent
  > implements OracleTableRow {
  floor: number | null
  ceiling: number | null
  result!: string
  summary?: string | null | undefined
  oracle_rolls?: Array<OracleTable['$id']> | undefined
  game_objects?: GameObject[] | undefined
  multiple_rolls?: MultipleRolls | undefined
  suggestions?: Suggestions | undefined
  // sets_attributes?: AttributeSetterBuilder | undefined
  roll_template?: RollTemplate | undefined
  display?: Display | undefined
  content?: OracleContent
  /**
   * Creates an instance of Row.
   */
  constructor(
    yaml: TYaml,
    index: number,
    parent: TParent,
    tableFragment: string | false = false
  ) {
    let rowData: YamlRowLike = _.clone(yaml)
    // compute floor and ceiling to derive the ID fragment for this row's ID.
    let floor: number | null
    let ceiling: number | null
    if (Array.isArray(rowData) && (rowData as unknown[]).some(item => Array.isArray(item))) {
      rowData = (rowData as Array<unknown | unknown[]>).flat(2) as YamlSimpleTableRow
    }
    floor = Array.isArray(rowData) ? rowData[0] : rowData.floor
    ceiling = Array.isArray(rowData) ? rowData[1] : rowData.ceiling
    if ((typeof floor) !== (typeof ceiling)) {
      throw badJsonError('RowBuilder', rowData, 'Floor and Ceiling must have the same type (either number or null)')
    }
    let rangeString: RangeString
    if (floor === null && ceiling === null) {
      rangeString = 'null' + (index + 1) as RangeString
    } else {
      if (floor === null || ceiling === null) {
        throw new Error()
      }
      rangeString = floor === ceiling ? `${ceiling}` : `${floor}-${ceiling}`
    }

    super(
      yaml,
      rangeString,
      parent
    )
    this.floor = floor
    this.ceiling = ceiling

    const rowContents = Array.isArray(rowData) ? rowData.slice(2) : [_.omit(rowData, (['floor', 'ceiling'] as Array<keyof OracleTableRow>))]

    rowContents.forEach(item => {
      switch (typeof item) {
        case 'string': {
          const str = item
          if (str.match(/.*\.webp/) != null) {
            if (this.display == null) {
              this.display = {}
            }
            if (this.display.images == null) {
              this.display.images = []
            }
            this.display.images.push(str as ImageUrl<Raster>)
          } else if (str.match(/.*\.png/) != null) {
            if (this.display == null) {
              this.display = {}
            }
            if (this.display.icon) {
              throw badJsonError(this.constructor, str, 'Row already has an icon!')
            }
            this.display.icon = str as ImageUrl<Vector>
          } else if (!this.result || this.result?.length === 0) {
            this.result = str
          } else if (!this.summary || this.summary?.length === 0) {
            this.summary = str
          } else {
            throw badJsonError(this.constructor, str, 'Unable to infer string assignment')
          }
          break
        }
        case 'object': {
          if (this.floor === null && this.ceiling === null) {
            // null rows only exist to provide display text, so they only get strings assigned to them;
            break
          }
          _.forEach((item as Record<string, unknown>), (value, key) => {
            switch (key as (keyof OracleTableRowBuilder | 'part_of_speech')) {
              case 'part_of_speech': {
                if (this.content == null) {
                  this.content = new OracleContentBuilder({})
                }
                this.content.part_of_speech = value as typeof this.content['part_of_speech']
                break
              }
              case 'oracle_rolls': {
                // if (!is<OracleTableId[]>(value)) {
                //   throw badJsonError(this.constructor, value, "expected OracleTableId[]");
                // }
                if (!Array.isArray(value)) {
                  throw badJsonError(this.constructor, value, 'expected OracleTableId[]')
                }
                this.oracle_rolls = value
                break
              }
              case 'multiple_rolls': {
                this.multiple_rolls = new MultipleRollsBuilder(value as MultipleRolls)
                break
              }
              case 'game_objects': {
                if (this.game_objects == null) {
                  this.game_objects = []
                }
                const gameObjData = value as GameObjectRecord[]
                gameObjData.forEach(item => this.game_objects?.push(new GameObjectBuilder(item)))
                break
              }
              case 'suggestions': {
                // console.log("row has suggestions:", JSON.stringify(rowContents));
                let newSuggestions
                if (Array.isArray(value)) {
                  // console.log("Received a suggestion array, merging...", value);
                  const suggestData = _.cloneDeep(value) as YamlSuggestions[]
                  const suggestItems = suggestData.map(item => new SuggestionsBuilder(item))
                  newSuggestions = suggestItems.reduce((a, b) => _.merge(a, b))
                  // console.log("merged multiple suggestions", newSuggestions);
                } else {
                  newSuggestions = new SuggestionsBuilder(value as YamlSuggestions)
                  // console.log("single suggestion", newSuggestions);
                }
                if (this.suggestions == null) {
                  this.suggestions = newSuggestions
                } else {
                  this.suggestions = _.merge({ ...this.suggestions }, { ...newSuggestions })
                }
                // console.log("final suggestions object", this.Suggestions);
                break
              }
              case 'result': {
                if (typeof value !== 'string') {
                  throw badJsonError(this.constructor, value, 'expected result string')
                }
                if (!this.result || this.result.length === 0) { this.result = value }
                break
              }
              case 'summary': {
                if (typeof value !== 'string' && value !== null) {
                  throw badJsonError(this.constructor, value, 'expected summary string or null')
                }
                if (this.summary) {
                  throw badJsonError(this.constructor, value, 'A summary string was provided, but one has already been assigned.')
                }
                this.summary = value
                break
              }
              // case 'sets_attributes': {
              //   // this.sets_attributes = new AttributeSetterBuilder(value as AttributeMap)
              //   break
              // }
              case 'roll_template': {
                this.roll_template = new RollTemplateBuilder((item as { ['roll_template']: RollTemplate }).roll_template as NonNullable<typeof this['roll_template']>, this)
                break
              }
              default:
                break
            }
          })
          break
        }
        default:
          throw badJsonError(this.constructor, item, 'Unable to infer key for object')
      }
    })
    if (!this.result || this.result.length === 0) {
      throw badJsonError(this.constructor, this, "Row doesn't have a result string")
    }
  }
  // [x: number]: string | undefined;
  // length?: number | undefined;
  // this has to happen after derived class inheritance, rather than during the class constructor, so that class inheritance works properly. it gets done when the Oracle class builds the rows.
  // FIXME: alternately, i could write an abstract class or something, oof.
}

/**
 * @internal
 */
export class RowNullStubBuilder implements RowNullStub {
  floor: null = null
  ceiling: null = null
  result: string
  summary?: string | undefined | null
  constructor({ result, summary }: YamlStub<Omit<RowNullStubBuilder, 'floor' | 'ceiling'>>) {
    this.result = result
    this.summary = summary
  }
}
