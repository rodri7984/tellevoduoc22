import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  viajes: any[] = [];
  detalleViaje: any[] = [];
  asientosSeleccionados: number[] = [];
  asientoSeleccionado: number = 0;

  constructor(
    private _user: UsuarioService,
    private _viajes: ViajesService,


  ) { }

  ngOnInit() {
    this.getViajes();
  }


  getViajes() {
    this._viajes.getDetalleViajePorEstado('pendiente')
      .subscribe(
        (data) => {
          this.viajes = data;
          console.log(this.viajes);

        }
      );
  }

  seleccionarAsiento(id_viaje: number) {

    console.log('Seleccionando asiento :', id_viaje);
    this._viajes.getAsiento(id_viaje).subscribe(
      (data) => {
        if (data[0].pasajero_id === null){
          this.asientoSeleccionado = id_viaje;
        }
      }
    );
  }

  divideAsientos(array: any[], groupSize: number) {
    const groups = [];
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
    }
    return groups;
  }

  alternarSeleccion(asientoId: number) {
    if (this.asientosSeleccionados.includes(asientoId)) {
      // El asiento ya está seleccionado, lo deseleccionamos
      this.asientosSeleccionados = this.asientosSeleccionados.filter(id => id !== asientoId);
    } else {
      // Deseleccionamos cualquier asiento previamente seleccionado
      this.asientosSeleccionados = [asientoId];
    }
  }

  

}
