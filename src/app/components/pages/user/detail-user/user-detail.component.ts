import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/model/user/users.model';
import { UserService } from 'src/app/service/user/user.service';
import { ServiceResultGeneric } from 'src/app/model/result.info'; // Asegúrate de que esta importación sea correcta
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { DetailUser } from 'src/app/model/user/detailUser.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userLoging: Users = new Users(0, "", "", "", "", "", "", "", "", true,new Date(), 2);
  userDetail: DetailUser = new DetailUser(0,0,0,"","","");
  userId: number | null = null;
  userType: number = 0;
  


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.documentElement.setAttribute('data-sidebar-size', 'lg');
    // Obtenemos el ID de usuario de los parámetros de la URL
    this.userType = this.authService.getUserType();
    if(this.userType == 1 || this.userType == 2){
      //console.log("Resultado de consulta comparacion de tipo: ", this.userLoging);
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        this.userId = id ? +id : null;
        if (this.userId) {
          //console.log("Resultado de consulta id de ruta: ", this.userLoging);
          this.loadUser();

        }
      });
    }else{
      
      this.userId = this.authService.getUserId();
      this.loadUser();

    }

    
  }
  openUserDetail(userId: number): void {
    this.router.navigate(['/user-detail', userId]);
  }
  loadUser(): void {
    if (this.userId) {
      this.userService.searchUserId(this.userId).subscribe(
        (result: ServiceResultGeneric<Users>) => {
          if (result.isSucceeded && result.data) {
            this.userLoging = result.data; 
            //console.log("Resultado de consulta id de estudiante local: ", this.userLoging);
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

  //searchDetailUserId
}