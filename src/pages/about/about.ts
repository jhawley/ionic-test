import { Component } from '@angular/core';
import { NavController, Events, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    constructor(public navParams: NavParams, platform: Platform, public events: Events) {
        events.subscribe('filter:updated', (filter) => {
            
        });
    }
}