import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  infoUser: any = null;
  username: string = '';
  password: string = '';


  constructor(
    private router: Router,
    private _user: UsuarioService,
    private _auth: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.username === '' || this.password === '') {
      console.log('Debe ingresar un usuario');
    } else {
      console.log('login');
      this._user.getUserInfo(this.username, this.password)
        .subscribe(
          (data) => {
            this.infoUser = data[0];
            console.log(this.infoUser);
            if (this.infoUser === undefined) {
              console.log('Usuario no encontrado');
              this.password = '';
            } else {
              console.log('Usuario encontrado');
              if (this.infoUser.tipo_usuario === null) {
                console.log('Usuario sin tipo');
                this.router.navigateByUrl('type-select');
              } else {
                if (this.infoUser.tipo_usuario === 'c') {
                  console.log('Usuario conductor');
                  this.router.navigateByUrl('chome');
                } else {
                  console.log('Usuario pasajero');
                  this.router.navigateByUrl('phome');
                }
              }

              this._auth.setCurrentUser(this.infoUser);
              this.username = '';
              this.password = '';
            }

          },
          (error) => {
            console.error('Error al obtener información del usuario:', error);
          }
        );
    }
  }

  registrar(): void {
    console.log('registrar');
    this.router.navigateByUrl('register');
  }
}
