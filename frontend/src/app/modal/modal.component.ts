import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = new FormGroup({
      titre: new FormControl(null),
      datedebut: new FormControl(null),
      datefin: new FormControl(null),
      Lieu: new FormControl(null),
    });
  }
  form!: FormGroup;

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
