import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService, AuthService } from 'src/app/service';
import { TagComponent } from 'src/app/shared';
import { Article } from '../../interfaces/article';


@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
  standalone: true,
  imports: [CommonModule, TagComponent],
})

export class FeedItemComponent {

  @Input() articles: Observable<Article[]>;

  constructor(
    public service: DataService,
    private authService: AuthService,
    private router: Router,
  ) { };

  onSwitchPath(): void {
    if (!this.authService.isAuthentificated) {
      this.router.navigate(["/register"]);
    }
  }
}
