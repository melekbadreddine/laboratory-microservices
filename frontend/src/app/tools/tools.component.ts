import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';
import { ToolsCreateComponent } from '../tools-create/tools-create.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemberService } from 'src/services/member.service';
import { Observable } from 'rxjs';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';
import { ConsulterMemberComponent } from '../consulter-member/consulter-member.component';
import { Tool } from 'src/models/Tool';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements AfterViewInit, OnInit, OnDestroy {
  obs: Observable<any> = new Observable();
  dataSource: MatTableDataSource<Tool> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadTools(): void {
    this.TS.getTools().subscribe((tools) => {
      tools.forEach((tool) => {
        if (tool.createur != undefined) {
          this.MS.getMemberById(tool.createur.id).subscribe((member) => {
            tool.createur = member;
          });
        }
      });

      this.dataSource.data = tools;

      // Move paginator initialization inside the subscription block
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  constructor(
    private TS: ToolService,
    private MS: MemberService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.loadTools();
  }

  openToolCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ToolsCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      const tool = { ...data };

      this.TS.saveTool(tool).subscribe(() => {
        this.loadTools();
      });
    });
  }

  affecter(toolId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
      this.MS.affectMemberToTool(data.member.id, toolId).subscribe(() => {
        location.reload();
      });
    });
  }

  consulter(toolId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { toolId };
    this.dialog.open(ConsulterMemberComponent, dialogConfig);
  }

  ngOnInit() {
    this.loadTools();
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
