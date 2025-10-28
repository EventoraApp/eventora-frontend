import { DecimalPipe } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-event-stats',
  standalone: true,
  imports: [ DecimalPipe],
  templateUrl: './event-stats.html',
  styleUrls: ['./event-stats.scss'],
})
export class EventStatsComponent implements OnInit, AfterViewInit {
  @Input() data: any;
  @ViewChild('salesChart') salesChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  soldPercentage = 0;

  ngOnInit(): void {
    if (this.data) {
      const { event, ticket_sales } = this.data;
      this.soldPercentage = (ticket_sales.total_sold / event.capacity) * 100;
    }
  }

  ngAfterViewInit(): void {
    if (this.data) {
      this.renderChart();
    }
  }

  renderChart(): void {
    const ctx = this.salesChart.nativeElement.getContext('2d');
    const { daily_sales } = this.data;

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: daily_sales.map((d: any) => d.date),
        datasets: [
          {
            label: 'Tickets Sold',
            data: daily_sales.map((d: any) => d.tickets_sold),
            borderColor: '#2563eb',
            tension: 0.3,
            borderWidth: 3,
            fill: false,
          },
          {
            label: 'Revenue ($)',
            data: daily_sales.map((d: any) => d.revenue),
            borderColor: '#16a34a',
            tension: 0.3,
            borderWidth: 3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'bottom' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { title: { display: true, text: 'Date' } },
          y: { title: { display: true, text: 'Count / $' } },
        },
      },
    });
  }
}
