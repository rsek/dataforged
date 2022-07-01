<h1 align="center">Dataforged v{{ pkg.version }}</h1>
<!-- TODO: add logo template -->

{{ template:badges }}

{{ template:description }}

## Projects that use Dataforged

* [Stargazer](https://nboughton.uk/apps/stargazer/), the official PWA for playing *Ironsworn: Starforged* solo
* The official [Roll20 sheet for *Ironsworn: Starforged*](https://github.com/aureyia/roll20-character-sheets)
* The [*Ironsworn* and *Ironsworn: Starforged* sheet for Foundry VTT](https://github.com/ben/foundry-ironsworn)
* [TheOracle](https://github.com/XenotropicDev/TheOracle), a general-purpose discord bot for playing *Ironsworn* and *Ironsworn: Starforged*
* [Starforged-Sectors](https://github.com/Ferretsroq/Starforged-Sectors), a discord bot for generating *Ironsworn: Starforged* sectors
* [*Ironsworn* and *Ironsworn: Starforged* templates for Obsidian](https://github.com/grimborg/obsidian-ironsworn)
* ...and maybe yours? Tell us about it in the [*Ironsworn* discord](https://discordapp.com/invite/6QMvmJb)!

## Usage

Consult the [API Documentation for further information](https://rsek.github.io/dataforged).

### NodeJS
If you're working in Javascript or Typescript, Dataforged is best consumed as a NodeJS package:

```shell-script
npm i dataforged
```
```shell-script
yarn add dataforged
```

Typescript typings are included; use of VSCode or an IDE to expose the type annotations in your workspace is highly recommended. See also the [API documentation site](https://rsek.github.io/dataforged).

If you just want the data as-is, import the `starforged` object to use the pre-loaded, typed JSON.

#### ESM

```javascript
import { starforged } from 'dataforged'
```

#### CommonJS

```javascript
const { starforged } = require('dataforged')
```

### Other Languages
Packages for other languages/package managers are a work in progress. For now, you can use the JSON files in  [`dist/starforged`](dist/starforged). `dataforged.json` contains all game data in a single object; `schema.json` describes its JSON schema.

## Current Content Version/Sources

* ***Ironsworn: Starforged Reference Guide* - 050622**
  * moves
  * oracles
  * setting truths
  * encounters
* ***Ironsworn: Starforged* Assets - 050622**
  * assets

## Licensing

Items in this package (and its GitHub source) various fall under the CC BY 4.0, CC BY-NC 4.0, or MIT licenses. See [LICENSE.md](LICENSE.md) for details.

## Contributors

Dataforged began as an unofficial personal project of [rsek](https://github.com/rsek) and continues to be maintained by them in its official capacity.

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for allowing me to use [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as the nucleus of the original!
