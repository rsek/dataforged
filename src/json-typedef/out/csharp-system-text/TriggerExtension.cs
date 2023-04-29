// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Dataforged
{
    /// <summary>
    /// Extends or upgrades an existing move trigger.
    /// </summary>
    [JsonConverter(typeof(TriggerExtensionJsonConverter))]
    public abstract class TriggerExtension
    {
    }

    public class TriggerExtensionJsonConverter : JsonConverter<TriggerExtension>
    {
        public override TriggerExtension Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var readerCopy = reader;
            var tagValue = JsonDocument.ParseValue(ref reader).RootElement.GetProperty("roll_type").GetString();

            switch (tagValue)
            {
                case "action_roll":
                    return JsonSerializer.Deserialize<TriggerExtensionActionRoll>(ref readerCopy, options);
                case "progress_roll":
                    return JsonSerializer.Deserialize<TriggerExtensionProgressRoll>(ref readerCopy, options);
                default:
                    throw new ArgumentException(String.Format("Bad RollType value: {0}", tagValue));
            }
        }

        public override void Write(Utf8JsonWriter writer, TriggerExtension value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value, value.GetType(), options);
        }
    }
}