/**
 * Names of non-player condition meters (for e.g. companions and vehicles) that are referenced by moves and other assets.
 * If an asset condition meter can be used in this manner, the alias is included in its Aliases array.
 * @public
 */
export var MeterAlias;
(function (MeterAlias) {
    MeterAlias["CompanionHealth"] = "Companion Health";
    MeterAlias["VehicleIntegrity"] = "Vehicle Integrity";
    MeterAlias["CommandVehicleIntegrity"] = "Command Vehicle Integrity";
    MeterAlias["SupportVehicleIntegrity"] = "Support Vehicle Integrity";
    MeterAlias["IncidentalVehicleIntegrity"] = "Incidental Vehicle Integrity";
})(MeterAlias || (MeterAlias = {}));
