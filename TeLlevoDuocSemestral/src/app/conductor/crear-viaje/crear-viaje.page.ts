import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoService } from 'src/app/services/vehiculo.service';
import { ViajesService } from 'src/app/services/viajes.service';
@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
})
export class CrearViajePage implements OnInit {

  
  usarVehiculoPrincipal: boolean = true;
  infoConductor: any = '';
  listaVehiculos: any = '';
  userInfo: any = ''; //obtenemos la info del usuario logeado
  autoPrincipal: any = ''; //obtenemos el auto principal del usuario logeado
  fecha: Date = new Date();

  fecha_inicio: string = '';
  origen: string = "Duoc UC, Viña del Mar";
  destino_conductor: string = '';
  vehiculoSeleccionado: string = '';

  constructor(
    private _vehiculo: VehiculoService,
    private _viajes: ViajesService,
    private router: Router
  ) { }

  ngOnInit() {

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
    this._vehiculo.getAutos(this.userInfo.id)
      .subscribe(
        (data) => {
          this.infoConductor = data[0].conductor;
          this.autoPrincipal = data[0].conductor.id_vehiculo_principal;
          this.listaVehiculos = data[0].conductor.conductor_vehiculo;
          console.log(this.infoConductor);
          console.log(this.listaVehiculos)
        }
      );

  }
  publicarViaje() {
    let now: Date = new Date();
    if (this.destino_conductor !== '' || this.vehiculoSeleccionado !== '') {
      if (this.usarVehiculoPrincipal) {
        this.vehiculoSeleccionado = this.autoPrincipal;

      }
      console.log('Publicando viaje');
      this.fecha_inicio = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
      let horaInicio = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
      const contenido: any = {
        "conductor_id": this.infoConductor.id,
        "fecha_inicio": this.fecha_inicio,
        "origen": this.origen,
        "hora_inicio" : horaInicio,
        "destino_conductor": this.destino_conductor,
        "vehiculo_id": this.vehiculoSeleccionado,
        "estado" : "pendiente",
      }
      console.log(contenido);
      
      this._viajes.postViaje(contenido)
        .subscribe(
          (respuesta) => {
            console.log('Viaje publicado:', respuesta);
            this.origen = '';
            this.destino_conductor = '';
            this.router.navigateByUrl('chome');
          },
          (error) => {
            console.log('Error al crear viaje', error)
            
          }
        )
    } else {
      console.log('Debe llenar todos los campos');
    }
  }
}
