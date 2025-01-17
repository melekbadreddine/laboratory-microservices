import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/services/publication.service';
import { EvenementService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';
import { ChartDataset, ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  nb_members = 0;
  nb_articles = 0;
  nb_events = 0;
  nb_tools = 0;

  // Common chart options
  commonOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  // Pie Chart for Establishments
  etablissementTypeData!: ChartDataset[];
  etablissementTypesLabel: string[] = [];
  pieChartOptions: ChartOptions = {
    ...this.commonOptions,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  // Bar Chart for Roles (previously Radar Chart)
  barChartRolesData: ChartDataset[] = [];
  barChartRolesLabels: string[] = [];
  barChartRolesOptions: ChartOptions = {
    ...this.commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Bar Chart for Event Trends
  barChartData!: ChartDataset[];
  barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartOptions: ChartOptions = {
    ...this.commonOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: true }
      },
      x: {
        grid: { display: false }
      }
    }
  };

  // Line Chart for Activity Over Time
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  chartOptions: ChartOptions = {
    ...this.commonOptions,
    scales: {
      x: { grid: { display: false } },
      y: { 
        grid: { display: true },
        ticks: { precision: 0 },
        beginAtZero: true
      }
    },
  };

  // Doughnut Chart for Member Grades
  doughnutChartData!: ChartDataset[];
  doughnutChartLabels: string[] = [];
  doughnutChartOptions: ChartOptions = {
    ...this.commonOptions,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  // Horizontal Bar Chart for Member Diplomas
  horizontalBarChartData!: ChartDataset[];
  horizontalBarChartLabels: string[] = [];
  horizontalBarChartOptions: ChartOptions = {
    ...this.commonOptions,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: true }
      },
      y: {
        grid: { display: false }
      }
    }
  };

  constructor(
    private ES: EvenementService,
    private TS: ToolService,
    private PS: PublicationService,
    private MS: MemberService
  ) {}

  ngOnInit(): void {
    // Fetch general statistics
    this.MS.getMembers().subscribe((members) => (this.nb_members = members.length));
    this.TS.getTools().subscribe((tools) => (this.nb_tools = tools.length));
    this.ES.getEvenements().subscribe((events) => (this.nb_events = events.length));
    this.PS.getPublications().subscribe((pubs) => (this.nb_articles = pubs.length));

    // Fetch data for charts
    this.MS.getNumberPerMemberEtablissement().subscribe((map) => {
      this.etablissementTypesLabel = Object.keys(map);
      this.etablissementTypeData = [{ label: 'Membres', data: Object.values(map) }];
    });

    this.MS.getNumberPerMemberGrade().subscribe((map) => {
      this.barChartRolesLabels = Object.keys(map); // Use labels for bar chart roles
      this.barChartRolesData = [{ label: 'Rôles', data: Object.values(map) }]; // Data for bar chart
    });

    this.ES.getFullYearsEvents(2020, 2025).subscribe((events) => {
      this.barChartData = [{ data: events, label: 'Évènements' }];
    });

    this.MS.getNbPubMembers().subscribe((tab) => {
      this.chartData.push({ label: 'Articles', data: tab });
    });

    this.MS.getNbOutilMembers().subscribe((tab) => {
      this.chartData.push({ label: 'Outils', data: tab });
    });

    this.MS.getNumberPerMemberDiplome().subscribe((map) => {
      this.horizontalBarChartLabels = Object.keys(map);
      this.horizontalBarChartData = [{ label: 'Diplômes', data: Object.values(map) }];
    });

    this.MS.getNumberPerMemberGrade().subscribe((map) => {
      this.doughnutChartLabels = Object.keys(map);
      this.doughnutChartData = [{ label: 'Grades', data: Object.values(map) }];
    });
  }
}
