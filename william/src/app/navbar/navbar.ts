import {Component, Input} from '@angular/core';
import {TitleCasePipe} from '@angular/common';
import {RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TitleCasePipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  @Input({ required: true }) title!: string;
}
