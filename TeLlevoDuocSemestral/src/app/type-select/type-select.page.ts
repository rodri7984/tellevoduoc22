import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-type-select',
  templateUrl: './type-select.page.html',
  styleUrls: ['./type-select.page.scss'],
})
export class TypeSelectPage implements OnInit {

  userInfo: any = '';
  selected: string = '';
  type: string = '';

  constructor(
    private _user: UsuarioService,
    private _auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
    if (currentUser !== null) {
      this.userInfo = JSON.parse(currentUser);
    }
  }

  clickConductor(): void {
    this.selected = 'conductor';
    this.type = 'c';

  }
  clickPasajero(): void {
    this.selected = 'pasajero';
    this.type = 'p';
  }

  patchUserType(): void {
    this._user.patchUserType(this.userInfo.id, this.type)
      .subscribe(
        (respuesta) => {

          console.log('Actualización exitosa:', respuesta);
          this.router.navigateByUrl(`${this.type}home`);
          const contenido: any = {
            id_usuario: this.userInfo.id,
          }
          this._user.addUser(this.selected, contenido)
            .subscribe(
              (respuesta) => {
                // Maneja la respuesta exitosa aquí
                console.log('Registro exitoso:', respuesta);
              },
              (error) => {
                console.log('Error:', error);
              }
            );

        },
        (error) => {
          // Maneja los errores aquí
          console.error('Error en la actualización:', error);
          return;
        }
      );
  }
  cerrarSesion(){
    this.router.navigateByUrl('login');
    this._auth.logout();
  }
}

