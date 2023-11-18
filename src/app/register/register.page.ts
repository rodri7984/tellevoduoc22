import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';






@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  confirmPassword: string = '';

  constructor(
    private _user: UsuarioService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  registrar() {

    if (this.username === '' || this.password === '' || 
        this.nombre === '' || this.apellido === '' || 
        this.confirmPassword === '') {
      console.log('Debe llenar todos los campos');
    } else {
      if (this.password === this.confirmPassword) {
        console.log('Registro exitoso');
        const contenido: any = {
          username: this.username,
          password: this.password,
          nombre: this.nombre,
          apellido: this.apellido,
        }
        this._user.register(contenido)
          .subscribe(
            (respuesta) => {
              console.log('Registro exitoso:', respuesta);
              this.router.navigateByUrl('login');
              this.username = '';
              this.password = '';
              this.nombre = '';
              this.apellido = '';
              this.confirmPassword = '';
            },
            (error) => {
              console.log('El nombre de usuario ya está en uso')
            }
          );

      } else {
        console.log('Las contraseñas no coinciden');

      }
    }
  };
  volverAlLogin(){
    this.router.navigateByUrl('login');
  }
}
