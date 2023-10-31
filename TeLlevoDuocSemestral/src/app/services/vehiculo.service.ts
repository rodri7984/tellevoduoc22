import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SUPABASE_URL, SUPABASE_PASSWORD } from 'apiInfo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAutos(id_usuario: string): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?select=conductor(id,id_vehiculo_principal,conductor_vehiculo(vehiculo(id,patente,marca_vehiculo(descripcion),modelo,capacidad,color)))&id=eq.${id_usuario}`;

    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  postConductorVehiculo(data: any): Observable<any> {
    const URL = `${SUPABASE_URL}/conductor_vehiculo`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.post(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  getAutoPrincipal(id_usuario: string): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?select=conductor(id_vehiculo_principal)&id=eq.${id_usuario}`;

    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  patchAutoPrincipal(id_usuario: string, id_vehiculo: string): Observable<any> {
    const URL = `${SUPABASE_URL}/conductor?id_usuario=eq.${id_usuario}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
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
    const URL = `${SUPABASE_URL}/vehiculo`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.post(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error al agregar vehículo:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

  obtenerIdVehiculoPorPatente(patente: string): Observable<any> {
    const URL = `${SUPABASE_URL}/vehiculo?patente=eq.${patente}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error al obtener la ID del vehículo:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  getMarcas(): Observable<any> {
    const URL = `${SUPABASE_URL}/marca_vehiculo`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.get(URL, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }

}
