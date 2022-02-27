import _ from "lodash";
import OracleCategory from "../types/oracles/classes/OracleCategory";
import buildOracles from './buildOracles';


export function buildOracleHash(): _.Dictionary<OracleCategory> {
  const oracleTree = buildOracles();
  let idHash = _.keyBy(oracleTree, (oracleCat) => oracleCat.$id);

  Object.values(idHash).forEach(oracleCat => {
    if (oracleCat.Categories) {
      oracleCat.Categories.forEach(oracleSubcat => {
        idHash[oracleSubcat.$id] = oracleSubcat;
      });
    }
  });
  idHash = _.keyBy(_.sortBy(idHash, (item) => item.$id), item => item.$id);

  // oracleTree.forEach(oracleCat => {
  //   idHash[oracleCat.Id] = oracleCat;
  //   oracleCat.Categories.forEach(oracleSubcat => {
  //     idHash[oracleSubcat.Id] = oracleSubcat;
  //   });
  // });
  return idHash;
}
