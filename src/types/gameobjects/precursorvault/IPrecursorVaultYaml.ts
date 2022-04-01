import type IPlaceData from "../IPlaceYaml.js";
import type Location from "../place/Location.js";
import type LocationTheme from "../place/LocationTheme.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface IPrecursorVaultYaml<L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<undefined, L, LT> { }