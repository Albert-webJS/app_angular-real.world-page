import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoadingComponent {

  constructor() { }

  @Input() isLoading: boolean | null;
  @Input() isAuth: boolean | null;
  @Input() isError: boolean | null;
  @Input() message: string | null;
}
