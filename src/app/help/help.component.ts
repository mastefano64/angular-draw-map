import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  constructor(private dialogRef: MatDialogRef<HelpComponent>) { }

}
