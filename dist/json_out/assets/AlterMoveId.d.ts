import type { AssetAbilityIdBase } from "./AssetAbilityId.js";
import type { Gamespace } from "../common/Gamespace.js";
import type { MoveIdBase, MoveIdGenericBase } from "../moves/MoveId.js";
export declare type AlterMoveId = `${Gamespace}/${AlterMoveIdBase}`;
export declare type AlterMoveIdBase = `${AssetAbilityIdBase}/Alter_${MoveIdBase | MoveIdGenericBase}`;
//# sourceMappingURL=AlterMoveId.d.ts.map