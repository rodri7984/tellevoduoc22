import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  userInfo: any = '';
  listaVehiculos: any = '';
  vehiculoPrincipal: any = '';

  constructor(
    private _user: UsuarioService,
    private _auth: AuthService,
    private _vehiculo: VehiculoService,
    private router: Router
  ) { }

  ngOnInit() {

    this._auth.getCurrentUser().then(user => {
      if (user) {
        this.userInfo = user;
        console.log(this.userInfo);
        //Inicio metodos
        this._vehiculo.getAutos(this.userInfo.id)
          .subscribe(
            (data) => {
              this.listaVehiculos = data[0].conductor.conductor_vehiculo;
              console.log(this.listaVehiculos);
            }
          ); setTimeout(() => {
            if (this.listaVehiculos.length === 0) {
              this.router.navigateByUrl('agregar-vehiculo');
            }
          
          }, 1000);
        //Fin metodos
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }

  seleccionar(id_vehiculo: string): void {
    this.vehiculoPrincipal = id_vehiculo;
    console.log(this.vehiculoPrincipal);
  }

  modificarVehiculoPrincipal() {
    this._vehiculo.patchAutoPrincipal(this.userInfo.id, this.vehiculoPrincipal.id)
      .subscribe
      (
        (data) => {
          console.log("Vehiculo principal modificado", data);
          this.redireccionarHomeConductor();
        },
        (error) => {
          console.error('Error:', error);
        }
      );

  }

  agregarVehiculo(){
    this.router.navigateByUrl('agregar-vehiculo');
  }
  
  volver() {
    this.router.navigateByUrl('chome');
  }

  redireccionarHomeConductor() {
    this.router.navigateByUrl('chome');
  }

}
