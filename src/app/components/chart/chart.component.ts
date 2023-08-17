import { Component, Input } from '@angular/core';
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
  
  exampleChartData: ChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ],
    datasets: [
      this.generateRandomDataset('sensor 1'),
      this.generateRandomDataset('sensor 2'),
      this.generateRandomDataset('sensor 3'),
      this.generateRandomDataset('sensor 4'),
    ]
  };

  exampleChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    },    
  };

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
}
