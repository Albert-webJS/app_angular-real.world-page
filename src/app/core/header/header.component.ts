import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
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

  // public isAuthenticate: boolean = this.service.isAuthentificated; 
  
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
