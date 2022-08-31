import { formatIdFragment } from "./toIdFragment.js";
/**
 * Assembles a path-like oracle ID from a stack of the oracle and its ancestor objects.
 * @param ancestors - The ancestor objects of this oracle.
 * @returns
 */
export function buildOracleId(gamespace, ...ancestors) {
    const idParts = ancestors.reverse().map((item) => formatIdFragment(item._idFragment ?? item.Title.Short ?? item.Title.Standard ?? item.Title.Canonical));
    const id = [gamespace, "Oracles", ...idParts].join("/");
    return id;
}
//# sourceMappingURL=buildOracleId.js.map