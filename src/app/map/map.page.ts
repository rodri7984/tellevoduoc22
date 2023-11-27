import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ServicioMapas } from '../services/maps.service';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ViajesService } from '../services/viajes.service'
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {
  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;
  @ViewChild('addressInput') addressInput!: ElementRef;
  ubicacionTipo: any;
  mapaGoogle: any;
  mapa: any;
  geocodificador: any;
  marcadorUsuario: any;
  ubicacionSeleccionada: any;
  idPasajero: any;
  idAsiento: string = '';
  destino: string = '';

  constructor(
    private servicioMapas: ServicioMapas,
    private renderizador: Renderer2,
    private geolocalizacion: Geolocation,
    private controladorModal: ModalController,
    private ruta: ActivatedRoute,
    private _viajes: ViajesService,
    private eventoService: EventoService  // Inyectar el servicio de eventos



  ) {
    this.ubicacionTipo = this.ruta.snapshot.paramMap.get('ubicacionTipo');
  }

  ngOnInit() {
    this.ruta.params.subscribe(params => {
      this.idAsiento = params['idAsiento'];
      this.destino = params['destino'];

      console.log(this.destino)
    });
    this.cargarMapa();
  }

  async cargarMapa() {
    try {
      const coordenadas = await this.geolocalizacion.getCurrentPosition();
      const lat = coordenadas.coords.latitude;
      const lng = coordenadas.coords.longitude;

      let mapaGoogle: any = await this.servicioMapas.cargarMapasGoogle();
      this.mapaGoogle = mapaGoogle;
      const elementoMapa = this.mapElementRef.nativeElement;
      const ubicacion = new mapaGoogle.LatLng(lat, lng);

      this.mapa = new mapaGoogle.Map(elementoMapa, {
        center: ubicacion,
        zoom: 15,
      });

      this.renderizador.addClass(elementoMapa, 'visible');

      // Elimina la creación del marcador de usuario y el evento de clic en el mapa

      this.geocodificador = new mapaGoogle.Geocoder();

      // Agrega el evento de movimiento del mapa
      mapaGoogle.event.addListener(this.mapa, 'zoom_changed', () => {
        const center = this.mapa.getCenter();
        this.actualizarMarcador({ lat: center.lat(), lng: center.lng() });
        this.actualizarDireccion(center);
      });

      mapaGoogle.event.addListener(this.mapa, 'center_changed', () => {
        const center = this.mapa.getCenter();
        this.actualizarMarcador({ lat: center.lat(), lng: center.lng() });
        this.actualizarDireccion(center);
      });
    } catch (error) {
      console.log('Error al cargar el mapa:', error);
    }
  }
  actualizarDireccion(coordenadas: any) {
    this.geocodificador.geocode({ location: coordenadas }, (resultados: any, estado: any) => {
      if (estado === 'OK' && resultados[0]) {
        this.ubicacionSeleccionada = {
          direccion: resultados[0].formatted_address,
          coordenadas: {
            lat: coordenadas.lat(),
            lng: coordenadas.lng(),
          },
        };
      }
    });
  }
  manejarCambioDireccion() {
    const direccion = this.addressInput.nativeElement.value;
    this.geocodificador.geocode({ address: direccion }, (resultados: any, estado: any) => {
      if (estado === 'OK' && resultados[0]) {
        this.ubicacionSeleccionada = {
          direccion: resultados[0].formatted_address,
          coordenadas: {
            lat: resultados[0].geometry.location.lat(),
            lng: resultados[0].geometry.location.lng(),
          },
        };
        this.mapa.panTo(this.ubicacionSeleccionada.coordenadas);
        // No es necesario actualizar el marcador aquí, ya que se actualiza en el evento 'center_changed'
      }
    });
  }

  actualizarMarcador(coordenadas: any) {
    if (this.marcadorUsuario) {
      const nuevaUbicacion = new this.mapaGoogle.LatLng(coordenadas.lat, coordenadas.lng);
      this.marcadorUsuario.setPosition(nuevaUbicacion);
    } else {
      // Crea el marcador si no existe
      this.marcadorUsuario = new this.mapaGoogle.Marker({
        position: coordenadas,
        map: this.mapa,
        title: 'Ubicación actual',
        icon: {
          url: 'assets/icon/marcador.png',
          scaledSize: new this.mapaGoogle.Size(100, 100),
        },
      });
    }
  }

  confirmarUbicacion() {
    const center = this.mapa.getCenter();

    const destinoSeleccionado = this.ubicacionSeleccionada.direccion;
    this.eventoService.enviarDestino(destinoSeleccionado);

    // Cierra el modal
    this.controladorModal.dismiss({
      ubicacionTipo: this.ubicacionTipo,
      ubicacionSeleccionada: {
        direccion: this.ubicacionSeleccionada.direccion,
        coordenadas: {
          lat: center.lat(),
          lng: center.lng(),
        },
      },
    });

  }
  confirmarUbicacionConductor() {
    this.controladorModal.dismiss({
      destino: this.ubicacionSeleccionada.direccion,
      // Agrega otros datos que necesitas enviar de vuelta
    })

  }
}
  // async reservarAsiento() {
  //   const datos: any = {
  //     "pasajero_id": `${this.idPasajero}`,
  //     "destino": "Casa",
  //   }

  //   this._viajes.reservarAsiento(this.asientoSeleccionado, datos)
  //     .subscribe(
  //       async (data) => {
  //         console.log(data);
  //         this.getViajes();
  //         this.asientoSeleccionado = 0;

  //         // Obtener la dirección de destino, puedes ajustar según tus datos reales
  //         const direccionDestino = "Casa";



  //         await thismodal.present();
  //       },
  //       (error) => {
  //         console.log(error);
  //         console.log(datos);
  //         this.asientoSeleccionado = 0;
  //       }
  //     );
  // }