import { Component, ViewChild, NgZone } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Amenity } from './amenity';
import { IData, MockData } from './data';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IFilter, NoFilter } from './filter';
import { AboutPage } from '../pages/about/about';

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

  locationKnown: boolean;

  hideExtra: boolean;

  pageIcons = {
    'Map': 'navigate',
    'List': 'list-box',
    'About': 'help'
  }

  filterIcons = {
    'All': 'done-all',
    'Picnic': 'pizza',
    'Shelter': 'umbrella',
    'Picnic Tables': 'cube',
    'Hiking': 'trending-up'
  }

  constructor(public zone: NgZone, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {
    this.initializeApp();

    this.data = new MockData();

    this.pages = [
      { title: 'Map', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'About', component: AboutPage }
    ];

    this.sort = "alphabetical";

    this.listActive = false;

    this.hideExtra = true;

    this.locationKnown = false;

    this.zone = new NgZone({ enableLongStackTrace: false });

    this.data.SetFilterActive(this.data.GetTopFilters()[0]);
  }

  requestLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.events.publish('userlocation:updated', position);
      this.locationKnown = true;
    });
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

  isPageActive(page) {
    return this.nav.getActive() && this.nav.getActive().component === page.component;
  }

  toggleHideExtra() {
    this.hideExtra = !this.hideExtra;
  }

  reset() {
    this.hideExtra = true;
    this.applyFilter(this.data.GetTopFilters()[0]);
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
