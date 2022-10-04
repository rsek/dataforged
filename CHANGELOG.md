# Changelog

## 2.0

### Breaking changes

* object properties are now `snake_case` (lower cased separated by underscores) rather than inconsistently applied title case with spaces
  * **important:** this is very serious breaking change. in fact it will break pretty much **everything**!
  * **also note:** ID maps (e.g. hash objects) and/or functions will be provided to make the conversion easier
  * 1.5.0 will remain available, of course, so you can make the migration in your own time (or never, if you decide it's not worth it)
  * **but why do this at all?**
    * prose labels were nice for readability, but at this point it's more useful if it fits more neatly with one of the *de facto* standards for JSON schema (the other option being `camelCase`). in other words - many languages expect data in this shape anyways
    * `snake_case` also has the advantage of lining up with the changes to IDs, below
    * coinciding with other breaking changes means folks only have to make the migration once. so while it'll be something of a chore now, i reckon this is the **least** crappy time to do it
* significant changes to composition of `$id`s
  * IDs are now *lower case* with underscores, to make them friendly to as many environments as possible
  * asset abilities follow he same principle as e.g. oracle tables, and don't bother to note their most important child element's prop name (abilities for assets, table rows for oracle tables)
    * example: `starforged/assets/companion/sidekick/abilities/1` has become `starforged/assets/companion/sidekick/1`
* a new constant, `LEGACY_ID_MAP`, is now exported for use with Dataforged. it's a plain object, where the keys are the current ID and the values are the corresponding legacy ID.
  * currently, this is a quick-and-dirty implementation, but my plan is to include most or all IDs at release to make conversion as painless as possible
* major restructuring of internal and external interface/class names and their organization
  * public interfaces (the bulk of dataforged's API) are no longer prefixed with "I". example: `IEncounter` is now `Encounter`
  * internal builder classes are now suffixed with "Builder"
  * internal interfaces for generating YAML schemas are now prefixed with "YAML"
* many arrays of named objects (including oracles, moves, assets, etc) are now instead represented with keyed objects
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
