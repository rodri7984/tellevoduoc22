import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private _vehiculo: VehiculoService,
    private router: Router
  ) { }

  ngOnInit() {



    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }

    this._vehiculo.getAutos(this.userInfo.id)
      .subscribe(
        (data) => {

          this.listaVehiculos = data[0].conductor.conductor_vehiculo;
          console.log(this.listaVehiculos);
        }
      );
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

  mostrarVehiculos() {
    console.log(this.listaVehiculos);

  }

  redireccionarHomeConductor() {
    this.router.navigateByUrl('chome');
  }

}
