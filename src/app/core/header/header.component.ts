import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service';
import { LoadingComponent } from 'src/app/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})

export class HeaderComponent {

  constructor(private service: AuthService) { }

  isAuthenticate(): boolean {
    return this.service.isAuthentificated;
  };

  getUserName(): string | undefined {
    return this.service.user$.value?.username;
  };

  logOut(): void {
    this.service.logout();
  };
}
