# Dataforged

Starforged playtest rules data for use in community tools, because there's no use in duplicating labour on the data entry.

Currently just JSON and a markdown doc of formatted moves, other formats TBA.

## Current Version/Sources

  * **Oracles-Preview-091420**
  * **Assets-Sheet-012421**
  * **Moves-Reference-012521** (move text, move-related oracles)
  * **Launching-Your-Campaign-112220** (setting Truth oracles, character creation prompt oracles)

## Semantic vs. Programmatic Versions
Most of the JSON data is formatted to reflect the semantics of the information (as opposed to practical use right out of the box). Since I can't predict what they'll be used for (and pretty much anyone using them will need to edit them to some extent), the idea is that the data should be logical and human-readable so that they're easy to reformat.

Some files have a "programmatic" version, with information formatted in arrays.

## Oracle Tables

Square brackets in an oracle result represent a reference to another oracle, or a special result like "roll twice".

## A Note on Markdown

I've used markdown to retain the formatting of the original rules text where possible. There's no standard markdown for underlining (which is typically reserved for links), so I've opted to use `__text__` to represent underlined text (which is what Discord uses), and `**text**` for bold text. Most MD implementations (including Github's) interpret `__text__` as bolded text, though.

## Credits

Thanks to Shawn Tomkin for his excellent solo/co-op GM-less table-top role-playing games, [Starforged and Ironsworn](https://www.ironswornrpg.com/).

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for letting me use the data from [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as a starting point.
