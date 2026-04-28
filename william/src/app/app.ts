import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from "./navbar/navbar";
import {Toasters} from './toasters/toasters'
import {Footer} from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Toasters, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('william');
}
