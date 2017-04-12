import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Local} from "../../Services/Local";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  id = this.navParams.get('id');
  cart = this.local.getShoppingCart();

  constructor(public navCtrl: NavController, public navParams: NavParams, public local: Local) {

  }

}
