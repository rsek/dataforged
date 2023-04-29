// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Dataforged
{
    [JsonConverter(typeof(ProgressTypeJsonConverter))]
    public enum ProgressType
    {
        /// <summary>
        /// A player's Bonds legacy track(Starforged ruleset only)
        /// </summary>
        BondsLegacy,

        /// <summary>
        /// A player's bonds progress track (Ironsworn ruleset only)
        /// </summary>
        BondsProgress,

        /// <summary>
        /// A combat progress track, started with Enter the Fray.
        /// </summary>
        CombatProgress,

        /// <summary>
        /// A connection progress track, started with Make a Connection
        /// (Starforged ruleset only)
        /// </summary>
        ConnectionProgress,

        /// <summary>
        /// A delve site progress track, started with Discover a Site (Ironsworn
        /// ruleset only)
        /// </summary>
        DelveProgress,

        /// <summary>
        /// A player's Discoveries legacy track(Starforged ruleset only)
        /// </summary>
        DiscoveriesLegacy,

        /// <summary>
        /// An expedition progress track, started with Undertake an Expedition
        /// (Starforged ruleset only)
        /// </summary>
        ExpeditionProgress,

        /// <summary>
        /// A journey progress track, started with Undertake a Journey
        /// (Ironsworn ruleset only)
        /// </summary>
        JourneyProgress,

        /// <summary>
        /// A player's Quests legacy track (Starforged ruleset only)
        /// </summary>
        QuestsLegacy,

        /// <summary>
        /// A scene challenge progress track.
        /// </summary>
        SceneChallengeProgress,

        /// <summary>
        /// A vow progress track, started with Swear an Iron Vow.
        /// </summary>
        VowProgress,
    }
    public class ProgressTypeJsonConverter : JsonConverter<ProgressType>
    {
        public override ProgressType Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            string value = JsonSerializer.Deserialize<string>(ref reader, options);
            switch (value)
            {
                case "bonds_legacy":
                    return ProgressType.BondsLegacy;
                case "bonds_progress":
                    return ProgressType.BondsProgress;
                case "combat_progress":
                    return ProgressType.CombatProgress;
                case "connection_progress":
                    return ProgressType.ConnectionProgress;
                case "delve_progress":
                    return ProgressType.DelveProgress;
                case "discoveries_legacy":
                    return ProgressType.DiscoveriesLegacy;
                case "expedition_progress":
                    return ProgressType.ExpeditionProgress;
                case "journey_progress":
                    return ProgressType.JourneyProgress;
                case "quests_legacy":
                    return ProgressType.QuestsLegacy;
                case "scene_challenge_progress":
                    return ProgressType.SceneChallengeProgress;
                case "vow_progress":
                    return ProgressType.VowProgress;
                default:
                    throw new ArgumentException(String.Format("Bad ProgressType value: {0}", value));
            }
        }

        public override void Write(Utf8JsonWriter writer, ProgressType value, JsonSerializerOptions options)
        {
            switch (value)
            {
                case ProgressType.BondsLegacy:
                    JsonSerializer.Serialize<string>(writer, "bonds_legacy", options);
                    return;
                case ProgressType.BondsProgress:
                    JsonSerializer.Serialize<string>(writer, "bonds_progress", options);
                    return;
                case ProgressType.CombatProgress:
                    JsonSerializer.Serialize<string>(writer, "combat_progress", options);
                    return;
                case ProgressType.ConnectionProgress:
                    JsonSerializer.Serialize<string>(writer, "connection_progress", options);
                    return;
                case ProgressType.DelveProgress:
                    JsonSerializer.Serialize<string>(writer, "delve_progress", options);
                    return;
                case ProgressType.DiscoveriesLegacy:
                    JsonSerializer.Serialize<string>(writer, "discoveries_legacy", options);
                    return;
                case ProgressType.ExpeditionProgress:
                    JsonSerializer.Serialize<string>(writer, "expedition_progress", options);
                    return;
                case ProgressType.JourneyProgress:
                    JsonSerializer.Serialize<string>(writer, "journey_progress", options);
                    return;
                case ProgressType.QuestsLegacy:
                    JsonSerializer.Serialize<string>(writer, "quests_legacy", options);
                    return;
                case ProgressType.SceneChallengeProgress:
                    JsonSerializer.Serialize<string>(writer, "scene_challenge_progress", options);
                    return;
                case ProgressType.VowProgress:
                    JsonSerializer.Serialize<string>(writer, "vow_progress", options);
                    return;
            }
        }
    }
}