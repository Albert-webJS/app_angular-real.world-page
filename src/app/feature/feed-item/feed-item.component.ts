import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service';
import { TagComponent } from 'src/app/shared';
import { Article } from '../../interfaces/article';


@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  standalone: true,
  imports: [CommonModule, TagComponent, RouterModule],
})

export class FeedItemComponent {

  @Input() articles: Observable<Article[]>;

  constructor(
    public service: DataService,
  ) { };

  getArticleSlug(slug: string): void {
    console.log("request: ", this.service.getArticleBySlug(slug).subscribe());
  }
}
