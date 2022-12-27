import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  standalone: true,
  imports: [CommonModule],
})

export class TagComponent {

  @Input() tag: string;
  @Input() selectedTag: string;
  @Input() appearance: string;

}
