import type { HasId, Title } from "@schema_json";
import { formatId } from "@utils/formatId.js";
import type { YamlTitle } from "@schema_yaml";

/**
 * @internal
 */
export class TitleBuilder implements Title {
  $id: string;
  Canonical: string;
  Standard: string;
  Short: string;
  constructor(json: YamlTitle, parent: HasId ) {
    if (!json ?? !json.Canonical) {
      throw new Error(`Missing canonical title for ${parent.$id}:\n${JSON.stringify(parent)}`);
    }
    this.$id = formatId("Title", parent.$id);
    this.Canonical = json.Canonical;
    this.Standard = json.Standard ?? json.Canonical;
    this.Short = json.Short ?? json.Standard ?? this.Canonical;
  }
}

