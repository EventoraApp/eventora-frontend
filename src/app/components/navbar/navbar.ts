import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionSearch, ionMenu, ionClose } from '@ng-icons/ionicons';
import { SideNavbar } from "../side-navbar/side-navbar";

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterLink, SideNavbar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
    viewProviders: [
    provideIcons({ ionSearch,ionMenu,ionClose }),
  ],
})
export class Navbar {
  isSideNavActive = false

  onSideBarClose(){
    this.isSideNavActive = false
  }
  
  onSideBarOpen(){
    this.isSideNavActive = true

  }

}
