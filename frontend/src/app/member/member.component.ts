import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from '../app-config';
import { MemberService } from 'src/services/member.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/models/Member';
import { Student } from 'src/models/Student';
import { Teacher } from 'src/models/Teacher';
import { AffecterEnseignantComponent } from '../affecter-enseignant/affecter-enseignant.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements AfterViewInit, OnInit {
  teacherSource!: MatTableDataSource<Teacher>; // db.tab.teachers
  studentSource!: MatTableDataSource<Student>;

  teacherColumns: string[] = [
    'cin',
    'nom',
    'prenom',
    'dateNaissance',
    'cv',
    'grade',
    'etablissement',
    'actions',
  ];
  studentColumns: string[] = [
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

  @ViewChild('teacherPaginator') teacherPaginator!: MatPaginator;
  @ViewChild('studentPaginator') studentPaginator!: MatPaginator;

  loadMembers(): void {
    // Teachers
    this.MS.getTeachers().subscribe((members) => {
      this.teacherSource = new MatTableDataSource(members);

      if (this.teacherSource) {
        console.log(this.teacherSource.data);
        this.teacherSource.paginator = this.teacherPaginator; // Assign the paginator
      }
    });

    // Students
    this.MS.getStudents().subscribe((members) => {
      this.studentSource = new MatTableDataSource(members);
      if (this.studentSource) {
        console.log(this.studentSource.data);
        this.studentSource.paginator = this.studentPaginator; // Assign the paginator
      }
    });
  }

  constructor(
    private MS: MemberService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadMembers();
  }
  ngAfterViewInit() {}

  applyFilterOnTeachers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teacherSource.filter = filterValue.trim().toLowerCase();

    if (this.teacherSource.paginator) {
      this.teacherSource.paginator.firstPage();
    }
  }

  applyFilterOnStudents(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentSource.filter = filterValue.trim().toLowerCase();

    if (this.studentSource.paginator) {
      this.studentSource.paginator.firstPage();
    }
  }

  affecter(student: Member): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(
      AffecterEnseignantComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.MS.affectStudentToTeacher(student, data.encadrant).subscribe(() => {
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        // this.router.navigate(['/dashboard']);
        // Close the dialog
        location.reload();
      });
    });
  }

  deleteTeacher(memberId: number) {
    this.MS.deleteTeacher(memberId).subscribe(() => {
      this.loadMembers();
    });
  }

  deleteStudent(memberId: number) {
    this.MS.deleteStudent(memberId).subscribe(() => {
      this.loadMembers();
    });
  }
}
