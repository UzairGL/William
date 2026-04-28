import {Injectable, signal} from '@angular/core';

export interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<ToastInfo[]>([]);

  private nextId = 0;

  show(message: string, type: 'success' | 'danger' | 'info' | 'warning' = 'info'): void {
    const id = this.nextId++;
    this.toasts.update(currentToasts => [...currentToasts, {id, message, type}]);

    setTimeout(() => {
      this.remove(id);
    }, 5000);
  }

  remove(id: number): void {
    this.toasts.update(currentToasts => currentToasts.filter(t => t.id !== id));
  }
}
