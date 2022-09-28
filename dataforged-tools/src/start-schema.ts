// eslint-disable-next-line no-restricted-imports
import { writeSchema } from './index.js'

const yamlDeclarations = './build/dataforged-tools.d.ts'
const jsonDeclarations = '../dist/types/index.d.ts'
type OutRoot = '../_master-data/schema' | `${'../dist'|'../src'|'./src/json'}/${'starforged'|'ironsworn'}`
type OutPath = `${OutRoot}/${string}.json`

const schemasToWrite: Array<{typeName: string, filePathsOut: OutPath[], declarations: string}> = [
  {
    typeName: 'YamlAssetRoot',
    filePathsOut: ['../_master-data/schema/assets.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlMoveRoot',
    filePathsOut: ['../_master-data/schema/moves.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlEncounterRoot',
    filePathsOut: ['../_master-data/schema/encounters.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlTruthRoot',
    filePathsOut: ['../_master-data/schema/setting_truths.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlOracleRoot',
    filePathsOut: ['../_master-data/schema/oracles.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlIronlandsRegionRoot',
    filePathsOut: ['../_master-data/schema/ironlands_regions.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlDelveSiteThemeRoot',
    filePathsOut: ['../_master-data/schema/delve_site_themes.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlDelveSiteDomainRoot',
    filePathsOut: ['../_master-data/schema/delve_site_domains.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'YamlDelveRarityRoot',
    filePathsOut: ['../_master-data/schema/delve_rarities.json'],
    declarations: yamlDeclarations
  },
  {
    typeName: 'Starforged',
    filePathsOut: ['../dist/starforged/schema.json', '../src/starforged/schema.json', './src/json/starforged/schema.json'],
    declarations: jsonDeclarations
  },
  {
    typeName: 'Ironsworn',
    filePathsOut: ['../dist/ironsworn/schema.json', '../src/ironsworn/schema.json', './src/json/ironsworn/schema.json'],
    declarations: jsonDeclarations
  }
]

schemasToWrite.forEach(({ declarations, typeName, filePathsOut }) => {
  writeSchema(declarations, typeName, filePathsOut)
})
