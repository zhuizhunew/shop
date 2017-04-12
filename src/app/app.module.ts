import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AddCartPage} from '../pages/addCart/addCart';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {IndexList} from '../components/index-list/index-list'
import {HttpModule} from "@angular/http";
import {Remote} from '../Services/Remote'
import {Local} from '../Services/Local'

@NgModule({
  declarations: [
    MyApp,
    AddCartPage,
    ContactPage,
    HomePage,
    TabsPage,
    IndexList
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddCartPage,
    ContactPage,
    HomePage,
    TabsPage,
    IndexList
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Remote,
    Local
  ]
})
export class AppModule {
}
