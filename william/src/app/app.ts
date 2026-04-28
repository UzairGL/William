import {Component, signal} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {Navbar} from "./navbar/navbar";
import {Toasters} from './toasters/toasters'
import {Footer} from './footer/footer';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Toasters, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(public router: Router) {}

  protected readonly title = signal('william');

  public showNavbar(): boolean {
    return !this.router.url.includes('/register') && !this.router.url.includes('/login');
  }
}
