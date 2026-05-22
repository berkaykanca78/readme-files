import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-markdown-content',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  template: `<article class="markdown-body" [innerHTML]="safeHtml()"></article>`,
  styleUrl: './markdown-content.component.scss',
})
export class MarkdownContentComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly html = input.required<string>();

  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.html());
  }
}
