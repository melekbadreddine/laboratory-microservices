// events.component.ts
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EvenementService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { Evenement } from 'src/models/event';
import { EventCreateComponent } from '../event-create/event-create.component';
import { ConsulterInvitesComponent } from '../consulter-invites/consulter-invites.component';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Evenement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ES: EvenementService,
    private MS: MemberService,
    private dialog: MatDialog
  ) {}

  loadEvents(): void {
    this.ES.getEvenements().subscribe((events) => {
      this.dataSource = new MatTableDataSource(events);
      this.obs = this.dataSource.connect();
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  openEventCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EventCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ES.saveEvenement(data).subscribe(() => {
          // Reload the events after successful save
          this.loadEvents();
        });
      }
    });
  }

  consulter(eventId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { eventId };
    this.dialog.open(ConsulterInvitesComponent, dialogConfig);
  }

  affecter(eventId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.MS.affectMemberToEvent(data.member.id, eventId).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.ES.deleteEvenement(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  ngOnInit() {
    this.loadEvents();
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
