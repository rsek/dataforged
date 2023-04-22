import type { IDelveCard, IDelveDomain, IDelveTheme } from "@json_out/index.js";
import type { PartialBy } from "@utils/index.js";

/**
 * @internal
 */
export interface IDelveCardYaml extends PartialBy<Omit<IDelveCard, "$id">, "Display"|"Source"> { }

/**
 * @internal
 */
export interface IDelveDomainYaml extends IDelveCardYaml {
  /**
   * {@inheritDoc IDelveDomain.Features}
   */
  Features: [
    IDelveDomain["Features"][0],
    IDelveDomain["Features"][1],
    IDelveDomain["Features"][2],
    IDelveDomain["Features"][3],
    IDelveDomain["Features"][4],
    IDelveDomain["Features"][5],
    IDelveDomain["Features"][6],
    IDelveDomain["Features"][7],
    IDelveDomain["Features"][8],
  ]
  Dangers: IDelveDomain["Dangers"]
}

/**
 * @internal
 */
export interface IDelveThemeYaml extends IDelveCardYaml {
  Features: IDelveTheme["Features"]
  Dangers: IDelveTheme["Dangers"]
}