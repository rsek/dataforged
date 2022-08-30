import type { IIronswornRegion } from "@json_out/index.js";
import type { ISource } from "@json_out/meta/ISource.js";
import type { YamlStubTitle } from "@yaml_in/index.js";

/**
 * @internal
 */

export interface IIronswornRegionYaml extends YamlStubTitle<IIronswornRegion> {
  Source: ISource;
}
