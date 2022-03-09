import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import IPlaceData from "../IPlaceYaml";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface IPrecursorVaultYaml<L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<undefined, L, LT> { }