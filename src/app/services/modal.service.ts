import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapPage } from '../map/map.page';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalController: ModalController) { }

  async abrirMapaModal(confirmarCallback: (ubicacionSeleccionada: any) => void) {
    const modal = await this.modalController.create({
      component: MapPage,
      componentProps: {
        confirmarCallback, // Pasa la función de confirmación como propiedad al modal
      },
      // Puedes agregar opciones adicionales aquí, como presentar el modal en modo completo, etc.
    });

    await modal.present();

    return modal.onDidDismiss();
  }
  async abrirMapa(destinoInicial: string) {
    const modal = await this.modalController.create({
      component: MapPage,  // Reemplaza 'TuModalComponent' con el nombre real de tu componente modal
      componentProps: {
        destinoInicial: destinoInicial,
      },
    });

    await modal.present();
    return modal;
  }
}