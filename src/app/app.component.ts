import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Amenity } from './amenity';
import { IData, MockData } from './data';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IFilter } from './filter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any}>;

  data: IData;

  filter: IFilter;

  sort: string;

  listActive: boolean;

  pageIcons = {
    'Map': 'home',
    'List': 'list-box'
  }

  filterIcons = {
    'All': 'baseball',
    'Picnic': 'pizza',
    'Shelter': 'umbrella',
    'Picnic Tables': 'cube',
    'Hiking': 'trending-up'
  }

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();

    this.data = new MockData();

    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    this.sort = "alphabetical";

    this.listActive = false;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.nav.push(this.pages[0].component, {data: this.data});
    });
  }

  applyFilter(filter) {
    this.filter = filter;
    this.data.SetFilterActive(filter);
    this.events.publish('filter:updated', filter);
  }

  applySort(sortOrder) {
    this.sort = sortOrder;
    this.events.publish('sort:updated', sortOrder);
  }

  openPage(page) {
    if(page.component == this.nav.getActive().component) { return; }
    this.listActive = page.component == ListPage;
    this.nav.setRoot(page.component, {data: this.data, filter: this.filter, sort: this.sort});
  }
}

@Component({
  selector: '<park-details-link>',
  template: 'hello'
})
export class ParkDetailsLink {
  constructor() {

  }
}
