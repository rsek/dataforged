import { ChallengeRank , ClockSegments , MoveOutcome } from "@json_out/index.js";
import { MoveSelectionStrategy , SceneChallenge } from "@utils/simulation/SceneChallenge.js";
import Table from "cli-table";
import _ from "lodash-es";
import "colors";
import { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import type { IOutcomesNumbers } from "@utils/simulation/OutcomeWithNumbers.js";
import { faceDangerNew, faceDangerOld, SaAnew, SaAOld } from "@utils/simulation/moveData.js";


export interface SimSceneChallengeOptions {
  description: string,
  iterations?: number,
  rank?: ChallengeRank,
  segments?: ClockSegments,
  statFD?: number,
  statSAA?: number,
  add?: number,
  pc?: PlayerCharacter,
  SaAResultsData?: IOutcomesNumbers,
  FDResultsData?: IOutcomesNumbers
  strategy: MoveSelectionStrategy
}

/**
 *
 */
export function simulateSceneChallenges(
  { description: description, iterations= 20000, rank = ChallengeRank.Formidable, segments=ClockSegments.Six, statFD=2, statSAA=statFD+1, add=0, pc=new PlayerCharacter(), SaAResultsData=SaAnew, FDResultsData=faceDangerNew, strategy }:
  SimSceneChallengeOptions

) {
  const result = {
    description,
    iterations,
    rank,
    segments,
    statFD,
    statSAA,
    add,
    actionRolls: 0,
    "Strong Hit": 0,
    "Weak Hit": 0,
    Miss: 0,
  };
  for (let i = 0; i < iterations; i++) {
    const sim = new SceneChallenge(rank,0,0,segments).run({
      pc,
      strategy,
      FDResultsData,
      SaAResultsData,
      statFD,
      statSAA,
      add,
      log:false
    });
    const outcome = MoveOutcome[sim.outcome] as keyof typeof result;
    result.actionRolls += sim.actionRolls;
    result[outcome]++;
  }
  return result;
}

/**
 *
 * @param decimalToFormat
 * @param places
 */
function formatAsPercent(decimalToFormat: number, places: number=2) {
  return `${(decimalToFormat*100).toFixed(places)}%`;
}

/**
 * Renders scene challenge monte carlo simulations as
 * @param data
 */
export function renderSceneChallenges(data: ReturnType<typeof simulateSceneChallenges>[]) {
  const tbl = new Table({ colors:true, head: [ "Description".grey, "Rank".grey, "Clock".grey, "Bonus".grey, "Action rolls".grey, "Strong Hit".blue, "Weak Hit".magenta, "Miss".red, "Total".white ] });
  data.forEach(row => {
    tbl.push([
      row.description,
      ChallengeRank[row.rank],
      row.segments,
      `+${row.add+row.statFD}/+${row.add+row.statSAA}`,
      `${row.actionRolls} / avg ~${(row.actionRolls/row.iterations).toFixed(2)}`,
      `${row["Strong Hit"]} / ${formatAsPercent(row["Strong Hit"]/row.iterations)}`,
      `${row["Weak Hit"]} / ${formatAsPercent(row["Weak Hit"]/row.iterations)}`,
      `${row.Miss} / ${formatAsPercent(row.Miss/row.iterations)}`,
      row.iterations
    ]);
  } );
  console.log(tbl.toString());
}

const data = [
  simulateSceneChallenges({
    description: "Old (FD+2 only)",
    strategy: MoveSelectionStrategy.Simple,
    FDResultsData: faceDangerOld,
    SaAResultsData: SaAOld,
  }),
  simulateSceneChallenges({
    description: "Old (FD+2/SAA+3)",
    strategy: MoveSelectionStrategy.Alternate,
    statFD: 2,
    FDResultsData: faceDangerOld,
    SaAResultsData: SaAOld
  }),
  simulateSceneChallenges({
    description: "New (FD+2 only)",
    strategy: MoveSelectionStrategy.Simple,
    statFD: 2,
  }),
  simulateSceneChallenges({
    description: "New (FD+2/SAA+3)",
    strategy: MoveSelectionStrategy.Alternate,
    statFD: 2
  }),

  simulateSceneChallenges({
    description: "New (FD+2 only)",
    strategy: MoveSelectionStrategy.Simple,
    statFD: 2,
    segments: 4,
  }),
  simulateSceneChallenges({
    description: "New (FD+2/SAA+3)",
    strategy: MoveSelectionStrategy.Alternate,
    statFD: 2,
    segments: 4,
  }),
];

renderSceneChallenges(data);

