import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/models/Article';
import { ArticleService } from 'src/services/article.service';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
})
export class ArticleCreateComponent {
  form!: FormGroup;
  pubGlobal!: Article;
  range = new FormGroup({
    titre: new FormControl(null, [Validators.required]),
    lien: new FormControl(null, [Validators.required]),
    date: new FormControl<string | null>(null),
    sourcepdf: new FormControl(null, [Validators.required]),
  });
  constructor(
    private PS: ArticleService,
    private router: Router,
    private dialogRef: MatDialogRef<ArticleCreateComponent>,
    private activatedRoute: ActivatedRoute
  ) {}

  initForm2(pub: Article): void {
    this.form = new FormGroup({
      titre: new FormControl(pub.titre, [Validators.required]),
      lien: new FormControl(pub.lien, [Validators.required]),
      date: new FormControl(pub.date, []),
      sourcepdf: new FormControl(pub.sourcepdf, [Validators.required]),
    });
  }
  ngOnInit(): void {
    const idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(idCourant1);
    if (!!idCourant1) {
      // if truly idCourant  // je suis dans edit
      this.PS.getArticleById(idCourant1).subscribe((pub) => {
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
