import { OracleTableRowBuilder } from '@builders'
import type { TruthOptionStarforged, TruthOptionSubtableRowStarforged, TruthStarforged, YamlTruthOptionStarforged } from '@schema'
import { formatId } from '@utils'
import { badJsonError } from '@utils/logging/badJsonError.js'

/**
 * @internal
 */
// @ts-expect-error
export class TruthOptionStarforgedBuilder extends OracleTableRowBuilder<YamlTruthOptionStarforged, TruthOptionStarforged, TruthStarforged> implements TruthOptionStarforged {
  floor!: TruthOptionStarforged['floor']
  ceiling!: TruthOptionStarforged['ceiling']
  result: string
  description: string
  quest_starter: string
  subtable?: TruthOptionSubtableRowStarforged[] | undefined
  constructor (yaml: YamlTruthOptionStarforged, index: number, parent: TruthStarforged) {
    super(yaml, index, parent)
    this.result = yaml.result
    this.description = yaml.description
    this.quest_starter = yaml.quest_starter
    if (yaml.roll_template != null) {
      // @ts-expect-error
      this.roll_template = { ...yaml.roll_template, $id: formatId('roll_template', this.$id) }
    }
    // @ts-expect-error
    if (this.$id === null) {
      throw new Error('Row ID is null, but it has a Subtable.')
    }
    if (yaml.subtable != null) {
      if (Array.isArray(yaml.subtable[0])) {
        console.log('Subtable found, building...')
        // @ts-expect-error
        this.subtable = (yaml.subtable).map((rowData, index) => new OracleTableRowBuilder(rowData, index, this))
      } else if (Array.isArray(yaml.subtable) && typeof yaml.subtable[0] === 'object') {
        console.log('Prebuilt subtable found, generating IDs...')
        // @ts-expect-error
        this.subtable = (yaml.subtable).map((rowData, index) => new OracleTableRowBuilder(rowData, index, this))
      } else {
        throw badJsonError(this.constructor, yaml.subtable, 'expected Row[]')
      }
    }
    // if (this.Subtable) {
    //   // what is happening here?
    //   this.Subtable = this.Subtable.map(row => new Row((`${this.$id ?? "--"}/Subtable`.replaceAll(" ", "_")), row) as SettingTruthOptionSubtableRow);
    // }
  }
}
