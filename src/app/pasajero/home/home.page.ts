import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MapPage } from 'src/app/map/map.page';
import { EventoService } from 'src/app/services/evento.service';



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
  asientoSeleccionado: any = 0;
  infoAsientoSeleccionado: any = {};
  idPasajero: number = 0;
  destino_conductor: string = '';

  constructor(
    private _user: UsuarioService,
    private _viajes: ViajesService,
    private _auth: AuthService,
    private router: Router,
    private modalController: ModalController,
    private eventoService: EventoService // Inyecta el servicio de eventos
  ) {

  }

  ngOnInit() {

    this._auth.getCurrentUser().then(user => {
      if (user) {
        this.userInfo = user;
        console.log(this.userInfo);
        //Inicio metodos

        this.infoPasajero(this.userInfo.id);
        this.getViajes();
        setInterval(() => {
          this.getViajes();

        }, 5000);
        //Fin metodos
        this.eventoService.obtenerDestino().subscribe((destino) => {
          if (destino) {
            // Puedes hacer lo que necesites con el destino recibido
            console.log('Destino recibido en HomePage:', destino);
            this.reservarAsiento(destino);
          }
        });

      } else {
      }

    });
  }

  getViajes() {
    const date = new Date();
    const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    this._viajes.getViajesActivos(fecha)
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
          console.log(data[0])
          this.infoAsientoSeleccionado = data[0];
          this.asientoSeleccionado = this.infoAsientoSeleccionado.id
        }
      }
    );
  }

  async seleccionarDestinoPasajero() {
    const modal = await this.modalController.create({
      component: MapPage, // Asegúrate de importar el componente MapPage
      componentProps: {
        // Pasa cualquier parámetro que necesites al modal del mapa
      },
    });
    modal.onDidDismiss().then((data: any) => {
      // Maneja los datos devueltos por el modal del pasajero
      if (data && data.ubicacionSeleccionada) {
        const destinoSeleccionado = data.ubicacionSeleccionada.direccion;
        // Puedes realizar otras operaciones aquí si es necesario
        
      }
    });
    return await modal.present();
  }


  reservarAsiento(destino: string) {
    const datos: any = {
      "pasajero_id": `${this.idPasajero}`,
      "destino": destino,
    };

    this._viajes.reservarAsiento(this.asientoSeleccionado, datos)
      .subscribe(
        (data) => {
          console.log('Asiento reservado:', data);
          this.getViajes();
          this.asientoSeleccionado = 0;
        },
        (error) => {
          console.log('Error al reservar asiento:', error);
          this.asientoSeleccionado = 0;
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




  cerrarSesion() {
    this.userInfo = '';
    this.viajes = [];
    this.detalleViaje = [];
    this.asientosSeleccionados = [];
    this.asientoSeleccionado = 0;
    this.idPasajero = 0;
    this._auth.logout();
    this.router.navigateByUrl('login');
  }


}
