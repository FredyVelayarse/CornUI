import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import flatpickr from 'flatpickr';
import { Subject } from 'rxjs';
import { Cliente } from 'src/app/model/cliente/cliente.model';
import { Variety } from 'src/app/model/variety/variety.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { VarietyService } from 'src/app/service/variety/variety.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.scss']
})

export class VarietyComponent implements OnInit {
    userData: any;
    title: string = "Variables registradas"
    breadCrumbItems!: Array<{}>;
    totalComuneros: any;
    totalParcela: any;
    isProcessing: boolean = false;
    objVarietyAdd: Variety = new Variety(0,"","","");
    varietyList: Variety[] = [];
    selectedFile: File | null = null; 
    userType: number = 0;
    @ViewChild(DataTableDirective, { static: false }) dtElement?: DataTableDirective;
    dtOptions: ADTSettings = {};
    dtTrigger: Subject<any> = new Subject();


    validationform!: UntypedFormGroup;
    submit!: boolean;

    
    @ViewChild('datepicker') datepickerInput!: ElementRef;
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private authService: AuthService,
        private clienteService: ClienteService,
        private varietyService: VarietyService,
        private router: Router,
        private formBuilder: UntypedFormBuilder
    ) { }
    get form() { return this.validationform.controls; }
  ngOnInit(): void {

    (this.dtOptions as any) = {
      pagingType: 'full_numbers',
      pageLength: 10,
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: 'Exportar a Excel',
          title: 'Reporte de Datos',
          filename: 'Reporte_Datos',
          className: 'btn btn-success',
          exportOptions: {
            columns: ':not(:last-child)'
          }
        },
        {
          extend: 'csvHtml5',
          text: 'Exportar a CSV',
          filename: 'Reporte_Datos',
          className: 'btn btn-primary',
          exportOptions: {
            columns: [0, 1, 2, 3, 4]
          }
        }
      ],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json',
      },
      destroy: true
    };

    this.breadCrumbItems = [
      { label: 'Variable de maiz', active: true  }
    ];

    this.userType = this.authService.getUserType();
    console.log("id:",this.userType)
    if (this.userType !== 1) {
      console.warn('Acceso denegado. Esta vista es solo para administradores.');
      this.router.navigate(['/access-denied']); 
    }
    

    this.validationform = this.formBuilder.group({
      file: [null, [Validators.required]]
    });
  

    this.listVariety();
  }


  ngAfterViewInit(): void {

    setTimeout(() => {
      $('.dt-buttons').show(); 
    }, 500);

  }
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    

    if (selectedDate < today) {
        return { 'invalidDate': true };
    }
    return null;
  }

  listVariety(): void {
    this.varietyService.loadVariety().subscribe((result: any) => {
        this.varietyList = result.data;
        console.log("data de variables:",result.data);
        this.initDatatable();
    });
  }
    initDatatable(): void {
      if (this.dtElement?.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: any) => {
              dtInstance.destroy(); 

              setTimeout(() => {
                  this.dtTrigger.next(null); 
              }, 300);
          });
      } else {
          setTimeout(() => {
              this.dtTrigger.next(null);
          }, 300);
      }
  }


    addVariety() {
      this.submit = true;
      this.isProcessing = true;  // 🔴 Deshabilitar el botón de guardar

      if (this.validationform.valid && this.selectedFile) {  
          const formData = new FormData();
          formData.append("FotoBytes", this.selectedFile, this.selectedFile.name);

          this.varietyService.saveVariety(formData).subscribe({
              next: (response) => {
                console.log("agreggar ", response)
                  if (response.isSucceeded) {
                      Swal.fire({
                          title: '¡Operación Satisfactoria!',
                          text: 'Variable registrada de manera exitosa',
                          icon: 'success',
                          confirmButtonColor: '#364574',
                          confirmButtonText: 'Ok',
                      });

                      // 🔵 Reiniciar formulario y limpiar variables
                      this.validationform.reset();
                      this.selectedFile = null;
                      this.submit = false;
                      this._document.getElementById("closeAgregar")?.click();
                      // 🔵 Resetear validaciones del formulario
                      Object.keys(this.validationform.controls).forEach(key => {
                          this.validationform.get(key)?.setErrors(null);
                      });

                      this.listVariety(); // Recargar lista de variedades
                  }
              },
              error: (err) => {
                  console.error("Error al guardar el archivo: ", err);
              },
              complete: () => {
                  this.isProcessing = false;  // 🔵 Habilitar el botón después de finalizar la petición
              }
          });
      } else {
          console.log("Formulario inválido o archivo no seleccionado");
          this.isProcessing = false;  // 🔵 Volver a habilitar el botón en caso de error de validación
      }
  }


// Método para capturar la imagen seleccionada
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0]; // Guardamos el archivo seleccionado
        this.validationform.get('file')?.setErrors(null); // Limpiamos errores si ya hay un archivo
    }
  }

  deleteVariety(id: number) {
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
                  this.varietyService.deleteVariety(id).subscribe(
                      (response) => {
                          //console.log("resultado del eliminar Usuario: ");
                          this.listVariety();
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
}
