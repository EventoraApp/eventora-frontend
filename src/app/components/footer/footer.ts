import { Component } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionLogoFacebook,ionLogoInstagram,  ionLogoX} from '@ng-icons/ionicons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
   viewProviders: [
    provideIcons({  ionLogoFacebook, ionLogoX, ionLogoInstagram }),
  ],
})
export class Footer {

}
