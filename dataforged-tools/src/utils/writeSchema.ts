/* eslint-disable no-console */
import { writeJson } from "@utils/io/writeJSON.js";
import * as TJS from "typescript-json-schema";
import { resolve } from "path";

const yamlDeclarations = "./build/dataforged-tools.d.ts";
const jsonDeclarations = "../dist/index.d.ts";

const schemasToWrite: {typeName: string, outFile: string, declarations: string}[] = [
  {
    typeName: "IAssetRootYaml",
    outFile: "../_master-data/Starforged/schema/assets.json",
    declarations: yamlDeclarations
  },
  {
    typeName: "IMoveRootYaml",
    outFile: "../_master-data/Starforged/schema/moves.json",
    declarations: yamlDeclarations
  },
  {
    typeName: "IEncounterRootYaml",
    outFile: "../_master-data/Starforged/schema/encounters.json",
    declarations: yamlDeclarations
  },
  {
    typeName: "ITruthRootYaml",
    outFile: "../_master-data/Starforged/schema/setting_truths.json",
    declarations: yamlDeclarations
  },
  {
    typeName: "IOracleCatRootYaml",
    outFile: "../_master-data/Starforged/schema/oracles.json",
    declarations: yamlDeclarations
  },
  {
    typeName: "Starforged",
    outFile: "../dist/starforged/schema.json",
    declarations: jsonDeclarations
  },
  {
    typeName: "Ironsworn",
    outFile: "../dist/ironsworn/schema.json",
    declarations: jsonDeclarations
  }
];

/**
 * Builds a Dataforged JSON schema for use in YAML data entry.
 * @param declarations - The declarations to build from.
 * @param typeName - the root type to extract.
 * @param outFile - where to write the resulting schema.
 * @internal
 */
export function writeSchema(declarations: string, typeName: string, outFile: string) {
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

  const schema = TJS.generateSchema(program, typeName, settings);
  if (schema) {
    writeJson(outFile, schema, false);
  } else {
    throw Error("Unable to write schema.");
  }
}

schemasToWrite.forEach(({ declarations, typeName, outFile }) => {
  console.log(`Writing schema for ${typeName} to ${outFile}...`);
  writeSchema(declarations, typeName, outFile);
});