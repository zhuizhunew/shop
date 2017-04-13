import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Local} from "../../Services/Local";
import {Router} from 'emiya-ionic2-router';

/*
 Generated class for the Order page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  cash = true;
  newValue = 10;
  order_data = [];
  sum = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private local: Local, private router: Router) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
    this.order_data = this.local.getBuyItems();
    for (let k in this.order_data) {
      for (let j in this.order_data[k].items) {
        this.sum += (this.order_data[k].items[j].getBuyNormalCount() * this.order_data[k].items[j].normalPrice + this.order_data[k].items[j].getBuyLargeCount() * this.order_data[k].items[j].largePrice)
      }
    }
  }

  submit() {
    console.log(this.newValue);
  }

  goBack() {
    this.router['popSafe']();
  }
}
