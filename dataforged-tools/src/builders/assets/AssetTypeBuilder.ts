import { AssetBuilder, DisplayBuilder, SourceInheritorBuilder, TitleBuilder } from "@builders";
import type { Asset , AssetType, AssetUsage, Display, Game, Source, Title, YamlAssetType } from "@schema";
import { formatId } from "@utils";
import _ from "lodash-es";

/**
 * @internal
 */
export class AssetTypeBuilder extends SourceInheritorBuilder implements AssetType {
  $id: AssetType["$id"];
  Title: Title;
  Aliases?: string[] | undefined;
  Description: string;
  Assets: Asset[];
  Display: Display;
  Usage: AssetUsage;
  constructor(json: YamlAssetType, game: Game, rootSource: Source) {
    super(json.Source ?? {}, rootSource);
    const fragment = json._idFragment ?? json.Title.Short ?? json.Title.Standard ?? json.Title.Canonical;
    this.$id = formatId(fragment,game,"Assets");
    this.Aliases = json.Aliases;
    this.Description = json.Description;

    this.Display = new DisplayBuilder({
      Color: json.Display?.Color
    });

    this.Title = new TitleBuilder(json.Title,this);

    const usage = _.clone(json.Usage ?? {}) as AssetUsage;
    if (!usage.Shared) {
      usage.Shared = false;
    }
    this.Usage = usage;
    this.Assets = _.map(json.Assets,asset => new AssetBuilder(asset, game, this, rootSource));
  }
}

