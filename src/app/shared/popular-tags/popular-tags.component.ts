import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
  standalone: true,
  imports: [CommonModule, TagComponent],
})

export class PopularTagsComponent {

  @Output() outSelectedTag = new EventEmitter<string>();
  @Input() tags: Observable<string[]>;


  public selectedTag: string;
  public isActive: boolean = false;

  onSelectTag(tag: string): void {
    this.outSelectedTag.emit(tag);
    this.selectedTag = tag;
  }
}
