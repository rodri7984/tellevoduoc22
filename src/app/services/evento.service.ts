// evento.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private destinoSubject = new BehaviorSubject<string>('');

  enviarDestino(destino: string) {
    this.destinoSubject.next(destino);
  }

  obtenerDestino() {
    return this.destinoSubject.asObservable();
  }
}
