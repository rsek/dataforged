# Dataforged

Official *Ironsworn: Starforged* rules data in JSON, for use in community tools.

## Intent

This repository is intended to give [*Starforged*'s Kickstarter](https://www.kickstarter.com/projects/shawntomkin/ironsworn-starforged) backers access to game data to incorporate into their own *Starforged* tools; it has been left public in the interest of keeping it easily accessible (and, frankly, will be of limited use without the complete text of the Backer Preview).

## Usage

Best consumed as a Node package: `npm i dataforged` or `yarn add dataforged`. Typescript typings are included; use of VSCode or an IDE to expose the type annotations in your workspace is highly recommended. See also the [documentation site](https://rsek.github.io/dataforged/).

If you just want the data as-is, import its `starforged` object to use the pre-loaded, typed JSON.

### ESM

```javascript
import { starforged } from 'dataforged'
```

### CommonJS

CommonJS support is still experimental.

```javascript
const { starforged } = require('dataforged')
```

## Licensing

*Starforged* is currently under development, and this content is not yet licensed for non-personal use without explicit permission of [Shawn Tomkin](https://www.ironswornrpg.com/). Once *Starforged*'s development is complete and it is released, a permissive Creative Commons license for non-commercial and commercial projects will be attached to this content.

In other words: for the moment, treat it like you would excerpts from a copyrighted work; please include attribution (e.g. "Copyright ©2021 Shawn Tomkin and Absolute Tabletop, LLC") and a link back to the repository in your project... and drop a link in the [Ironsworn discord](https://discordapp.com/invite/6QMvmJb), because we're excited to see what you make with it!

<!--
### Legacy Format
Dataforged is migrating to a new format that is incompatible with the original format; the format had accumulated an awful lot of cruft, as it was carried over from Datasworn and wasn't designed with Starforged in mind. Features of the new format:

  * pre-generated `$id` keys for most important objects
  * wherever practical, it uses the game's terminology to name keys. For instance, the old table row key `Description` is now `Result`, while `Details` has been renamed `Summary`.
  * explicitly defines many values that were previously left to be inferred (for instance, the bottom end of a roll's range is now included)
  * detailed information on how to render tables (for instance, whether it should be displayed as a column of another table)
  * the typescript interfaces I use for internal typechecking can be found in the `src` directory; they aren't quite 'drop-in' at the moment, but might save you some time if you're writing in typescript (and can be converted to C# with little difficulty)

The migration will also make it much easier for me to add some future features:
  * every CC-licensable icon in the game
  * 'drop-in' interfaces for Typescript and C# (and possibly other languages)
  * making Dataforged available as a cross-referenced SQlite DB
  * making all of Dataforged available in markdown files
  * Dataforged-compatible Ironsworn data
  * eventually, a `dataforged-community-content` repo, to make it easy for developers to include such content in their projects

I **strongly** recommend migrating existing projects to the new format, especially if you want prompt content updates.

If you need JSON in the old format, it can be found in the `legacy` directory. The legacy folder will eventually be updated to reflect the game at release, but for the time being will lag behind content updates as I focus on refining the new format; feedback on that front is appreciated. -->

## Current Version/Sources

  * ***Ironsworn: Starforged Rulebook* - 040122**
    * moves
    * oracles
    * setting truths
    * encounters
  * ***Ironsworn: Starforged* Assets - 033122**
    * assets

## Credits

Dataforged began as an unofficial personal project of [rsek](https://github.com/rsek) and continues to be maintained by them in its official capacity.

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for allowing me to use [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as the nucleus of the original!
