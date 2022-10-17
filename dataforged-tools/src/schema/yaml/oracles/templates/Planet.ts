import type { PlanetaryClass } from '@game_objects'
import type { YamlOracleSet, YamlOracleTable, YamlOracleTableRow, YamlRegionSetMixin, YamlRowLike, YamlTableBySeven, YamlTableStubByEleven } from '@schema'

type PlanetaryClassName = keyof typeof PlanetaryClass
// @ts-expect-error

export interface YamlOracleSetPlanet extends YamlOracleSet {
  title: {
    canonical: `${PlanetaryClassName} world`
    short: PlanetaryClass
  }
  usage: {
    requires: {
      attributes: {
        planetary_class: [typeof PlanetaryClass[PlanetaryClassName]]
      }
    }
  }
  sets: Record<string, YamlOracleSet> & {
    settlements: {
      title: {
        canonical: 'Settlements'
      }
      usage: {
        initial: true
      }
      tables: YamlRegionSetMixin
    }
  }
  tables: Record<string, YamlOracleTable> & {
    atmosphere: {
      title: { canonical: 'Atmosphere' }
      content: { part_of_speech: ['adjective'] }
      usage: { initial: true }
      table: [
        YamlRowLike & { result: 'None/thin', description: "This planet is airless, or it's atmosphere is so thin as to be useless for humans.", attributes: { atmosphere: 'none_thin' } },
        YamlRowLike & { result: 'Toxic', description: "This planet's atmosphere is not compatible with human life. Exploring this place will require a sealed environment or breathing apparatus. Otherwise, survival is measured in minutes.", attributes: { atmosphere: 'toxic' } },
        YamlRowLike & { result: 'Corrosive', description: "This planet's atmosphere is deadly to humans. As a bonus, it can damage exposed skin, materials, plastics, and metals over time.", attributes: { atmosphere: 'corrosive' } },
        YamlRowLike & { result: 'Marginal', description: "It's unhealthy to breathe this planet's atmosphere for more than a few hours at a time.", attributes: { atmosphere: 'marginal' } },
        YamlRowLike & { result: 'Breathable', description: "This atmosphere is not perfect, but it's good enough to sustain human life.", attributes: { atmosphere: 'breathable' } },
        YamlRowLike & { result: 'Ideal', description: "This planet's atmosphere is ideally suited to human life. It's literally a breath of fresh air.", attributes: { atmosphere: 'ideal' } },
      ]
    }
    observed_from_space: {
      title:
      { canonical: 'Observed From Space' }
      content:
      { part_of_speech: ['fragment'] }
      usage: {
        max_rolls: 2
      }
      table: YamlTableStubByEleven
    }
    feature: {
      title:
      { canonical: 'Planetside feature', short: 'Feature' }
      content:
      { part_of_speech: ['fragment'] }
      usage: {
        max_rolls: 2
      }
      table: YamlTableBySeven
    }
    life: {
      title:
      { canonical: 'Life', short: 'Feature' }
      content:
      { part_of_speech: ['adjective'] }
      table: YamlLifeTable
    }
  }
}

type YamlLifeTable<TTable extends YamlOracleTableRow[] = YamlOracleTableRow[]> = TTable & [
  {
    result: 'None'
    sets_attributes: { life: 'none' }
  },
  {
    result: 'Extinct'
    sets_attributes: { life: 'extinct' }
  },
  {
    result: 'Scarce'
    sets_attributes: { life: 'scarce' }
  },
  {
    result: 'Diverse'
    sets_attributes: { life: 'diverse' }
  }, // suggest creature
  {
    result: 'Bountiful'
    sets_attributes: { life: 'bountiful' }
  }, // suggest creature
  {
    result: 'Overrun'
    sets_attributes: { life: 'overrun' }
  } // suggest creature
]
