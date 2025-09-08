import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service'; 
import { Router } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';



@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {

  // Breadcrumb items
  breadCrumbItems!: Array<{}>;

  // Nueva propiedad para guardar el tipo de usuario
  userType: number = 0;
  userId: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10; 
  totalItems: number = 0;
  pageSize: number = 10;
  validationformMatricula!: UntypedFormGroup;
  
  constructor(private authService: AuthService,
              private router: Router
            ) 
            {
              
            }

  get formMatricula() {return this.validationformMatricula.controls;}          
  ngOnInit(): void {
    // Inicializar breadcrumbs
    this.breadCrumbItems = [
      { label: 'Pagina' },
      { label: 'Inicio', active: true }
    ];

    // Verifica si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      console.warn('Usuario no autenticado, redirigiendo a la página de inicio de sesión.');
      this.router.navigate(['/auth/login']);
      return;
    }

    
    this.userType = this.authService.getUserType();
    this.userId = this.authService.getUserId();
  }


}