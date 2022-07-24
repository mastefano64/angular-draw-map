import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '550px';
    let dialogRef = this.dialog.open(HelpComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === "ok") {

      }
      if (data === "no") {

      }
    });
  }

}
