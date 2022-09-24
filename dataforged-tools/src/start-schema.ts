import { writeSchema } from "@utils";

const yamlDeclarations = "./build/dataforged-tools.d.ts";
const jsonDeclarations = "../dist/types/index.d.ts";

const schemasToWrite: {typeName: string, outFiles: string[], declarations: string}[] = [
  {
    typeName: "YamlAssetRoot",
    outFiles: ["../_master-data/schema/assets.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlMoveRoot",
    outFiles: ["../_master-data/schema/moves.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlEncounterRoot",
    outFiles: ["../_master-data/schema/encounters.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlTruthRoot",
    outFiles: ["../_master-data/schema/setting_truths.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlOracleSetFile",
    outFiles: [ "../_master-data/schema/oracles.json","../_master-data/schema/oracles-ironsworn.json" ],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlCyclopediaRoot",
    outFiles: ["../_master-data/schema/cyclopedia.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "YamlDelveSiteRoot",
    outFiles: ["../_master-data/schema/delve_site.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "Asset",
    outFiles: [
      "../dist/starforged/schema-asset.json"
    ],
    declarations: jsonDeclarations
  },
  {
    typeName: "Starforged",
    outFiles: [ "../dist/starforged/schema.json", "../src/starforged/schema.json", "./src/json/starforged/schema.json" ],
    declarations: jsonDeclarations
  },
  {
    typeName: "Ironsworn",
    outFiles: [ "../dist/ironsworn/schema.json", "../src/ironsworn/schema.json", "./src/json/ironsworn/schema.json" ],
    declarations: jsonDeclarations
  }
];


schemasToWrite.forEach(({ declarations, typeName, outFiles }) => {
  writeSchema(declarations, typeName, outFiles);
});