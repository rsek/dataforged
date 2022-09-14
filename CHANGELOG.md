# Changelog

## 2.0

### Breaking changes

* `Name` key removed (as it was trying to do too many jobs). in its place is `Title`, an object which provides a `Canonical`, `Standard`, and `Short` version of the item's title. items which can't rightly be said to have a title of their own, like asset inputs receive `Label` (a string) instead.
* "Health" on companion assets is now labelled "companion health"
* "Integrity" on vehicle cards is now labelled "vehicle integrity"
* internal references to stats are now lowercase rather than title case. all of these are reflected in enums, so if you're already using those, you should be set!
  * examples:
    * "Shadow" is now "shadow" (enum: `Stat`)
    * "Health" is now "health" (enum: `PlayerConditionMeter`)
* provided titles for Ironsworn ritual moves (so their IDs may have changed)
* the URIs `Image` and `Icons` are now relative to the root directory rather than pretending that the relative url is somehow useful ;)
    * old: `../../img/vector/Oracles/Creature/Environment/Space.svg`
    * new: `img/vector/Oracles/Creature/Environment/Space.svg`
* complete overhaul of oracle table display data -- see `IOracle.Display.Columns`
* roll templates (see `IRowTemplate`) now demarcate strings to be replaced with `{{Oracle_Id}}` rather than `${{Oracle_Id}}`. Admittedly, this is a bit arbitrary, and is mainly so that internal JSON template replacement when Dataforged builds from YAML uses a replacement demarcation distinct from roll templates. example:
  * old: `"${{Starforged/Oracles/Factions/Affiliation}} of the ${{Starforged/Oracles/Factions/Legacy}} ${{Starforged/Oracles/Factions/Identity}}"`
  * new: `"{{Starforged/Oracles/Factions/Affiliation}} of the {{Starforged/Oracles/Factions/Legacy}} {{Starforged/Oracles/Factions/Identity}}"`
* restructure of IOracle + IOracleCategory into `IOracleTable` and `IOracleSet`
  * "leaf" nodes (ones with a "Table") key are now always `IOracleTable`
  * "branch" nodes (ones that previously had "Oracles" or "Categories") are now `IOracleSet`
    * `IOracleSet.Sets` is an array of any `IOracleSet` children belonging to that set.
    * `IOracleSet.Tables` is an array of any `IOracleTable` children belonging to that oracle set.
  * to make this new scheme consistent, some oracle objects have been re-organized, and may have new IDs
* for `IOracleSet` and `IOracleTable`, `Category` and `Member of` are now replaced by a single array called `Ancestors`, which contains the string IDs of every `IOracleSet` from which the item descends

### Other API changes
* `Source` now includes a `License` property, containing a URI pointing to the relevant license.
* everything that has a localizable string descendent (direct or otherwise) now has an `$id`
* `IOracleBase` (and its descendants, `IOracle` and `IOracleCategory`) may now have `Summary` in addition to `Description`. `Summary` is for providing a brief summary of the article (a couple sentences tops), while `Description` includes more detailed information (often multiple paragraphs).

### Fixes
* Fixed incorrect data in many `IMoveOutcomes` (and asset `IAlterMoveOutcomes`) due to a janky build script

### New content
#### Starforged
* Sundered Isles preview of the Kraken asset
#### Ironsworn preview content
* Ironlands region entries (with a **lot** of link annotation)
* Ironlands encounter entries (ditto)
* Ironlands setting truths
* Delve site themes and domains