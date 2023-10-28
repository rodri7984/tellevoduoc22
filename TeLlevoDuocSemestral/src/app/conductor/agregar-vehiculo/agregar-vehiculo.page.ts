import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  marcas:any[] =[];
  patente: string = '';
  capacidad:number = 0;
  color: string = '';
  anno: number = 0;
  selectedMarca:number = 1;
  modelo: string = '';

  constructor(
    private _vehiculo: VehiculoService,
    private _user: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this._vehiculo.getMarcas()
      .subscribe(
        (data) => {
          this.marcas = data;
          console.log(this.marcas);
        }
      );
  }

  addVehiculo() {
    if (this.patente === '' || this.capacidad === 0 || this.capacidad===null ||
        this.color === '' || this.anno === 0 || this.anno===null|| this.selectedMarca === 1) {
      console.log('Debe llenar todos los campos');
    } else {
      console.log('Agregando vehiculo');
      const contenido: any = {
        "patente": this.patente,
        "capacidad": this.capacidad,
        "modelo":this.modelo,
        "color": this.color,
        "id_marca": this.selectedMarca,
        "anno": this.anno,
      }
      this._vehiculo.postVehiculo(contenido)
        .subscribe(
          (respuesta) => {
            console.log('Vehiculo agregado:', respuesta);
            this.router.navigateByUrl('vehiculos');
            this.patente = '';
            this.capacidad = 0;
            this.color = '';
            this.anno = 0;
          },
          (error) => {
            console.log('Error al agregar vehiculo')
          }
        );
    }

  }

  logout(){
    this._user.logout();
    this.router.navigateByUrl('login');
  }
}
