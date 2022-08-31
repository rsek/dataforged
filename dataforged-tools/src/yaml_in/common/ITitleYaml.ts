import type { ITitle } from "@json_out/index.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */

export interface ITitleYaml extends YamlStub<ITitle, "Short"|"Standard", "$id"> { }
