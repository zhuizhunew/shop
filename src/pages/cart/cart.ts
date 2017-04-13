import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {Local} from "../../Services/Local";
import {BuyItem} from "../../models/BuyItem";
import {Category} from "../../models/Category";
import {Router} from 'emiya-ionic2-router';

/*
 Generated class for the Cart page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {

  // standardNumber = 5;
  // standardNumber2 = 50;
  // standardNumber3 = 2;
  // biggerNumber = 1;
  // biggerNumber2 = 11;
  // biggerNumber3 = 6;
  cart_data = [
    {
      id: '1',
      product: '菲斯娜',
      sub: [
        {
          id: '11',
          name: '柔丝华恋（粉玉）',
          standard_num: 5,
          standard_price: 10,
          bigger_num: 1,
          bigger_price: 20
        }
      ]
    },
    {
      id: '2',
      product: '婵丝',
      sub: [
        {
          id: '21',
          name: '爱意缠绵（大红）',
          standard_num: 2,
          standard_price: 15,
          bigger_num: 8,
          bigger_price: 25
        },
        {
          id: '22',
          name: '繁花盛宴（粉红）',
          standard_num: 5,
          standard_price: 20,
          bigger_num: 6,
          bigger_price: 30
        },
      ]
    }
  ];
  total_amount = 0;
  total_price = 0;

  cart_data2 = [];
  itemCount = 0;
  sum = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              private local: Local, private router: Router) {
    this.refresh();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CartPage');
    console.log(this.local.getBuyItems());
    // this.cart_data2 = this.local.getBuyItems();
    this.onChange(null, null, this.local.getBuyItems());
    this.local.addShoppingCartListener(this)
  }

  onChange(cart_data2: BuyItem[], operation: number, cartItems: Category[]) {
    this.cart_data2 = cartItems;
    this.itemCount = 0;
    this.sum = 0;
    for (let k in cartItems) {
      for (let j in cartItems[k].items) {
        this.itemCount += (cartItems[k].items[j].getBuyNormalCount() + cartItems[k].items[j].getBuyLargeCount())
        this.sum += (cartItems[k].items[j].getBuyNormalCount() * cartItems[k].items[j].normalPrice + cartItems[k].items[j].getBuyLargeCount() * cartItems[k].items[j].largePrice)
      }
    }
  }

  normalIncrement(buyItem: BuyItem) {
    buyItem.addBuyNormalCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  normalDecrement(buyItem: BuyItem) {
    buyItem.minusBuyNormalCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  largeDecrement(buyItem: BuyItem) {
    buyItem.minusBuyLargeCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  largeIncrement(buyItem: BuyItem) {
    buyItem.addBuyLargeCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  removeNormal(num: number, buyItem: BuyItem) {

    buyItem.setBuyNormalCount(num);
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  removeLarge(num: number, buyItem: BuyItem) {
    buyItem.setBuyLargeCount(num);
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  goCheck() {
    this.router['push']('order');
  }

  goHome() {
    var node = document.getElementsByClassName('show-tabbar')[0].childNodes[1];
    node['click']();
  }

  delete2(num1, obj1) {
    let alert = this.alertCtrl.create({
      message: '确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.removeNormal(num1, obj1);
            this.removeLarge(num1, obj1);
          }
        },
        {
          text: ' 取消',
          handler: () => {
            console.log('cancel')
          }
        }
      ]
    });
    alert.present();
  }

  delete(obj) {
    // console.log(obj.slice(0, 1));
    // console.log(this);
    let index = obj.slice(0, 1) - 1;
    // if (index == this.cart_data.length) {
    //   index = index - 1;
    // }
    for (let i = 0; i < this.cart_data.length; i++) {
      for (let j = 0; j < this.cart_data[i].sub.length; j++) {
        if (this.cart_data[i].sub[j].id == obj) {
          index = i;
          break
        }
      }
    }
    // console.log(index);
    let sub_index = obj.slice(1, 2) - 1;
    // console.log(this.cart_data[index]);
    // console.log(this.cart_data[index].sub[sub_index]);
    let alert = this.alertCtrl.create({
      message: '确认删除吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            // this.cart_data = [];
            if (this.cart_data[index].sub.length == 1) {
              this.cart_data.splice(index, 1);
              this.refresh();
            } else {
              this.cart_data[index].sub.splice(sub_index, 1);
              this.refresh();
            }
          }
        },
        {
          text: ' 取消',
          handler: () => {
            console.log('cancel')
          }
        }
      ]
    });
    alert.present();
  }

  getAmount() {
    for (let i = 0; i < this.cart_data.length; i++) {
      for (let j = 0; j < this.cart_data[i].sub.length; j++) {
        this.total_amount = this.total_amount + this.cart_data[i].sub[j].standard_num + this.cart_data[i].sub[j].bigger_num;
        this.total_price = this.total_price + this.cart_data[i].sub[j].standard_num * this.cart_data[i].sub[j].standard_price +
          this.cart_data[i].sub[j].bigger_num * this.cart_data[i].sub[j].bigger_price;
      }
    }
  }

  refresh() {
    this.total_amount = 0;
    this.total_price = 0;
    this.getAmount();
  }

}
