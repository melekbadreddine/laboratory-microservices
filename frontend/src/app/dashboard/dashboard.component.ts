import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  Nb_members: number = 0;
  Nb_events: number = 0;
  Nb_tools: number = 0;
  Nb_publications: number = 0;

  chartData: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [1551, 1688, 1800, 1895, 2124, 2124],
    },
  ];
  chartLabels: string[] = ['a', 'b', 'c', 'd'];
  chartOptions: ChartOptions = {};

  constructor(private MS: MemberService, private ES: EventService) {}

  ngOnInit(): void {
    this.MS.getAllMembers().subscribe((data) => {
      this.Nb_members = data.length;
    });
    this.ES.getAllEvents().subscribe((data) => {
      this.Nb_events = data.length;
    });
  }
}
