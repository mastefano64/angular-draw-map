import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router) { }

  onGoPage1(): void {
    this.router.navigate(['/page1']);
  }

  onGoPage2(): void {
    this.router.navigate(['/page2']);
  }

}
