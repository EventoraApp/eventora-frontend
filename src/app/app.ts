import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { NgxSonnerToaster } from 'ngx-sonner';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, NgxSonnerToaster],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Eventora');
  
  router = inject(Router);
  constructor() {
  }
}
