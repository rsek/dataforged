
import t from 'ts-runtime/lib';
import { IAttributeBase, AttributeKey, IRequireBase } from "../GameObjectAttribute";

enum Leadership {
  Anarchist = "Anarchist",
  DisputedLeadership = "Disputed leadership",
  AuthoritarianDictatorship = "Authoritarian dictatorship",
  OligarchicalElite = "Oligarchical elite",
  DynasticLineage = "Dynastic lineage",
  FatedOrProphesiedLeader = "Fated or prophesied leader",
  ClanChiefsOrElders = "Clan chiefs or elders",
  ElectedRepresentatives = "Elected representatives",
  MachineIntelligence = "Machine intelligence",
  VariedDecentralized = "Varied / decentralized",
}
export default Leadership;

export interface IAttributeLeadership extends IAttributeBase<Leadership> {
  Key: AttributeKey.Leadership;
}

export interface IRequireLeadership extends IRequireBase<IAttributeLeadership> { }