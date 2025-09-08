import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/model/user/users.model';
import { UserService } from 'src/app/service/user/user.service';
import { ServiceResultGeneric } from 'src/app/model/result.info'; 
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UsersEdit } from 'src/app/model/user/userEdit.model';
import { DetailUser } from 'src/app/model/user/detailUser.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import Swal from 'sweetalert2';
import { ChangePassword } from "src/app/model/user/changePassword.model";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
    userLoging: Users = new Users(0, "", "", "", "", "", "", "", "", false,new Date(), 2);
    objUserUp = new UsersEdit(0, "", "", "", "","","",0,"","", "");

    userDetail: DetailUser = new DetailUser(0,0,0,"","","");

    UserType: number = 0;

    userId: number | null = null;
    IdUser: number = 0;
    /*   Valicacion de los datos del formulario */
    validationform!: UntypedFormGroup;//primer formulario
    validationCredential!: FormGroup;
    submit!: boolean;
    onsubmit!: boolean;


    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private authService: AuthService,
      private formBuilder: UntypedFormBuilder,
    ) {}

    get form() { return this.validationform.controls; }//primer formulario

    get forms() { return this.validationCredential.controls; }
  
    ngOnInit(): void {
      document.documentElement.setAttribute('data-sidebar-size', 'lg');
      // Obtenemos el ID de usuario de los parámetros de la URL
      this.UserType = this.authService.getUserType();

      if(this.UserType == 1 || this.UserType == 2){
        this.route.paramMap.subscribe(params => {
          const id = params.get('id');
          this.userId = id ? +id : null;
          if (this.userId) {
            this.loadUser();
          }
        });
      }else{
        this.userId = this.authService.getUserId();
        this.IdUser = this.authService.getUserId();
        this.loadUser();

      }
      this.setInitialValues();
      this.setInitialCredentials();
    }
    setInitialValues(): void {
      //console.log("userLoging:", this.userLoging); // Verifica que el valor esté presente
      //console.log("userDetail:", this.userDetail); // Verifica que el valor esté presente
      this.validationform = this.formBuilder.group({
        id: [this.userLoging?.id || '', Validators.required],
        names: [this.userLoging?.names || '', Validators.required],
        lastName: [this.userLoging?.lastName || '', Validators.required],
        nameUser: [this.userLoging?.nameUser || '', Validators.required],
        contac: [this.userLoging?.contac || '', Validators.required],
        dni: [this.userLoging?.dni || '', Validators.required],
        address: [this.userLoging?.address || '', Validators.required],
        typeUser: [this.userLoging?.typeUser || '', Validators.required],
        detail1: [this.userDetail?.detail1 || ''],
        detail2: [this.userDetail?.detail2 || ''],
        detail3: [this.userDetail?.detail3 || '']
      });
    }

    setInitialCredentials(): void {
      this.validationCredential = this.formBuilder.group(
        {
          email: [this.userLoging?.email || '', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          newPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
            ],
          ],
          confirmationPassword: ['', Validators.required],
        },
        {
          validators: this.passwordsMatchValidator,
        }
      );
    }
    
    // Validador para comprobar que las contraseñas coincidan
    passwordsMatchValidator(formGroup: FormGroup) {
      const newPassword = formGroup.get('newPassword')?.value;
      const confirmationPassword = formGroup.get('confirmationPassword')?.value;
      return newPassword === confirmationPassword ? null : { passwordsMismatch: true };
    }


    loadUser(): void {
      if (this.userId) {
        //console.log("Detalle de usuario",this.userId)
        this.userService.searchUserId(this.userId).subscribe(
          (result: ServiceResultGeneric<Users>) => {
            if (result.isSucceeded && result.data) {
              this.userLoging = result.data;
              console.log(this.userLoging )
              if (this.userLoging.typeUser == 1){
                this.setInitialValues();
                this.setInitialCredentials();
              }else{
                this.userService.searchDetailUserId(this.userId as number).subscribe(
                  (result: ServiceResultGeneric<DetailUser>) => {
                    if (result.isSucceeded && result.data) {
                      this.userDetail = result.data;
                      this.setInitialValues();
                      //console.log("Resultado de consulta: ", this.userDetail);
                    } else {
                      console.warn('No se encontró el usuario con el ID proporcionado.');
                    }
                  },
                  error => {
                    console.error('Error al obtener el usuario:', error);
                  }
                );
              }
            } else {
              console.warn('No se encontró el usuario con el ID proporcionado.');
            }
          },
          error => {
            console.error('Error al obtener el usuario:', error);
          }
        );
      } else {
        console.warn('No se encontró el ID de usuario en la URL.');
      }
    }


    modifyUser() {
      this.submit = true;
      if (this.validationform.valid) {
        this.userService.modifyUser(this.validationform.value).subscribe({
          next: (response) => {
            this.loadUser(); // Vuelve a cargar los datos si es necesario
            Swal.fire({
              title: '¡Operación Satisfactoria!',
              text: 'El registro se actualizó correctamente',
              icon: 'success',
              confirmButtonColor: '#364574',
              confirmButtonText: 'Ok'
            });
          }
        });
      } else {
          console.log("Formulario Invalido");
      }
    }

    changePassword(): void {
      this.onsubmit = true;
      if (this.validationCredential.valid) {
        const data = new ChangePassword( 
          this.validationCredential.value.email,
          this.validationCredential.value.password,
          this.validationCredential.value.newPassword

        )
        //console.log(data)
        this.userService.changePassword(data).subscribe({
          next: (response) => {
            //console.log(response);
            Swal.fire({
              title: '¡Operación Satisfactoria!',
              text: 'Cambio de contraseña exitoso',
              icon: 'success',
              confirmButtonColor: '#364574',
              confirmButtonText: 'Ok',
            });
          },
          error: (err) => {
            console.error('Error al cambiar la contraseña', err);
            Swal.fire({
              title: "¡Operación Fallida!",
              text: 'Error al cambiar la contraseña, la contraseña no es correcta.',
              icon: "warning",
              confirmButtonColor: '#364574',
              confirmButtonText: 'Ok'
          });
          },
        });
      } else {
        //console.log('Formulario Invalido');
      }
    }
  }