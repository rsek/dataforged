import assetsSF from "./starforged/assets.json" assert { type: "json" };
import encountersSF from "./starforged/encounters.json" assert { type: "json" };
import movesSF from "./starforged/moves.json" assert { type: "json" };
import oraclesSF from "./starforged/oracles.json" assert { type: "json" };
import truthsSF from "./starforged/truths.json" assert { type: "json" };
import assetsIS from "./ironsworn/assets.json" assert { type: "json" };
import encountersIS from "./ironsworn/encounters.json" assert { type: "json" };
import movesIS from "./ironsworn/moves.json" assert { type: "json" };
import oraclesIS from "./ironsworn/oracles.json" assert { type: "json" };
// import truthsIS from "./ironsworn/truths.json" assert {type: "json"};
const starforged = {
    assets: assetsSF,
    encounters: encountersSF,
    moves: movesSF,
    oracles: oraclesSF,
    truths: truthsSF,
};
const ironsworn = {
    assets: assetsIS,
    encounters: encountersIS,
    moves: movesIS,
    oracles: oraclesIS,
};
export { starforged, ironsworn };
