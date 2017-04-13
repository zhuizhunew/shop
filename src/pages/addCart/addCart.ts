import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {Local} from "../../Services/Local";
import {Remote} from "../../Services/Remote";
import {Item} from "../../models/Item";
import {BuyItem} from "../../models/BuyItem";

@Component({
  selector: 'page-addCart',
  templateUrl: 'addCart.html'
})
export class AddCartPage {
  item: Item;
  buyItem: BuyItem = new BuyItem();
  uuid = new Date().getTime()
  normalInput: HTMLElement;
  largeInput: HTMLElement;
  //= JSON.parse(this.navParams.get('item'));
  cart: any = this.local.getShoppingCart();


  constructor(public navCtrl: NavController, public navParams: NavParams, public local: Local, public remote: Remote, public viewCtrl: ViewController) {

    //this.remote.getItemsByCategory("A", 0, 1).then(res => {
    //console.log(res.data)
    //this.item = res.data[0];
    this.item = new Item(this.navParams.get('item'));
    this.buyItem = this.local.getBuyItemFromItem(this.item)
    //console.log(this.cart)
    //})

  }

  ngAfterViewInit() {
    this.normalInput = document.getElementById("normal" + this.uuid);
    this.normalInput.oninput = () => {
      this.buyItem.setBuyNormalCount(parseInt(this.normalInput['value']))
    }

    this.largeInput = document.getElementById("large" + this.uuid);
    this.largeInput.oninput = () => {
      this.buyItem.setBuyLargeCount(parseInt(this.largeInput['value']))
    }


  }

  getBuyItem(k: Item): BuyItem {
    let result = null, buyItem: BuyItem;

    for (let j in this.cart) {
      if (j == k.categoryId) {
        result = this.cart[j];
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

  buy() {
    // console.log(123);
    let r = new Array<BuyItem>();
    r.push(this.buyItem);
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART)
    this.viewCtrl.dismiss()
  }

}
