import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  ionHome,
  ionSettingsOutline,
  ionCalendarOutline,
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-side-bar',
  imports: [NgIcon, RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
  viewProviders: [
    provideIcons({ ionHome, ionSettingsOutline, ionCalendarOutline }),
  ],
})
export class SideBar {}
