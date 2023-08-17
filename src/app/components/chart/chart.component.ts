import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';


@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  type: ChartType = 'bar';
  
  chartData: ChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      this.generateRandomDataset('sensor 1'),
      this.generateRandomDataset('sensor 2'),
      this.generateRandomDataset('sensor 3'),
      this.generateRandomDataset('sensor 4'),
      this.generateRandomDataset('sensor 5'),
      this.generateRandomDataset('sensor 6'),
    ]
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },    
  };

  constructor(private cdr: ChangeDetectorRef) {}

  private generateRandomDataset(name: string, type: string = ''): ChartDataset {
    const randomNumber = () => Math.floor(Math.random() * 101);
    const dataArray = Array.from({ length: 12 }, randomNumber);
  
    const randomColor = () => Math.floor(Math.random() * 256);
    const randomRGB = `${randomColor()}, ${randomColor()}, ${randomColor()}`;  
    return {
      label: `${name}${type}`,
      data: dataArray,
      backgroundColor: `rgba(${randomRGB}, 0.2)`,
      borderColor: `rgba(${randomRGB}, 1)`,
      borderWidth: 1
    }
  }

  public updateLegendsColor(event: any, index: number) {
    const rgb = this.hex2Rgb(event.target.value).join(',');
    this.chartData = {
      ...this.chartData,
      datasets: this.chartData.datasets.map((dataset, i) => {
        if (i === index) {
          return {
            ...dataset,
            backgroundColor: `rgba(${rgb}, 0.2)`,
            borderColor: `rgba(${rgb}, 1)`,
          };
        }
        return dataset;
      }),
    };
  
    this.cdr.detectChanges();
  }

  public hex2Rgb(hex: any): number[] {
    return hex?.match(/[0-9A-F]{2}/gi)?.map((h: any) => parseInt(h, 16)) || '';
  }

  public rgb2Hex(rgbaString: any): string {
    const rgbaValues = rgbaString.match(/\d+/g);
    const rgbValues = rgbaValues.slice(0, 3);
    
    const color = rgbValues.reduce((hex: string, value: any) => {
      return hex + parseInt(value).toString(16).padStart(2, '0');
    }, '#');

    console.log("rgba2Hex", color);
    return color;
  }
  
  
  
}
