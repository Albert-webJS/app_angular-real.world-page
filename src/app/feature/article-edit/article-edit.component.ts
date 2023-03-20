import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { AuthService, DataService } from 'src/app/service';
import { LoadingComponent } from 'src/app/shared';
import { ArticleEditElementForm, EDIT_ELEMENT_ITEMS } from './edit-item';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
})

export class ArticleEditComponent {

  public editElementFrom: ArticleEditElementForm[] = EDIT_ELEMENT_ITEMS
  public editFormControl: FormGroup = this.controlEditForm();

  public isLoading = new BehaviorSubject<boolean>(false);
  public isError = new BehaviorSubject<boolean>(false);
  public eventMessageDataProcessing = new BehaviorSubject<string>("");

  constructor(
    private fb: FormBuilder,
    private service: DataService,
    private authService: AuthService,
    private router: Router,
  ) { }

  isAuthenticate(): boolean {
    return this.authService.isAuthentificated;
  }

  controlEditForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      body: ["", [Validators.required, Validators.minLength(100), Validators.maxLength(400)]],
      tagList: ["", Validators.required],
    })
  }

  onSwitchHomePath(): void {
    this.router.navigate([this.authService.documentRef.location.origin])
  }

  onSubmited(): void {
    this.isLoading.next(true);
    this.service.createArticle({
      article: {
        title: this.editFormControl.value.title,
        description: this.editFormControl.value.description,
        body: this.editFormControl.value.body,
        tagList: [...this.editFormControl.value.tagList],
      }
    }).subscribe({
      next: () => {
        debounceTime(500);
        this.onSwitchHomePath();
      },
      error: (error: HttpErrorResponse) => {
        this.isError.next(true);
        this.isLoading.next(false);
        const { errors } = error.error;
        const message = Object.entries(errors).join("");
        this.eventMessageDataProcessing.next(`Failed: ${message}`)
      },
      complete: () => {
        this.isLoading.next(false);
        this.eventMessageDataProcessing.next("Success !")
        this.editFormControl.reset();
      }
    })
  }
}
