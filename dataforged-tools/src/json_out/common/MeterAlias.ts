/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export enum MeterAlias {
  Attached_Asset_Meter = "attached asset meter",
  CompanionHealth = "companion health",
  VehicleIntegrity = "vehicle integrity",
  CommandVehicleIntegrity = "command vehicle integrity",
  SupportVehicleIntegrity = "support vehicle integrity",
  IncidentalVehicleIntegrity = "incidental vehicle integrity"
}