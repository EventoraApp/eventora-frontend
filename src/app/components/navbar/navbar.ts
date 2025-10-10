import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionSearch, ionMenu } from '@ng-icons/ionicons';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
    viewProviders: [
    provideIcons({ ionSearch,ionMenu }),
  ],
})
export class Navbar {

}
