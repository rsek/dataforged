// import LegacyOracleCategory from "../classes/legacy/LegacyOracleCategory";
// import { IOracleCategory } from "../classes/oracles/OracleCategory";
// import writeJson from "./writeJSON";
// import { PathLike } from "fs";
// import { IronswornYaml } from "./buildDataforged";


// export default function buildDataforgedLegacy(pathOut: PathLike = "./", ironswornData: IronswornData): LegacyOracleCategory[] {
//   let legacyData = ironswornData.oracles.map(oracleCat => new LegacyOracleCategory(oracleCat));
//   writeJson("./legacy/oracles.json", legacyData);
//   return legacyData;
// }