import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ArticleComponent implements OnInit {


  public currentUser = this.service.user$;

  constructor(
    public service: AuthService
  ) { }

  ngOnInit(): void {
  }
}
