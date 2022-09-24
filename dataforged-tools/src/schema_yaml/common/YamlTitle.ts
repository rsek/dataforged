import type { YamlStub } from "@schema_yaml";
import type { Title } from "@schema_json";

/**
 * @internal
 */

export interface YamlTitle extends YamlStub<Title, "Short"|"Standard", "$id"> { }
