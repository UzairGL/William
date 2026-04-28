import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
}
