import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  buscar: boolean = true;
  userInfo: any = '';
  id_viaje: any = '';
  listaVehiculos: any = '';
  vehiculoPrincipal: any = '';
  viajes: any = [];
  cBusquedas: number = 0;

  constructor(
    private _user: UsuarioService,
    private _vehiculo: VehiculoService,
    private router: Router,
    private _viajes: ViajesService,
    private _auth: AuthService,
  ) { }

  ngOnInit() {
    this.buscar = true;
    this.cBusquedas = 0;
    this._auth.getCurrentUser().then(user => {
      if (user) {
        this.userInfo = user;
        console.log(this.userInfo);
        //Inicio metodos
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
        setInterval(() => {

          if (this.viajes.length === 0 && this.buscar) {
            this.getViajes();

            this.cBusquedas++;
            console.log(this.cBusquedas);
            if (this.cBusquedas >= 3) {
              this.buscar = !this.buscar
            }

          }
        }, 3000);
        //Fin metodos
      } else {
        this.router.navigateByUrl('login');
      }
    });
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
    this.buscar = true;
    this.cBusquedas = 0 
  }

  desactivarViaje(viajeId: number) {
    if (viajeId !== undefined) {
      this._viajes.desactivarViaje(viajeId).subscribe(
        (data) => {
          console.log(data);

          this.getViajes();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      this.cBusquedas = 0;
    } else {
      console.log('No se proporcionó un ID de viaje válido');
    }
  }
  async getViajes() {
    await this._viajes.getViajePorUsuario(this.userInfo.id).subscribe(
      (data) => {
        this.viajes = data[0].conductor.viaje;
        console.log(this.viajes);
      }
    );
  }
  seleccionarVehiculo() {
    this.router.navigateByUrl('vehiculos');

  }

  toggleViaje(id_viaje: number, estado: String) {
    let nuevoEstado = ''
    if (estado === "pendiente"){
      nuevoEstado = "cerrado"
    }
    if (estado === "cerrado"){
      nuevoEstado = "pendiente"
    }
    this._viajes.cerrarViaje(id_viaje, nuevoEstado).subscribe(
      (data) => {
        console.log(data);
        this.getViajes();
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
  cerrarSesion() {
    this.userInfo = '';
    this.id_viaje = '';
    this.listaVehiculos = '';
    this.vehiculoPrincipal = '';
    this.viajes = [];
    this._auth.logout();
    this.router.navigateByUrl('login');
  }
} 