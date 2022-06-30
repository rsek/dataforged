import type { IDisplayOracle, IOracleBase, IOracleCategory, IRow } from "../index.js";
/**
 * Represents an oracle, which may have a Table or multiple child Oracles.
 *
 * If you're looking for a way to crawl the oracle hierarchy in search of a specific ID, see {@link IOracleBase}.
 *
 * @public
 */
export interface IOracle extends IOracleBase {
    /**
     * @pattern ^(Ironsworn|Starforged)/Oracles/[A-z_-]+((/[A-z_-]+)+)?$
     */
    $id: string;
    Display: IDisplayOracle;
    Category: IOracleCategory["$id"];
    "Member of"?: IOracle["$id"] | undefined;
    "Table"?: IRow[] | undefined;
    /**
     * @internal
     */
    Categories?: never;
}
//# sourceMappingURL=IOracle.d.ts.map