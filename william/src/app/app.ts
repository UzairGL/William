import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Navbar} from "./navbar/navbar";
import {Toasters} from './toasters/toasters'

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, Toasters],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('william');
}
