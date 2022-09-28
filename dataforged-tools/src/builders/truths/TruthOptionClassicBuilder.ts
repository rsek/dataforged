import type { TruthClassic, TruthOptionClassic, YamlTruthOptionClassic } from '@schema'

/**
 * @internal
 */
export class TruthOptionClassicBuilder implements TruthOptionClassic {
  $id: string
  Description: string
  'Quest starter': string
  constructor (yaml: YamlTruthOptionClassic, parent: TruthClassic, index: number) {
    this.$id = parent.$id + `/${index + 1}`
    this.Description = yaml.Description
    this['Quest starter'] = yaml['Quest starter']
  }
}
