import { ChallengeRank } from "../generic/ChallengeRank";
import { MdString } from "../generic/MdString";
import { ISource } from "../generic/Source";

export interface IEncounter {
  Name: string;
  Nature: string;
  Summary: string;
  Source: ISource;
  Rank: ChallengeRank;
  Features: string[];
  Drives: string[];
  Tactics: string[];
  Variants: Partial<IEncounter>[];
  Description: MdString;
  "Quest Starter": MdString;
}