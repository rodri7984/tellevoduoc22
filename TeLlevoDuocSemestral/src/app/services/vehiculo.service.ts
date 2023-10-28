import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { api_url, DB_PASSWORD } from 'db_info';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAutos(id_usuario: string): Observable<any> {
    const URL = `${api_url}/usuario?select=conductor(id,id_vehiculo_principal,conductor_vehiculo(vehiculo(id,patente,marca_vehiculo(descripcion),modelo,capacidad,color)))&id=eq.${id_usuario}`;

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

  getAutoPrincipal(id_usuario: string): Observable<any> {
    const URL = `${api_url}/usuario?select=conductor(id_vehiculo_principal)&id=eq.${id_usuario}`;

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
  patchAutoPrincipal(id_usuario: string, id_vehiculo: string): Observable<any> {
    const URL = `${api_url}/conductor?id_usuario=eq.${id_usuario}`;
    const headers = new HttpHeaders({
      'apikey': `${DB_PASSWORD}`,
    });
    const body = {
      "id_vehiculo_principal": id_vehiculo
    };
    return this.httpClient.patch(URL, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  postVehiculo(data: any): Observable<any> {
    const URL = `${api_url}/vehiculo`;
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
  getMarcas(): Observable<any> {
    const URL = `${api_url}/marca_vehiculo`;
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

}
