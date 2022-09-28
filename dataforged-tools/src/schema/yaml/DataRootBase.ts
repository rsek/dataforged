import { DelveRarity, DelveSiteDomain, DelveSiteTheme, EncounterNatureClassic, IronlandsRegion, MoveCategory, OracleSet, TruthClassic, TruthStarforged, YamlDelveRarity, YamlDelveSiteDomain, YamlDelveSiteTheme, YamlEncounterNature, YamlEncounterStarforged, YamlIronlandsRegion, YamlMoveCategory, YamlTruthClassic, YamlTruthStarforged } from '@schema';
import { YamlOracleSets } from './common/YamlDataRoot';



export interface DataRootBase extends Record<string, { [key: string]: unknown; } | undefined> {
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Encounters: { [key: string]: YamlEncounterStarforged | EncounterNatureClassic; } | { [key: string]: YamlEncounterStarforged | YamlEncounterNature; };
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'Move categories': { [key: string]: MoveCategory; } | { [key: string]: YamlMoveCategory; };
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'Setting truths': { [key: string]: TruthStarforged | TruthClassic; } | { [key: string]: YamlTruthStarforged | YamlTruthClassic; };
  /**
   * @patternProperties ^[A-Z][A-z '-]+$
   */
  'Ironlands regions'?: { [key: string]: IronlandsRegion; } | { [key: string]: YamlIronlandsRegion; } | undefined;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'Delve site themes'?: { [key: string]: DelveSiteTheme; } | { [key: string]: YamlDelveSiteTheme; } | undefined;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'Delve site domains'?: { [key: string]: DelveSiteDomain; } | { [key: string]: YamlDelveSiteDomain; } | undefined;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  Rarities?: { [key: string]: DelveRarity; } | { [key: string]: YamlDelveRarity; } | undefined;
  /**
   * @patternProperties ^[A-Z][a-z '-]+$
   */
  'Oracle sets': { [key: string]: OracleSet; } | YamlOracleSets;
}
