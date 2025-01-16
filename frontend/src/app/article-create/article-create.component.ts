import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/models/publication';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent {
  form!: FormGroup;
  pubGlobal!: Publication;
  constructor(
    private fb: FormBuilder,
    private PS: PublicationService,
    private router: Router,
    private dialogRef: MatDialogRef<ArticleCreateComponent>,
    private activatedRoute: ActivatedRoute
  ) {
    // Initialize form in constructor using FormBuilder
    this.form = this.fb.group({
      titre: ['', Validators.required],
      lien: ['', Validators.required],
      date: [null],
      sourcepdf: ['', Validators.required],
    });
  }

  initForm2(pub: Publication): void {
    this.form = new FormGroup({
      titre: new FormControl(pub.titre, [Validators.required]),
      lien: new FormControl(pub.lien, [Validators.required]),
      date: new FormControl(pub.date, []),
      sourcepdf: new FormControl(pub.sourcepdf, [Validators.required]),
    });
  }
  ngOnInit(): void {
    const idCourant1 = this.activatedRoute.snapshot.params['id'];
    console.log(idCourant1);
    if (!!idCourant1) {
      this.PS.getPublicationById(idCourant1).subscribe((pub) => {
        this.pubGlobal = pub;
        this.initForm2(pub);
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}
