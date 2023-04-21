import { Stat } from "@json_out/index.js";
import _ from "lodash-es";

/**
 * Generates a random stat array for an Ironsworn PC.
 */

export function randomizeStats(statArray: [number, number, number, number, number] = [3, 2, 2, 1, 1]): Record<Stat, number> {
  const result: Record<Stat, number> = {
    [Stat.Edge]: 0,
    [Stat.Heart]: 0,
    [Stat.Iron]: 0,
    [Stat.Shadow]: 0,
    [Stat.Wits]: 0,
  };
  _.shuffle([Stat.Edge, Stat.Heart, Stat.Iron, Stat.Shadow, Stat.Wits]).forEach((stat, index) => {
    result[stat] = statArray[index];
  });
  return result;
}
