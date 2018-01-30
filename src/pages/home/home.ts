import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { Map, TileLayer, Markers } from 'leaflet';
import { Platform } from 'ionic-angular/platform/platform';
import { NRVMap } from '../../app/nrvmap'
import { Park } from '../../app/park'
import { IFilter, AmenityFilter } from '../../app/filter'
import { Amenity } from '../../app/amenity';
import { IData } from '../../app/data';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Map: NRVMap;
  public Filter: IFilter;
  public Data: IData;

  constructor(public navParams: NavParams, platform: Platform, public events: Events) {
    events.subscribe('filter:updated', (filter) => {
      this.UpdateFilter(filter);
    });

    events.subscribe('userlocation:updated', (position) => {
      this.Map.SetUserLocation(position);
    });

    this.Data = navParams.get('data');
    this.Filter = navParams.get('filter');
  }

  public InitializeData() {

    for(let park of this.Data.GetParks()) {
      this.AddPark(park);
    }

    if(typeof(this.Filter) != 'undefined') {
      this.UpdateFilter(this.Filter);
    }

    this.Map.FitBounds();
  }

  public AddPark(park: Park) {
    this.Map.AddPark(park);
  }

  public UpdateFilter(filter: IFilter) {
      this.Filter = filter;
      var parksVisible = new Set<number>();      

      for(let park of filter.Filter(this.Data.GetParks())) {
        parksVisible.add(park.Id);
      }

      for(let park of this.Data.GetParks()) {
          if(parksVisible.has(park.Id)) {
            park.Visible = false;
            this.Map.ShowMarker(park.Id);
          } else {
            park.Visible = true;
            this.Map.HideMarker(park.Id);
          }
      }

      this.Map.FitBounds();
  }

  ionViewDidLoad() {
    var layerURL = 'https://api.mapbox.com/styles/v1/nealf/cj4a7oll139od2spe6ckgufjq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibmVhbGYiLCJhIjoiNmM4MGQ3M2UzNmVlMTY0OWNmZDhiZjk0YWZlYzQ4OTYifQ.VEiV66Tl7sjD5n-bDLjbhw';
    var attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
    this.Map = new NRVMap('mapid', layerURL, attribution, 37.129852, -80.408939);
    this.InitializeData();
  }

  public SetActivePark(park: Park) {
    this.Data.ActivePark = park;
  }

  public Search($scope) {
    console.log($scope);
  }
}
