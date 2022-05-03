/* eslint-disable no-console */
import { writeJson } from "@utils/io/writeJSON.js";
import * as TJS from "typescript-json-schema";
import { resolve } from "path";

const yamlDeclarations = "./build/dataforged-tools.d.ts";
const jsonDeclarations = "../dist/types/index.d.ts";

const schemasToWrite: {typeName: string, outFiles: string[], declarations: string}[] = [
  {
    typeName: "IAssetRootYaml",
    outFiles: ["../_master-data/schema/assets.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "IMoveRootYaml",
    outFiles: ["../_master-data/schema/moves.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "IEncounterRootYaml",
    outFiles: ["../_master-data/schema/encounters.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "ITruthRootYaml",
    outFiles: ["../_master-data/schema/setting_truths.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "IOracleCatRootYaml",
    outFiles: ["../_master-data/schema/oracles.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "IOracleCategoryYaml",
    outFiles: ["../_master-data/schema/oracles-ironsworn.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "ICyclopediaRootYaml",
    outFiles: ["../_master-data/schema/cyclopedia.json"],
    declarations: yamlDeclarations
  },
  {
    typeName: "IDelveSiteRootYaml",
    outFiles: ["../_master-data/schema/delve_site.json"],
    declarations: yamlDeclarations
  },

  {
    typeName: "Starforged",
    outFiles: ["../dist/starforged/schema.json"],
    declarations: jsonDeclarations
  },
  {
    typeName: "Ironsworn",
    outFiles: ["../dist/ironsworn/schema.json"],
    declarations: jsonDeclarations
  }
];

/**
 * Builds a Dataforged JSON schema for use in YAML data entry.
 * @param declarations - The declarations to build from.
 * @param typeName - the root type to extract.
 * @param outFiles - where to write the resulting schema.
 * @internal
 */
export function writeSchema(declarations: string, typeName: string, outFiles: string[]) {
// optionally pass argument to schema generator
  const settings: TJS.PartialArgs = {
    noExtraProps: true,
    defaultNumberType: "integer",
    required: true,
    defaultProps: true,
    titles: true,
    ref: true,
    aliasRef: true
  };

  // optionally pass ts compiler options
  const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
  };

  const program = TJS.getProgramFromFiles(
    [resolve(declarations)],
    compilerOptions,
  );

  console.log(`[${writeSchema.name}] Generating schema for ${typeName}...`);
  const schema = TJS.generateSchema(program, typeName, settings);
  if (schema) {
    outFiles.forEach(outFile => {
      console.log(`[${writeSchema.name}] Writing schema for ${typeName} to: ${outFile}`);
      writeJson(outFile, schema, false);
    });
  } else {
    throw Error(`[${writeSchema.name}] Unable to write schema for ${typeName}!`);
  }
}

schemasToWrite.forEach(({ declarations, typeName, outFiles }) => {
  writeSchema(declarations, typeName, outFiles);
});