// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Datasworn
{
    public class ImpactCategory
    {
        [JsonPropertyName("contents")]
        public IDictionary<string, ImpactRule> Contents { get; set; }

        [JsonPropertyName("description")]
        public MarkdownString Description { get; set; }

        [JsonPropertyName("name")]
        public Label Name { get; set; }
    }
}