import type { ClockSegments } from "@json_out";
import { ChallengeRank , MoveOutcome } from "@json_out";
import { FD_ironsworn, FD_may20, SaA_ironsworn, SaA_may20 } from "@utils/simulation/moveData.js";
import type { NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";
import { OutcomeEffectType } from "@utils/simulation/NumericOutcomes.js";
import { PlayerCharacter } from "@utils/simulation/PlayerCharacter.js";
import { ProgressStrategy } from "@utils/simulation/ProgressStrategy";
import { SceneChallenge } from "@utils/simulation/SceneChallenge.js";
import type { PartialBy } from "@utils/types/PartialBy.js";
import Table from "cli-table";
import pkg from "colors";
const { white, blue, bold, dim, grey, magenta, red } = pkg;
import _ from "lodash-es";

export interface SimSceneChallengeOptions {
  id: string,
  rank: ChallengeRank,
  segments: ClockSegments,
  SaAResultsData: NumericOutcomes, NumericOutcomes,  FDResultsData: INumericOutcomes
  strategy: ProgressStrategy
  statFD?: number,
  statSAA?: number,
  add?: number,
  iterations?: number,
  pc?: PlayerCharacter,
}

/**
 *
 */
export function simulateSceneChallenges(
  { id, iterations= 20000, rank, segments, statFD=2, statSAA=statFD+1, add=0, strategy, pc=new PlayerCharacter({ strategy: strategy === ProgressStrategy.Momentum ? [ OutcomeEffectType.markProgress, OutcomeEffectType.momentum, OutcomeEffectType.add ] : [ OutcomeEffectType.markProgress, OutcomeEffectType.add, OutcomeEffectType.momentum ] }), SaAResultsData, FDResultsData }:
  SimSceneChallengeOptions

) {
  const result = {
    id,
    iterations,
    rank,
    segments,
    statFD,
    statSAA,
    add,
    strategy,
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
      statSaA: statSAA,
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
 * Renders scene challenge monte carlo simulations
 * @param data
 */
export function renderSceneChallenges(data: ReturnType<typeof simulateSceneChallenges>[]) {
  const tbl = new Table({
    colors:true,
    head: [
      ...[
        "Description",
        "Rank",
        "🕙",
        "Strategy",
        "FD",
        "SaA",
      ].map(header => grey(header)),
      white("Action rolls (avg)"),
      blue("SH"),
      blue("SH %"),
      magenta("WH"),
      magenta("WH %"),
      red("Miss"),
      red("Miss %"),
    ].map(hdr => bold(hdr))
  });
  data.forEach(row => {
    const FDBonus = `+${row.add+row.statFD}`;
    let SaABonus = `+${row.add+row.statSAA}`;
    if (row.strategy === ProgressStrategy.Progress) {
      grey(SaABonus = dim("n/a"));
    }
    tbl.push([
      row.id,
      ChallengeRank[row.rank],
      row.segments,
      ProgressStrategy[row.strategy],
      FDBonus,
      SaABonus,
      // Action roll count
      `${row.actionRolls} (~${(row.actionRolls/row.iterations).toFixed(2)})`,
      // strong hits
      blue(`${row["Strong Hit"]}`),
      blue(`${formatAsPercent(row["Strong Hit"]/row.iterations)}`).padStart(6),
      // weak hits
      magenta(`${row["Weak Hit"]}`),
      magenta(`${formatAsPercent(row["Weak Hit"]/row.iterations)}`).padStart(6),
      // misses

      red(`${row["Miss"]}`),
      red(`${formatAsPercent(row["Miss"]/row.iterations)}`).padStart(6),
    ]);
  } );
  console.log(tbl.toString());
}

/**
 * Generates simulation parameters for every combination of the provided ranks, segmentRanges, and strategies.
 */
function generateSimParams({ ranks, segmentRange, strategies, id, iterations, SaAResultsData, FDResultsData }: { ranks: ChallengeRank[]; segmentRange: ClockSegments[]; strategies: ProgressStrategy[]; id: string; iterations: number; SaAResultsData: NumericOutcomes; FDResultsData: NumericOutcomes; }): SimSceneChallengeOptions[] {
  const paramStub: PartialBy<SimSceneChallengeOptions, "rank"|"segments"|"strategy"> = {
    id,
    iterations,
    SaAResultsData,
    FDResultsData,
  };
  const byRank = ranks.map(rank => {
    const newStub = _.clone(paramStub);
    newStub.rank = rank;
    return newStub;
  });
  const bySegments = segmentRange.map(segments => {
    return byRank.map(item => {
      const newStub = _.clone(item);
      newStub.segments = segments;
      return newStub;
    });
  }).flat(2);
  const byStrategy = strategies.map(strategy => {
    return bySegments.map(item => {
      const newStub = _.clone(item);
      newStub.strategy = strategy;
      return newStub;
    });
  }).flat(2)  as SimSceneChallengeOptions[];
  return byStrategy.sort((a,b) => a.rank - b.rank);
};

const iterations = 20000;

const may20simParams: SimSceneChallengeOptions[] = generateSimParams({
  ranks: [ ChallengeRank.Troublesome, ChallengeRank.Dangerous,ChallengeRank.Formidable ],
  segmentRange: [4],
  strategies: [ ProgressStrategy.Progress, ProgressStrategy.Adds,ProgressStrategy.Momentum ],
  id: "May 20",
  SaAResultsData: SaA_may20,
  FDResultsData: FD_may20,
  iterations
});

const ironswornSimParams: SimSceneChallengeOptions[] = generateSimParams({
  ranks: [ ChallengeRank.Troublesome, ChallengeRank.Dangerous,ChallengeRank.Formidable ],
  segmentRange: [4],
  strategies: [ ProgressStrategy.Progress, ProgressStrategy.Adds,ProgressStrategy.Momentum ],
  id: "Ironsworn",
  SaAResultsData: SaA_ironsworn,
  FDResultsData: FD_ironsworn,
  iterations
});

const simsToRun = [ ironswornSimParams,may20simParams ];

simsToRun.forEach(item => {
  console.log(`Running simulations (${iterations} iterations each)...`);
  const simResult = item.map(data => simulateSceneChallenges(data));
  renderSceneChallenges(simResult);
});

