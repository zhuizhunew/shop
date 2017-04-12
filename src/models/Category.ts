import {Item} from "./Item";
import {BuyItem} from "./BuyItem";
/**
 * Created by Lee on 2017/4/11.
 */

export class Category {
  public id: string;
  public name: string;
  public items: BuyItem[] = new Array<BuyItem>();
}
