import { Component, Inject, OnInit, Renderer2, OnDestroy, ViewChild } from "@angular/core";
import { Users } from "src/app/model/user/users.model";
import { DOCUMENT } from "@angular/common";
import { UserService } from "src/app/service/user/user.service";
import { AuthService } from 'src/app/service/auth/auth.service'; 
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from "@angular/forms";
import { ADTSettings } from "angular-datatables/src/models/settings";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
    selector: "app-user",
    templateUrl: "./user.component.html",
    styleUrl: "./user.component.scss",
})
export class UserComponent implements OnInit, OnDestroy {

    breadCrumbItems!: Array<{}>;
    titulo: string = "Gestion de Usuarios";
    userType: number = 0;
    /*Campos o atributos para agregar */
    objUserAdd = new Users(0, "", "", "", "","","","","",true,new Date(), 0);
    
    /*Campos o atributos para agregar */
    objUserUp = new Users(0, "", "", "", "","","","","",true, new Date(), 0);

    valorBusqueda: string = "";

    /*   Valicacion de los datos del formulario */
    validationform!: UntypedFormGroup;
    submit!: boolean;

    /* Manejo del datatable */
    @ViewChild(DataTableDirective, { static: false }) dtElement?: DataTableDirective;
    dtOptions: ADTSettings = {};
    dtTrigger: Subject<any> = new Subject();
    userList: Users[] = [];

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private UserService: UserService,
        private formBuilder: UntypedFormBuilder,
        private authService: AuthService,
        private router: Router
    ) { 
        this.listUser();
    }

    get form() { return this.validationform.controls; }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            info:true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json',
                infoEmpty: "false", 
                infoFiltered: "", 
                paginate: { 
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                }
            },
            paging: true,
            destroy: true,
            initComplete: function () {
                $('.dataTables_paginate').addClass('pagination-separated');
            }
          };

        this.breadCrumbItems = [
            { label: "Pagina" },
            { label: "Usuarios", active: true },
        ];

        if (!this.authService.isAuthenticated()) {
            console.warn('Usuario no autenticado, redirigiendo a la página de inicio de sesión.');
            this.router.navigate(['/']);
            return;
          }
          this.userType = this.authService.getUserType();

          if (this.userType !== 1) {
            console.warn('Acceso denegado. Esta vista es solo para administradores.');
            this.router.navigate(['/access-denied']); 
          }

        this.validationform = this.formBuilder.group({
            names: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")]], 
            lastName: ["", [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$")]], 
            nameUser: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+$")]], 
            contac: ["", [Validators.required, Validators.pattern("^[0-9]+$")]], 
            address: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ -]+$")]], 
            email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
            password: ["", [Validators.required, Validators.minLength(6)]], 
            dni: ["", [Validators.required, Validators.pattern("^[0-9]+$")]], 
            typeUser: ["", [Validators.required]], 
            stateUser: [0, [Validators.required]], 
            registrationDate: new Date(), 
        });

    }
    updateStateUser(event: Event) {
        const checked = (event.target as HTMLInputElement).checked; // Verifica si el checkbox está marcado
        this.validationform.patchValue({
          stateUser: checked ? 1 : 0 // Asigna 1 si está marcado, 0 si no
        });
    }

    listUser(): void {
        this.UserService.loadUsers().subscribe((result: any) => {
            //console.log(result.data);
            this.userList = result.data;
            this.initDatatable();
        });
    }

    initDatatable(): void {
        if (this.dtElement?.dtInstance) {
            this.dtElement.dtInstance.then((dtInstance: any) => {
                dtInstance.destroy();
                this.dtTrigger.next(this.dtOptions);
            });
        } else {
            this.dtTrigger.next(this.dtOptions);
        }
    }
    openUserDetail(userId: number): void {
        this.router.navigate(['/user-detail', userId]);
    }

    searchUser() {
        //console.log(this.valorBusqueda);
        if (this.valorBusqueda != "") {
            this.UserService.searchUser(this.valorBusqueda).subscribe(
                (data: any) => {
                    //console.log(data);
                    this.userList = data;
                    this.initDatatable();
                }
            )
        } else {
            this.listUser()
        }
    }

    addUser() {
        this.submit = true;
        //console.log("Datos desde el formulario : ", this.validationform.valid)
        if (this.validationform.valid) {
            this.UserService.saveUser(this.validationform.value).subscribe({
                next: (response) => {
                    //console.log(response);
                    this.validationform.reset();
                    this.listUser();
                    this._document.getElementById("closeAgregar")?.click();
                },
            });
        } else {
            console.log("Formulario Invalido");
        }
    }
    /*usuarios de prueba
    createUsersMassively() {
        this.submit = true; 
    
        this.studentsList.forEach(student => {
            const userToCreate = new Users(
                0, 
                student.names,
                student.lastName,
                student.id.toString(), 
                student.contact,
                `${student.faculty} - ${student.school}`,
                student.email,
                student.id.toString(), 
                student.id.toString(), 
                true, 
                new Date().toISOString() as unknown as Date,
                3 
            );
            //console.log("Usuarios : ",userToCreate );
            this.UserService.saveUser(userToCreate).subscribe({
                next: (response) => {
                    //console.log("Usuario creado: ", response);
                },
                error: (error) => {
                    console.error("Error al crear usuario: ", error);
                }
            });
        });
        this.listUser();
    }*/

    openModal(users: Users) {
        this.objUserAdd.names = users.names;
        this.objUserAdd.lastName = users.lastName;
        this.objUserAdd.nameUser = users.nameUser;
        this.objUserAdd.contac = users.contac;
        this.objUserAdd.address = users.address;
        this.objUserAdd.email = users.email;
        this.objUserAdd.password = users.password;
        this.objUserAdd.dni = users.dni;
        this.objUserAdd.stateUser = users.stateUser;
        this.objUserAdd.typeUser = users.typeUser

    }

    

    deleteUser(id: number) {
        if (id > 0) {
            Swal.fire({
                title: "¡Estas Seguro!",
                text: '¿Que deseas eliminar el registro?',
                icon: "question",
                showCancelButton: true,
                confirmButtonText: 'CONFIRMAR',
                cancelButtonText: 'CANCELAR'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.UserService.deleteUser(id).subscribe(
                        (response) => {
                            //console.log("resultado del eliminar Usuario: ");
                            this.listUser();
                            Swal.fire({
                                title: "¡Operación Satisfactoria!",
                                text: 'El registro se eliminó correctamente.',
                                icon: "success",
                                confirmButtonColor: '#364574',
                                confirmButtonText: 'Ok'
                            });
                        }, (error) => {
                            //console.log(error);
                            Swal.fire({
                                title: "¡Operación Fallida!",
                                text: 'No se logro eliminar el registro.',
                                icon: "warning",
                                confirmButtonColor: '#364574',
                                confirmButtonText: 'Ok'
                            });
                        }
                    );
                }
            });
        } else {
            Swal.fire({
                title: "¡Operación Fallida!",
                text: 'Seleccione un registro.',
                icon: "warning",
                showConfirmButton: false,
                showCloseButton: true,
                timer: 5000 //milisegundos
            });
        }
    }

    ngOnDestroy() {
        this.dtTrigger.unsubscribe();
    }
}
