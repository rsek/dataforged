//License: MIT
import type { IHasDescription, IHasName, IHasSource, IHasSummary , IRow } from "@json_out/index.js";
/**
 * @public
 */
export interface IDelve extends IHasName, IHasSource, IHasSummary, IHasDescription {
  Features: IRow[];
  Dangers: IRow[];
}
/**
 * @public
 */
export interface IDelveRow<F extends number, C extends number> extends IRow {
  Floor: F;
  Ceiling: C;
}

/**
 * @public
 */
export interface IDelveDomain extends IDelve {
  Features: [
    IDelveRow<21, 43>,
    IDelveRow<44, 56>,
    IDelveRow<57, 64>,
    IDelveRow<65, 68>,
    IDelveRow<69, 72>,
    IDelveRow<73, 76>,
    IDelveRow<77, 80>,
    IDelveRow<81, 84>,
    IDelveRow<85, 88>,
    IDelveRow<89, 98>,
    IDelveRow<99, 99>,
    IDelveRow<100, 100>,
  ];
  Dangers: [
    IDelveRow<31, 33>,
    IDelveRow<34, 36>,
    IDelveRow<37, 39>,
    IDelveRow<40, 42>,
    IDelveRow<43, 45>,
  ]
}
/**
 * @public
 */
export interface IDelveTheme extends IDelve {
  Features: [
    IDelveRow<1, 4>,
    IDelveRow<5, 8>,
    IDelveRow<9, 12>,
    IDelveRow<13, 16>,
    IDelveRow<17, 20>,
  ],
  Dangers: [
    IDelveRow<1, 5>,
    IDelveRow<6, 10>,
    IDelveRow<11, 12>,
    IDelveRow<13, 14>,
    IDelveRow<15, 16>,
    IDelveRow<17, 18>,
    IDelveRow<19, 20>,
    IDelveRow<21, 22>,
    IDelveRow<23, 24>,
    IDelveRow<35, 26>,
    IDelveRow<27, 28>,
    IDelveRow<29, 30>,
  ]
}