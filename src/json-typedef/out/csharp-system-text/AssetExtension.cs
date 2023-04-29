// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Dataforged
{
    /// <summary>
    /// Describes changes applied to an asset by its own abilities or controls.
    /// Unchanged properties are omitted.
    /// </summary>
    public class AssetExtension
    {
        [JsonPropertyName("attachments")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public AssetExtensionAttachments Attachments { get; set; }

        /// <summary>
        /// Use the same key as the original control. Currently, only condition
        /// meters may be extended in this way.
        /// </summary>
        [JsonPropertyName("controls")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public IDictionary<string, AssetExtensionControl> Controls { get; set; }

        [JsonPropertyName("count_as_impact")]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public bool? CountAsImpact { get; set; }
    }
}