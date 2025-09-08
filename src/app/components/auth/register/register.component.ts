import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';
import { Users } from "src/app/model/user/users.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  email = 'soporte@untrm.edu.pe';
  year: number = new Date().getFullYear();

   /* Validación de los datos del formulario */
  emptyUser: Users = {
    id:0,
    names: "",
    lastName: "",
    nameUser: "",
    contac: "",
    address: "",
    email: "",
    password: "",
    dni: "",
    stateUser: false,
    registrationDate: new Date(),
    typeUser: 2};
  validationform!: UntypedFormGroup;
  submit!: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private router: Router, 
    private UserService: UserService
  ) {}

  get form() { return this.validationform.controls; }
  ngOnInit(): void {
    
    this.validationform = this.formBuilder.group({
      id: ["", [Validators.required]],
      names: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")]],
      lastName: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")]],
      nameUser: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$")]], 
      contac: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      address: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\\s.,'-]+$")]], 
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]], 
      password: ["", Validators.required],
      dni: ["", [Validators.required, Validators.pattern("^[0-9]+$")]], 
      typeUser: [3],
      stateUser: true,
      registrationDate: [new Date()]
    });
  }

  validateEmailDomain(control: any) {
    const email = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    return domain.toLowerCase() === 'untrm.edu.pe' ? null : { domainInvalid: true };
  }

  get f() { return this.signupForm.controls; }

  addUser() {
    this.submit = true;
  
    if (this.validationform.valid) {
      const formData = this.validationform.value;
  
      const newUser: Users = new Users(
        0, 
        formData.names,
        formData.lastName,
        formData.nameUser,
        formData.contac.toString(),
        formData.address,
        formData.email,
        formData.password,
        formData.dni.toString(),
        formData.stateUser,
        new Date(formData.registrationDate),
        formData.typeUser,
      );
  
      this.UserService.saveUser(newUser).subscribe({
        next: (response) => {
          this.validationform.reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "La cuenta ha sido creada correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error("Error al guardar los datos: ", err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error
          });
        }
      });
    } else {
      console.log("Formulario inválido");
    }
  }
}
