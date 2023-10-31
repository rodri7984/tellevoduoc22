import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SUPABASE_URL, SUPABASE_PASSWORD } from 'apiInfo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUserInfo(username: string, password: string): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?username=eq.${username}&password=eq.${password}`;;
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
  patchUserType(id: number, tipo_usuario: string): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?id=eq.${id}`;
    const headers = new HttpHeaders({
      'apikey': `${SUPABASE_PASSWORD}`,
    });
    const body = {
      tipo_usuario: tipo_usuario
    };
    return this.httpClient.patch(URL, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('No se pudo acceder a la base de datos');
      })
    );
  }
  getConductorInfo(id: number): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?select=*,conductor(*)&id=eq.${id}`;
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

  addUser(tabla: string, data:any): Observable<any> {
    const URL = `${SUPABASE_URL}/${tabla}`;
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

  register(data:any): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario`;
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
  
  getInfoPasajero(id: number): Observable<any> {
    const URL = `${SUPABASE_URL}/usuario?select=*,pasajero(*)&id=eq.${id}`;
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
