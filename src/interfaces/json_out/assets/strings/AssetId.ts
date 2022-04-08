import type { AssetTypeId } from "@dataforged/interfaces/json_out/index.js";

type AssetId = `${AssetTypeId} / ${string}`;

export { AssetId };

