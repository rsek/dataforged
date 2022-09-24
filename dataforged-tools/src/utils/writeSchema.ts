/* eslint-disable no-console */
import { writeJson } from "@utils/io/writeJSON.js";
import * as TJS from "typescript-json-schema";
import { resolve } from "path";


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
    aliasRef: true,
    excludePrivate: true
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
