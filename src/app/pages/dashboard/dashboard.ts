import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from "../../components/side-bar/side-bar";
import { DashNavbar } from "../../components/dash-navbar/dash-navbar";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideBar, DashNavbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
