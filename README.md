# Dataforged

*Ironsworn: Starforged* playtest rules data in JSON for use in community tools, because there's no use in duplicating labour on the data entry.

## Recommended Usage
Due to this being preview content, this repo is fairly unstable! As the game grows and evolves, I will almost certainly make changes in how it's organized. I recommend forking or otherwise copying this repo's contents rather than pulling from it directly.

## Current Version/Sources

  * **Kickstarter Backer Preview - 042721** (all oracles and assets)
  * **Moves-Reference-040521** (move text - needs an update still!)

## TBA
  * NPC entries from backer preview
  * move glossary entries from backer preview
  * documentation of json keys and oracle meta-information

## Oracle Tables

Square brackets in an oracle result represent a special result like "roll twice".

References to other oracle tables are prefixed with ▶️

## A Note on Markdown

In the JSON files, I've used markdown to retain the formatting of the original rules text where possible. There's no standard markdown for underlining (which is typically reserved for links), so I've opted to use `__text__` to represent underlined text (which is what Discord uses), and `**text**` for bold text. Most MD implementations (including Github's) interpret `__text__` as bolded text, though.

This doesn't apply to `moves/moves.md`, which formats move references as inline links instead.

## Credits

Thanks to Shawn Tomkin for his excellent solo/co-op GM-less table-top role-playing games, [Starforged and Ironsworn](https://www.ironswornrpg.com/).

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for letting me use the data from [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as a starting point.
