import { Component, OnInit } from '@angular/core';
import { Tool } from 'src/models/Tool';
import { ToolService } from 'src/services/tool.service';
import { MatDialog } from '@angular/material/dialog';
import { ToolModalComponent } from '../tool-modal/tool-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css'],
})
export class ToolComponent implements OnInit {
  displayedColumns: string[] = ['id', 'source', 'date', 'icons'];
  dataSource: Tool[] = [];

  constructor(private toolService: ToolService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe((data) => {
      this.dataSource = data;
    });
  }

  open(): void {
    const dialogRef = this.dialog.open(ToolModalComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.toolService.addTool(data).subscribe(() => {
          this.toolService.getAllTools().subscribe((tools) => {
            this.dataSource = tools;
          });
        });
      }
    });
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toolService.deleteTool(id).subscribe(() => {
          this.toolService.getAllTools().subscribe((tools) => {
            this.dataSource = tools;
          });
        });
      }
    });
  }
}
