import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { api_url, DB_PASSWORD } from 'db_info';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  //Método de getViajes para obtener los viajes segun su estado

  getDetalleViajePorEstado(estado: String): Observable<any> {
    const URL = `${api_url}/viaje?select=*,detalle_viaje(*)&estado=eq.${estado}`;

    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  getDetalleViaje(id_viaje: string): Observable<any> {
    const URL = `${api_url}/detalle_viaje?select=*&viaje_id=eq.${id_viaje}`;

    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  getViajePorUsuario(id_conductor: string): Observable<any> {
    const URL = `${api_url}/usuario?select=*,conductor(*,viaje(*,vehiculo(*,marca_vehiculo(*))))&id=eq.${id_conductor}`;
    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  postViaje(data: any): Observable<any> {
    const URL = `${api_url}/viaje`;
    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.post(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  getAsiento(id_detalle_viaje: number): Observable<any> {
    const URL = `${api_url}/detalle_viaje?id=eq.${id_detalle_viaje}`;
    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  reservarAsiento(id_detalle_viaje: number, data:string): Observable<any> {
    const URL = `${api_url}/detalle_viaje?id=eq.${id_detalle_viaje}`;
    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    return this.httpClient.patch(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
}
