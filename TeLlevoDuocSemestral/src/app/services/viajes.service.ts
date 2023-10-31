import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SUPABASE_URL, SUPABASE_PASSWORD } from 'apiInfo';


@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  //Método de getViajes para obtener los viajes segun su estado

  getViajesActivos(fecha: String): Observable<any> {
    const URL = `${SUPABASE_URL}/viaje?select=*,detalle_viaje(*)&estado=neq.desactivado&estado=neq.eliminado&fecha_inicio=eq.${fecha}`;

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
  getDetalleViaje(id_viaje: string): Observable<any> {
    const URL = `${SUPABASE_URL}/detalle_viaje?select=*&viaje_id=eq.${id_viaje}`;

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
  getViajePorUsuario(id_conductor: string): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?select=*,conductor(*,viaje(*,vehiculo(*,marca_vehiculo(*))))&id=eq.${id_conductor}&conductor.viaje.estado=neq.terminado&conductor.viaje.estado=neq.desactivado`;
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

  postViaje(data: any): Observable<any> {
    const URL = `${SUPABASE_URL}/viaje`;
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
  desactivarViaje(id_viaje: number): Observable<any> {
    const URL = `${SUPABASE_URL}/viaje?id=eq.${id_viaje}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    const data = { "estado": "desactivado" }
    return this.httpClient.patch(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }


  getAsiento(id_detalle_viaje: number): Observable<any> {
    const URL = `${SUPABASE_URL}/detalle_viaje?id=eq.${id_detalle_viaje}`;
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

  reservarAsiento(id_detalle_viaje: number, data: string): Observable<any> {
    const URL = `${SUPABASE_URL}/detalle_viaje?id=eq.${id_detalle_viaje}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    return this.httpClient.patch(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  cerrarViaje(id_viaje: number): Observable<any> {
    const URL = `${SUPABASE_URL}/viaje?id=eq.${id_viaje}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    const data = { "estado": "cerrado" }
    return this.httpClient.patch(URL, data, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );

  }
}
