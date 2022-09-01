# Changelog

## 2.0

### Breaking changes

* `Name` key removed (as it was trying to do too many jobs). in its place is `Title`, an object which provides a "canonical", "standard", and "short" version of the item's title. items which can't rightly be said to have a title of their own, like asset inputs receive `Label` (a string) instead.
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

### Other changes
* `Source` now includes a `License` property, containing a URL pointing to the relevant license.
* everything that has a localizable string descendent (direct or otherwise) now has an `$id`

### New content
#### Starforged
* Sundered Isles preview of the Kraken asset
#### Ironsworn preview content
* Ironlands region entries (with a **lot** of link annotation)
* Ironlands encounter entries (ditto)
* Ironlands setting truths
* Delve site themes and domains