import { Component } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { setDateRange } from '../../store/chart';
import * as moment from 'moment';

@Component({
  selector: 'monthrange',
  templateUrl: './monthrange.component.html',
  styleUrls: ['./monthrange.component.scss'],
})
export class MonthrangeComponent {
  selectedRange = { start: null, end: null } as DateRange<Date>;
  startDate = new Date(2023, 0, 1);
  endDate = new Date(2023, 11, 31);
  inputType = 'start'

  constructor(
    private store: Store,
  ) {}

  openDatePicker(picker: any, inputType: string) {
    this.inputType = inputType;
    picker.open();
  }
  
  closeDatePicker(eventData: Date, picker?: any) {
    if (this.inputType === 'start') {
      this.startDate = eventData;
    } else {
      this.endDate = eventData;
    }
    picker.close();
    
    const startDateStr = moment(this.startDate).format("MMM");
    const endDateStr = moment(this.endDate).format("MMM");
  
    this.store.dispatch(
      setDateRange({
        dateRange: [
          startDateStr ?? "Jan",
          endDateStr ?? "Dec",
        ],
      })
    ); 
  }
}
