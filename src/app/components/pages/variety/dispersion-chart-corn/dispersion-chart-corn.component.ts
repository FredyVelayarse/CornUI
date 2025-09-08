import { Component, Input, OnChanges, ElementRef, AfterViewInit, SimpleChanges } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dispersion-chart-corn',
  templateUrl: './dispersion-chart-corn.component.html',
  styleUrls: ['./dispersion-chart-corn.component.scss']
})
export class DispersionChartCornComponent implements OnChanges, AfterViewInit {
  @Input() dispersionData: any[] = [];
  @Input() title: string = 'Dispersión';
  @Input() color: string = '#FF4560';
  
  private chart: any;
  private isChartInitialized = false;
  public chartId: string;

  constructor(private el: ElementRef) {
    this.chartId = `chart-${Math.random().toString(36).substring(2, 9)}`;
  }

  ngAfterViewInit(): void {
    if (this.dispersionData?.length > 0) {
      this.initChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('Datos recibidos:', this.dispersionData);
    
    if (changes['dispersionData'] && this.dispersionData?.length > 0) {
      if (this.isChartInitialized) {
        this.updateChart();
      } else {
        this.initChart();
      }
    }
  }

  private initChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    
    const element = document.getElementById(this.chartId);
    
    if (!element) {
      console.error(`Elemento con ID ${this.chartId} no encontrado`);
      return;
    }

    const options = {
      series: [{
        name: this.title,
        data: this.dispersionData.map(item => ({
          x: item.x,
          y: item.y,
          z: item.z,
          name: item.name,
          colors: item.colors
        }))
      }],
      chart: {
        type: "scatter",
        height: 350,
        zoom: { enabled: true, type: 'xy' }
      },
      xaxis: {
        title: { text: "Altura (cm)" },
        labels: { formatter: (val: number) => val.toFixed(1) }
      },
      yaxis: {
        title: { text: "Ancho (cm)" },
        labels: { formatter: (val: number) => val.toFixed(1) }
      },
      colors: [this.color],
      legend: { show: false },
      tooltip: {
        custom: (opts: { seriesIndex: number; dataPointIndex: number; w: any }) => {
          const { seriesIndex, dataPointIndex, w } = opts;
          const data = w.config.series[seriesIndex].data[dataPointIndex];
          
          // Convertir colores a formato CSS válido
          const validColors = data.colors
            .filter((c: string | null) => c)
            .map((c: string) => c.replace(/\(/g, 'rgb(').replace(/\)/g, ''));
          
          const colorsText = validColors.join(', ');

          return `
            <div class="p-2">
              <div class="font-bold">${data.name}</div>
              <div class="mt-1">Altura: ${data.x.toFixed(2)} cm</div>
              <div>Ancho: ${data.y.toFixed(2)} cm</div>
              <div>Área: ${data.z.toFixed(2)} cm²</div>
              <div class="mt-1">Colores: ${colorsText}</div>
            </div>
          `;
        }
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        shape: "circle"
      }
    };

    this.chart = new ApexCharts(element, options);
    this.chart.render().then(() => {
      this.isChartInitialized = true;
      //console.log('Gráfico inicializado para', this.title);
    });
  }

  private updateChart(): void {
    if (!this.isChartInitialized || !this.dispersionData || this.dispersionData.length === 0) {
      return;
    }

    const seriesData = [{
      name: this.title,
      data: this.dispersionData.map(item => ({
        x: item.x,
        y: item.y,
        z: item.z,
        name: item.name,
        colors: item.colors
      }))
    }];

    const xValues = this.dispersionData.map(d => d.x);
    const yValues = this.dispersionData.map(d => d.y);
    
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    // Actualizar datos y ejes
    this.chart.updateSeries(seriesData);
    
    this.chart.updateOptions({
      xaxis: {
        min: Math.max(0, xMin * 0.9),
        max: xMax * 1.1
      },
      yaxis: {
        min: Math.max(0, yMin * 0.9),
        max: yMax * 1.1
      }
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}