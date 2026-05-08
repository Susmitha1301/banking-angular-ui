import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-message.html',
  styleUrl: './success-message.css'
})
export class SuccessMessageComponent {
  @Input() message = '';
}
