import type { MixinSource, MixinTitle, TitleCaseTitle, TruthOptionClassic } from '@schema'

/**
 * @public
 */
export interface TruthClassic extends MixinTitle, MixinSource {
  /**
   * @pattern ^ironsworn/setting_truths/[a-z_]+$
   */
  $id: string
  options: TruthOptionClassic[]
  title: TitleCaseTitle
}
