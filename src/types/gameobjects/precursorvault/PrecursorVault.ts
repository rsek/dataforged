import Location from "../place/Location";
import LocationTheme from "../place/LocationTheme";
import Place from "../Place";

export default interface PrecursorVault<L extends Location | undefined, LT extends LocationTheme | undefined> extends Place<undefined, L, LT> { }