/**
 * Created by zhuzhui on 2017/4/13.
 */
import {TabsPage} from '../pages/tabs/tabs';
import {OrderPage} from "../pages/order/order";
// import {CartPage} from "../pages/cart/cart";

export const Routes = {
  'Tabs': {
    page: TabsPage,
    params: {},
    options: {},
    done: null,
    url: '/tabs',
    root: true,
    enable: true,
    title: 'home'
  },
  'order': {
    page: OrderPage,
    url: '/order'
  },
}
