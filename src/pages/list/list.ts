import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { IFilter } from '../../app/filter';
import { IData } from '../../app/data';
import { Park } from '../../app/park';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public Filter: IFilter;
  public Data: IData;
  public Parks: Array<Park>;
  public Sort: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    this.Filter = navParams.get('filter');
    this.Data = navParams.get('data');
    this.Sort = navParams.get('sort');
    this.Parks = this.ListParks();

    events.subscribe('filter:updated', (filter) => {
      this.Filter = filter;
      this.Parks = this.ListParks();
    });

    events.subscribe('sort:updated', (sort) => {
      this.Sort = sort;
      this.Parks = this.ListParks();
    });
  }

  public ListParks(): Array<Park> {
    var parks = new Array<Park>();
    if(typeof(this.Filter) == 'undefined') {
      parks = this.Data.GetParks();
    } else {
      parks = this.Filter.Filter(this.Data.GetParks());
    }

    switch(this.Sort) {
      case 'alphabetical':
        parks.sort((a, b) => (a.Name < b.Name ? -1 : 1));
    }

    return parks;
  }

  SetActivePark(park: Park) {
    this.Data.ActivePark = park;
  }
}
