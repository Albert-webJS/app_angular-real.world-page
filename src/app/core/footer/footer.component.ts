import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class FooterComponent {
  private timer: number;

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
  ) { }

  public scrollToUp(): void | boolean {
    let top = Math.max(this.documentRef.body.scrollTop, this.documentRef.documentElement.scrollTop);
    if (top > 0) {
      window.scrollBy(0, ((top + 100) / -1));
      this.timer = setTimeout("scrollTo()", 20);
    }
    clearInterval(this.timer);
    return false;
  }
}
