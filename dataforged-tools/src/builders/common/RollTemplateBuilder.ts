import type { YamlRollTemplate } from "@schema_yaml";
import type { HasId, RollTemplate } from "@schema_json";

/**
 * @internal
 */
export class RollTemplateBuilder implements RollTemplate {
  $id: string;
  Result?: string | undefined;
  Summary?: string | undefined;
  Description?: string | undefined;
  constructor(json: YamlRollTemplate, parent: HasId) {
    this.$id = `${parent.$id}/Roll_template`;
    this.Result = json.Result;
    this.Summary = json.Summary;
    this.Description = json.Description;
  }
}