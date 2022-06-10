import type { IDisplay, IDisplayWithTitle } from "@json_out/index.js";
/**
 * @internal
 */
export class Display implements IDisplay {
  Title?: string | undefined;
  Icon?: string | undefined;
  Images?: string[] | undefined;
  Color?: string | undefined;
  constructor({ Title, Icon, Images, Color }: IDisplay) {
    this.Title = Title;
    this.Icon = Icon;
    this.Images = Images;
    this.Color = Color;
  }
}
/**
 * @internal
 */
export class DisplayWithTitle extends Display implements IDisplayWithTitle {
  $id: string;
  Title!: string;
  Icon?: string | undefined;
  Images?: string[] | undefined;
  Color?: string | undefined;
  constructor({ parentId, Title, Icon, Images, Color }: Omit<IDisplayWithTitle, "$id"> & {parentId: string}) {
    super({
      Title, Icon, Images, Color
    });
    this.$id = parentId + "/Display";
  }
}