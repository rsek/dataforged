# Dataforged key documentation
(not yet complete)
## Assets
* Abilities
  * Text
  * Enabled: . default to 'false'
  * Move: asset enables a unique move; this is structured in the same way as a
  * Alternate stats: asset enables using alternate stats in certain moves
    * Trigger: an additional trigger condition 
    * Moves: an array of moves; if undefined, it can be used with any 

* Stat: most of those are self explanatory but there's some special cases.
  * Asset Track: refers to whatever the asset has keyed to `Track`. only used by assets, naturally.
  * Command Vehicle Integrity: the Integrity of the PC Command Vehicle. in Starforged this is generally the Starship asset.
    * the Rover asset has a special case
  * Vehicle Integrity: 