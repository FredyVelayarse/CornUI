import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ADTSettings } from "angular-datatables/src/models/settings";
import jsPDF from "jspdf";
import * as html2pdf from 'html2pdf.js';
import { VarietyService } from '../../../../service/variety/variety.service';
import { AuthService } from "../../../../service/auth/auth.service";
import { Variety } from "../../../../model/variety/variety.model";
import { CornService } from "src/app/service/corn/corn.service";
import { HuskService } from "src/app/service/husk/husk.service";
import { SeedService } from "src/app/service/seed/seed.service";
import { Corn } from "src/app/model/corn/corn.model";
import { Husk } from "src/app/model/husk/husk.model";
import { Seed } from "src/app/model/seed/seed.model";
import { ImagenService } from "src/app/service/imagen/imagen.service";
import { Imagen } from "src/app/model/imagen/imagen.model";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { LocalitationService } from "src/app/service/localitation/localitation.service";
import { DOCUMENT } from "@angular/common";
import { Localitation } from "src/app/model/localitation/localitacion.model";
declare var GLightbox: any;
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";

interface ExportDataItem {
    'N°': number;
    'Nombre Objeto': string;
    'Tipo': string;
    'Ancho (cm)': number;
    'Alto (cm)': number;
    'Color 1': string;
    'Color 2': string;
    'Color 3': string;
    'Color 4': string;
  }

@Component({
    selector: 'app-detail-variety',
    templateUrl: './detail-variety.component.html',
    styleUrls: ['./detail-variety.component.scss']
})

/** 
   * certificate Component
   */
export class DetailVarietyComponent implements OnInit {

    issueDate = new Date().toLocaleDateString();
    dispersionDataCorn: any[] = [];
    dispersionDataHusk: any[] = [];
    dispersionDataSeed: any[] = [];
    title: string = "Detalle de variedad"
    breadCrumbItems!: Array<{}>;
    dtOptions: ADTSettings = {};
    userType: number = 0;
    IdVariety: number | null = null;
    userIdCreate: number = 0;
    fechaHoraActual: string = '';
    validationform!: UntypedFormGroup;
    submit!: boolean;
    lightbox: any;
    
    showForm: boolean = false; // Controla la visibilidad del formulario
  newDescription: string = "";

    detailVariety: Variety = new Variety(0,"","","");
    detailCorn: Corn[] = [];
    detailHusk: Husk[] = [];
    detailSeed: Seed[] = [];
    imagenVariety: Imagen[] = [];
    localitationVariety: Localitation[] = [];

    constructor(@Inject(DOCUMENT) private _document: Document,
        private authService: AuthService,
        private varietyService: VarietyService,
        private cornService: CornService,
        private huskService: HuskService,
        private seedService: SeedService,
        private imagenService: ImagenService,
        private router: Router,
        private route: ActivatedRoute,
        private localitationService: LocalitationService,
        private formBuilder: UntypedFormBuilder
    ){
        
    }
    get form() { return this.validationform.controls; } 

