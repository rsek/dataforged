import { DisplayBuilder, SourceBuilder, TitleBuilder } from '@builders'
import type { ChallengeRank, Display, EncounterNatureTypeStarforged, EncounterStarforged, EncounterTags, EncounterVariant, Source, Title, YamlEncounterVariant } from '@schema'
import { formatId } from '@utils'

/**
 * @internal
 */
export class EncounterVariantBuilder implements EncounterVariant {
  $id: EncounterVariant['$id']
  source: Source
  title: Title
  rank: ChallengeRank
  display: Display
  description: string
  nature: EncounterNatureTypeStarforged
  variant_of: EncounterStarforged['$id']
  tags?: EncounterTags[] | undefined
  constructor (yaml: YamlEncounterVariant, parent: EncounterStarforged) {
    const fragment = yaml._idFragment ?? yaml._idFragment ?? yaml.title.short ?? yaml.title.standard ?? yaml.title.canonical
    this.$id = formatId(fragment, parent.$id)
    this.source = new SourceBuilder(parent.source)
    this.title = new TitleBuilder(yaml.title, this)
    this.rank = yaml.rank
    this.display = new DisplayBuilder(
      {
        icon: yaml.display?.icon,
        images: yaml.display?.images,
        color: yaml.display?.color
      }
    )
    this.description = yaml.description
    this.nature = yaml.nature ?? parent.nature
    this.variant_of = parent.$id
    this.tags = yaml.tags
  }
}
