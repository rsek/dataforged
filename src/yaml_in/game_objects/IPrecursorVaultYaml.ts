import type { Location, LocationTheme } from "@dataforged/json_out/index.js";
import type { IPlaceYaml } from "@dataforged/yaml_in/index.js";

export interface IPrecursorVaultYaml<L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<undefined, L, LT> { }