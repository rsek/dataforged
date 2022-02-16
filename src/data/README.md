# Dataforged: Master Data

All of the JSON in Dataforged is built from the data in these YAML files. While YAML can be converted directly to JSON, these data should **not** be used as-is. The master data uses a different structure that exists solely to make data entry and maintenance more rsek-friendly; for instance, 2d arrays are used as a short hand for tables, and there's several YAML references used throughout that will only work if the correct files are concatencated *before* the YAML is deserialized to a JSON object. The build process applies several data transformations to render the final JSON output.

You can safely ignore these files if you're just here for the JSON data. This format may be deprecated after the game releases (and content no longer requires frequent updates).