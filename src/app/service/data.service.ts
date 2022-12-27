import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, publishReplay, shareReplay } from 'rxjs';
import { Article, ArticleRequest, Articles} from '../interfaces/article';

type Tags = {
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getTagsElement(): Observable<string[]> {
    return this.http.get<Tags>(`${env.domain}/api/tags`)
      .pipe(
        shareReplay(1),
        map(tags => tags.tags)
      )
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Articles>(`${env.domain}/api/articles?limit=10&offset=0`)
      .pipe(
        shareReplay(1),
        map(articles => articles.articles),
      )
  }

  getArticlesByTag(tag: string): Observable<Article[]> {
    return this.http.get<Articles>(`${env.domain}/api/articles?tag=${tag}`)
      .pipe(
        map(articles => articles.articles)
      )
  }

  createArticle(article: ArticleRequest): Observable<Article> {
    return this.http.post<Article>(`${env.domain}/api/articles`, article);
  }
}
