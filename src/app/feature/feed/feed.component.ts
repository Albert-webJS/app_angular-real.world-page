import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service';
import { Article } from 'src/app/interfaces';
import { CommonModule } from '@angular/common';
import { FeedHeaderComponent } from '../feed-header/feed-header.component';
import { FeedItemComponent } from '../feed-item/feed-item.component';
import { FeedNavComponent } from '../feed-nav/feed-nav.component';
import { PopularTagsComponent } from 'src/app/shared';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [CommonModule, FeedHeaderComponent, FeedItemComponent, FeedNavComponent, PopularTagsComponent]
})
export class FeedComponent {

  public tag: string;
  public tagsElement: Observable<string[]> = this.service.getTagsElement();
  public articles: Observable<Article[]> = this.service.getArticles()

  constructor(
    private service: DataService
  ) { }

  onSelect(tag: string) {
    this.tag = tag
    this.articles = this.service.getArticlesByTag(tag)
  };
}
