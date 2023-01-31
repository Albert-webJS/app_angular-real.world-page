import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/service';
import { LoadingComponent } from 'src/app/shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
})

export class SettingsComponent {

  public settingFormControl: FormGroup = this.controlFormSetting();

  public isLoading = new BehaviorSubject<boolean>(false);
  public isError = new BehaviorSubject<boolean>(false);
  public eventMessageDataProcessing = new BehaviorSubject<string>("");


  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) { }

  isAuthenticate(): boolean {
    return this.service.isAuthentificated;
  }

  onSwithHomePage(): void {
    this.router.navigate([this.service.document.location.origin])
  };

  controlFormSetting(): FormGroup {
    return this.fb.group({
      image: [this.service.user$.value?.image || "", Validators.required],
      username: [this.service.user$.value?.username || "", Validators.required],
      bio: [this.service.user$.value?.bio || "", [Validators.required, Validators.minLength(100)]],
      email: [this.service.user$.value?.email || "", [Validators.required, Validators.email]],
      password: [this.service.user$.value?.password || "", [Validators.required, Validators.minLength(6)]],
    })
  };

  logOut(): void {
    this.service.logout();
  };

  onSubmited(): void {
    this.isLoading.next(true);
    this.service.upDateUser({
      user: {
        username: this.settingFormControl.value.username,
        email: this.settingFormControl.value.email,
        bio: this.settingFormControl.value.bio,
        image: this.settingFormControl.value.image,
        password: this.settingFormControl.value.password,
      }
    }).subscribe({
      next: () => {
        debounceTime(500);
        this.onSwithHomePage();
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading.next(false);
        this.isError.next(true);
        const { errors } = error.error;
        const message = Object.entries(errors).join("");
        this.eventMessageDataProcessing.next(`Failed: ${message}`);
      },
      complete: () => {
        this.isLoading.next(false);
        this.eventMessageDataProcessing.next("Success !");
        this.settingFormControl.reset();
      }
    })
  };
}
