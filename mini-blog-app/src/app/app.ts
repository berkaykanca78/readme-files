import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { ScrollNavComponent } from './shared/components/scroll-nav/scroll-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollNavComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
