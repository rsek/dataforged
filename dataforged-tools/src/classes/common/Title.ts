import type { IHasId, ITitle } from "@json_out/index.js";
import type { ITitleYaml } from "@yaml_in/common/ITitleYaml";

/**
 * @internal
 */
export class Title implements ITitle {
  $id: string;
  Canonical: string;
  Standard: string;
  Short: string;
  constructor(json: ITitleYaml, parent: IHasId ) {
    if (!json ?? !json.Canonical) {
      throw new Error(`Missing canonical title for ${parent.$id}:\n${JSON.stringify(parent)}`);
    }
    this.$id = parent.$id + "/Title";
    this.Canonical = json.Canonical;
    this.Standard = json.Standard ?? json.Canonical;
    this.Short = json.Short ?? json.Standard ?? this.Canonical;
  }
}

