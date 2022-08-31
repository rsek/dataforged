# Changelog

## Breaking changes

* "Health" on companion cards is now termed "Companion health"
* Breaking changes to the `Name` key, which has been removed. in its place is `Title`, an object which provides a "canonical", "standard", and "short" version of the item's title. items which can't rightly be said to have a title of their own, like asset inputs receive `Label` (a string) instead.
* provided titles for Ironsworn ritual moves (so their IDs may have changed)
*

## Other changes
* `Source` now includes a `License` property, containing a URL pointing to the relevant license.
* everything that has a localizable string descendent (direct or otherwise) now has an `$id`


## New content
### Starforged
* Sundered Isles preview of the Kraken asset added
### Ironsworn preview content
* Ironlands region entries (with a **lot** of link annotation)
* Ironlands encounter entries (ditto)
* Ironlands setting truths
* Delve site themes and domains