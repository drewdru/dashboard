import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { Chart, registerables, LinearScale, ChartData, ChartOptions, ChartType } from 'chart.js';

Chart.register(...registerables, LinearScale);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
