import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/services/article.service';
import { ConsulterInvitesComponent } from '../consulter-invites/consulter-invites.component';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';
import { MemberService } from 'src/services/member.service';
import { Router } from '@angular/router';
import { ArticleCreateComponent } from '../article-create/article-create.component';
import { Article } from 'src/models/Article';

@Component({
  selector: 'app-articles',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['id', 'titre', 'date', 'lien', 'sourcepdf'];
  dataSource!: MatTableDataSource<Article>;
  obs!: Observable<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ES: any;
  $pub!: Article;

  constructor(
    private PS: ArticleService,
    private MS: MemberService,
    private dialog: MatDialog,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  loadArticles(): void {
    this.PS.getArticles().subscribe((articles) => {
      this.dataSource = new MatTableDataSource(articles);
      this.obs = this.dataSource.connect();

      // Initialisation du paginator à l'intérieur du bloc de souscription
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.loadArticles();
  }

  ngAfterViewInit() {
    // Aucune logique supplémentaire n'est nécessaire pour ngAfterViewInit pour le moment
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consulter(ArticleId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { ArticleId };
    const dialogRef = this.dialog.open(ConsulterInvitesComponent, dialogConfig);
  }

  affecter(ArticleId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: { member: { id: number } }) => {
      console.log(data);
      this.MS.affectMemberToEvent(data.member.id, ArticleId).subscribe(() => {
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        this.router.navigate(['/dashboard']);
        // Close the dialog
      });
    });
  }
  delete(id: number): void {
    this.PS.deleteArticle(id).subscribe(() => {
      this.loadArticles();
    });
  }

  openArticleCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ArticleCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const article = { ...data };

        this.PS.saveArticle(article).subscribe(
          (savedArticle) => {
            // Update the data source after saving the article
            this.loadArticles();
          },
          (error) => {
            console.error('Error saving article:', error);
          }
        );
      }
    });
  }

  // Ajoutez d'autres méthodes ou fonctions selon vos besoins
  // Par exemple, des méthodes pour créer, mettre à jour, supprimer des articles, etc.

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
