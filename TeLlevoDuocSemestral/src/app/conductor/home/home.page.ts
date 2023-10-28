import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userInfo: any = '';
  listaVehiculos: any = '';
  vehiculoPrincipal: any = '';
  viajes: any = [];

  constructor(
    private _user: UsuarioService,
    private _vehiculo: VehiculoService,
    private router: Router,
    private _viajes: ViajesService,
  ) { }

  ngOnInit() {



    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
    this._vehiculo.getAutos(this.userInfo.id)
      .subscribe(
        (data) => {
          this.listaVehiculos = data[0].conductor.conductor_vehiculo;
          let vehiculoPrincipal = data[0].conductor.id_vehiculo_principal;
          console.log(vehiculoPrincipal);
          if (vehiculoPrincipal !== null) {
            console.log('Su vehiculo principal es:', vehiculoPrincipal);
          } else {
            this.checkearVehiculos();

          }
        }
      );
        this.getViajes();


  }
  checkearVehiculos() {
    if (this.listaVehiculos.length < 0) {
      this.router.navigateByUrl('agregar-vehiculo');
    } else {
      this.router.navigateByUrl('vehiculos');
    }
  }

  crearViaje() {
    this.router.navigateByUrl('crear-viaje');

  }
  async getViajes() {
    await this._viajes.getViajePorUsuario(this.userInfo.id).subscribe(
      (data) => {
         this.viajes = data[0].conductor.viaje;
        console.log(this.viajes);
      }
    );
  }

} 