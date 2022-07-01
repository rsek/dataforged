# Dataforged

Official *Ironsworn: Starforged* rules data in JSON, for use in community tools.

## Usage

Best consumed as a Node package: `npm i dataforged` or `yarn add dataforged`. Typescript typings are included; use of VSCode or an IDE to expose the type annotations in your workspace is highly recommended. See also the [documentation site](https://rsek.github.io/dataforged/).

If you just want the data as-is, import the `starforged` object to use the pre-loaded, typed JSON.

### ESM

```javascript
import { starforged } from 'dataforged'
```

### CommonJS

```javascript
const { starforged } = require('dataforged')
```

## Current Content Version/Sources

  * ***Ironsworn: Starforged Rulebook* - 050622**
    * moves
    * oracles
    * setting truths
    * encounters
  * ***Ironsworn: Starforged* Assets - 050622**
    * assets

## Licensing

The game content originating in the JSON/YAML files is licensed under the [Creative Commons 4.0 License](https://creativecommons.org/licenses/by/4.0/).

The code (typings, and build utilities that live in this repo but not the NPM package) is licensed uner the MIT license.

If you use this package, please drop a link to your project in the [Ironsworn discord](https://discordapp.com/invite/6QMvmJb), because we're excited to see what you make with it!

## Credits

Dataforged began as an unofficial personal project of [rsek](https://github.com/rsek) and continues to be maintained by them in its official capacity.

Thanks to [XenotropicDev](https://github.com/XenotropicDev) for allowing me to use [TheOracle](https://github.com/XenotropicDev/TheOracle) (a Discord bot for use with Ironsworn and Starforged) as the nucleus of the original!
