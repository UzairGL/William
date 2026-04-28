import {Component, inject} from '@angular/core';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-toasters',
  imports: [],
  templateUrl: './toasters.html',
  styleUrl: './toasters.scss',
})
export class Toasters {
  service = inject(ToastService)
}
