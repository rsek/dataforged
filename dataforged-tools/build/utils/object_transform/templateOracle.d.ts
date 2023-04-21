import { YamlOracleSet, YamlOracleTable, YamlTemplateBase } from "../../schema";
/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
export declare function templateOracle<T extends YamlOracleSet | YamlOracleTable>(json: Partial<T> & YamlTemplateBase, template: Partial<T>): T;
//# sourceMappingURL=templateOracle.d.ts.map