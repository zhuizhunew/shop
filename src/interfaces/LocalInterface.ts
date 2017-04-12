import {BuyItem} from "../models/BuyItem";
import {Response} from "../models/Response";
import {ShoppingCartListener} from "./ShoppingCartListener";
import {Item} from "../models/Item";
import {Category} from "../models/Category";
/**
 * Created by Lee on 2017/4/12.
 */

export interface LocalInterface {

  getUserId(): string;

  putToShoppingCart(buyItems: BuyItem[], operation: number): void;

  getShoppingCart(): object;

  addShoppingCartListener(shoppingCartListener: ShoppingCartListener);

  removeShoppingCartListener(shoppingCartListener: ShoppingCartListener);

  getBuyItemFromItem(k: Item): BuyItem;

  getBuyItems(): Array<Category>;

}
