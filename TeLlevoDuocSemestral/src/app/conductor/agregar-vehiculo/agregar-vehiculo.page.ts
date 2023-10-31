import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  userInfo: any = '';
  conductorInfo: any = '';
  marcas: any[] = [];
  patente: string = '';
  capacidad: number = 0;
  color: string = '';
  anno: number = 0;
  selectedMarca: number = 1;
  modelo: string = '';

  constructor(
    private _vehiculo: VehiculoService,
    private _auth: AuthService,
    private router: Router,
    private _usuario: UsuarioService
  ) { }


  ngOnInit() {

    this._auth.getCurrentUser().then(user => {
      if (user) {
        this.userInfo = user;
        console.log(this.userInfo);
        //Inicio metodos
        this._usuario.getConductorInfo(this.userInfo.id).subscribe(
          (data) => {
            this.conductorInfo = data[0];
            console.log(this.conductorInfo);
          }
        );
        this._vehiculo.getMarcas()
          .subscribe(
            (data) => {
              this.marcas = data;
              console.log(this.marcas);
            }
          );
        //Fin metodos
      } else {
        this.router.navigateByUrl('login');
      }
    });
  }

  addVehiculo() {
    if (this.patente === '' || this.capacidad === 0 || this.capacidad === null ||
      this.color === '' || this.anno === 0 || this.anno === null || this.selectedMarca === 1) {
      console.log('Debe llenar todos los campos');
    } else {
      console.log('Agregando vehículo');
      const contenido: any = {
        "patente": this.patente,
        "capacidad": this.capacidad,
        "modelo": this.modelo,
        "color": this.color,
        "id_marca": this.selectedMarca,
        "anno": this.anno,
      };

      // Primera solicitud para crear el vehículo
      this._vehiculo.postVehiculo(contenido).subscribe(
        (respuesta) => {
          console.log('Vehículo creado:', respuesta);
          // Realiza una segunda solicitud para obtener la ID del vehículo
          this._vehiculo.obtenerIdVehiculoPorPatente(this.patente).subscribe(
            (idVehiculo) => {
              if (idVehiculo !== undefined) {
                const vehiculo_id = idVehiculo[0].id;
                console.log('ID del vehículo creado:', vehiculo_id);
                // Realiza cualquier acción adicional que necesites con la ID del vehículo.

                setTimeout(() => {
                  const data = {
                    "id_conductor": this.conductorInfo.conductor.id,
                    "id_vehiculo": vehiculo_id,
                  }
                  this._vehiculo.postConductorVehiculo(data).subscribe(
                    (respuesta) => {
                      console.log('Vehículo agregado al conductor:', respuesta);
                      this.router.navigateByUrl('vehiculos');
                    },
                    (error) => {
                      console.log('Error al agregar vehículo al conductor:', error, data);
                    }
                  );
                }, 1000);
              } else {
                console.log('No se pudo obtener la ID del vehículo creado.');
              }
            },
            (error) => {
              console.log('Error al obtener la ID del vehículo:', error);
            }
          );
        },
        (error) => {
          console.log('Error al agregar vehículo', error);
        }
      );

    }
  }


  volver() {
    this.router.navigateByUrl('vehiculos');
  }

  logout() {
    this._auth.logout();
    this.router.navigateByUrl('login');
  }
}
