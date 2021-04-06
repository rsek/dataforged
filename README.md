# Dataforged

Starforged playtest rules data in JSON for use in community tools, because there's no use in duplicating labour on the data entry.

## Current Version/Sources

  * **Oracles-Preview-022821**
  * **Derelict-Precursor-Vault-Oracles-040521**
  * **Assets-Sheet-012421**
  * **Moves-Reference-030921** (move text, move-related oracles)
  * **Launching-Your-Campaign-112220** (setting Truth oracles, character creation prompt oracles)

## Recommended Usage
Due to this being playtest content, this repo is fairly unstable! As the game grows and evolves, I will almost certainly make changes in how it's organized. I recommend forking or otherwise copying this repo's contents rather than pulling from it directly.

## Oracle Tables

Square brackets in an oracle result represent a reference to another oracle, or a special result like "roll twice".

## A Note on Markdown

In the JSON files, I've used markdown to retain the formatting of the original rules text where possible. There's no standard markdown for underlining (which is typically reserved for links), so I've opted to use `__text__` to represent underlined text (which is what Discord uses), and `**text**` for bold text. Most MD implementations (including Github's) interpret `__text__` as bolded text, though.

This doesn't apply to `moves/moves.md`, which formats move references as inline links instead.

## Credits

Thanks to Shawn Tomkin for his excellent solo/co-op GM-less table-top role-playing games, [Starforged and Ironsworn](https://www.ironswornrpg.com/).

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for letting me use the data from [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as a starting point.
