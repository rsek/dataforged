import { DisplayBuilder, SourceBuilder, TitleBuilder } from '@builders'
import type { ChallengeRank, Display, EncounterNatureTypeStarforged, EncounterStarforged, EncounterTags, EncounterVariant, Source, Title, YamlEncounterVariant } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class EncounterVariantBuilder implements EncounterVariant {
  $id: EncounterVariant['$id']
  Source: Source
  Title: Title
  Rank: ChallengeRank
  Display: Display
  Description: string
  Nature: EncounterNatureTypeStarforged
  'Variant of': EncounterStarforged['$id']
  Tags?: EncounterTags[] | undefined
  constructor (yaml: YamlEncounterVariant, parent: EncounterStarforged) {
    const fragment = yaml._idFragment ?? yaml._idFragment ?? yaml.Title.Short ?? yaml.Title.Standard ?? yaml.Title.Canonical
    this.$id = formatId(fragment, parent.$id)
    this.Source = new SourceBuilder(parent.Source)
    this.Title = new TitleBuilder(yaml.Title, this)
    this.Rank = yaml.Rank
    this.Display = new DisplayBuilder(
      {
        Icon: yaml.Display?.Icon,
        Images: yaml.Display?.Images,
        Color: yaml.Display?.Color
      }
    )
    this.Description = yaml.Description
    this.Nature = yaml.Nature ?? parent.Nature
    this['Variant of'] = parent.$id
    this.Tags = yaml.Tags
  }
}
