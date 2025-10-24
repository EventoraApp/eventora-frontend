import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionSearch, ionMenu, ionClose, ionLogOutOutline } from '@ng-icons/ionicons';
import { SideNavbar } from "../side-navbar/side-navbar";
import { AuthService } from '../../services/auth-service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterLink, SideNavbar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
    viewProviders: [
    provideIcons({ ionSearch,ionMenu,ionClose,ionLogOutOutline }),
  ],
})
export class Navbar implements OnInit {
  isSideNavActive = false
  authService = inject(AuthService)
  router = inject(Router)
  user = {
   username: '',
   email: '',
   role: '',
   first_name: '',
   last_name: '',
  };

  onSideBarClose(){
    this.isSideNavActive = false
  }
  
  onSideBarOpen(){
    this.isSideNavActive = true

  }
  ngOnInit(): void {
       if(localStorage.getItem("access_token")){this.authService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        console.log(err, 'An error occurred')
        toast.error('Couldnt get current user for some reasons')
      },
    });

  }
  }



  handleLogOut() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
