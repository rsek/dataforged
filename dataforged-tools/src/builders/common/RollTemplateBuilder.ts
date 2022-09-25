import type { HasId, RollTemplate, YamlRollTemplate } from "@schema";

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