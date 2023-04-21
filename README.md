<!-- ⚠️ This README has been generated from the file(s) "./src/templates/blueprint.md" ⚠️--><h1 align="center">Dataforged v2.0.0-2</h1>
<p align="center">
		<a href="https://www.npmjs.com/package/dataforged"><img alt="undefined" src="https://img.shields.io/npm/v/dataforged?logo=npm" height="20"/></a>
<a href="https://www.npmjs.com/package/dataforged"><img alt="undefined" src="https://img.shields.io/npm/dm/dataforged?logo=npm" height="20"/></a>
<a href="https://discordapp.com/invite/6QMvmJb"><img alt="Join the Ironsworn Discord" src="https://img.shields.io/discord/437120373436186625?color=%235865F2&label=Ironsworn%20Discord&logo=discord&logoColor=white" height="20"/></a>
<a href="https://www.reddit.com/r/Ironsworn/"><img alt="Visit the r/Ironsworn subreddit" src="https://img.shields.io/reddit/subreddit-subscribers/ironsworn?style=social" height="20"/></a>
	</p>

<p align="center">
  <b>Official content and rules data for the Ironsworn: Starforged tabletop role-playing game, formatted as JSON for use in community tools. 🚀 Includes JSON schemas and a Javascript/Typescript API.</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#whats-this-all-about-anyways)

## What's this all about, anyways?

*Ironsworn: Starforged* is a tabletop role-playing game that's playable in solo, co-op (GM-less), and guided (GMed) modes.

> In *Ironsworn: Starforged*, you are a spaceborne hero sworn to undertake perilous quests. You will explore uncharted space, unravel the secrets of a mysterious galaxy, and build bonds with those you meet on your travels. Most importantly, you will swear iron vows and see them fulfilled—no matter the cost.

For more information on *Ironsworn: Starforged* itself, check out [the website](https://getstarforged.com/).

The Dataforged repo exists to provide the Creative Commons-licensed text and image content of *Ironsworn: Starforged*, so that you--an intrepid developer with excellent taste in indie TTRPGs--don't need to do data entry for the game's 200+ oracle tables, 90 asset cards, 56 moves, and 14 setting truth categories, and 24 example encounters.

Use it as source material to build a personal reference wiki, a play aid, a discord bot, or module for your favourite VTT, or something that nobody else has imagined yet. [Be sure to check out some of the projects that use Dataforged below](#projects-that-use-dataforged).

Dataforged may be useful to you even if you aren't developing something for *Ironsworn: Starforged* specifically: the overwhelming majority of its d% oracle tables are system agnostic, so they might be used for any generator or other TTRPG tool with a sci-fi/space opera flavour.

Now, go forth and make something cool! 🚀 And be sure to tell us about it on the [*Ironsworn* Discord](https://discordapp.com/invite/6QMvmJb) and the [*Ironsworn* subreddit](https://www.reddit.com/r/Ironsworn/) so we can see what you've done with the data!


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#projects-that-use-dataforged)

## Projects that use Dataforged

* [Stargazer](https://nboughton.uk/apps/stargazer/), the official PWA for playing *Ironsworn: Starforged* solo
* The official [Roll20 sheet for *Ironsworn: Starforged*](https://github.com/aureyia/roll20-character-sheets)
* The [*Ironsworn* and *Ironsworn: Starforged* sheet for Foundry VTT](https://github.com/ben/foundry-ironsworn)
* [TheOracle](https://github.com/XenotropicDev/TheOracle), a general-purpose discord bot for playing *Ironsworn* and *Ironsworn: Starforged*
* [Starforged-Sectors](https://github.com/Ferretsroq/Starforged-Sectors), a discord bot for generating *Ironsworn: Starforged* sectors
* [*Ironsworn* and *Ironsworn: Starforged* templates for Obsidian](https://github.com/grimborg/obsidian-ironsworn)
* [Rolo Ludo](https://code.tupale.co/Offray/RoloLudo),  a set of tools to connect JSON oracles with the [502Lab wiki](https://mutabit.com/repos.fossil/502Lab/uv/wiki/502Lab.html) to facilitate translations
* ...and maybe yours? Tell us about it in the [*Ironsworn* discord](https://discordapp.com/invite/6QMvmJb)!


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#usage)

## Usage

Consult the [API Documentation for further information](https://rsek.github.io/dataforged).

### NodeJS
If you're working in Javascript or Typescript, Dataforged is best consumed as a NodeJS package:
```bash
npm i dataforged
```
```bash
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


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#current-content-versionsources)

## Current Content Version/Sources

* ***Ironsworn: Starforged Reference Guide* - 050622**
  * moves
  * oracles
  * setting truths
  * encounters
* ***Ironsworn: Starforged* Assets - 050622**
  * assets


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#licensing)

## Licensing

Items in this package (and its GitHub source) various fall under the CC BY 4.0, CC BY-NC 4.0, or MIT licenses. See [LICENSE.md](LICENSE.md) for details.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/cloudy.png)](#contributors)

## Contributors

Dataforged began as an unofficial personal project of [rsek](https://github.com/rsek) and continues to be maintained by them in its official capacity.

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for allowing me to use [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as the nucleus of the original!
