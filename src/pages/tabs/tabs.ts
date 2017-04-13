import {Component} from '@angular/core';

import {AddCartPage} from '../addCart/addCart';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {CartPage} from '../cart/cart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
