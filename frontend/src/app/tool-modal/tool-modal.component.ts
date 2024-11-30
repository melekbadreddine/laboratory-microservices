import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tool-modal',
  templateUrl: './tool-modal.component.html',
  styleUrls: ['./tool-modal.component.css'],
})
export class ToolModalComponent implements OnInit {
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ToolModalComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      source: new FormControl(null),
      date: new FormControl(null),
    });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
