import {Item} from "../models/Item";
import {BuyItem} from "../models/BuyItem";
import {Category} from "../models/Category";
/**
 * Created by Lee on 2017/4/12.
 */

export interface ShoppingCartListener {
  onChange(buyItems: BuyItem[], operation: number, cartItems: Array<Category>);
}
