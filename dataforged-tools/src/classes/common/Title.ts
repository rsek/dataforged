import type { IHasId, IHasName, ITitle } from "@json_out/index.js";
import type { ITitleYaml } from "@yaml_in/common/ITitleYaml";

/**
 * @internal
 */
export class Title implements ITitle {
  $id: string;
  Canonical: string;
  Short: string;
  constructor(json: ITitleYaml, parentId: string ) {
    this.$id = parentId + "/Title";
    this.Canonical = json.Canonical;
    this.Short = json.Short ?? this.Canonical;
  }
}

