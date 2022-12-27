import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../service';
import { InputElementForm, INPUT_ELEMENT_FORMS } from '../input-item';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/interfaces';
import { Loading, Status } from '../auth.types';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
})
export class SingUpComponent {

  public userForm: FormGroup = this.createUserForm();
  public inputElementForm: InputElementForm[] = INPUT_ELEMENT_FORMS;

  public isLoading = new BehaviorSubject<boolean>(Loading.pending);
  public isError = new BehaviorSubject<boolean>(false);
  public eventMessageDataProcessing = new BehaviorSubject<string>("");

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public service: AuthService,
  ) { }

  createUserForm(): FormGroup {
    return this.fb.group({
      username: ["", Validators.pattern(/^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/)],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  };

  onSwitchPath(): void {
    this.router.navigate(["/login"]);
  };

  switchHomePage(): void {
    setTimeout(() => {
      this.router.navigate([this.service.document.location.origin])
    }, 500)
  };

  onSubmited(): void {
    this.isLoading.next(Loading.start);
    this.service.registration({
      user: {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      }
    })
      .pipe(
        tap(user => this.service.user$.next(user["user"] as User))
      )
      .subscribe({
        next: () => {
          this.isLoading.next(Loading.completed);
          this.eventMessageDataProcessing.next(Status.success);
          this.userForm.reset();
          this.switchHomePage();
        },
        error: (error: HttpErrorResponse) => {
          this.isError.next(true);
          const { errors } = error.error;
          const message = Object.entries(errors).join("");
          this.eventMessageDataProcessing.next(`${Status.error}, ${message} !`);
          this.isLoading.next(Loading.completed);
        }
      })
  };
}
