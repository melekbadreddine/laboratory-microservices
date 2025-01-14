import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Member } from 'src/models/member';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { MemberService } from 'src/services/member.service';
import { AffecterEnseignantComponent } from '../affecter-enseignant/affecter-enseignant.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements OnInit, AfterViewInit {
  // Data sources for tables
  enseignantSource!: MatTableDataSource<Enseignant>;
  etudiantSource!: MatTableDataSource<Etudiant>;

  // Column definitions
  enseignantColumns: string[] = [
    'cin',
    'nom',
    'prenom',
    'dateNaissance',
    'cv',
    'grade',
    'etablissement',
    'actions',
  ];

  etudiantColumns: string[] = [
    'cin',
    'nom',
    'prenom',
    'dateNaissance',
    'cv',
    'encadrant',
    'dateInscription',
    'diplome',
    'sujet',
    'actions',
  ];

  // ViewChild decorators for pagination and sorting
  @ViewChild('enseignantPaginator') enseignantPaginator!: MatPaginator;
  @ViewChild('etudiantPaginator') etudiantPaginator!: MatPaginator;
  @ViewChild('enseignantSort') enseignantSort!: MatSort;
  @ViewChild('etudiantSort') etudiantSort!: MatSort;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize data sources
    this.enseignantSource = new MatTableDataSource<Enseignant>([]);
    this.etudiantSource = new MatTableDataSource<Etudiant>([]);
    this.loadMembers();
  }

  ngAfterViewInit(): void {
    // Set up sorting and pagination after view initialization
    if (this.enseignantSource) {
      this.enseignantSource.sort = this.enseignantSort;
      this.enseignantSource.paginator = this.enseignantPaginator;
    }
    if (this.etudiantSource) {
      this.etudiantSource.sort = this.etudiantSort;
      this.etudiantSource.paginator = this.etudiantPaginator;
    }
  }

  loadMembers(): void {
    // Load teachers
    this.memberService.getEnseignants().subscribe({
      next: (teachers) => {
        this.enseignantSource.data = teachers;
        this.enseignantSource.paginator = this.enseignantPaginator;
        this.enseignantSource.sort = this.enseignantSort;
      },
      error: (error) => console.error('Error loading teachers:', error),
    });

    // Load students
    this.memberService.getEtudiants().subscribe({
      next: (students) => {
        this.etudiantSource.data = students;
        this.etudiantSource.paginator = this.etudiantPaginator;
        this.etudiantSource.sort = this.etudiantSort;
      },
      error: (error) => console.error('Error loading students:', error),
    });
  }

  applyFilterOnEnseignants(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.enseignantSource.filter = filterValue.trim().toLowerCase();

    if (this.enseignantSource.paginator) {
      this.enseignantSource.paginator.firstPage();
    }
  }

  applyFilterOnEtudiants(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.etudiantSource.filter = filterValue.trim().toLowerCase();

    if (this.etudiantSource.paginator) {
      this.etudiantSource.paginator.firstPage();
    }
  }

  affecter(etudiant: Etudiant): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(
      AffecterEnseignantComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.encadrant) {
        this.memberService
          .affectEtudiantToEnseignant(etudiant, result.encadrant)
          .subscribe({
            next: () => {
              this.loadMembers(); // Reload data instead of page refresh
            },
            error: (error) =>
              console.error('Error assigning supervisor:', error),
          });
      }
    });
  }

  deleteEnseignant(memberId: number): void {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.memberService.deleteEnseignant(memberId).subscribe({
        next: () => {
          this.loadMembers();
        },
        error: (error) => console.error('Error deleting teacher:', error),
      });
    }
  }

  deleteEtudiant(memberId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.memberService.deleteEtudiant(memberId).subscribe({
        next: () => {
          this.loadMembers();
        },
        error: (error) => console.error('Error deleting student:', error),
      });
    }
  }
}
