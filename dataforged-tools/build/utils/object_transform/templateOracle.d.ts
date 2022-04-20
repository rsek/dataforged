import type { ITemplateYamlBase } from "../../yaml_in/index.js";
/**
 * It takes an oracle metadata template and builds it out with variables from a json object.
 * @param json - The JSON object that you want to replace the template variables in.
 * @param template - The template to use.
 * @returns The template oracle.
 */
export declare function templateOracle<T extends ITemplateYamlBase>(json: T, template: ITemplateYamlBase): T;
//# sourceMappingURL=templateOracle.d.ts.map