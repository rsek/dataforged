# Dataforged

Official *Ironsworn: Starforged* rules data in JSON, for use in community tools.

## Intent

This repository is intended to give [*Starforged*'s kickstarter](https://www.kickstarter.com/projects/shawntomkin/ironsworn-starforged) backers access to game data to incorporate into their own *Starforged* tools; it has been left public in the interest of keeping it easily accessible (and, frankly, will be of limited use without the complete text of the Backer Preview).

## Licensing

*Starforged* is currently under development, and this content is not yet licensed for non-personal use without explicit permission of [Shawn Tomkin](https://www.ironswornrpg.com/). Once *Starforged*'s development is complete and it is released, a permissive Creative Commons license for non-commercial and commercial projects will be attached to this content.

In other words: for the moment, treat it like you would excerpts from a copyrighted work; please include attribution (e.g. "Copyright ©2021 Shawn Tomkin and Absolute Tabletop, LLC") and a link back to the repository in your project... and drop a link in the [Ironsworn discord](https://discordapp.com/invite/6QMvmJb), because we're excited to see what you make with it!

## Recommended Usage

Due to this being preview content, this repo is fairly unstable! As the game grows and evolves, I will almost certainly make changes in how it's organized. I recommend forking or otherwise copying this repo's contents rather than pulling from it directly.

## Current Version/Sources

  * **Kickstarter Backer Preview - 050821** (all oracles, assets, and moves)

## TODO
  * NPC entries from backer preview
  * move glossary entries from backer preview
  * documentation of json keys and oracle meta-information

## Oracle Tables

Square brackets in an oracle result represent a special result like "Roll twice".

References to other oracle tables are prefixed with ▶️

## A Note on Markdown

In the JSON files, markdown is used to convey the formatting of the original rules text where possible. There's no standard markdown for underlining (which is typically reserved for links), so instead double underscores like `__text__` represents underlined text (which is what Discord uses), while `**text**` for bold text. Most MD implementations (including Github's) interpret `__text__` as bolded text, though.

This doesn't apply to `moves/moves.md`, which formats move references as inline links instead.

## Credits

Dataforged began as an unofficial personal project of [rsek](https://github.com/XenotropicDev) and continues to be maintained by them in its official capacity. Thanks to [XenotropicDev](https://github.com/XenotropicDev) for letting me use the data from [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as the nucleus of the original!
