import type { Meter, YamlMeter } from '@schema'

/**
 * Class representing a meter (Starforged) or status track (Ironsworn).
 * @internal
 */
export abstract class MeterBuilder implements Meter {
  $id: string
  label: string
  min: number = 0
  max: number
  value: number = 0
  rollable: boolean
  /**
   * @param yaml - the json object to build the counter from
   * @param id - the id of the Counter
   */
  constructor (yaml: YamlMeter, id: string) {
    this.$id = id
    this.label = yaml.label
    this.max = yaml.max
    this.min = yaml.min ?? 0
    this.value = yaml.value ?? 0
    this.rollable = yaml.rollable ?? false
  }
}
