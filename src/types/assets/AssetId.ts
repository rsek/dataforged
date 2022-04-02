import type AssetTypeId from "./AssetTypeId.js";

type AssetId = `${AssetTypeId} / ${string}`; export default AssetId;

