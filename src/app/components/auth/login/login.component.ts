import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
/* import { AuthenticationService } from 'src/app/core/services/auth.service'; */
import { ActivatedRoute, Router } from '@angular/router';
/* import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service'; */
import { ToastService } from './toast-service';
import { Store } from '@ngrx/store';
/* import { login } from 'src/app/store/Authentication/authentication.actions'; */
import { User } from 'src/app/model/user/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import Swal from 'sweetalert2';
import { param } from 'jquery';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    // Formulario de Inicio de Sesión
    loginForm!: UntypedFormGroup;
    submitted = false;
    fieldTextType!: boolean;
    error = '';
    returnUrl!: string;
    toast!: false;

    // Establecer el Año Aactual
    year: number = new Date().getFullYear();

    //Carrusel de Navegación
    showNavigationArrows: any;

    usuario: User = new User('', '');

    constructor(
        private formBuilder: UntypedFormBuilder,
        private authService: AuthService,
        private router: Router

    ) {
        // Redirigir si has iniciado sesión
        if (authService.isAuthenticated())
            this.router.navigate(['/']);
    }

    ngOnInit(): void {
        if (sessionStorage.getItem('currentUser')) {
            this.router.navigate(['/']);
        }

        //Validación de Formulario
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmitSoloLogin() { 
        this.authService.UserValidate(this.usuario).subscribe({
            next: (data) => {
                //console.log("Usuario logueado", data);
                this.authService.login(data);
                this.router.navigate(['/']);
            }, error: (error) => {
                alert("Error");
            }, complete: () => {
            }
        });
    }
    onSubmitLoginYToken() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        //console.log(this.usuario);

        if (this.usuario.Email != '' && this.usuario.Password != '') {
            console.log('Datos enviados:', JSON.stringify(this.usuario));
            this.authService.TokeGenerator(this.usuario).subscribe({
                next: (token) => {
                    //console.log("token generado", token);
                    this.authService.setToken(token);
                    this.authService.login(this.usuario);
                    this.router.navigate(['/']);

                    Swal.fire({
                        title: '¡Bienvenido al sistema!',
                        text: 'Nos alegra tenerte de vuelta. Ya puedes comenzar a gestionar tus actividades y aprovechar al máximo todas las funcionalidades del sistema.',
                        icon: 'success',
                        confirmButtonColor: '#364574',
                        confirmButtonText: 'Gracias'
                    });
                }, error: (error) => {
                    Swal.fire({
                        title: '¡Error de Inicio de Sesión!',
                        text: 'Credenciales de acceso incorrectos',
                        icon: 'error',
                        confirmButtonColor: '#364574',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.usuario.Email = '';
                            this.usuario.Password = '';
                        }
                    });
                }, complete: () => {

                }
            });
        }
    }
    /*Mostrar y ocultar contraseña*/
    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }
}
