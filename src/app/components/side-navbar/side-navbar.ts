import { Component } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {ionClose } from '@ng-icons/ionicons';

@Component({
  selector: 'app-side-navbar',
  imports: [NgIcon],
  templateUrl: './side-navbar.html',
  styleUrl: './side-navbar.scss',
   viewProviders: [
    provideIcons({ionClose}),
  ],
})
export class SideNavbar {

}
