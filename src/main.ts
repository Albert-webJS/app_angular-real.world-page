import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app/core/app.component';
import { ArticleComponent, ArticleEditComponent, FeedComponent, SettingsComponent, SingInComponent, SingUpComponent } from './app/feature';
import { AuthGuard } from './app/feature/authorization/auth.guard';
import { environment } from './environments/environment';

const routes: Routes = [
  { path: "", component: FeedComponent },
  { path: "create", component: ArticleEditComponent, canActivate: [AuthGuard], },
  { path: "setting", component: SettingsComponent, canActivate: [AuthGuard] },
  { path: "login", component: SingInComponent },
  { path: "register", component: SingUpComponent },
  { path: "article", component: ArticleComponent },
  {
    path: "user",
    canActivate: [AuthGuard],
    loadComponent: () => import("./app/feature/user-detail/user-detail.component")
      .then(({ UserDetailComponent }) => UserDetailComponent)
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
}).catch(error => console.log(error))