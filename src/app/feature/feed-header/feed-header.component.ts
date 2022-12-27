import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TitleDescription {
  title: string;
  subTitle: string;
}

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})

export class FeedHeaderComponent {
  infoHeader: TitleDescription = {
    title: "conduit",
    subTitle: "A place to share your knowledge."
  }
}
