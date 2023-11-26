import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')mapRef: ElementRef | undefined;
  map: GoogleMap | undefined;

  constructor() {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef?.nativeElement,
      forceCreate: true,
      config: {
        center:{
          lat: 33.6,
          lng: -117.9
        },
        zoom : 8,
      },
      
      
      
    });
  }
}
