import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces';
import { DataService } from 'src/app/service';
import { ArticleEditElementForm, EDIT_ELEMENT_ITEMS } from './edit-item';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})

export class ArticleEditComponent {

  public currentUserInfo: User | null;
  public editElementFrom: ArticleEditElementForm[] = EDIT_ELEMENT_ITEMS
  public editFormControl: FormGroup = this.controlEditForm();

  constructor(
    private fb: FormBuilder,
    private service: DataService
  ) { }

  controlEditForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required, Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(300)]],
      body: ["", [Validators.required, Validators.minLength(100), Validators.maxLength(400)]],
      tagList: ["", Validators.required],
    })
  }

  onSubmited(): void {
    this.service.createArticle({
      article: {
        title: this.editFormControl.value.title,
        description: this.editFormControl.value.description,
        body: this.editFormControl.value.body,
        tagList: [...this.editFormControl.value.tagList],
      }
    }).subscribe({
      next: () => {
        this.editFormControl.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log("error response article: ", error)
      }
    })
  }

}
