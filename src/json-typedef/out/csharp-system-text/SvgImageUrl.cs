// Code generated by jtd-codegen for C# + System.Text.Json v0.2.1

using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Datasworn
{
    /// <summary>
    /// A relative URL pointing to a vector image in the SVG format.
    /// </summary>
    [JsonConverter(typeof(SvgImageUrlJsonConverter))]
    public class SvgImageUrl
    {
        /// <summary>
        /// The underlying data being wrapped.
        /// </summary>
        public string Value { get; set; }
    }

    public class SvgImageUrlJsonConverter : JsonConverter<SvgImageUrl>
    {
        public override SvgImageUrl Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return new SvgImageUrl { Value = JsonSerializer.Deserialize<string>(ref reader, options) };
        }

        public override void Write(Utf8JsonWriter writer, SvgImageUrl value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize<string>(writer, value.Value, options);
        }
    }
}
