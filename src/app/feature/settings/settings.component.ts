import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})

export class SettingsComponent {

  public settingFormControl: FormGroup = this.controlFormSetting();

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
  ) { }

  controlFormSetting(): FormGroup {
    return this.fb.group({
      image: [this.service.user$.value?.image || "", Validators.required],
      username: [this.service.user$.value?.username  || "", Validators.required],
      bio: [this.service.user$.value?.bio || "", [Validators.required, Validators.minLength(100)]],
      email: [this.service.user$.value?.email || "", [Validators.required, Validators.email]],
      password: [this.service.user$.value?.password || "", [Validators.required, Validators.minLength(6)]],
    })
  };

  logOut(): void {
    this.service.logout();
  };

  onSubmited(): void {
    const { image, username, bio, email, password } = this.settingFormControl.value
    this.settingFormControl.reset();
  };
}
