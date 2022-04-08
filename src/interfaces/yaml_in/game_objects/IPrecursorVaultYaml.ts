import type Location from "@dataforged/constants/attributes/Location.js";
import type LocationTheme from "@dataforged/constants/attributes/LocationTheme.js";
import type { IPlaceYaml } from "@dataforged/interfaces/yaml_in/game_objects/IPlaceYaml.js";

export default interface IPrecursorVaultYaml<L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceYaml<undefined, L, LT> { }