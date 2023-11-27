import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class ServicioMapas {

  constructor() { }

  cargarMapasGoogle(): Promise<any> {
    const win = window as any;
    const moduloGoogle = win.google;
    if (moduloGoogle && moduloGoogle.maps) {
      return Promise.resolve(moduloGoogle.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' +
        environment.mapsKey;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const moduloGoogleCargado = win.google;
        if (moduloGoogleCargado && moduloGoogleCargado.maps) {
          resolve(moduloGoogleCargado.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

  async obtenerDirecciones(origen: any, destino: any): Promise<any> {
    const servicioDirecciones = new google.maps.DirectionsService();

    return new Promise((resolve, reject) => {
      servicioDirecciones.route(
        {
          origin: origen,
          destination: destino,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (respuesta: any, estado: any) => {
          if (estado === 'OK') {
            resolve(respuesta);
          } else {
            reject(estado);
          }
        }
      );
    });
  }
}
