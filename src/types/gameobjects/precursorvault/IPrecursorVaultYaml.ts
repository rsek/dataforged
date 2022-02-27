import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import IPlaceData from "../IPlaceYaml";

export default interface IPrecursorVaultYaml<L extends Location | undefined, LT extends LocationTheme | undefined> extends IPlaceData<undefined, L, LT> { }