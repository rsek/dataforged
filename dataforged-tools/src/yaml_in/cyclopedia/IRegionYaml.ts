import type { IIronswornRegion } from "@json_out/index.js";
import type { ISource } from "@json_out/meta/ISource.js";
import type { YamlStub } from "@yaml_in/index.js";

/**
 * @internal
 */

export interface IIronswornRegionYaml extends YamlStub<IIronswornRegion> {
  Source: ISource;
}
