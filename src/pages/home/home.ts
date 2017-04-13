import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Content, LoadingController, NavController, PopoverController} from 'ionic-angular';
import {IndexListData} from "../../models/IndexListData";
import {Remote} from "../../Services/Remote";
import {Local} from "../../Services/Local";
import {Category} from "../../models/Category";
import {MenuController} from 'ionic-angular';
import {Item} from "../../models/Item";
import {AddCartPage} from "../addCart/addCart";
import {ShoppingCartListener} from '../../interfaces/ShoppingCartListener'
import {BuyItem} from "../../models/BuyItem";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements ShoppingCartListener {

  model: Array<IndexListData> = new Array<IndexListData>();
  uuid = new Date().getTime();
  @ViewChild("content") content: Content;
  contentDom: HTMLElement;
  height: number;
  top: number;
  categories: Category[];
  width = window.screen.width
  footerHeight: number;
  infoHeight: number = 56;
  items: Item[] = new Array<Item>();
  loading = this.loadingCtrl.create({
    dismissOnPageChange: true,
    content: 'Please wait...'
  });
  itemCount: number = 0;
  sum: number = 0;
  bottomPopHeight: number = 500;
  buyItems: Category[];
  keyword: string = ""

  constructor(public navCtrl: NavController, public remote: Remote, public ref: ChangeDetectorRef, public menu: MenuController, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public local: Local) {
    //window.localStorage.clear()
    this.loading.present();
    remote.getCategory().then(res => {
      this.categories = res.data;
      this.getItems(this.categories[0], true);
      //loading.dismissAll()
    }).catch(res => {
      setTimeout(() => {
        this.loading.dismissAll()
      }, 1000)
    })

    for (let c = 65; c < 91; ++c) {
      let d = new IndexListData();
      d.name = String.fromCharCode(c) + String.fromCharCode(c + 1);
      d.displayName = String.fromCharCode(c) + String.fromCharCode(c + 1) + " Flower";
      d.id = new Date().getTime().toString() + c;
      d.normalPrice = 1000;
      d.largePrice = 2000;
      d.categoryName = "Type " + String.fromCharCode(c);

      this.model.push(d);
    }

    setTimeout(() => {
      let d = new IndexListData();
      d.name = "@!$!@%!@01";
      d.displayName = "@!$!@%!@01 Flower";
      d.id = new Date().getTime().toString() + "01";
      d.normalPrice = 1000;
      d.largePrice = 2000;
      d.categoryName = "Type #";
      this.model.push(d);
      d = new IndexListData();
      d.name = "@!$!@%!@02";
      d.displayName = "@!$!@%!@02 Flower";
      d.id = new Date().getTime().toString() + "02";
      d.normalPrice = 1000;
      d.largePrice = 2000;
      d.categoryName = "Type #";
      this.model.push(d);
      d = new IndexListData();
      d.name = "@!$!@%!@03";
      d.displayName = "@!$!@%!@03 Flower";
      d.id = new Date().getTime().toString() + "03";
      d.normalPrice = 1000;
      d.largePrice = 2000;
      d.categoryName = "Type #";
      this.model.push(d);
    }, 0)


  }

  onChange(buyItems: BuyItem[], operation: number, cartItems: Category[]) {
    this.buyItems = cartItems;
    this.itemCount = 0;
    this.sum = 0;
    for (let k in cartItems) {
      for (let j in cartItems[k].items) {
        this.itemCount += (cartItems[k].items[j].getBuyNormalCount() + cartItems[k].items[j].getBuyLargeCount())
        this.sum += (cartItems[k].items[j].getBuyNormalCount() * cartItems[k].items[j].normalPrice + cartItems[k].items[j].getBuyLargeCount() * cartItems[k].items[j].largePrice)
      }
    }
  }

  ionViewDidLoad() {
    this.onChange(null, null, this.local.getBuyItems());
    this.local.addShoppingCartListener(this)


  }

  ionViewWillUnload() {
    this.local.removeShoppingCartListener(this)
  }

  trackByFn(index, data) {
    return data.id;
  }

  ngAfterViewInit() {
    this.contentDom = document.getElementById("content" + this.uuid);
    this.top = document.getElementById("header" + this.uuid).offsetHeight;
    this.footerHeight = document.getElementsByTagName("ion-tabs")[0].firstElementChild['offsetHeight'];
    this.height = (window.innerHeight - document.getElementById("header" + this.uuid).offsetHeight - this.footerHeight) - this.infoHeight;
  }

  ngAfterViewChecked() {
    this.ref.detectChanges();
  }

  menuOpen(ev) {
    setTimeout(() => {
      this.content.scrollTo(0, 0);
    }, 2000)

  }

  menuClose(ev) {
    // this.ref.detectChanges();
  }


  openMenu() {
    this.menu.isOpen() == true ? this.menu.close() : this.menu.open();
  }

  openList() {
    if (document.getElementById("bottompopover" + this.uuid).className == '' || document.getElementById("bottompopover" + this.uuid).className == 'bottom-popover-hide') {
      document.getElementById("bottompopover" + this.uuid).className = 'bottom-popover-show'
    } else {
      document.getElementById("bottompopover" + this.uuid).className = 'bottom-popover-hide'
    }
  }

  getItems(k: Category, notShowLaoding: boolean = false) {

    if (notShowLaoding == false) {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
        content: 'Please wait...'
      });
      this.loading.present();
    }
    this.remote.getItemsByCategory(k.id, 0, 16 + Math.ceil(Math.random() * 10)).then(res => {
      this.items = res.data
      setTimeout(() => {
        this.loading.dismissAll()
      }, 1000)

    }).catch(res => {
      setTimeout(() => {
        this.loading.dismissAll()
      }, 1000)
    })
    this.menu.close()
  }


  filterModel() {
    if (this.keyword != "") {
      let model: Item[] = new Array<Item>();
      for (let k in this.items) {
        if (this.items[k].displayName.toLowerCase().indexOf(this.keyword.toLowerCase()) >= 0)
          model.push(this.items[k]);
      }
      return model
    } else {
      return this.items
    }
  }


  itemClick(data) {
    let item = new Item(data);
    let popover = this.popoverCtrl.create(AddCartPage, {item: item});
    popover.present({
      ev: null
    });

    console.log(data)
  }

  minusBuyNormalCount(buyItem: BuyItem) {
    buyItem.minusBuyNormalCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  addBuyNormalCount(buyItem: BuyItem) {
    buyItem.addBuyNormalCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  setBuyNormalCount(num: number, buyItem: BuyItem) {
    buyItem.setBuyNormalCount(num);
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  minusBuyLargeCount(buyItem: BuyItem) {
    buyItem.minusBuyLargeCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  addBuyLargeCount(buyItem: BuyItem) {
    buyItem.addBuyLargeCount();
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  setBuyLargeCount(num: number, buyItem: BuyItem) {
    buyItem.setBuyLargeCount(num);
    let r = new Array<BuyItem>();
    r.push(buyItem)
    this.local.putToShoppingCart(r, Local.MODIFY_SHOPPINGCART);
  }

  trackByFnCategory(index, model) {
    return model.id;
  }

  trackByFnItem(index, model) {
    return model.id;
  }

  check() {

  }

  search(key) {
    console.log(this.keyword)
  }

}
