import { ChallengeRank , ClockSegments , MoveOutcome } from "@json_out/index.js";
import { SceneChallenge } from "@utils/simulation/SceneChallenge.js";
import Table from "cli-table";
import _ from "lodash-es";
import "colors";

/**
 *
 */
export function simulateSceneChallenges(
  { iterations= 20000, rank = ChallengeRank.Formidable, segments=ClockSegments.Six, stat=2, add=0 }:
  {iterations?: number, rank?: ChallengeRank, segments?: ClockSegments, stat?: number, add?: number}

) {
  const result = {
    iterations,
    rank,
    segments,
    stat,
    add,
    actionRolls: 0,
    "Strong Hit": 0,
    "Weak Hit": 0,
    Miss: 0,
  };
  for (let i = 0; i < iterations; i++) {
    const sim = new SceneChallenge(rank,0,0,segments).simulate({
      stat,add,log:false
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
  const tbl = new Table({ colors:true, head: [ "Rank".grey, "Clock".grey, "Bonus".grey, "Action rolls".grey, "Strong Hit".blue, "Weak Hit".magenta, "Miss".red, "Total".white ] });
  data.forEach(row => {
    tbl.push([
      ChallengeRank[row.rank],
      row.segments,
      `+${row.add+row.stat}`,
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
  simulateSceneChallenges({ rank: ChallengeRank.Formidable, segments: ClockSegments.Eight }),
  simulateSceneChallenges({ rank: ChallengeRank.Formidable, segments: ClockSegments.Six }),
  simulateSceneChallenges({ rank: ChallengeRank.Formidable, segments: ClockSegments.Four }),
  simulateSceneChallenges({ rank: ChallengeRank.Dangerous, segments: ClockSegments.Eight }),
  simulateSceneChallenges({ rank: ChallengeRank.Dangerous, segments: ClockSegments.Six }),
  simulateSceneChallenges({ rank: ChallengeRank.Dangerous, segments: ClockSegments.Four }),
];

renderSceneChallenges(data);

