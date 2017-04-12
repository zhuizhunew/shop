import {LocalInterface} from "../interfaces/LocalInterface";
import {BuyItem} from "../models/BuyItem";
import {Response} from "../models/Response";
import {Utils} from 'emiya-js-utils';
import {Injectable} from "@angular/core";
import {ShoppingCartListener} from "../interfaces/ShoppingCartListener";
import {Item} from "../models/Item";
import {Category} from "../models/Category";
/**
 * Created by Lee on 2017/4/12.
 */

@Injectable()
export class Local implements LocalInterface {

  public static ADD_TO_SHOPPINGCART: number = 0;
  public static REMOVE_FROM_SHOPPINGCART: number = 1;
  public static MODIFY_SHOPPINGCART: number = 2;
  public static CLEAR_SHOPPINGCART: number = 2;
  private static LOCAL_SHOPPINGCART_KEY: string = 'shoppingCart';
  private shoppingCartListeners: ShoppingCartListener[] = new Array<ShoppingCartListener>();

  getUserId(): string {
    return "Emiya";
  }

  private getLocalShoppingCartKey(): string {
    return Local.LOCAL_SHOPPINGCART_KEY + "_" + this.getUserId();
  }

  putToShoppingCart(buyItems: BuyItem[], operation: number): void {

    let cart: any = window.localStorage.getItem(this.getLocalShoppingCartKey());
    if (cart != null) {
      cart = JSON.parse(cart);
    } else {
      cart = {};
    }

    let changed: boolean = false;

    if (operation == Local.ADD_TO_SHOPPINGCART) {
      for (let k in buyItems) {
        changed = true;
        if (!Utils.notNullStrAndObj(cart[buyItems[k].categoryId])) {
          cart[buyItems[k].categoryId] = {}
        }

        let category = cart[buyItems[k].categoryId];

        if (!Utils.notNullStrAndObj(category[buyItems[k].id])) {
          category[buyItems[k].id] = buyItems[k];
        } else {
          category[buyItems[k].id]._buyNormalCount += buyItems[k]['_buyNormalCount'];
          category[buyItems[k].id]._buyLargeCount += buyItems[k]['_buyNormalCount'];
        }

        if (category[buyItems[k].id]._buyNormalCount <= 0 && category[buyItems[k].id]._buyLargeCount <= 0) {
          delete category[buyItems[k].id];
        } else {
          if (category[buyItems[k].id]._buyNormalCount < 0) {
            category[buyItems[k].id]._buyNormalCount = 0
          } else if (category[buyItems[k].id]._buyLargeCount < 0) {
            category[buyItems[k].id]._buyLargeCount = 0
          }
        }

      }
    } else if (operation == Local.MODIFY_SHOPPINGCART) {
      for (let k in buyItems) {
        changed = true;
        if (!Utils.notNullStrAndObj(cart[buyItems[k].categoryId])) {
          cart[buyItems[k].categoryId] = {}
        }

        let category = cart[buyItems[k].categoryId];

        category[buyItems[k].id] = buyItems[k];

        if (category[buyItems[k].id]._buyNormalCount <= 0 && category[buyItems[k].id]._buyLargeCount <= 0) {
          delete category[buyItems[k].id];
        } else {
          if (category[buyItems[k].id]._buyNormalCount < 0) {
            category[buyItems[k].id]._buyNormalCount = 0
          } else if (category[buyItems[k].id]._buyLargeCount < 0) {
            category[buyItems[k].id]._buyLargeCount = 0
          }
        }

      }
    } else if (operation == Local.REMOVE_FROM_SHOPPINGCART) {
      for (let k in buyItems) {
        changed = true;
        if (!Utils.notNullStrAndObj(cart[buyItems[k].categoryId])) {
          continue;
        }

        let category = cart[buyItems[k].categoryId];

        if (Utils.notNullStrAndObj(category[buyItems[k].id])) {
          delete category[buyItems[k].id];
        }

      }
    } else if (operation == Local.CLEAR_SHOPPINGCART) {
      cart = {}
    }

    if (changed == true) {
      window.localStorage.setItem(this.getLocalShoppingCartKey(), JSON.stringify(cart));
      setTimeout(() => {
        this.notifyShoppingCartListener(buyItems, operation);
      })

    }

  }

  private notifyShoppingCartListener(data: BuyItem[], operation: number) {
    for (let k in this.shoppingCartListeners) {
      try {
        this.shoppingCartListeners[k].onChange(data, operation,this.getBuyItems());
      } catch (e) {
        console.error("Emiya", e);
      }
    }
  }


  public addShoppingCartListener(shoppingCartListener: ShoppingCartListener) {
    if (this.shoppingCartListeners.indexOf(shoppingCartListener) < 0)
      this.shoppingCartListeners.push(shoppingCartListener);
  }

  public removeShoppingCartListener(shoppingCartListener: ShoppingCartListener) {
    if (this.shoppingCartListeners.indexOf(shoppingCartListener) >= 0) {
      this.shoppingCartListeners.slice(this.shoppingCartListeners.indexOf(shoppingCartListener), 1)
    }
  }

  getShoppingCart(): object {
    let cart: any = window.localStorage.getItem(this.getLocalShoppingCartKey());
    if (cart != null) {
      cart = JSON.parse(cart);
    } else {
      cart = {};
    }

    return cart;

  }

  getBuyItemFromItem(k: Item): BuyItem {

    let cart: any = this.getShoppingCart();

    let result = null, buyItem: BuyItem;

    for (let j in cart) {
      if (j == k.categoryId) {
        result = cart[j];
        break;
      }
    }


    if (result != null) {
      let found: boolean = false;
      for (let j in result) {
        if (j == k.id) {
          result = result[j];
          found = true;
          break;
        }
      }

      if (found == true) {
        buyItem = new BuyItem();
        buyItem.init(result);
        buyItem.update(k);
      } else {
        buyItem = new BuyItem(k);
      }

    } else {
      buyItem = new BuyItem(k);
    }

    return buyItem

  }


  getBuyItems(): Array<Category> {
    let cart: any = this.getShoppingCart();
    let r = new Array<Category>();
    for (let k in cart) {
      let category = new Category();
      category.id = k;
      for (let j in cart[k]) {
        let buyItem = new BuyItem();
        buyItem.init(cart[k][j]);
        category.items.push(buyItem);
        category.name = buyItem.categoryName;
      }
      if (category.items.length > 0)
        r.push(category);
    }

    return r;

  }


}
