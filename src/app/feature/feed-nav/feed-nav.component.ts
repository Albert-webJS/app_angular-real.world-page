import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feed-nav',
  templateUrl: './feed-nav.component.html',
  styleUrls: ['./feed-nav.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class FeedNavComponent {
  @Input() tag: string;
}
