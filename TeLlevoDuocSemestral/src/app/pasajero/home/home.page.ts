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
  userInfo: any = '';
  viajes: any[] = [];
  detalleViaje: any[] = [];
  asientosSeleccionados: number[] = [];
  asientoSeleccionado: number = 0;
  idPasajero: number = 0;

  constructor(
    private _user: UsuarioService,
    private _viajes: ViajesService,


  ) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
    this.infoPasajero(this.userInfo.id);

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
        if (data[0].pasajero_id === null) {
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

  infoPasajero(id_usuario: number) {
    this._user.getInfoPasajero(id_usuario).subscribe(
      (data) => {
        this.userInfo = data[0]
        console.log(this.userInfo);
        this.idPasajero = this.userInfo.pasajero.id;
        console.log(this.idPasajero);
      }
    );
  }
  reservarAsiento() {
    const datos:any = {"pasajero_id": `${this.idPasajero}`,
    "destino": "Casa",}
    this._viajes.reservarAsiento(this.asientoSeleccionado, datos)
      .subscribe(
        (data) => {
          console.log(data);
          this.getViajes();
          this.asientoSeleccionado = 0;
        },
        (error) => {
          console.log(error);
          console.log(datos);
          this.asientoSeleccionado = 0;
        }
        
      );
  }


}
