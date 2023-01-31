import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import { User } from 'src/app/interfaces';
import { AuthService } from 'src/app/service';
import { InputElementForm, INPUT_ELEMENT_FORMS } from '../input-item';
import { Loading, Status } from '../auth.types';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent]
})
export class SingInComponent {

  public userFormConfirmation: FormGroup = this.userFormVerification();
  public inputElementForm: InputElementForm[] = INPUT_ELEMENT_FORMS;

  public isLoading = new BehaviorSubject<boolean>(Loading.pending);
  public isError = new BehaviorSubject<boolean>(false);
  public eventMessageDataProcessing = new BehaviorSubject<string>("");

  constructor(
    private fb: FormBuilder,
    public service: AuthService,
    public router: Router
  ) { };

  userFormVerification(): FormGroup {
    return this.fb.group({
      email: ["", Validators.email],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  };

  onSwitchPath(): void {
    this.router.navigate(["/register"]);
  }

  switchHomePage(): void {
    this.router.navigate([this.service.document.location.origin])
  };

  onSubmited(): void {
    this.isLoading.next(Loading.start)
    this.service.login({
      user: {
        email: this.userFormConfirmation.value.email,
        password: this.userFormConfirmation.value.password,
      }
    })
      .pipe(
        tap(user => this.service.user$.next(user["user"] as User))
      )
      .subscribe({
        next: () => {
          debounceTime(500);
          this.switchHomePage();
        },
        error: (error: HttpErrorResponse) => {
          this.isError.next(true);
          const { errors } = error.error;
          const message = Object.entries(errors).join("");
          this.eventMessageDataProcessing.next(`${Status.error}, ${message} !`);
          this.isLoading.next(Loading.completed);
        },
        complete: () => {
          this.isLoading.next(Loading.completed);
          this.eventMessageDataProcessing.next(Status.success);
          this.userFormConfirmation.reset();
        }
      })
  };
}
