import { environment as env } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Article, ArticleRequest, Articles } from '../interfaces/article';
import { AuthService } from '.';

type Tags = {
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private tags: Observable<string[]>;
  private articles: Observable<Article[]>;
  private currentTag: string;
  // private articlesByTag: Observable<Article[]>;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTagsElement(): Observable<string[]> {
    if (!this.tags) {
      this.tags = this.http.get<Tags>(`${env.domain}/api/tags`)
        .pipe(
          map(tags => tags.tags),
          shareReplay(1)
        )
    }
    return this.tags;
  };

  getArticles(): Observable<Article[]> {
    if (!this.articles) {
      this.articles = this.http.get<Articles>(`${env.domain}/api/articles?limit=10&offset=0`)
        .pipe(
          map(articles => articles.articles),
          shareReplay(1),
        )
    }
    return this.articles;
  };

  getArticlesByTag(tag: string): Observable<Article[]> {
    if (this.currentTag !== tag) {
      this.articles = this.http.get<Articles>(`${env.domain}/api/articles?tag=${tag}`)
        .pipe(
          map(articles => articles.articles),
          shareReplay({ refCount: true })
        )
    }
    this.currentTag = tag;
    return this.articles;
  };

  createArticle(article: ArticleRequest): Observable<Article> {
    const headers = new HttpHeaders({
      Authorization: `Token ${this.authService.user$.value?.token}`
    })
    return this.http.post<Article>(`${env.domain}/api/articles`, article, { headers });
  };
}