    ngOnInit(): void {

        if (!this.authService.isAuthenticated()) {
            console.warn('Usuario no autenticado, redirigiendo a la página de inicio de sesión.');
            this.router.navigate(['/']);
            return;
        }
        this.userIdCreate = this.authService.getUserId();
        this.userType = this.authService.getUserType();
        if (this.userType !== 1) {
            console.warn('Acceso denegado. Esta vista es solo para administradores.');
            this.router.navigate(['/access-denied']); 
        }
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            language: {
            url: 'https://cdn.datatables.net/plug-ins/2.0.8/i18n/es-ES.json'
            },
            destroy: true
        };
        //Capturar Id
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.IdVariety = id ? +id : null;
            if (this.IdVariety) {

                this.loadDetailVariety(this.IdVariety);
                this.loadDetailCorn(this.IdVariety);
                this.loadDetailHusk(this.IdVariety);
                this.loadDetailSeed(this.IdVariety);
                this.loadDetailImagen(this.IdVariety);
                this.loadDetailLocalitate(this.IdVariety);
                this.loadDispersionData(this.IdVariety);
            }
        });
        this.breadCrumbItems = [
            { label: 'Variable de maiz', active: true  }
          ];
        this.actualizarFechaHora(); // Llamada inicial
        setInterval(() => this.actualizarFechaHora(), 1000);

        this.validationform = this.formBuilder.group({
            Latitude: [0, [Validators.required]],
            Longitude: [0, [Validators.required]],
          });
    }

    convertBGRtoRGB(color: string | null | undefined): string {
        if (!color || typeof color !== "string" || color.trim() === "") {
            return "rgb(0, 0, 0)"; // Color por defecto si es null, undefined o vacío
        }
    
        const match = color.match(/\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match && match.length === 4) {  // Asegurar que hay 3 valores numéricos
            const [_, b, g, r] = match.map(Number);
            return `rgb(${r}, ${g}, ${b})`;
        }
    
        console.warn("Formato de color inválido:", color);
        return "rgb(0, 0, 0)"; // Retornar color por defecto en caso de error
    }
    

    loadDetailVariety(id: number): void {
        this.varietyService.getById(id).subscribe((result: any) => {
            this.detailVariety = result.data;
        });
    }

    loadDetailCorn(id: number): void {
        this.cornService.getById(id).subscribe((result: any) => {
            //console.log(result.data);
            this.detailCorn = result.data;
            //console.log("corn:",this.detailCorn )
        });
    }

    loadDetailHusk(id: number): void {
        this.huskService.getById(id).subscribe((result: any) => {
            this.detailHusk = result.data;
            //console.log("husk:",this.detailHusk )
        });
    }

    loadDetailSeed(id: number): void {
        this.seedService.getById(id).subscribe((result: any) => {
            this.detailSeed = result.data;
            //console.log("seed:",this.detailSeed )
        });
    }

    loadDetailLocalitate(id: number): void {
        this.localitationService.getById(id).subscribe((result: any) => {
            //console.log("localizacion: ", result.data);
            this.localitationVariety = result.data;
        });
    }

    loadDetailImagen(id: number): void {
        this.imagenService.getById(id).subscribe((result: any) => {
            //console.log("Imagen recibida:", result.data);
            
            // Asegurar que es un array
            this.imagenVariety = result.data;
    
            setTimeout(() => {
                if (this.lightbox) {
                    this.lightbox.destroy(); // Evitar duplicados
                }
                this.lightbox = GLightbox({
                    touchNavigation: true,
                    loop: true,
                    zoomable: true,
                    draggable: true,
                    width: '100vw',
                    height: 'auto',
                    openEffect: 'zoom',
                    closeEffect: 'fade',
                    slideEffect: 'slide',
                    moreText: 'Ver más',
                    closeButton: true,
                    zoomButton: true,
                    fullscreenButton: true,
                    downloadButton: true,
                });
            }, 500); // Pequeño delay para asegurar que Angular renderiza las imágenes
        });
    }
    
    

    generatePDF(): void {
        const element = document.getElementById('pdfContent');
        if (!element) {
            console.error("Elemento con ID 'pdfContent' no encontrado.");
            return;
        }
    
        const images = Array.from(element.getElementsByTagName("img")); // Convertir HTMLCollection en Array
        let loadedImages = 0;
        const totalImages = images.length;
    
        if (totalImages === 0) {
            this.createPDF(element);
            return;
        }
    
        images.forEach(img => {
            // Forzar recarga de imágenes para activar `onload`
            const src = img.src;
            img.src = "";
            img.src = src;
    
            img.onload = img.onerror = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    this.createPDF(element);
                }
            };
        });
    }
    
    createPDF(element: HTMLElement) {
        // Ocultar temporalmente los elementos excluidos
        const excludedElements = document.querySelectorAll('.no-print, .hide-in-pdf');
        excludedElements.forEach(el => (el as HTMLElement).style.display = 'none');
    
        const options = {
            margin: 10,
            filename: `Reporte.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };
    
        html2pdf()
            .from(element)
            .set(options)
            .save()
            .then(() => {
                // Restaurar la visibilidad de los elementos excluidos
                excludedElements.forEach(el => (el as HTMLElement).style.display = '');
            });
    }
    
    addLocalitation() { 
        this.submit = true;
        if (this.validationform.valid) {
            const localitation: Localitation = new Localitation(
                0,
                Number(this.validationform.value.Latitude),
                Number(this.validationform.value.Longitude),
                this.IdVariety??0
            );
            //console.log("Datos de envio: ", localitation);
            this.localitationService.saveLocalitation(localitation).subscribe({
                next: (response) => {
                    //console.log("Registro exitoso", response);
                    this.loadDetailLocalitate(this.IdVariety || 0);
                    this.validationform.reset();
                    this._document.getElementById("closeAgregar")?.click();
                },
                error: (err) => {
                    console.error("Error al guardar la localización", err);
                }
            });
        } else {
            //console.log("Formulario Inválido");
        }
    }
    toggleForm(): void {
        this.showForm = !this.showForm;
        if (this.showForm) {
          this.newDescription = this.detailVariety.Description || ""; // Pre-cargar la descripción actual
        }
      }
    
      updateDescription(): void {
        if (!this.newDescription.trim()) {
          return; // Evita enviar valores vacíos
        }
    
        this.varietyService.addDescription(this.IdVariety??0, this.newDescription).subscribe({
          next: (response) => {
            if (response.isSucceeded) {
              this.detailVariety.Description = this.newDescription; 
              this.showForm = false;
            } else {
              console.error("Error al actualizar:", response.message);
            }
          },
          error: (err) => console.error("Error HTTP:", err)
        });
      }
    convertToInteger(note: string): number {
        const number = parseInt(note, 10);
        
        if (isNaN(number)) {
            return NaN; 
        }
        
        return number; 
    }
    convertToString(number: number): string {
        const parsedNumber = parseInt(number.toString(), 10);
    
        if (isNaN(parsedNumber)) {
            return 'NaN'; 
        }
        
        return parsedNumber.toString(); 
    }

    actualizarFechaHora(): void {
        const fecha = new Date();
        const año = fecha.getFullYear();
        const mes = this.formatoDosDigitos(fecha.getMonth() + 1); 
        const dia = this.formatoDosDigitos(fecha.getDate());
        const horas = this.formatoDosDigitos(fecha.getHours());
        const minutos = this.formatoDosDigitos(fecha.getMinutes());
        const segundos = this.formatoDosDigitos(fecha.getSeconds());
    
        this.fechaHoraActual = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
      }
    
      private formatoDosDigitos(valor: number): string {
        return valor < 10 ? `0${valor}` : `${valor}`;
      }

      loadDispersionData(varietyId: number): void {
        this.cornService.getDispersionData(varietyId).subscribe({
          next: (response) => {
            //console.log('Respuesta completa:', response);
            
            if (response.isSucceeded) {
              
              
              this.dispersionDataCorn = response.data.corn || [];
              this.dispersionDataHusk = response.data.husk || [];
              this.dispersionDataSeed = response.data.seed || [];

              //console.log('Datos Corn:', this.dispersionDataCorn);
              //console.log('Datos Husk:', this.dispersionDataHusk);
              //console.log('Datos Seed:',  this.dispersionDataSeed );
            } else {
              console.error('Error al cargar datos de dispersión:', response.message);
            }
          },
          error: (err) => {
            console.error('Error en la solicitud:', err);
          }
        });
      }

      exportToCSV(): void {
        // Preparar datos
        const data = this.prepareExportData();
        
        // Crear contenido CSV
        const csvContent = this.convertToCSV(data);
        
        // Crear y descargar archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `detalle_variedad_${this.IdVariety}.csv`);
      }
    
      exportToExcel(): void {
        // Preparar datos
        const data = this.prepareExportData();
        
        // Crear libro de trabajo de Excel
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { 
          Sheets: { 'Detalle': worksheet }, 
          SheetNames: ['Detalle'] 
        };
        
        // Generar archivo Excel
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `detalle_variedad_${this.IdVariety}.xlsx`);
      }
      private prepareExportData(): any[] {
        const exportData: ExportDataItem[] = [];
        
        // Procesar datos de Corn
        this.detailCorn.forEach((corn, index) => {
          exportData.push({
            'N°': index + 1,
            'Nombre Objeto': corn.NameObject,
            'Tipo': 'Corn',
            'Ancho (cm)': corn.WidthCorn,
            'Alto (cm)': corn.HighCorn,
            'Color 1': corn.ColorCorn1,
            'Color 2': corn.ColorCorn2 || '',
            'Color 3': corn.ColorCorn3 || '',
            'Color 4': corn.ColorCorn4 || ''
          });
        });
    
        // Procesar datos de Husk
        this.detailHusk.forEach((husk, index) => {
          exportData.push({
            'N°': index + 1,
            'Nombre Objeto': husk.NameObject,
            'Tipo': 'Husk',
            'Ancho (cm)': husk.WidthHusk,
            'Alto (cm)': husk.HighHusk,
            'Color 1': husk.ColorHusk1,
            'Color 2': husk.ColorHusk2 || '',
            'Color 3': husk.ColorHusk3 || '',
            'Color 4': husk.ColorHusk4 || ''
          });
        });
    
        // Procesar datos de Seed
        this.detailSeed.forEach((seed, index) => {
          exportData.push({
            'N°': index + 1,
            'Nombre Objeto': seed.NameObject,
            'Tipo': 'Seed',
            'Ancho (cm)': seed.WidthSeed,
            'Alto (cm)': seed.HighSeed,
            'Color 1': seed.ColorSeed1,
            'Color 2': seed.ColorSeed2 || '',
            'Color 3': seed.ColorSeed3 || '',
            'Color 4': '' // Seed no tiene color 4
          });
        });
    
        return exportData;
      }
    
      private convertToCSV(data: any[]): string {
        if (data.length === 0) return '';
        
        // Obtener encabezados
        const headers = Object.keys(data[0]);
        
        // Crear filas
        const rows = data.map(item => 
          headers.map(fieldName => 
            this.csvEscape(item[fieldName])
          )
        );
        
        // Combinar encabezados y filas
        return [
          headers.map(h => this.csvEscape(h)).join(','),
          ...rows.map(row => row.join(','))
        ].join('\n');
      }
    
      private csvEscape(value: any): string {
        if (value === null || value === undefined) return '';
        
        const stringValue = String(value);
        
        // Escapar comillas y agregar comillas si contiene caracteres especiales
        if (/[",\n]/.test(stringValue)) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        
        return stringValue;
      }
      deleteLocalizacion(id: number) {
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
                    this.localitationService.delete(id).subscribe(
                        (response) => {
                            //console.log("resultado del eliminar Usuario: ");
                            this.loadDetailLocalitate(this.IdVariety || 0);
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